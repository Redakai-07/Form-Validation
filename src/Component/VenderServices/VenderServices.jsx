import React from "react";
import { Steps } from "antd";
import "./VenderServices.css";
import { useSelector } from "react-redux";

const VenderServices = () => {
  const formValues = useSelector((state) => state.form.formValues);

  return (
    <div className="vsContainer">
      <div>
        <h1 className="heading">Vender Services</h1>
        <Steps
          className="vdStep"
          progressDot
          current={2}
          items={[
            { title: "Vendor Details" },
            { title: "Bank Details" },
            { title: "Vender Services" },
          ]}
        />
      </div>
      <div>
        <div className="vsForm">
          <h1>Local Storage Values:</h1>
          <br />
          <h3>Bank Name: {formValues.bankName || "No Bank Name Available"}</h3>
          <h3>
            Branch Name: {formValues.branchName || "No Branch Name Available"}
          </h3>

          <h3>
            Branch Code: {formValues.branchCode || "No Branch Code Available"}
          </h3>

          <h3>
            Account Number:{" "}
            {formValues.accountNumber || "No Account Number Available"}
          </h3>
        </div>
      </div>
    </div>
  );
};

export default VenderServices;
