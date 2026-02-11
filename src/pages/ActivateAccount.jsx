import { useRef, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import FormCard from "../components/FormCard";

export default function ActivateAccount() {
  const { activateAccount } = useAuth();
  const { uid, token } = useParams();
  const [message, setMessage] = useState("Activating your account...");
  const [success, setSuccess] = useState(false);
  const calledRef = useRef(false);

  useEffect(() => {
    // Handle multiple activation calls
    if (calledRef.current) return; // already called
    calledRef.current = true; // mark as called

    activateAccount({ uid, token })
      .then(() => {
        setMessage("Your account has been activated!");
        setSuccess(true);
      })
      .catch((err) => {
        setMessage(err.detail);
        setSuccess(false);
      });
  }, [uid, token, activateAccount]);

  return (
    <FormCard title="Activate Account" subtitle={message}>
      {success && (
        <Link to="/login" className="btn btn-primary w-100">
          Go to Login
        </Link>
      )}
    </FormCard>
  );
}
