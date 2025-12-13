"use client";
import { FaBitcoin } from "react-icons/fa6";
import { useState } from "react";
import { useAuth } from "@/context/authContext";
import Link from "next/link";

function Signup() {
  const { signup } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    city: "",
    country: "",
    YOB: 0,
    nin: 0,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    if (
      !formData.YOB ||
      !formData.city ||
      !formData.confirmPassword ||
      !formData.country ||
      !formData.email ||
      !formData.firstName ||
      !formData.lastName ||
      !formData.nin ||
      !formData.password
    ) {
      setError("Please all required fields");
      return;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError("Use a proper email address");
      return;
    } else if (
      !/^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{8,})/.test(formData.password)
    ) {
      setError(
        "Password must be at least 8 characters long, contain one uppercase letter, and one special symbol"
      );
      return;
    } else if (formData.password !== formData.confirmPassword) {
      setError("Password and confirm password does not match");
      return;
    }
    try {
      const res = await signup(formData);
      setSuccess("Account created successfully");
      setLoading(false);
      setTimeout(() => {
        window.location.href = "/signup-otp";
      }, 1000);
      console.log(res);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(true);
    }
  };
  return (
    <div className="container mx-auto bg-background h-auto md:h-[100vh] lg:h-auto pb-[20px] w-full">
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
            <span>Create an account to get started</span>
          </h3>
          <p className=" flex justify-center items-center mb-[10px] text-[#E5E7EB] font-outfit text-sm">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-[#1E90FF] text-xs ml-[2px] italic "
            >
              Click here
            </Link>
          </p>
          <form
            className="w-[100%] lg:w-[60%] mx-auto py-[30px] flex flex-col bg-[#121826] p-[10px] gap-3 border border-[#1F2937] border-3"
            onSubmit={handleSubmit}
          >
            <label
              htmlFor="firstname"
              className="font-nunito-sans text-[#9CA3AF] text-base font-semibold"
            >
              First Name:
            </label>
            <input
              className="bg-[#0B0F1A] p-[10px] rounded rounded-1xl placeholder:text-[#E5E7EB] text-xs font-outfit italic focus:outline-none text-[#9CA3AF]"
              type="text"
              value={formData.firstName}
              placeholder="Enter first name"
              onChange={(e) =>
                setFormData({ ...formData, firstName: e.target.value })
              }
            />
            <label
              htmlFor="lastname"
              className="font-nunito-sans text-[#9CA3AF] text-base font-semibold"
            >
              Last Name:
            </label>
            <input
              className="bg-[#0B0F1A] p-[10px] rounded rounded-1xl placeholder:text-[#E5E7EB] text-xs font-outfit italic focus:outline-none text-[#9CA3AF]"
              type="text"
              value={formData.lastName}
              placeholder="Enter last name"
              onChange={(e) =>
                setFormData({ ...formData, lastName: e.target.value })
              }
            />
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
            <label
              className="font-nunito-sans text-[#9CA3AF] text-base font-semibold"
              htmlFor="password"
            >
              Confirm Pasword:
            </label>
            <input
              className="bg-[#0B0F1A] p-[10px] rounded rounded-1xl placeholder:text-[#E5E7EB] text-xs font-outfit italic focus:outline-none text-[#9CA3AF]"
              type="password"
              value={formData.confirmPassword}
              placeholder="Confirm Password"
              onChange={(e) =>
                setFormData({ ...formData, confirmPassword: e.target.value })
              }
            />
            <label
              className="font-nunito-sans text-[#9CA3AF] text-base font-semibold"
              htmlFor="city"
            >
              City:
            </label>
            <input
              className="bg-[#0B0F1A] p-[10px] rounded rounded-1xl placeholder:text-[#E5E7EB] text-xs font-outfit italic focus:outline-none text-[#9CA3AF]"
              type="text"
              value={formData.city}
              placeholder="Enter your city"
              onChange={(e) =>
                setFormData({ ...formData, city: e.target.value })
              }
            />
            <label
              className="font-nunito-sans text-[#9CA3AF] text-base font-semibold"
              htmlFor="country"
            >
              Country:
            </label>
            <input
              className="bg-[#0B0F1A] p-[10px] rounded rounded-1xl placeholder:text-[#E5E7EB] text-xs font-outfit italic focus:outline-none text-[#9CA3AF]"
              type="text"
              value={formData.country}
              placeholder="Enter your country"
              onChange={(e) =>
                setFormData({ ...formData, country: e.target.value })
              }
            />
            <label
              className="font-nunito-sans text-[#9CA3AF] text-base font-semibold"
              htmlFor="YOB"
            >
              Year of Birth:
            </label>
            <input
              className="bg-[#0B0F1A] p-[10px] rounded rounded-1xl placeholder:text-[#E5E7EB] text-xs font-outfit italic focus:outline-none text-[#9CA3AF]"
              type="number"
              value={formData.YOB}
              placeholder="Enter year of birth"
              onChange={(e) =>
                setFormData({ ...formData, YOB: e.target.value })
              }
            />
            <label
              className="font-nunito-sans text-[#9CA3AF] text-base font-semibold"
              htmlFor="NIN"
            >
              Your NIN:
            </label>
            <input
              className="bg-[#0B0F1A] p-[10px] rounded rounded-1xl placeholder:text-[#E5E7EB] text-xs font-outfit italic focus:outline-none text-[#9CA3AF]"
              type="number"
              value={formData.nin}
              placeholder="Enter your NIN"
              onChange={(e) =>
                setFormData({ ...formData, nin: e.target.value })
              }
            />

            <button
              className="w-[50%] mx-auto max-w-[200px] rounded rounded-1xl p-[8px] text-[#E5E7EB] font-outfit text-sm bg-[#00D395]"
              type="submit"
            >
              {loading ? "Creating account" : "Create Acoount"}
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

export default Signup;
