import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useWatch } from "react-hook-form";
import { useAuth } from "../context/useAuth";
import FormCard from "../components/FormCard";
import FormInput from "../components/FormInput";

export default function Signup() {
  const navigate = useNavigate();
  const { signup } = useAuth();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    setError,
  } = useForm();

  const password = useWatch({
    control,
    name: "password",
  });

  async function onSubmit({ email, password }) {
    try {
      await signup({ email, password });
      navigate("/check-email", { state: { email } });
    } catch (err) {
      // Map Djoser field errors to form inputs
      for (const key in err) {
        if (Array.isArray(err[key])) {
          setError(key, { message: err[key].join(" ") });
        } else if (err.detail) {
          setError("root", { message: err.detail });
        }
      }
    }
  }

  return (
    <FormCard title="Sign Up" subtitle="Create your account">
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormInput
          type="email"
          placeholder="Email"
          autoComplete="email"
          register={register("email", { required: "Email is required" })}
          error={errors.email}
        />

        <FormInput
          type="password"
          placeholder="Password"
          autoComplete="new-password"
          register={register("password", { required: "Password is required" })}
          error={errors.password}
        />

        <FormInput
          type="password"
          placeholder="Confirm password"
          autoComplete="new-password"
          register={register("passwordConfirm", {
            required: "Please confirm your password",
            validate: (value) => value === password || "Passwords do not match",
          })}
          error={errors.passwordConfirm}
        />

        {errors.root && (
          <div className="alert alert-danger py-2">{errors.root.message}</div>
        )}

        <button
          className="btn btn-primary w-100"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting ..." : "Sign Up"}
        </button>
      </form>
    </FormCard>
  );
}
