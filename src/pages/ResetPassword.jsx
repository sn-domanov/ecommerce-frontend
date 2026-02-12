import { useForm } from "react-hook-form";
import { useAuth } from "../context/useAuth";
import { useState } from "react";
import FormCard from "../components/FormCard";
import FormInput from "../components/FormInput";

export default function ResetPassword() {
  const { resetPassword } = useAuth();

  const [successMessage, setSuccessMessage] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    clearErrors,
  } = useForm();

  async function onSubmit({ email }) {
    try {
      setSuccessMessage(null);
      clearErrors();

      await resetPassword(email);

      setSuccessMessage("Check your email for reset instructions");
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
    <FormCard
      title="Reset password"
      subtitle="Enter your email to reset password"
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormInput
          type="email"
          placeholder="Email"
          autoComplete="email"
          register={register("email", {
            required: "Email is required",
            onChange: () => {
              setSuccessMessage(null);
              clearErrors();
            },
          })}
          error={errors.email}
        />

        {successMessage && (
          <div className="alert alert-success py-2">{successMessage}</div>
        )}

        {errors.root && (
          <div className="alert alert-danger py-2">{errors.root.message}</div>
        )}

        <button
          className="btn btn-primary w-100"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting ..." : "Submit"}
        </button>
      </form>
    </FormCard>
  );
}
