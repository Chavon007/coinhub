import { useState, useEffect } from "react";
function Fetch() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [formData, setFormData] = useState("");

  //signup
  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const res = await fetch("", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      if (!res) {
        setError("Failed to sign up");
        setLoading(false);
        return;
      }
      const data = await res.json();
      setSuccess("Account created successfully");
      setFormData("");
      setTimeout(() => {
        window.location.href = "/login";
      });
      console.log(data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
}
export default Fetch;
