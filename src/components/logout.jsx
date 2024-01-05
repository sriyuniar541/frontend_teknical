import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LogoutButton = () => {
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("token");

      await axios.post(
        `${process.env.REACT_APP_URL_BE}/user/logout/all`,
        {},
        {
          headers: {
            Authorization: `bearer ${token}`,
          },
        }
      );

      localStorage.removeItem("token");
      navigate("/user/login");
    } catch (error) {
      console.error("Failed to logout:", error);
    }
  };

  return <button className="btn btn-white border-danger text-danger" onClick={handleLogout}>Logout</button>;
};

export default LogoutButton;
