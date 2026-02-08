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
- Refresh tokens are blacklisted and auth cookies are deleted on logout
- CSRF protection is handled by the backend

### Authentication endpoints

| Action                       | Endpoint                              | Purpose                                        |
| ---------------------------- | ------------------------------------- | -----------------------------------------------|
| Sign up                      | `/auth/users/`                        | Create a new user                              |
| Login                        | `/auth/jwt/create/`                   | Set `access_token` and `refresh_token` cookies |
| Logout                       | `/auth/jwt/logout/`                   | Clear auth cookies, blacklist refresh token    |
| Fetch current user           | `/auth/users/me/`                     | Retrieve the currently authenticated user      |
| Request password reset email | `/auth/users/reset_password/`         | Send a password reset email                    |
| Confirm password reset       | `/auth/users/reset_password_confirm/` | Set a new password                             |

Users are active by default (no email activation)
