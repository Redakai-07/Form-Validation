import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { saveFormValues } from "../../slice.js";
import { Form, Input, Steps, Button, Row, Col } from "antd";
import "./BankDetails.css";


const BankDetails = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formValues, setFormValues] = useState({});
  const [form1] = Form.useForm();


  // import {labels} from "./Labels.jsx";
  // const formData = useSelector((state) => state.form.formData) ;
  // const [open, setOpen] = useState(false);
  // const [confirmLoading, setConfirmLoading] = useState(false);
  // const getPopconfirmDescription = () => (
  //   <div className="pop-up">
  //     {vals.map((value, index) => value ? <p key={index}>{labels[index]}: {value}</p> : null)}
  //   </div>
  // );
  // const handleOk = () => {
  //   setConfirmLoading(true);
  //   dispatch(saveFormValues(formValues));
  //   setTimeout(() => {
  //     setOpen(false);
  //     setConfirmLoading(false);
  //     navigate("/vendor-service");
  //   }, 1000);
  // };
  // const handleCancel = () => {
  //   setOpen(false);
  // };
    // const vals = Object.values(formData).map((value) => {
  //   if (value && typeof value === "object") {
  //     return Object.values(value);
  //   }
  //   return value;
  // }).flat();

  const showModal = async () => {
    try {
      const values = await form1.validateFields();
      setFormValues(values);
      dispatch(saveFormValues(values));
      navigate("/modals");
    } catch (error) {
      console.log("Validation failed:", error);
    }
  };






  return (
    <>
      <div className="vDetails">
        <div>
          <h1 className="heading">Bank Details</h1>
          <Steps
            className="vdStep"
            progressDot
            current={1}
            items={[
              { title: "Vendor Details" },
              { title: "Bank Details" },
              { title: "Vender Services" },
            ]}
          />
        </div>
        {/* Form Section */}
        <div className="bdForm">
          <Form
            name="layout-multiple-vertical"
            form={form1}
            scrollToFirstError
            layout="vertical"
            onFinish={(values) => console.log("Form Submitted:", values)}
            labelCol={{
              span: 10,
            }}
            wrapperCol={{
              span: 20,
            }}
          >
            <h3 className="subheading">Bank Credentials</h3>
            <br />

            <div className="bankDetails">
              <Row gutter={16}>
                {/* Bank Name */}
                <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                  <Form.Item
                    className="bankDetail"
                    label="Bank Name"
                    name="bankName"
                    rules={[
                      {
                        required: true,
                        message: "Bank Name is required !",
                      },
                      {
                        pattern: /^[A-Za-z]+$/,
                        message: "Please give correct Bank Name",
                      },
                      {
                        min: 3,
                        message: `Minimum Character is not satisfied`,
                      },
                      {
                        max: 50,
                        message: `Maximum characters limit reached`,
                      },
                    ]}
                  >
                    <Input placeholder="Value" />
                  </Form.Item>
                </Col>

                {/* Branch Name */}
                <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                  <Form.Item
                    className="bankDetail"
                    label="Branch Name"
                    name="branchName"
                    rules={[
                      {
                        required: true,
                        message: "Branch Name is required !",
                      },
                      {
                        pattern: /^[A-Za-z]+$/,
                        message: "Please give correct Branch Name",
                      },
                      {
                        min: 3,
                        message: `Minimum Character is not satisfied`,
                      },
                      {
                        max: 50,
                        message: `Maximum characters limit reached`,
                      },
                    ]}
                  >
                    <Input placeholder="Value" />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={16}>
                {/* Branch Code */}
                <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                  <Form.Item
                    className="bankDetail"
                    label="Branch Code"
                    name="branchCode"
                    rules={[
                      {
                        required: true,
                        message: "Branch Code is required !",
                      },
                      {
                        pattern: /^[A-Z]{4}0[A-Z0-9]{6}$/,
                        message: "Please give correct Branch Code",
                      },
                    ]}
                  >
                    <Input placeholder="Value" />
                  </Form.Item>
                </Col>

                {/* A/C No */}
                <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                  <Form.Item
                    name="accountNumber"
                    label="A/c Number"
                    rules={[
                      {
                        required: true,
                        message: "Please input your A/c Number!",
                      },
                      {
                        pattern: /^\d{11,18}$/,
                        message: "Enter a valid Account Number",
                      },
                    ]}
                    hasFeedback
                  >
                    <Input.Password placeholder="Value" />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={16}>
                {/* Confirm A/c Number */}
                <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                  <Form.Item
                    name="confirmAccountNumber"
                    label="Confirm A/c No."
                    dependencies={["accountNumber"]}
                    hasFeedback
                    rules={[
                      {
                        required: true,
                        message: "Please confirm your password!",
                      },
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (
                            !value ||
                            getFieldValue("accountNumber") === value
                          ) {
                            return Promise.resolve();
                          }
                          return Promise.reject(
                            new Error("The Account Numbers do not match!")
                          );
                        },
                      }),
                    ]}
                  >
                    <Input.Password placeholder="Value" />
                  </Form.Item>
                </Col>
              </Row>
            </div>
            <div className="butn">
              <Form.Item>
                <Button type="primary" htmlType="submit" onClick={showModal}>
                  Submit
                </Button>
                {/* <Modal
                  title="Confirm the Given Details"
                  open={open}
                  okButtonProps={{ loading: confirmLoading }}
                  onConfirm={handleOk}
                  onCancel={handleCancel}
                  confirmLoading={confirmLoading}
                  onOk={handleOk}
                >
                  <p>{getPopconfirmDescription()}</p>
                </Modal> */}
              </Form.Item>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
};

export default BankDetails;
