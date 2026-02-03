#!/bin/bash

# Vision Cart - Automated Setup Script
# This script sets up the entire Vision Cart application

set -e  # Exit on any error

echo "🛒 Vision Cart - Automated Setup"
echo "=================================="
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_success() {
    echo -e "${GREEN}✓ $1${NC}"
}

print_error() {
    echo -e "${RED}✗ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠ $1${NC}"
}

print_info() {
    echo -e "${YELLOW}ℹ $1${NC}"
}

# Check if Python is installed
echo "Checking prerequisites..."
if ! command -v python3 &> /dev/null; then
    print_error "Python 3 is not installed. Please install Python 3.8 or higher."
    exit 1
fi
print_success "Python 3 found: $(python3 --version)"

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    print_error "Node.js is not installed. Please install Node.js 16 or higher."
    exit 1
fi
print_success "Node.js found: $(node --version)"

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    print_error "npm is not installed. Please install npm."
    exit 1
fi
print_success "npm found: $(npm --version)"

echo ""
echo "📦 Setting up Backend..."
echo "========================"

# Navigate to backend directory
cd backend

# Check if .env exists
if [ ! -f .env ]; then
    print_warning ".env file not found. Creating from .env.example..."
    cp .env.example .env
    print_info "Please edit backend/.env and add your API keys:"
    print_info "  - CLARIFAI_PAT=your_clarifai_key"
    print_info "  - SERPAPI_KEY=your_serpapi_key"
    echo ""
    read -p "Press Enter after you've added your API keys..."
fi

# Install Python dependencies
print_info "Installing Python dependencies..."
if pip3 install -r requirements.txt > /dev/null 2>&1; then
    print_success "Python dependencies installed"
else
    print_error "Failed to install Python dependencies"
    exit 1
fi

# Navigate back to root
cd ..

echo ""
echo "⚛️  Setting up Frontend..."
echo "=========================="

# Navigate to frontend directory
cd frontend

# Install npm dependencies
print_info "Installing npm dependencies (this may take a few minutes)..."
if npm install > /dev/null 2>&1; then
    print_success "npm dependencies installed"
else
    print_error "Failed to install npm dependencies"
    exit 1
fi

# Navigate back to root
cd ..

echo ""
echo "✅ Setup Complete!"
echo "=================="
echo ""
echo "📝 Next Steps:"
echo ""
echo "1. Make sure your API keys are set in backend/.env:"
echo "   - Clarifai PAT: https://clarifai.com → Settings → Security"
echo "   - SerpApi Key: https://serpapi.com → Dashboard → API Key"
echo ""
echo "2. Start the backend server:"
echo "   $ cd backend"
echo "   $ python3 app.py"
echo ""
echo "3. In a new terminal, start the frontend:"
echo "   $ cd frontend"
echo "   $ npm start"
echo ""
echo "4. Open your browser to: http://localhost:3000"
echo ""
echo "🎉 Happy coding with Vision Cart!"
echo ""

# Ask if user wants to start servers now
read -p "Would you like to start the servers now? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    print_info "Starting backend server..."
    cd backend
    python3 app.py &
    BACKEND_PID=$!
    
    print_info "Waiting 3 seconds for backend to start..."
    sleep 3
    
    print_info "Starting frontend server..."
    cd ../frontend
    npm start &
    FRONTEND_PID=$!
    
    echo ""
    print_success "Both servers are starting!"
    print_info "Backend PID: $BACKEND_PID"
    print_info "Frontend PID: $FRONTEND_PID"
    echo ""
    print_info "To stop the servers, press Ctrl+C or run:"
    print_info "  kill $BACKEND_PID $FRONTEND_PID"
    echo ""
    
    # Wait for user interrupt
    wait
else
    echo ""
    print_info "You can start the servers manually using the commands above."
fi
