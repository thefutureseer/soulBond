## Promise Management S.A.S. App
# SoulBond
"Just keep your promise."

## Overview
The **Promise Management S.A.S. App** is a full-stack web application built with **Next.js, Apollo Client, and GraphQL**, using **Prisma and PostgreSQL** as the backend. This app allows users to create, edit, and track promises while maintaining version control and status updates.

## Features
- **Create & Edit Promises** – Users can add, modify, and update promises.
- **Status Tracking** – Promises have different statuses (e.g., Pending, Fulfilled, Failed).
- **Version Control** – Each update increments a version number.
- **User Identification** – Track who edited a promise.
- **GraphQL API Integration** – Uses Apollo Client to fetch and update data efficiently.
- **Next.js Dynamic Routing** – Enables editing promises via unique URLs.

## Tech Stack
- **Frontend:** Next.js (React), Tailwind CSS
- **Backend:** GraphQL, Prisma, PostgreSQL
- **State Management:** Apollo Client
- **Authentication:** (To be determined, if applicable)
- **Deployment:** Vercel (Frontend), Render (Backend)

## Installation & Setup
### Prerequisites
- Node.js (>=16)
- PostgreSQL database
- pnpm (or npm/yarn)

### Steps
1. **Clone the repository**
   ```sh
   git clone https://github.com/your-repo/promise-management.git
   cd promise-management
   ```
2. **Install dependencies**
   ```sh
   pnpm install  # or npm install / yarn install
   ```
3. **Set up environment variables**
   - Create a `.env` file in the root directory and add:
     ```env
     DATABASE_URL=postgres://user:password@localhost:5432/promise_db
     NEXT_PUBLIC_GRAPHQL_API=http://localhost:4000/graphql
     ```
4. **Run the development server**
   ```sh
   pnpm dev  # or npm run dev / yarn dev
   ```

## Usage
- Visit `http://localhost:3000/` to view the app.
- Navigate to `http://localhost:3000/edit/[id]` to edit a specific promise.
- Use the form to update promise details and track changes.

## API Endpoints
- **GET_PROMISE**: Fetch a specific promise by ID.
- **GET_PROMISES**: Retrieve all promises.
- **UPDATE_PROMISE**: Modify a promise’s details.

## Contributing
Contributions are welcome! Please open an issue or submit a pull request.

## License
This project is licensed under the MIT License, the most basic lic.
