import React from 'react';
import './ProductResults.css';

const ProductResults = ({ results }) => {
  if (!results || !results.products || results.products.length === 0) {
    return null;
  }

  return (
    <div className="results-container">
      <div className="results-header">
        <h2>✨ Products Identified</h2>
        <p className="results-summary">
          Found {results.products.length} product{results.products.length !== 1 ? 's' : ''} with shopping options
        </p>
      </div>

      {results.products.map((product, index) => (
        <div key={index} className="product-card">
          <div className="product-header">
            <h3>{product.product}</h3>
            <span className="confidence-badge">
              {product.confidence}% confidence
            </span>
          </div>

          {product.shopping_links && product.shopping_links.length > 0 ? (
            <div className="shopping-links">
              <h4>🛍️ Available Options:</h4>
              <div className="links-grid">
                {product.shopping_links.map((link, linkIndex) => (
                  <a
                    key={linkIndex}
                    href={link.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shopping-item"
                  >
                    {link.thumbnail && (
                      <img
                        src={link.thumbnail}
                        alt={link.title}
                        className="product-thumbnail"
                      />
                    )}
                    <div className="shopping-info">
                      <p className="product-title">{link.title}</p>
                      <p className="product-price">{link.price}</p>
                      <p className="product-source">from {link.source}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          ) : (
            <p className="no-results">No shopping results found for this product.</p>
          )}
        </div>
      ))}
    </div>
  );
};

export default ProductResults;
