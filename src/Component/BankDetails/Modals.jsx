import { Modal } from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "./BankDetails.css";
import { labels } from "./Labels.jsx";
import "./Modal.css";

const Modals = () => {
  const formData = useSelector((state) => state.form.formData);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const navigate = useNavigate();

  const vals = Object.values(formData)
    .map((value) => {
      if (value && typeof value === "object") {
        return Object.values(value);
      }
      return value;
    })
    .flat();
  const getPopconfirmDescription = () => (
    <div className="pop-up">
      <div>
        <table className="table">
          <thead>
            <tr>
              {labels.map((label, index) =>
                vals[index] ? (
                  <th key={index} style={{ textAlign: "left" }}>
                    {label}
                  </th>
                ) : null
              )}
            </tr>
          </thead>
          <tbody>
            <tr>
              {vals.map((value, index) =>
                value ? <td key={index}>{value}</td> : null
              )}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
  const handleOk = () => {
    setConfirmLoading(true);
    setConfirmLoading(false);
    navigate("/vendor-service");
  };
  const handleCancel = () => {
    navigate("/bank-details");
  };

  return (
    <div>
      <Modal
        title="Confirm the Given Details"
        open="true"
        okButtonProps={{ loading: confirmLoading }}
        onConfirm={handleOk}
        onCancel={handleCancel}
        confirmLoading={confirmLoading}
        onOk={handleOk}
      >
        <p>{getPopconfirmDescription()}</p>
      </Modal>
    </div>
  );
};

export default Modals;

{
  /* <table className="table">
      {vals.map((value, index) => value ? ( <tr key={index}> <th style={{textAlign:"left"}}>{labels[index]}</th><td>{value}</td> </tr>) : null )}
      </table> */
}
