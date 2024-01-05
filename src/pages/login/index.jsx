import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Validation from "../../components/validasi";
import axios from "axios";

export const Login = () => {
  const navigate = useNavigate();

  const [errors, setErrors] = useState({});
  const [inputData, setInputData] = useState({
    username: "",
    password: "",
  });

  const loginHandle = async (e) => {
    e.preventDefault();

    const requestData = {
      username: inputData.username,
      password: inputData.password,
    };

    console.log(requestData);

    try {
      const response = await axios.post(
        process.env.REACT_APP_URL_BE + `/login`,
        requestData,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      console.log(response.data, "Register data success");
      alert("Berhasil Register");
      localStorage.setItem("token", response.data.access_token);
      navigate("/");
    } catch (error) {
      console.error(error, "post data fail");
      alert("gagal, email atau password salah ");
    }
  };

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setInputData({ ...inputData, [name]: value });
    setErrors(Validation(inputData));
  };

  return (
    <div className="container d-flex justify-content-center">
      <div className="col-lg-4 col-12 mt-5">
        <h2 className="text-center mb-3">Login</h2>

        {/* email */}
        <input
          className="form-control mb-3"
          type="email"
          placeholder="Email"
          value={inputData.username}
          name="username"
          onChange={onChangeHandler}
          required
        />
        {errors.email && <span className="error">{errors.email}</span>}

        {/* password */}
        <input
          className="form-control mb-3"
          type="password"
          placeholder="Password"
          value={inputData.password}
          name="password"
          onChange={onChangeHandler}
          required
        />
        {errors.password && <span className="error">{errors.password}</span>}

        <button className="btn btn-danger col-12" onClick={loginHandle}>
          login
        </button>
      </div>
    </div>
  );
};
