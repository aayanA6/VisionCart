import React, { useState } from 'react';
import ImageUploader from './components/ImageUploader';
import ProductResults from './components/ProductResults';
import './App.css';

function App() {
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleResults = (data) => {
    setResults(data);
    setLoading(false);
    setError(null);
  };

  const handleLoading = (isLoading) => {
    setLoading(isLoading);
    if (isLoading) {
      setError(null);
      setResults(null);
    }
  };

  const handleError = (errorMessage) => {
    setError(errorMessage);
    setLoading(false);
    setResults(null);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>🛒 Vision Cart</h1>
        <p className="tagline">AI-Powered Product Identification & Shopping</p>
      </header>

      <main className="App-main">
        <ImageUploader 
          onResults={handleResults}
          onLoading={handleLoading}
          onError={handleError}
        />

        {loading && (
          <div className="loading-container">
            <div className="spinner"></div>
            <p>Identifying products and finding best deals...</p>
          </div>
        )}

        {error && (
          <div className="error-container">
            <p>❌ {error}</p>
          </div>
        )}

        {results && <ProductResults results={results} />}
      </main>

      <footer className="App-footer">
        <p>Built with Clarifai & SerpApi | Vision Cart 2024</p>
      </footer>
    </div>
  );
}

export default App;
