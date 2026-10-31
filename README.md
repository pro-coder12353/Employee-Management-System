# Employee Management System

A full-stack Employee Management System built with React, Node.js, Express, and PostgreSQL. It supports JWT authentication, role-based access (Admin/Employee), full CRUD for employees and departments, search, sorting, pagination, profile picture uploads, and a statistics dashboard.

## Tech Stack

**Frontend:** React, Redux Toolkit, React Router, Axios
**Backend:** Node.js, Express.js
**Database:** PostgreSQL

## Features

- User authentication (login/signup) using JWT
- Employee CRUD (create, view, update, delete)
- Department CRUD
- Search employees by name
- Sorting and pagination
- Employee profile picture upload (admin only)
- Role-based access control (Admin & Employee)
- Dashboard showing statistics (total employees, departments, active employees)
- Protected routes, loading indicators, error messages, and form validation


## Architecture

**Backend** follows a layered structure:
- `routes/` — Express route definitions
- `controllers/` — request/response handling
- `services/` — business logic
- `repositories/` — database queries
- `middleware/` — authentication, admin checks, file upload
- `db/` — PostgreSQL connection pool

**Frontend** uses Redux Toolkit for state management (auth, employees, departments, dashboard slices), React Router for navigation with protected routes, and Axios for API calls.

## Database Schema

- **departments** — dept_id, dept_name
- **employees** — emp_id, emp_name, dept_id (FK), phone_number, email_id, salary, hire_date, location, is_active, profile_picture
- **users** — user_id, email, password (hashed), role

Foreign key constraint prevents deleting a department that has employees.


## Setup & Installation

### Prerequisites
- Node.js (v18+)
- PostgreSQL

### Backend
1. Navigate to the project root
2. Install dependencies: `npm install`
3. Create a `.env` file with:

```
    DB_USER=your_db_user
    DB_HOST=localhost
    DB_NAME=employee_management
    DB_PASSWORD=your_password
    DB_PORT=5432
    JWT_SECRET=your_secret
```

4. Create the database, then run the schema script: `psql -d employee_management -f schema.sql`
5. Start the server: `npm run dev` (runs on port 4000)

### Frontend
1. Navigate to the `client/` folder
2. Install dependencies: `npm install`
3. Start the dev server: `npm run dev` (runs on port 5173)



## Test Login

An admin account for testing:
- Email: test@company.com
- Password: test123

New signups are created with the "employee" role by default.

## Creating an Admin

New signups default to the "employee" role. To make a user an admin, update their role in the database:

​```sql
UPDATE users SET role = 'admin' WHERE email = 'your@email.com';
​```

A pre-seeded admin account is available for testing (see Test Login above).

## Notes

- Profile picture upload is admin-only; pictures display in the employee table and open full-size in a new tab when clicked.
- New users sign up as "employee" role; admin role is assigned directly in the database.
- Uploaded images are stored locally in the `uploads/` folder (not committed to the repository).
