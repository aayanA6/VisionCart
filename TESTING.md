# Testing Guide for Vision Cart

## Manual Testing Checklist

### Backend Testing

#### 1. Health Check
```bash
curl http://localhost:5000/api/health
```
**Expected Response:**
```json
{
  "status": "healthy",
  "message": "Vision Cart API is running"
}
```

#### 2. Image Upload Test
```bash
curl -X POST http://localhost:5000/api/identify \
  -F "image=@/path/to/test/image.jpg"
```
**Expected Response:**
```json
{
  "success": true,
  "message": "Found 2 product(s)",
  "products": [...]
}
```

### Frontend Testing

#### 1. Image Upload UI
- [ ] Drag and drop works
- [ ] Click to select file works
- [ ] Preview displays correctly
- [ ] File type validation works
- [ ] Invalid file shows error

#### 2. Product Results Display
- [ ] Products display with correct names
- [ ] Confidence scores show accurately
- [ ] Shopping links are clickable
- [ ] Images load properly
- [ ] Prices display correctly
- [ ] External links open in new tab

#### 3. Error Handling
- [ ] Backend offline shows error
- [ ] Invalid image shows error
- [ ] No products found shows message
- [ ] Network errors are caught

#### 4. Responsive Design
- [ ] Desktop layout works (1920x1080)
- [ ] Tablet layout works (768x1024)
- [ ] Mobile layout works (375x667)
- [ ] Touch interactions work on mobile

## Test Images

### Best Test Cases (High Accuracy Expected)

1. **T-shirts**: Plain, solid color, front view
2. **Shoes**: Clear product shot, single pair
3. **Dresses**: Full garment visible, good lighting
4. **Jackets**: Distinct style, clear view
5. **Accessories**: Watches, bags, sunglasses

### Challenging Test Cases (Lower Accuracy Expected)

1. Multiple items in one image
2. Poor lighting or blurry images
3. Partial product views
4. Complex patterns or prints
5. Unusual angles

## API Testing with Postman

### Setup Collection

1. Create new collection "Vision Cart"
2. Add environment variables:
   - `base_url`: http://localhost:5000

### Test Cases

#### Test 1: Health Check
- Method: GET
- URL: `{{base_url}}/api/health`
- Expected: 200 OK

#### Test 2: Valid Image Upload
- Method: POST
- URL: `{{base_url}}/api/identify`
- Body: form-data, key: "image", value: [image file]
- Expected: 200 OK with products array

#### Test 3: Missing Image
- Method: POST
- URL: `{{base_url}}/api/identify`
- Body: empty
- Expected: 400 Bad Request

## Performance Testing

### Metrics to Track

1. **Response Time**
   - Target: < 5 seconds for image identification
   - Target: < 3 seconds for shopping search

2. **Accuracy**
   - Target: > 85% match accuracy
   - Measure: Correct product identification rate

3. **User Experience**
   - Loading indicators show
   - No UI freezing
   - Smooth transitions

### Load Testing (Future)

```bash
# Using Apache Bench
ab -n 100 -c 10 http://localhost:5000/api/health

# Expected: Handle 100 requests, 10 concurrent
```

## Automated Testing (Future Implementation)

### Frontend Tests (Jest + React Testing Library)

```javascript
// Example test structure
describe('ImageUploader', () => {
  test('renders upload area', () => {
    // Test implementation
  });
  
  test('handles file selection', () => {
    // Test implementation
  });
  
  test('shows error for invalid files', () => {
    // Test implementation
  });
});
```

### Backend Tests (pytest)

```python
# Example test structure
def test_health_endpoint():
    response = client.get('/api/health')
    assert response.status_code == 200

def test_identify_no_image():
    response = client.post('/api/identify')
    assert response.status_code == 400

def test_identify_valid_image():
    # Test implementation
    pass
```

## Quality Assurance Checklist

### Before Deployment

- [ ] All endpoints return correct status codes
- [ ] Error messages are user-friendly
- [ ] API keys are in .env (not hardcoded)
- [ ] CORS configured correctly
- [ ] File uploads limited to images only
- [ ] XSS vulnerabilities checked
- [ ] SQL injection not applicable (no database yet)
- [ ] Rate limiting considered (future)

### Code Quality

- [ ] No console.log in production code
- [ ] Proper error handling in try-catch blocks
- [ ] Comments for complex logic
- [ ] Consistent code formatting
- [ ] No unused imports or variables
- [ ] Environment variables documented

## Common Issues & Solutions

### Issue: Low Accuracy
**Solutions:**
- Use higher quality images
- Ensure good lighting
- Focus on single products
- Try different Clarifai models

### Issue: Slow Response
**Solutions:**
- Check API rate limits
- Optimize image size before upload
- Consider caching frequent searches
- Monitor network latency

### Issue: No Shopping Results
**Solutions:**
- Verify SerpApi key is valid
- Check product name formatting
- Try more generic search terms
- Ensure SerpApi quota not exceeded

## Testing Best Practices

1. **Test Early**: Test each component as you build
2. **Test Often**: Run tests after each change
3. **Test Realistically**: Use real product images
4. **Test Edge Cases**: Try unusual inputs
5. **Document Bugs**: Keep track of issues found
6. **Regression Testing**: Retest after fixes

## Success Criteria

### Minimum Viable Product (MVP)
- ✅ Image upload works
- ✅ Product identification returns results
- ✅ Shopping links display correctly
- ✅ Basic error handling implemented
- ✅ Responsive design works

### Version 1.0
- [ ] 85%+ accuracy on fashion items
- [ ] < 5 second response time
- [ ] Video processing implemented
- [ ] User authentication
- [ ] Saved search history

---

**Remember:** Testing is continuous! Keep improving based on real user feedback.
