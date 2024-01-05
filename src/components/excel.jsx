import React from "react";
import * as XLSX from "xlsx";

const ExportToExcel = () => {
  const exportToExcel = () => {
    const ws = XLSX.utils.table_to_sheet(
      document.getElementById("table-to-export")
    ); 
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    XLSX.writeFile(wb, "excelFile.xlsx");
  };

  

  return (
    <button className="btn btn-info text-white " onClick={exportToExcel}>
      Export to Excel
    </button>
  );
};

export default ExportToExcel;
