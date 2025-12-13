"use client";
import { useState } from "react";
import { FaBitcoin } from "react-icons/fa6";
import { useAuth } from "@/context/authContext";
import Link from "next/link";
function Login() {
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    if (!formData.email || !formData.password) {
      setError("Please fill required fields");
      return;
    }
    try {
      const res = await login(formData);
      setSuccess("Login successfull");
      setLoading(false);
      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 1000);
      console.log(res);
    } catch (err) {
      setError("Failed to login" || err);
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
              {" "}
              <FaBitcoin />
            </span>
            <span>Login To Your Account</span>
          </h3>
          <p className=" flex justify-center items-center mb-[10px] text-[#E5E7EB] font-outfit text-sm">
            No account yet?{" "}
            <Link
              href="/signup"
              className="text-[#1E90FF] text-xs ml-[2px] italic "
            >
              Click here
            </Link>
          </p>
          <form
            className="w-[100%] lg:w-[55%] mx-auto py-[30px] flex flex-col bg-[#121826] p-[10px] gap-3 border border-[#1F2937] border-3"
            onSubmit={handleSubmit}
          >
            <label
              htmlFor="email"
              className="font-nunito-sans text-[#9CA3AF] text-base font-semibold"
            >
              Email:
            </label>
            <input
              className="bg-[#0B0F1A] p-[10px] rounded rounded-1xl placeholder:text-[#E5E7EB] text-xs font-outfit italic focus:outline-none text-[#9CA3AF]"
              type="email"
              value={formData.email}
              placeholder="Enter email"
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
            <label
              className="font-nunito-sans text-[#9CA3AF] text-base font-semibold"
              htmlFor="password"
            >
              Pasword:
            </label>
            <input
              className="bg-[#0B0F1A] p-[10px] rounded rounded-1xl placeholder:text-[#E5E7EB] text-xs font-outfit italic focus:outline-none text-[#9CA3AF]"
              type="password"
              value={formData.password}
              placeholder="Enter Password"
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
            <Link
              href="/forgot-password"
              className="font-nunito-sans text-[#9CA3AF] text-sm italic hover:text-gray-300"
            >
              Forgot Password?
            </Link>
            <button
              className="w-[50%] mx-auto max-w-[150px] rounded rounded-1xl p-[8px] text-[#E5E7EB] font-outfit text-sm bg-[#00D395] hover:bg-green-700 hover:scale-[1.05] cursor-pointer"
              type="submit"
            >
              {loading ? "Loging in..." : "Login"}
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

export default Login;
