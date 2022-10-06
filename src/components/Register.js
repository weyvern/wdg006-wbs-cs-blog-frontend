import { useState } from "react";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import { registerUser } from "../utils/authUtils";

const Register = ({ isAuthenticated, setToken, setIsAuthenticated }) => {
  const [{ firstName, lastName, email, password }, setFormState] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: ""
  });

  const handleChange = (e) =>
    setFormState((prev) => ({ ...prev, [e.target.id]: e.target.value }));

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      if (!firstName || !lastName || !email || !password)
        return alert("Please fill out all the fields");
      const { data, error } = await registerUser({
        firstName,
        lastName,
        email,
        password
      });
      if (error) {
        throw new Error(error.response?.data.error || error.message);
      }
      localStorage.setItem("token", data.token);
      setToken(data.token);
      setIsAuthenticated(true);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return isAuthenticated ? (
    <Navigate to="/secret" />
  ) : (
    <div className="row justify-content-center">
      <div className="col-md-4">
        <form className="form-signin" onSubmit={handleSubmit}>
          <label htmlFor="inputEmail" className="sr-only">
            First name
          </label>
          <input
            id="firstName"
            className="form-control"
            placeholder="First Name"
            value={firstName}
            onChange={handleChange}
          />
          <label htmlFor="inputEmail" className="sr-only">
            Last name
          </label>
          <input
            id="lastName"
            className="form-control"
            placeholder="Last name"
            value={lastName}
            onChange={handleChange}
          />
          <label htmlFor="inputEmail" className="sr-only">
            Email address
          </label>
          <input
            type="email"
            id="email"
            className="form-control"
            placeholder="Email address"
            value={email}
            onChange={handleChange}
          />
          <label htmlFor="inputPassword" className="sr-only">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="form-control"
            placeholder="Password"
            value={password}
            onChange={handleChange}
          />
          <button
            className="btn btn-lg btn-primary btn-block mt-3"
            type="submit"
          >
            Sign up
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
