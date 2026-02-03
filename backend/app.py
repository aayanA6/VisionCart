from flask import Flask, request, jsonify
from flask_cors import CORS
from clarifai_grpc.channel.clarifai_channel import ClarifaiChannel
from clarifai_grpc.grpc.api import resources_pb2, service_pb2, service_pb2_grpc
from clarifai_grpc.grpc.api.status import status_code_pb2
from serpapi import GoogleSearch
import base64
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app)

# API Keys from environment variables
CLARIFAI_PAT = os.getenv('CLARIFAI_PAT')
SERPAPI_KEY = os.getenv('SERPAPI_KEY')

# Clarifai setup
CLARIFAI_USER_ID = 'clarifai'
CLARIFAI_APP_ID = 'main'
CLARIFAI_MODEL_ID = 'apparel-detection'

def identify_products(image_bytes):
    """Use Clarifai to identify products in the image"""
    try:
        channel = ClarifaiChannel.get_grpc_channel()
        stub = service_pb2_grpc.V2Stub(channel)
        
        metadata = (('authorization', 'Key ' + CLARIFAI_PAT),)
        
        userDataObject = resources_pb2.UserAppIDSet(
            user_id=CLARIFAI_USER_ID,
            app_id=CLARIFAI_APP_ID
        )
        
        post_model_outputs_response = stub.PostModelOutputs(
            service_pb2.PostModelOutputsRequest(
                user_app_id=userDataObject,
                model_id=CLARIFAI_MODEL_ID,
                inputs=[
                    resources_pb2.Input(
                        data=resources_pb2.Data(
                            image=resources_pb2.Image(
                                base64=image_bytes
                            )
                        )
                    )
                ]
            ),
            metadata=metadata
        )
        
        if post_model_outputs_response.status.code != status_code_pb2.SUCCESS:
            raise Exception(f"Clarifai API error: {post_model_outputs_response.status.description}")
        
        # Extract detected concepts/products
        products = []
        outputs = post_model_outputs_response.outputs[0]
        
        for concept in outputs.data.concepts:
            if concept.value > 0.7:  # 70% confidence threshold
                products.append({
                    'name': concept.name,
                    'confidence': round(concept.value * 100, 2)
                })
        
        return products
    
    except Exception as e:
        print(f"Error in identify_products: {str(e)}")
        return []

def search_shopping_links(product_name):
    """Use SerpApi to search for shopping links and prices"""
    try:
        params = {
            "engine": "google_shopping",
            "q": product_name,
            "api_key": SERPAPI_KEY,
            "num": 5  # Get top 5 results
        }
        
        search = GoogleSearch(params)
        results = search.get_dict()
        
        shopping_results = []
        if 'shopping_results' in results:
            for item in results['shopping_results'][:5]:
                shopping_results.append({
                    'title': item.get('title', 'N/A'),
                    'price': item.get('price', 'N/A'),
                    'link': item.get('link', '#'),
                    'source': item.get('source', 'N/A'),
                    'thumbnail': item.get('thumbnail', '')
                })
        
        return shopping_results
    
    except Exception as e:
        print(f"Error in search_shopping_links: {str(e)}")
        return []

@app.route('/api/health', methods=['GET'])
def health():
    """Health check endpoint"""
    return jsonify({'status': 'healthy', 'message': 'Vision Cart API is running'})

@app.route('/api/identify', methods=['POST'])
def identify():
    """Main endpoint to identify products and get shopping links"""
    try:
        if 'image' not in request.files:
            return jsonify({'error': 'No image provided'}), 400
        
        image_file = request.files['image']
        
        # Read and encode image
        image_bytes = base64.b64encode(image_file.read()).decode('utf-8')
        
        # Step 1: Identify products using Clarifai
        products = identify_products(image_bytes)
        
        if not products:
            return jsonify({
                'success': False,
                'message': 'No products identified with sufficient confidence',
                'products': []
            })
        
        # Step 2: Get shopping links for each product
        results = []
        for product in products:
            shopping_links = search_shopping_links(product['name'])
            results.append({
                'product': product['name'],
                'confidence': product['confidence'],
                'shopping_links': shopping_links
            })
        
        return jsonify({
            'success': True,
            'message': f'Found {len(results)} product(s)',
            'products': results
        })
    
    except Exception as e:
        print(f"Error in identify endpoint: {str(e)}")
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)
