# Exam Project Setup Guide

This project is set up with JSON Server for the backend API and React with React Router for the frontend.

## Prerequisites

Make sure you have Node.js and npm installed on your machine.

## Installation

1. Install dependencies:
```bash
npm install
```

2. Install JSON Server globally (if not already installed):
```bash
npm install -g json-server
```

## Running the Application

You need to run **TWO** terminals:

### Terminal 1: JSON Server (Backend API)

Navigate to the project directory and run:
```bash
json-server --watch src/api/db.json --port 3000
```

This will start the JSON server at `http://localhost:3000`

The API endpoints will be:
- GET all tests: `http://localhost:3000/tests`
- GET single test: `http://localhost:3000/tests/:id`
- POST new test: `http://localhost:3000/tests`
- PUT update test: `http://localhost:3000/tests/:id`
- DELETE test: `http://localhost:3000/tests/:id`

### Terminal 2: React Development Server (Frontend)

In a new terminal, run:
```bash
npm run dev
```

This will start the Vite development server (usually at `http://localhost:5173`)

## Project Structure

```
exam/
├── src/
│   ├── api/
│   │   └── db.json              # JSON Server database
│   ├── service/
│   │   └── api.js               # API service functions
│   ├── layouts/
│   │   └── RootLayout.jsx       # Main layout with navbar
│   ├── component/
│   │   ├── Navbar.jsx           # Navigation bar
│   │   └── tests/               # Test-related components
│   │       ├── Tests.jsx        # List all tests
│   │       ├── TestDetails.jsx  # View single test details
│   │       ├── AddTest.jsx      # Add new test form
│   │       ├── UpdateTest.jsx   # Update test form
│   │       └── NotFound.jsx     # 404 page
│   ├── router.jsx               # React Router configuration
│   └── main.jsx                 # Application entry point
└── package.json
```

## Available Routes

- `/` or `/tests` - View all tests
- `/tests/:id` - View test details
- `/add-test` - Add a new test
- `/update-test/:id` - Update existing test
- `/*` - 404 Not Found page

## Features

- **CRUD Operations**: Create, Read, Update, Delete tests
- **React Router**: Client-side routing with lazy loading
- **Bootstrap UI**: Responsive design with React Bootstrap
- **API Service**: Clean abstraction for all API calls
- **Form Validation**: Basic validation on add/update forms
- **Loading States**: Spinner components for better UX
- **Error Handling**: Try-catch blocks for API errors

## Test Data Structure

Each test has the following properties:
```json
{
  "id": "string",
  "title": "string",
  "description": "string",
  "duration": number (minutes),
  "difficulty": "Easy" | "Medium" | "Hard",
  "totalQuestions": number,
  "passingScore": number (percentage),
  "category": "string"
}
```

## Tips for the Exam

1. **Always start JSON Server first** before running the React app
2. **Check the console** for any errors in both terminals
3. **Test CRUD operations** to make sure everything works
4. You can modify the test data structure in `db.json` if needed
5. API service functions are in `src/service/api.js` - easy to customize

## Troubleshooting

- **Port already in use**: Make sure no other app is using port 3000 or 5173
- **API not working**: Verify JSON Server is running on port 3000
- **CORS errors**: JSON Server handles CORS automatically
- **404 on refresh**: Normal with React Router - development server handles this

Good luck with your exam! 🚀
