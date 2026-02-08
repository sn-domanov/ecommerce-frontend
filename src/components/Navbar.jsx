import { Link } from "react-router-dom";
import { useAuth } from "../context/useAuth";

function GuestLinks() {
  return (
    <>
      <li className="nav-item">
        <Link className="nav-link" to="/login">
          Login
        </Link>
      </li>
      <li className="nav-item d-none d-lg-flex align-items-center">
        <span className="px-2 text-muted">|</span>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/signup">
          Sign Up
        </Link>
      </li>
    </>
  );
}

function AuthLinks() {
  const { logout } = useAuth();

  return (
    <li className="nav-item">
      <button
        className="nav-link btn btn-link p-0"
        style={{ cursor: "pointer" }}
        onClick={logout}
      >
        Logout
      </button>
    </li>
  );
}

function Navbar() {
  const { user, loading } = useAuth();

  if (loading) return null; // or a skeleton

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary sticky-top">
      <div className="container">
        {/* Logo */}
        <Link className="navbar-brand" to="/">
          Ecommerce
        </Link>
        {/* Navbar toggler */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          {/* Nav start */}
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              {/* <Link className="nav-link" aria-current="page" to="/">
                Home
              </Link> */}
            </li>
          </ul>
          {/* Nav end */}
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            {user ? <AuthLinks /> : <GuestLinks />}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
