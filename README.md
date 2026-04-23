# FavSite API

A production-ready backend service for managing user favorite websites with RESTful API endpoints and CLI utilities.

## Architecture Overview

This monorepo contains multiple service layers:

- **`/api`** - Express.js REST API service with SQLite persistence
- **`/cli`** - Command-line interface for database management and utilities
- **`/client`** - Display respons from API
- **`/src`** - Core HTTP server implementations and middleware
- **`Functions.js`** - Shared utility functions and helpers

### Technology Stack

- **Runtime**: Node.js (CommonJS/ES Modules)
- **Framework**: Express.js 5.x
- **Database**: SQLite3 via better-sqlite3
- **Process Management**: Nodemon (development)
- **Module Systems**: Mixed CommonJS and ES6 modules

## Project Structure

```
.
├── api/                    # REST API service
│   ├── src/
│   │   └── app.js         # Express application
│   ├── favorites.db       # SQLite database
│   └── package.json       # API dependencies
├── cli/                    # CLI utilities
│   ├── src/
│   │   ├── db.js          # Database operations
│   │   └── main.js        # Entry point
│   └── package.json       # CLI dependencies
├── src/
│   ├── server.js          # HTTP server
│   └── client.js          # Client implementation
├── Functions.js           # Shared utilities
├── users.json             # User data
├── config.txt             # Configuration
└── package.json           # Root dependencies
```

## Getting Started

### Prerequisites

- Node.js >= 14.x
- npm >= 6.x

### Installation

```bash
# Install root dependencies
npm install

# Install service-specific dependencies
cd api && npm install
cd ../cli && npm install
```

### Configuration

Create a `.env` file in the root directory (not tracked by git):

```env
DATABASE_PATH=./favorites.db
API_PORT=3000
API_HOST=127.0.0.1
NODE_ENV=development
```

## Running Services

### API Server

```bash
npm start
# or from /api
cd api && npm start
```

Starts Express server on `http://127.0.0.1:3000`

### CLI Utilities

```bash
npm run client
# or from /cli
cd cli && npm start
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Returns user favorites |
| POST | `/favorites` | Create new favorite |
| PUT | `/favorites/:id` | Update favorite |
| DELETE | `/favorites/:id` | Delete favorite |

### Response Format

All responses use standard JSON:

```json
{
  "status": "success|error",
  "data": {},
  "message": "Optional error/status message"
}
```

## Database Schema

### Favorites Table

```sql
CREATE TABLE IF NOT EXISTS favorites (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  url TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
)
```

## Development

### Code Standards

- Use consistent indentation (2 spaces)
- Follow Node.js naming conventions
- Implement proper error handling with try/catch
- Log operations for debugging

### Debugging

Enable debug output:

```javascript
// In intro.js or any module
const debugMode = true;
if(debugMode) {
  console.log('DEBUG:', message);
}
```

### Hot Reloading

Nodemon is configured to watch for file changes and automatically restart services during development.

## Deployment

### Environment Setup

1. Set `NODE_ENV=production`
2. Configure environment variables in `.env`
3. Ensure `.gitignore` excludes:
   - `node_modules/`
   - `.env`
   - `*.db` (optional for persistence)

### Build & Start

```bash
# Production start (no hot reload)
NODE_ENV=production node src/server.js
# or
NODE_ENV=production node api/src/app.js
```

## Error Handling

The application implements comprehensive error handling:

- **Server errors (500)**: Unhandled exceptions logged to console
- **Client errors (4xx)**: Validation or request format issues
- **Not Found (404)**: Endpoint or resource not found

## Performance Considerations

- **Database**: SQLite optimized for single-user/small team use; migrate to PostgreSQL for production scale
- **Caching**: Implement Redis for frequently accessed favorites
- **Connection pooling**: Better-sqlite3 uses synchronous operations; consider async alternatives for high concurrency

## Known Issues & Limitations

- Mixed module systems (CommonJS/ES6) may cause compatibility issues
- Synchronous database operations can block event loop under high load
- No built-in rate limiting or authentication middleware
- Database file committed to git (should be gitignored)

## Future Enhancements

- [ ] Add authentication/authorization layer
- [ ] Implement request validation with Joi/Zod
- [ ] Add comprehensive logging (Winston/Pino)
- [ ] Migrate to async database operations
- [ ] Add API documentation (Swagger/OpenAPI)
- [ ] Implement CI/CD pipeline
- [ ] Add unit/integration test suite

## Security Considerations

- ⚠️ No input validation currently implemented
- ⚠️ No authentication/authorization checks
- ⚠️ `.env` file should never be committed
- ⚠️ Enable CORS carefully in production
- Implement rate limiting before production deployment
- Sanitize all user inputs

## Contributing

1. Create a feature branch
2. Make changes following the code standards
3. Test locally
4. Submit pull request with description
5. Merge after approval

## License

ISC License - See LICENSE file

## Author

Redeem Grimm

## Support & Contact

For issues, questions, or contributions, open an issue on GitHub or contact the maintainer.

---

**Last Updated**: April 2026
**Status**: Active Development
