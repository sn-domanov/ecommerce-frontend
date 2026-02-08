import { useForm } from "react-hook-form";
import { useAuth } from "../context/useAuth";
import FormCard from "../components/FormCard";
import FormInput from "../components/FormInput";

export default function ResetPassword() {
  const { resetPassword } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm();

  async function onSubmit({ email }) {
    try {
      await resetPassword(email);
      alert("Check your email for reset instructions");
    } catch {
      setError("root", { message: "Failed to send reset email" });
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
          register={register("email", { required: "Email is required" })}
          error={errors.email}
        />

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
