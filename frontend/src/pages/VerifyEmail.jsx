import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";

function VerifyEmail() {
  const { auth, verifyEmailOtp } = useAuth();
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    const data = verifyEmailOtp(otp);
    console.log(data);
    if (data.success) {
      navigate("/");
      return;
    }
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleSubmit}>
        <div>
          <input
            className="no-spinners p-2 w-full outline-none text-gray-500 border-2 border-black rounded"
            type="number"
            name="otp"
            id="otp"
            placeholder="OTP"
            autoComplete="off"
            required
            onChange={(e) => {
              setOtp(e.target.value);
            }}
            value={otp}
          />
        </div>
        <div>
          <input
            type="submit"
            value="submit"
            className="border border-slate-500 rounded-sm w-full mt-3 p-1.5 cursor-pointer bg-gray-800 text-slate-100"
          />
        </div>
      </form>
    </div>
  );
}

export default VerifyEmail;
