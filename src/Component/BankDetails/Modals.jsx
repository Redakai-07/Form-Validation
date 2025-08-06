import { Modal, Divider, Row, Col, Typography, Card } from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "./BankDetails.css";
import { labels } from "./Labels.jsx";
import "./Modal.css";

const { Title, Text } = Typography;

const Modals = () => {
  const formData = useSelector((state) => state.form.formData);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const navigate = useNavigate();

  // Organize form data into logical sections
  const organizeFormData = () => {
    const vals = Object.values(formData)
      .map((value) => {
        if (value && typeof value === "object") {
          return Object.values(value);
        }
        return value;
      })
      .flat();

    const dataMap = {};
    labels.forEach((label, index) => {
      if (vals[index]) {
        dataMap[label] = vals[index];
      }
    });

    return {
      company: {
        "Company Name": dataMap["Company Name"],
        "Company Type": dataMap["Company Type"],
        "Company Category": dataMap["Company Category"]
      },
      contact: {
        "First Name": dataMap["First Name"],
        "Middle Name": dataMap["Middle Name"],
        "Last Name": dataMap["Last Name"],
        "Email": dataMap["Email"],
        "Alternate Email": dataMap["Alternate Email"],
        "Mobile Number": dataMap["Mobile Number"],
        "Alternate Mobile Number": dataMap["Alternate Mobile Number"]
      },
      address: {
        "Country": dataMap["Country"],
        "State": dataMap["State"],
        "Address Line 1": dataMap["Address Line 1"],
        "Address Line 2": dataMap["Address Line 2"],
        "City": dataMap["City"],
        "Division/Taluk": dataMap["Division/Taluk"],
        "Village/Area/Ward/Block": dataMap["Village/Area/Ward/Block"],
        "Zip/Pin Code": dataMap["Zip/Pin Code"]
      },
      statutory: {
        "CIN No": dataMap["CIN No"],
        "GST No": dataMap["GST No"],
        "PAN No": dataMap["PAN No"],
        "TAN No": dataMap["TAN No"],
        "Trade Name or Trade No": dataMap["Trade Name or Trade No"],
        "Factory Licence No": dataMap["Factory Licence No"]
      }
    };
  };

  const renderSection = (title, data, icon) => {
    const filteredData = Object.entries(data).filter(([key, value]) => value);
    
    if (filteredData.length === 0) return null;

    return (
      <Card 
        className="modal-section-card" 
        title={
          <div className="section-header">
            {icon && <span className="section-icon">{icon}</span>}
            <Title level={4} className="section-title">{title}</Title>
          </div>
        }
        size="small"
      >
        <Row gutter={[16, 8]}>
          {filteredData.map(([label, value]) => (
            <Col xs={24} sm={12} key={label}>
              <div className="info-item">
                <Text strong className="info-label">{label}:</Text>
                <Text className="info-value">{value}</Text>
              </div>
            </Col>
          ))}
        </Row>
      </Card>
    );
  };

  const getModalContent = () => {
    const sections = organizeFormData();
    
    return (
      <div className="modal-content-wrapper">
        {renderSection("Company Information", sections.company, "🏢")}
        {renderSection("Contact Information", sections.contact, "👤")}
        {renderSection("Address Details", sections.address, "📍")}
        {renderSection("Statutory Information", sections.statutory, "📋")}
      </div>
    );
  };
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
        title={
          <div className="modal-header">
            <Title level={3} className="modal-title">
              📋 Confirm Registration Details
            </Title>
            <Text type="secondary" className="modal-subtitle">
              Please review and confirm the information below
            </Text>
          </div>
        }
        open={true}
        okButtonProps={{ 
          loading: confirmLoading,
          size: "large",
          type: "primary"
        }}
        cancelButtonProps={{
          size: "large"
        }}
        onOk={handleOk}
        onCancel={handleCancel}
        width={800}
        className="confirmation-modal"
        centered
        okText="Confirm & Continue"
        cancelText="Go Back & Edit"
      >
        {getModalContent()}
      </Modal>
    </div>
  );
};

export default Modals;


