"use client";
import { useState } from "react";
import { useAuth } from "@/context/authContext";
import { FaBitcoin } from "react-icons/fa6";

function VerifyOtp() {
  const { verifyOtp } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);

  const handleChange = (value, index) => {
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const otpValue = otp.join("");
    if (otpValue.length !== 6) {
      setError("Please enter the complete OTP");
      return;
    }
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      await verifyOtp(otpValue);
      setSuccess("Account verified");
      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 1000);
    } catch (err) {
      setError(err.message || "Verification Failed");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="container mx-auto bg-background h-[100vh] pb-[20px] w-full">
      <div className="w-[90%] mx-auto h-auto flex flex-col gap-2">
        <div className="w-[20%] p-[10px] mt-[10px]">
          <h1 className="font-orbitron text-3xl bold text-text-secondary">
            Coinhub
          </h1>
        </div>

        <div className="flex flex-col justify-center h-auto">
          <h3 className="lg:w-[50%] mx-auto flex items-center justify-center gap-3 text-center lg:max-w-[500p] font-outfit text-text-secondary  text-base lg:text-2xl font-bold p-[10px]">
            <span className="text-4xl">
              <FaBitcoin />
            </span>
            <span>Verify Your Account</span>
          </h3>

          <form
            className="w-[100%] lg:w-[55%] mx-auto py-[30px] flex flex-col bg-[#121826] p-[10px] gap-3 border border-[#1F2937] border-3"
            onSubmit={handleSubmit}
          >
            <h5 className="text-center text-2xl font-nunito-sans text-[#9CA3AF]">
              Enter your Otp
            </h5>
            <div className="flex justify-center gap-5">
              {otp.map((digital, index) => (
                <input
                  className="bg-[#9CA3AF] text-center w-[40px] p-[10px] text-[#E5E7EB] text-1xl font-bold focus:outline-none rounded rounded-1xl "
                  key={index}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digital}
                  onChange={(e) => handleChange(e.target.value, index)}
                />
              ))}
            </div>

            <button className="w-[50%] mx-auto max-w-[100px] rounded rounded-1xl p-[8px] text-[#E5E7EB] font-outfit text-sm bg-[#00D395]">
              {loading ? "Verifying..." : "Verify"}
            </button>
            {error && (
              <p className="text-[#F87171] text-xs font-outfit">{error}</p>
            )}
            {success && (
              <p className="text-[#22C55E] text-xs font-outfit">{success}</p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
export default VerifyOtp;
