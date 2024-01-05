import React from 'react';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';

const SweetAlert = ({ title, text, icon, onConfirm }) => {
  const showAlert = () => {
    Swal.fire({
      title,
      text,
      icon,
    }).then((result) => {
      if (result.isConfirmed) {
        if (onConfirm) {
          onConfirm();
        }
      }
    });
  };

  return (
    <div>
      {/* You can customize how you trigger the alert (e.g., a button) */}
      <button onClick={showAlert}>Show Alert</button>
    </div>
  );
};

export default SweetAlert;
