# Ecommerce frontend

Frontend for the headless e-commerce backend (Django REST Framework) built with React.

This is a pet project under active development.

## Tech stack
- React
- JavaScript (ES6+)
- Vite
- React Router v6+
- Axios
- React Hook Form
- Bootstrap 5
- JWT authentication (HttpOnly cookies)
- Django REST Framework backend

## Requirements

- Node.js 20+
- npm 10+
- The [headless-ecommerce-api](https://github.com/sn-domanov/headless-ecommerce-api) backend running locally or remotely

## Environment variables

Copy `.env.template` to `.env`:

```sh
cp .env.template .env
```

Update the backend API URL if necessary:
`VITE_API_BASE_URL=http://localhost:8000/api`

## Running locally

```sh
npm install
npm run dev
```

The frontend will be available at:
http://localhost:5173/


## Authentication

The frontend uses cookie-based JWT authentication.

- Access and refresh tokens are stored in HttpOnly cookies, preventing JavaScript access and reducing XSS risk
- Refresh tokens are rotated and blacklisted on each access token refresh
- Refresh tokens are blacklisted and auth cookies are deleted on logout (available via the button in the navbar)
- CSRF protection is handled by the backend

Signed up users are inactive by default, and cannot authenticate without activating their accounts (HTTP 401 Unauthorized is raised).

### Frontend routes

| Page / Action                  | Route                                  | Purpose                                        |
| ------------------------------ | -------------------------------------- | ---------------------------------------------- |
| Home                           | `/`                                    | Home page                                      |
| Sign up                        | `/signup`                              | Create a new user                              |
| Check email / resend link      | `/check-email`                         | Inform user to check email, resend activation  |
| Activate account               | `/activate/:uid/:token`                | Activate a user account via link               |
| Login                          | `/login`                               | Authenticate user and set auth cookies         |
| Reset password request         | `/reset-password`                      | Request a password reset email                 |
| Reset password confirmation    | `/reset-password/confirm/:uid/:token`  | Set a new password via link                    |
