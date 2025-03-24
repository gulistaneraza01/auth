import { useAuth } from "../context/AuthProvider";

function ResetPassword() {
  const data = useAuth();
  return <div>ResetPassword</div>;
}

export default ResetPassword;
