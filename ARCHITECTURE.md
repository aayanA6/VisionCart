# Vision Cart Architecture

## System Overview

```
┌─────────────────────────────────────────────────────────────┐
│                      Vision Cart System                      │
└─────────────────────────────────────────────────────────────┘

┌──────────────┐          ┌──────────────┐          ┌──────────────┐
│              │          │              │          │              │
│   React      │  HTTP    │   Flask      │   API    │  External    │
│   Frontend   ├─────────▶│   Backend    ├─────────▶│  Services    │
│              │          │              │          │              │
└──────────────┘          └──────────────┘          └──────────────┘
      │                         │                          │
      │                         │                          │
      ▼                         ▼                          ▼
┌──────────────┐          ┌──────────────┐          ┌──────────────┐
│ - Image      │          │ - Flask      │          │ - Clarifai   │
│   Upload     │          │ - CORS       │          │ - SerpApi    │
│ - Display    │          │ - Image      │          │              │
│   Results    │          │   Processing │          │              │
└──────────────┘          └──────────────┘          └──────────────┘
```

## Data Flow

### Image Upload to Product Identification

```
1. User uploads image
   └─▶ ImageUploader.js

2. Image sent to backend
   └─▶ POST /api/identify
       └─▶ Flask receives multipart/form-data

3. Image processing
   └─▶ Convert to base64
       └─▶ Send to Clarifai API
           └─▶ Receive product concepts with confidence scores

4. Shopping search
   └─▶ For each identified product:
       └─▶ Query SerpApi Google Shopping
           └─▶ Receive top 5 shopping results

5. Return results to frontend
   └─▶ JSON response with products and links
       └─▶ ProductResults.js displays data
```

## Component Breakdown

### Frontend Components

#### App.js
- Main application container
- Manages state for results, loading, errors
- Orchestrates ImageUploader and ProductResults

#### ImageUploader.js
- Drag-and-drop interface
- File validation
- Image preview
- API communication via Axios

#### ProductResults.js
- Display identified products
- Show confidence scores
- Render shopping links with prices
- Grid layout for multiple results

### Backend Endpoints

#### /api/health (GET)
- Simple health check
- Returns JSON status

#### /api/identify (POST)
- Accepts multipart/form-data image
- Processes with Clarifai
- Searches shopping links with SerpApi
- Returns combined results

## External API Integration

### Clarifai
- Model: apparel-detection
- Purpose: Product/fashion item identification
- Input: Base64 encoded image
- Output: Concepts with confidence scores

### SerpApi
- Engine: Google Shopping
- Purpose: Find buy links and prices
- Input: Product search query
- Output: Shopping results with prices, links, sources

## Security Considerations

1. **API Keys**: Stored in .env, never committed
2. **CORS**: Enabled for local development
3. **File Upload**: Validates image file types
4. **Error Handling**: Graceful degradation

## Performance Optimizations

1. **Confidence Threshold**: 70% minimum for product detection
2. **Result Limiting**: Top 5 shopping results per product
3. **Image Processing**: Base64 encoding for API compatibility
4. **Async Operations**: Non-blocking API calls

## Future Architecture Enhancements

### Phase 2: Video Processing
```
Video Upload
   └─▶ OpenCV Frame Extraction
       └─▶ Process N frames per second
           └─▶ Batch product identification
               └─▶ Aggregate results
                   └─▶ Display timeline view
```

### Phase 3: Real-time Processing
```
Webcam Feed
   └─▶ WebRTC Stream
       └─▶ Server-side frame extraction
           └─▶ Real-time product detection
               └─▶ Live shopping recommendations
```

### Phase 4: Personalization
```
User Preferences
   └─▶ ML-based filtering
       └─▶ Price range preferences
           └─▶ Brand preferences
               └─▶ Style matching
                   └─▶ Personalized results
```

## Scalability Plan

1. **Database Layer**: Add PostgreSQL for user data, search history
2. **Caching**: Redis for frequently searched products
3. **Queue System**: Celery for async video processing
4. **CDN**: CloudFront for static assets
5. **Load Balancing**: Nginx for multiple backend instances

## Monitoring & Analytics

- Track identification accuracy
- Monitor API response times
- Log failed searches for improvement
- User engagement metrics (clicks, conversions)

---

Built with ❤️ for efficient product discovery
