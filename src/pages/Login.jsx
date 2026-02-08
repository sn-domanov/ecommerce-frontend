import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import FormCard from "../components/FormCard";
import FormInput from "../components/FormInput";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm();

  async function onSubmit({ email, password }) {
    try {
      // Perform login (sets HttpOnly cookies)
      await login(email, password);
      navigate("/");
    } catch {
      setError("root", { message: "Invalid email or password" });
    }
  }

  return (
    <FormCard title="Sign in" subtitle="Sign into your account">
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormInput
          type="email"
          placeholder="Email"
          autoComplete="email"
          register={register("email", {
            required: "Email is required",
          })}
          error={errors.email}
        />

        <FormInput
          type="password"
          placeholder="Password"
          autoComplete="current-password"
          register={register("password", {
            required: "Password is required",
            minLength: { value: 6, message: "Minimum 6 characters" },
          })}
          error={errors.password}
        />

        {errors.root && (
          <div className="alert alert-danger py-2">{errors.root.message}</div>
        )}

        <button
          className="btn btn-primary w-100"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Logging in..." : "Login"}
        </button>
      </form>

      <div className="mt-3 text-center">
        <p className="mb-1">
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </p>
        <p className="mb-0">
          <Link to="/reset-password">Forgot your password?</Link>
        </p>
      </div>
    </FormCard>
  );
}
