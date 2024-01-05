import React, { useEffect, useState } from "react";
import axios from "axios";
import LogoutButton from "../../components/logout";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ExportToExcel from "../../components/excel";

export const Home = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  useEffect(() => {
    fetchData();
  }, [startDate, endDate]);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        `${process.env.REACT_APP_URL_BE}/analytic/click`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            start_date: startDate.toISOString().split("T")[0],
            end_date: endDate.toISOString().split("T")[0],
          },
        }
      );

      setData(response.data);
      setLoading(false);
      
    } catch (error) {
      console.error("Failed to fetch data:", error);
      setData([]);
      setLoading(false);
      
    }
  };

  return (
    <div className="container">
      <div className="d-lg-flex justify-content-between my-3 ">
        <div>
          <LogoutButton />
        </div>

        <div>
          <label>Start Date: </label>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            className="form-control"
          />
        </div>

        <div>
          <label>End Date: </label>
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            className="form-control "
          />
        </div>
        <button
          className="ms-lg-3 btn btn-white border-primary"
          onClick={fetchData}
        >
          Fetch Data
        </button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : data.length ? (
        <table
          className="table table-bordered table-hover text-center"
          id="table-to-export"
        >
          <thead>
            <tr className="table-secondary">
              <th scope="col">#</th>
              <th scope="col">Scope</th>
              <th scope="col">Count</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td scope="row">{index + 1}</td>
                <td>{item.scope}</td>
                <td>{item.count}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Data tidak ada, silahkan login lagi</p>
      )}

      <ExportToExcel />
    </div>
  );
};
