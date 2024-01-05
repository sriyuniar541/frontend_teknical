import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Validation from "../../components/validasi";
// import SweetAlert from "../../components/sweetAlert"
import axios from "axios";

export const Register = () => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [inputData, setInputData] = useState({
    email: "",
    password: "",
    name: "",
    phone: "",
    age: '',
  });

  const [photos, setPhotos] = useState([]);

  const registerHandling = async (e) => {
    e.preventDefault();

    const requestData = {
      email: inputData.email,
      password: inputData.password,
      name: inputData.name,
      phone: inputData.phone,
      age: inputData.age,
      photos: photos.map((photo) => photo.name),
    };

    console.log(requestData);

    try {
      const response = await axios.post(
        process.env.REACT_APP_URL_BE + `/user`,
        requestData
      );
     
      alert("Berhasil Register");

      navigate("/user/photo/upload");
      
    } catch (error) {
      
        console.log(error.response)
        alert("Silahkan periksa kembali inputan");
    
    }
  };

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setInputData({ ...inputData, [name]: value });
    setErrors(Validation(inputData));
  };

  const handlePhoto = (e) => {
    const files = Array.from(e.target.files);
    setPhotos([...photos, ...files]);
    console.log(photos);
  };

  return (
    <div className="container d-flex justify-content-center">
      <div className="col-lg-4 col-12 mt-5">
        <h2 className="text-center mb-3">Register</h2>
           {/* email */}
      <input
        className="form-control mb-2"
        type="email"
        placeholder="Email"
        value={inputData.email}
        name="email"
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

      {/* name */}
      <input
        className="form-control mb-3"
        type="text"
        placeholder="name"
        value={inputData.name}
        name="name"
        onChange={onChangeHandler}
        required
      />
       {errors.name && <span className="error">{errors.name}</span>}

      {/* phone */}
      <input
        className="form-control mb-3"
        type="text"
        placeholder="No Hp"
        value={inputData.phone}
        name="phone"
        onChange={onChangeHandler}
        required
      />
       {errors.phone && <span className="error">{errors.phone}</span>}

      {/* age */}
      <input
        className="form-control mb-3"
        type="number"
        placeholder="Age"
        value={inputData.age}
        name="age"
        onChange={onChangeHandler}
        required
      />
       {errors.age && <span className="error">{errors.age}</span>}
    
      {/* photos */}
      <input
        className="form-control mb-3"
        type="file"
        placeholder="Photo"
        name="photos"
        onChange={handlePhoto}
        multiple 
        required
      />
       {errors.photos && <span className="error">{errors.photos}</span>}

      <button className="btn btn-danger col-12" onClick={registerHandling}>
        Register
      </button>

    
      </div>
     
    </div>
  );
};
