# 🚀 Quick Start Guide

Get Vision Cart running in 5 minutes!

## Step 1: Get API Keys (2 minutes)

### Clarifai
1. Go to [clarifai.com](https://clarifai.com) → Sign up
2. Dashboard → Settings → Security → Create PAT
3. Copy your Personal Access Token

### SerpApi
1. Go to [serpapi.com](https://serpapi.com) → Sign up
2. Dashboard → Copy API Key

## Step 2: Setup Backend (1 minute)

```bash
cd backend

# Install dependencies
pip install -r requirements.txt

# Create .env file
cp .env.example .env

# Edit .env and paste your keys:
# CLARIFAI_PAT=your_key_here
# SERPAPI_KEY=your_key_here

# Start backend
python app.py
```

Backend runs at: `http://localhost:5000`

## Step 3: Setup Frontend (2 minutes)

```bash
cd frontend

# Install dependencies
npm install

# Start frontend
npm start
```

Frontend opens at: `http://localhost:3000`

## Test It Out! 🎉

1. Upload an image of clothing or fashion items
2. Watch the AI identify products
3. See shopping links from major retailers!

## Common Issues

**"Module not found" error:**
```bash
# Backend
pip install --upgrade -r requirements.txt

# Frontend
npm install
```

**"Connection refused" error:**
- Make sure backend is running on port 5000
- Check that both servers are running simultaneously

**"No products identified":**
- Use clear images with good lighting
- Try fashion items (shirts, shoes, dresses) for best results
- Make sure API keys are correct in `.env`

## Next Steps

- Read the full [README.md](README.md) for detailed documentation
- Check out the [API documentation](#api-endpoints)
- Plan your video processing feature with OpenCV!

Happy coding! 🛒✨
