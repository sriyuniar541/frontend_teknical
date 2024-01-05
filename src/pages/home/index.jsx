import React, { useEffect, useState } from "react";
import axios from "axios";
import LogoutButton from "../../components/logout";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ExportToExcel from "../../components/excel";


export const Home = () => {
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  useEffect(() => {
    fetchData();
  }, [startDate, endDate]);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");

      let apiUrl = `${process.env.REACT_APP_URL_BE}/analytic/click`;

      // Check if startDate and endDate are provided
      if (startDate && endDate) {
        apiUrl += `?start_date=${
          startDate.toISOString().split("T")[0]
        }&end_date=${endDate.toISOString().split("T")[0]}`;
      }

      const response = await axios.get(apiUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setTableData(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch data:", error);
      setTableData([]);
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="d-lg-flex justify-content-between my-3">
        <LogoutButton />
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
            className="form-control"
          />
        </div>
        <button onClick={fetchData} className="btn btn-white border-primary">
          Fetch Data
        </button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : tableData.length ? (
        <table className="table table-bordered text-center " id="table-to-export">
          <thead>
            <tr className="table-light">
              <th scope="col">#</th>
              <th scope="col">Scope</th>
              <th scope="col">Count</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((item, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
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
