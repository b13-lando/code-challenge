# React Frontend for Item CRUD

A simple **React + TypeScript** frontend to interact with the Item CRUD backend API.

## Features
- Create a new item
- List items with filters (All / Active / Inactive)
- View item details
- Update item details
- Delete item
- Activate / Deactivate items
- Environment-configurable API base URL
- Uses **Axios** for HTTP requests

## Requirements
- Node.js >= 18
- npm >= 8

## Setup

1. Clone repository:

```bash
git clone <your-repo-url>
cd <repo-folder>/frontend
```

2. Install dependencies:

```bash
npm install
```

3. Create a .env file in the frontend root:
```bash
REACT_APP_API_BASE=http://localhost:3000/api
PORT=3001
```

4. Run the app
```bash
npm start
```