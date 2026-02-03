# 🛒 Vision Cart

AI-Powered Product Identification and Shopping Link Extraction Web App

## Features

- 📸 **Image Upload**: Drag-and-drop or click to upload product images
- 🤖 **AI Product Identification**: Uses Clarifai for accurate product detection (85%+ accuracy)
- 🛍️ **Automated Shopping Links**: Fetches buy links and prices from major retailers via SerpApi
- 💰 **Price Comparison**: Compare prices across multiple online stores
- ⚡ **Real-time Processing**: Fast product identification and link extraction
- 📱 **Responsive Design**: Works seamlessly on desktop and mobile devices

## Tech Stack

### Frontend
- React 18
- Axios for API calls
- Modern CSS with animations

### Backend
- Python Flask
- Clarifai API (product identification)
- SerpApi (shopping search)
- Flask-CORS for cross-origin requests

## Prerequisites

- Node.js (v16 or higher)
- Python 3.8 or higher
- Clarifai API Key (PAT)
- SerpApi Key

## Setup Instructions

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd vision-cart
```

### 2. Backend Setup

#### Install Python Dependencies

```bash
cd backend
pip install -r requirements.txt
```

#### Configure Environment Variables

Create a `.env` file in the `backend` directory:

```bash
cp .env.example .env
```

Edit `.env` and add your API keys:

```
CLARIFAI_PAT=your_clarifai_pat_key_here
SERPAPI_KEY=your_serpapi_key_here
```

#### Get API Keys

**Clarifai:**
1. Sign up at [https://clarifai.com](https://clarifai.com)
2. Go to Settings → Security
3. Create a new Personal Access Token (PAT)
4. Copy the PAT key

**SerpApi:**
1. Sign up at [https://serpapi.com](https://serpapi.com)
2. Go to Dashboard → API Key
3. Copy your API key

#### Run the Backend

```bash
python app.py
```

Backend will run on `http://localhost:5000`

### 3. Frontend Setup

#### Install Node Dependencies

```bash
cd ../frontend
npm install
```

#### Run the Frontend

```bash
npm start
```

Frontend will run on `http://localhost:3000`

## Usage

1. Open `http://localhost:3000` in your browser
2. Upload an image by:
   - Dragging and dropping an image onto the upload area
   - Clicking the upload area to select a file
3. Wait for the AI to identify products
4. View identified products with confidence scores
5. Browse shopping links with prices from various retailers
6. Click on any shopping link to purchase

## Project Structure

```
vision-cart/
├── backend/
│   ├── app.py              # Flask application
│   ├── requirements.txt    # Python dependencies
│   ├── .env.example        # Environment variables template
│   └── .env                # Your API keys (don't commit!)
│
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── ImageUploader.js
│   │   │   ├── ImageUploader.css
│   │   │   ├── ProductResults.js
│   │   │   └── ProductResults.css
│   │   ├── App.js
│   │   ├── App.css
│   │   ├── index.js
│   │   └── index.css
│   └── package.json
│
└── README.md
```

## API Endpoints

### Backend API

#### `GET /api/health`
Health check endpoint

**Response:**
```json
{
  "status": "healthy",
  "message": "Vision Cart API is running"
}
```

#### `POST /api/identify`
Identify products in an image and get shopping links

**Request:**
- Method: `POST`
- Content-Type: `multipart/form-data`
- Body: `image` (file)

**Response:**
```json
{
  "success": true,
  "message": "Found 2 product(s)",
  "products": [
    {
      "product": "t-shirt",
      "confidence": 92.5,
      "shopping_links": [
        {
          "title": "Classic Cotton T-Shirt",
          "price": "$19.99",
          "link": "https://example.com/product",
          "source": "Amazon",
          "thumbnail": "https://example.com/image.jpg"
        }
      ]
    }
  ]
}
```

## Future Enhancements

- [ ] Video upload and frame-by-frame analysis
- [ ] Real-time video processing with OpenCV
- [ ] Multiple object detection per frame
- [ ] User authentication and saved searches
- [ ] Personalized product recommendations
- [ ] Advanced filtering options (price range, brand, etc.)
- [ ] Comparison view for similar products
- [ ] Mobile app (React Native)

## Deployment

### Deploy to Vercel (Frontend)

```bash
cd frontend
npm run build
vercel --prod
```

### Deploy Backend (Options)

- **Heroku**: Push to Heroku with Procfile
- **Railway**: Connect GitHub repo
- **DigitalOcean**: Deploy to App Platform
- **AWS EC2**: Traditional server deployment

## Troubleshooting

### Backend won't start
- Make sure Python 3.8+ is installed
- Check that all dependencies are installed: `pip install -r requirements.txt`
- Verify API keys are in `.env` file

### Frontend can't connect to backend
- Ensure backend is running on port 5000
- Check CORS settings in Flask app
- Verify the API URL in `ImageUploader.js` is correct

### Low accuracy results
- Try uploading clearer, higher-resolution images
- Ensure good lighting in photos
- Use images with products clearly visible
- Try different Clarifai models for specific product types

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## License

MIT License - feel free to use this project for learning or commercial purposes

## Credits

- Built with [Clarifai](https://clarifai.com) for AI-powered product recognition
- Powered by [SerpApi](https://serpapi.com) for shopping search
- UI inspired by modern e-commerce platforms

---

**Vision Cart** - Making shopping smarter with AI 🚀
