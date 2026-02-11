import { useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useAuth } from "../context/useAuth";
import FormCard from "../components/FormCard";
import FormInput from "../components/FormInput";

export default function CheckEmail() {
  const { resendActivation } = useAuth();
  const location = useLocation();
  const emailFromState = location.state?.email || "";

  const [successMessage, setSuccessMessage] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    clearErrors,
  } = useForm({
    defaultValues: {
      email: emailFromState,
    },
  });

  async function onSubmit(data) {
    try {
      setSuccessMessage(null);
      clearErrors();

      await resendActivation(data.email);

      setSuccessMessage("Activation email sent again.");
    } catch (err) {
      setError("root", { message: err.detail });
    }
  }

  return (
    <FormCard
      title="Check your email"
      subtitle="We sent you an activation link."
    >
      <p className="text-muted mb-4">
        If you didn't receive it, you can request another one below.
      </p>

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
          {isSubmitting ? "Submitting..." : "Resend activation link"}
        </button>
      </form>
    </FormCard>
  );
}
