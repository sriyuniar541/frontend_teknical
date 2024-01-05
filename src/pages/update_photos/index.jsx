import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const Update_photo = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState([]);
  const [errors, setErrors] = useState({});

  const registerHandling = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append(`file`, file);

    console.log(formData);

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_URL_BE}/user/photo/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(response.data, "Photo success");
      alert("Berhasil upload Photo");
      navigate("/user/login");

    } catch (error) {
      console.error(error, "post data fail");
      alert("Gagal, Photo wajib diisi ");
    }
  };

  const handlePhoto = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    console.log(selectedFile);
  };

  return (
    <div className="container d-flex justify-content-center">
      <div className="col-lg-4 col-12 mt-5">
        {/* photo */}
        <input
          className="form-control mb-3"
          type="file"
          placeholder="Photo"
          name="file"
          onChange={handlePhoto}
          required
        />

        <button className="btn btn-danger" onClick={registerHandling}>
          Upload Photo
        </button>
      </div>
    </div>
  );
};
