import { useParams } from "react-router-dom";
import { useForm, useWatch } from "react-hook-form";
import { useState } from "react";
import { useAuth } from "../context/useAuth";
import FormCard from "../components/FormCard";
import FormInput from "../components/FormInput";

export default function ResetPasswordConfirm() {
  const { uid, token } = useParams();

  const { resetPasswordConfirm } = useAuth();
  const [successMessage, setSuccessMessage] = useState(null);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    setError,
    clearErrors,
  } = useForm();

  const password = useWatch({
    control,
    name: "password",
  });

  async function onSubmit({ password }) {
    try {
      setSuccessMessage(null);
      clearErrors();

      await resetPasswordConfirm({
        uid,
        token,
        newPassword: password,
      });

      setSuccessMessage("Password reset successful. You can now log in.");
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
            onChange: () => {
              setSuccessMessage(null);
              clearErrors();
            },
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
            onChange: () => {
              setSuccessMessage(null);
              clearErrors();
            },
          })}
          error={errors.passwordConfirm}
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
          {isSubmitting ? "Submitting ..." : "Reset password"}
        </button>
      </form>
    </FormCard>
  );
}
