import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useWatch } from "react-hook-form";
import { useAuth } from "../context/useAuth";
import FormCard from "../components/FormCard";
import FormInput from "../components/FormInput";

export default function ResetPasswordConfirm() {
  const { uid, token } = useParams();
  const navigate = useNavigate();
  const { resetPasswordConfirm } = useAuth();

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

  async function onSubmit({ password }) {
    try {
      await resetPasswordConfirm({
        uid,
        token,
        newPassword: password,
      });

      alert("Password reset successful. You can now log in.");
      navigate("/login");
    } catch (err) {
      if (err.detail) {
        // err.detail is mutually exclusive with field errors
        setError("root", { message: err.detail });
        return;
      }

      // Handle field-level errors
      Object.entries(err).forEach(([field, messages]) => {
        if (Array.isArray(messages)) {
          setError(field, { message: messages.join(" ") });
        }
      });
    }
  }

  return (
    <FormCard title="Set new password" subtitle="Enter your new password below">
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormInput
          type="password"
          placeholder="New password"
          autoComplete="new-password"
          register={register("password", {
            required: "Password is required",
            minLength: { value: 6, message: "Minimum 6 characters" },
          })}
          error={errors.password}
        />

        <FormInput
          type="password"
          placeholder="Confirm new password"
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
          {isSubmitting ? "Submitting ..." : "Reset password"}
        </button>
      </form>
    </FormCard>
  );
}
