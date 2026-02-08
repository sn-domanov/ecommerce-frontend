export default function FormInput({
  label,
  type,
  placeholder,
  autoComplete,
  register,
  error,
}) {
  return (
    <div className="mb-3">
      {label && <label className="form-label">{label}</label>}
      <input
        className={`form-control ${error ? "is-invalid" : ""}`}
        type={type}
        placeholder={placeholder}
        autoComplete={autoComplete}
        {...register}
      />
      {error && <div className="text-danger small mt-1">{error.message}</div>}
    </div>
  );
}
