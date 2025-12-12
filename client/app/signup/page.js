"use client";
import { useState } from "react";
import { useAuth } from "@/context/authContext";

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
    } else if (!/^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{8,})/.test(formData.email)) {
      setError("Use a proper email address");
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
        window.location.href = "/signup";
      }, 1000);
      console.log(res);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(true);
    }
  };
  return (
    <div className="container mx-auto bg-background h-auto">
      <div>
        <div>
          <h1>Coinhub</h1>
        </div>

        <div>
          <h3>Create an account to get Started</h3>
          <form onSubmit={handleSubmit}>
            {error && <p>{error}</p>}
            {success && <p>{success}</p>}
            <label htmlFor="firstname">First Name:</label>
            <input
              type="text"
              value={formData.firstName}
              placeholder="Enter first name"
              onChange={(e) =>
                setFormData({ ...formData, firstName: e.target.value })
              }
            />
            <label htmlFor="lastname">Last Name:</label>
            <input
              type="text"
              value={formData.lastName}
              placeholder="Enter last name"
              onChange={(e) =>
                setFormData({ ...formData, lastName: e.target.value })
              }
            />
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              value={formData.email}
              placeholder="Enter email"
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
            <label htmlFor="password">Pasword:</label>
            <input
              type="password"
              value={formData.password}
              placeholder="Enter Password"
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
            <label htmlFor="password">Confirm Pasword:</label>
            <input
              type="password"
              value={formData.confirmPassword}
              placeholder="Confirm Password"
              onChange={(e) =>
                setFormData({ ...formData, confirmPassword: e.target.value })
              }
            />
            <label htmlFor="city">City:</label>
            <input
              type="text"
              value={formData.city}
              placeholder="Enter your city"
              onChange={(e) =>
                setFormData({ ...formData, city: e.target.value })
              }
            />
            <label htmlFor="country">Country:</label>
            <input
              type="text"
              value={formData.country}
              placeholder="Enter your country"
              onChange={(e) =>
                setFormData({ ...formData, country: e.target.value })
              }
            />
            <label htmlFor="YOB">Year of Birth:</label>
            <input
              type="number"
              value={formData.YOB}
              placeholder="Enter year of birth"
              onChange={(e) =>
                setFormData({ ...formData, YOB: e.target.value })
              }
            />
            <label htmlFor="NIN">Your NIN:</label>
            <input
              type="number"
              value={formData.nin}
              placeholder="Enter your NIN"
              onChange={(e) =>
                setFormData({ ...formData, nin: e.target.value })
              }
            />
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;
