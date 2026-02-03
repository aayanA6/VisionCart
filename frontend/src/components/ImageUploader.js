import React, { useState, useRef } from 'react';
import axios from 'axios';
import './ImageUploader.css';

const ImageUploader = ({ onResults, onLoading, onError }) => {
  const [preview, setPreview] = useState(null);
  const [dragging, setDragging] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileSelect = async (file) => {
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      onError('Please upload a valid image file');
      return;
    }

    // Show preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);

    // Upload to backend
    await uploadImage(file);
  };

  const uploadImage = async (file) => {
    onLoading(true);
    
    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await axios.post('http://localhost:5000/api/identify', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.success) {
        onResults(response.data);
      } else {
        onError(response.data.message || 'Failed to identify products');
      }
    } catch (error) {
      console.error('Upload error:', error);
      onError('Failed to connect to server. Make sure the backend is running.');
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    
    const file = e.dataTransfer.files[0];
    handleFileSelect(file);
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    handleFileSelect(file);
  };

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleReset = () => {
    setPreview(null);
    onResults(null);
    fileInputRef.current.value = '';
  };

  return (
    <div className="uploader-container">
      {!preview ? (
        <div
          className={`upload-area ${dragging ? 'dragging' : ''}`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={handleClick}
        >
          <div className="upload-icon">📸</div>
          <h2>Upload Product Image</h2>
          <p>Drag and drop an image here, or click to select</p>
          <p className="supported-formats">Supported: JPG, PNG, GIF, WebP</p>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileInputChange}
            style={{ display: 'none' }}
          />
        </div>
      ) : (
        <div className="preview-container">
          <img src={preview} alt="Preview" className="preview-image" />
          <button onClick={handleReset} className="reset-button">
            Upload Another Image
          </button>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
