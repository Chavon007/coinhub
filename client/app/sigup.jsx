import Link from "react";
import Image from "next/image";

function Signup() {
  return (
    <div>
      <div>
        <div>
          <h1></h1>
        </div>

        <div>
          <h3>Create an account to get Started</h3>
          <form>
            <label htmlFor="firstname">First Name:</label>
            <input
              type="text"
              value={FormData.firstName}
              placeholder="Enter first name"
              onChange={() => setFormData(e.target.value)}
            />
            <label htmlFor="lastname">Last Name:</label>
            <input
              type="text"
              value={FormData.lastName}
              placeholder="Enter last name"
              onChange={() => setFormData(e.target.value)}
            />
            <label htmlFor="email">First Name:</label>
            <input
              type="email"
              value={FormData.email}
              placeholder="Enter email"
              onChange={() => setFormData(e.target.value)}
            />
            <label htmlFor="password">Pasword:</label>
            <input
              type="password"
              value={FormData.password}
              placeholder="Enter Password"
              onChange={() => setFormData(e.target.value)}
            />
            <label htmlFor="password">Confirm Pasword:</label>
            <input
              type="password"
              value={FormData.password}
              placeholder="Confirm Password"
              onChange={() => setFormData(e.target.value)}
            />
            <label htmlFor="city">City:</label>
            <input
              type="text"
              value={FormData.city}
              placeholder="Enter your city"
              onChange={() => setFormData(e.target.value)}
            />
            <label htmlFor="country">Country:</label>
            <input
              type="text"
              value={FormData.country}
              placeholder="Enter your country"
              onChange={() => setFormData(e.target.value)}
            />
            <label htmlFor="YOB">Year of Birth:</label>
            <input
              type="number"
              value={FormData.YOB}
              placeholder="Enter year of birth"
              onChange={() => setFormData(e.target.value)}
            />
            <label htmlFor="NIN">Your NIN:</label>
            <input
              type="number"
              value={FormData.nin}
              placeholder="Enter your NIN"
              onChange={() => setFormData(e.target.value)}
            />
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;
