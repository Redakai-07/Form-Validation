import React, { useState, useEffect } from "react";
import { Form, Input, Select, Steps, Button, Row, Col } from "antd";
import "./VendorDetails.css";
import { Country, State } from "country-state-city";
import ReactSelect from "react-select";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { saveFormData } from "../../slice.js";
import { getCountries, getCountryCallingCode } from "libphonenumber-js";

const VendorDetails = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const { Option } = Select;
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [states, setStates] = useState([]);
  const [selectedPhoneCountry, setSelectedPhoneCountry] = useState("IN"); // Default to India
  const [isMobile, setIsMobile] = useState(false);

  // Handle responsive design
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    handleResize(); // Set initial value
    window.addEventListener('resize', handleResize);
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);


  const goToBankDetails = async (values) => {
    try {
      await form.validateFields();
      dispatch(saveFormData(values));
      console.log("Form Values:", values);
      navigate("/bank-details");
    } catch (error) {
      console.error("Validation failed:", error);
    }
  };





  const handleCountryChange = (selectedOption) => {
    setSelectedCountry(selectedOption);
    const countryCode = selectedOption ? selectedOption.isoCode : null;
    const countryStates = State.getStatesOfCountry(countryCode);
    
    // If no states available, provide "NA" option
    if (countryStates && countryStates.length === 0) {
      setStates([{
        name: "NA (Not Applicable)",
        isoCode: "NA"
      }]);
    } else {
      setStates(countryStates || []);
    }
    
    form.setFieldsValue({ state: null });
    
    // Sync phone country with address country
    if (countryCode) {
      setSelectedPhoneCountry(countryCode);
      form.setFieldsValue({ phoneCountry: countryCode });
    }
  };

  const handleStateChange = (selectedOption) => {
    form.setFieldsValue({ state: selectedOption });
  };

  // Generate country options for phone prefix selector
  const getPhoneCountryOptions = () => {
    const countries = getCountries();
    return countries.map(countryCode => {
      const callingCode = getCountryCallingCode(countryCode);
      const countryInfo = Country.getCountryByCode(countryCode);
      return {
        value: countryCode,
        label: `+${callingCode}`,
        country: countryInfo?.name || countryCode,
      };
    }).filter(option => option.country); // Filter out countries without names
  };

  const prefixSelector = (
    <Form.Item name="phoneCountry" noStyle>
      <Select
        style={{
          width: 90,
          minWidth: 80,
        }}
        value={selectedPhoneCountry}
        onChange={(value) => setSelectedPhoneCountry(value)}
        showSearch
        optionFilterProp="children"
        filterOption={(input, option) =>
          option?.children?.toLowerCase().includes(input.toLowerCase()) ||
          option?.country?.toLowerCase().includes(input.toLowerCase())
        }
        dropdownStyle={{
          maxHeight: 300,
          overflow: 'auto'
        }}
        size="large"
      >
        {getPhoneCountryOptions().map(option => (
          <Option 
            key={option.value} 
            value={option.value}
            country={option.country}
            title={`${option.country} ${option.label}`}
          >
            {option.label}
          </Option>
        ))}
      </Select>
    </Form.Item>
  );

  const companyName = "Company Name";
  const firstName = "First Name";
  const lastName = "Last Name";
  const middleName = "Middle Name";
  const email = "Email Id";
  const altemail = "Alternate Email Id";
  const mob = "Mobile No.";
  const altmob = "Alternate Mobile No.";
  const country = "Country";
  const state = "State";
  const adrs1 = "Address Line 1";
  const adrs2 = "Address Line 2";
  const pin = "Zip/Pin Code";
  const Village = "Village/Area/Ward/Block";
  const divsn = "Division/Taluk";
  const city = "City";
  const cin = "CIN No.";
  const gst = "GST No.";
  const pan = "PAN No.";
  const tan = "TAN No.";
  const trade = "Trade Name or Trade No.";
  const licence = "Factory Licence No.";

  return (
    <>
      <div className="vDetails">
        <div>
          <h1 className="heading">Vendor Registration</h1>
          <Steps
            className="vdStep"
            progressDot
            current={0}
            direction={isMobile ? "vertical" : "horizontal"}
            size={isMobile ? "small" : "default"}
            items={[
              { title: "Vendor Details" },
              { title: "Bank Details" },
              { title: "Vendor Services" },
            ]}
          />
        </div>

        {/* Form starts here */}
        <div className="vdForm">
          <Form
            form={form}
            scrollToFirstError
            name="vendorForm"
            layout="vertical"
            initialValues={{ phoneCountry: "IN" }}
            onFinishFailed={({ errorFields }) => {
              if (errorFields.length > 0) {
                form.scrollToField(errorFields[0].name);
                form.setFields([
                  {
                    name: errorFields[0].name,
                    errors: [errorFields[0].errors[0]],
                  },
                ]);
              }
            }}
            onFinish={(values) => {
              console.log("Form Submitted:", values);
              goToBankDetails(values);
            }}
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
          >
            <h3 className="subheading">Company Details</h3>
            <br />

            {/* Company Details */}
            <Row gutter={16}>
              {/* Company Name */}
              <Col xs={24} sm={12} md={8}>
                <Form.Item
                  label={companyName}
                  name="companyName"
                  rules={[
                    { required: true, message: `${companyName} is required` },
                    {
                      pattern: /^[A-Za-z0-9\s&'’-]+$/,
                      message: `${companyName} can only contain Alphanumeric values`,
                    },
                    {
                      max: 50,
                      message: `${companyName} exceeds character limit`,
                    },
                    {
                      min: 3,
                      message: `${companyName} should at least have 3 Characters`,
                    },
                  ]}
                >
                  <Input placeholder="Value" />
                </Form.Item>
              </Col>

              {/* Company Type */}
              <Col xs={24} sm={12} md={8}>
                <Form.Item
                  label="Company Type"
                  name="companyType"
                  rules={[
                    { required: true, message: "Please select any one Type" },
                  ]}
                >
                  <Select placeholder="Select here" allowClear>
                    <Select.Option value="Inventech">SMALL SCALE</Select.Option>
                    <Select.Option value="Inventech">MSME</Select.Option>
                    <Select.Option value="SKSJTI">INTERNATIONAL</Select.Option>
                  </Select>
                </Form.Item>
              </Col>
              {/* Industry */}
              <Col xs={24} sm={12} md={8}>
                <Form.Item
                  label="Industry"
                  name="industry"
                  rules={[
                    { required: true, message: "Please select any one Industry" },
                  ]}
                >
                  <Select placeholder="Select here" allowClear>
                    <Select.Option value="private">Private</Select.Option>
                    <Select.Option value="public">Public</Select.Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>

            {/* Contact Information */}
            <h3 className="subheading">Contact Information</h3>
            <br />
            {/* First Name */}
            <Row gutter={16}>
              <Col xs={24} sm={12} md={8}>
                <Form.Item
                  label={firstName}
                  name="firstName"
                  rules={[
                    { required: true, message: `${firstName} is required` },
                    {
                      pattern: /^[A-Za-z\s]+$/,
                      message: `${firstName} can only contain alphabets and spaces`,
                    },
                    { max: 20, message: `${firstName} exceeds character limit` },
                    {
                      min: 3,
                      message: `${firstName} should at least have 3 Characters`,
                    },
                  ]}
                >
                  <Input placeholder="Value" />
                </Form.Item>
              </Col>
              {/* Middle Name */}
              <Col xs={24} sm={12} md={8}>
                <Form.Item
                  label={middleName}
                  name="middleName"
                  rules={[
                    {
                      pattern: /^[A-Za-z\s]+$/,
                      message: `${middleName} can only contain alphabets and spaces`,
                    },
                    { max: 20, message: `${middleName} exceeds character limit` },
                    {
                      min: 3,
                      message: `${middleName} should at least have 3 Characters`,
                    },
                  ]}
                >
                  <Input placeholder="Value" />
                </Form.Item>
              </Col>
              {/* Last Name */}
              <Col xs={24} sm={12} md={8}>
                <Form.Item
                  label={lastName}
                  name="lastName"
                  rules={[
                    { required: true, message: `${lastName} is required` },
                    {
                      pattern: /^[A-Za-z\s]+$/,
                      message: `${lastName} can only contain alphabets and spaces`,
                    },
                    { max: 20, message: `${lastName} exceeds character limit` },
                    {
                      min: 3,
                      message: `${lastName} should at least have 3 Characters`,
                    },
                  ]}
                >
                  <Input placeholder="Value" />
                </Form.Item>
              </Col>
              {/* Email */}
              <Col xs={24} sm={12} md={8}>
                <Form.Item
                  label={email}
                  name="emailId"
                  rules={[
                    { required: true, message: `${email} is required` },
                    {
                      pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                      message: `Please write a valid ${email} `,
                    },
                    {
                      min: 8,
                      message: "Minimum Character count not reached",
                    },
                    {
                      max: 50,
                      message: "Character Limit exceeded",
                    },
                  ]}
                >
                  <Input placeholder="Value" />
                </Form.Item>
              </Col>
              {/* Alternate E-mail */}
              <Col xs={24} sm={12} md={8}>
                <Form.Item
                  label={altemail}
                  name="alternateEmailId"
                  rules={[
                    {
                      pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                      message: `Please write a valid ${altemail} `,
                    },
                    {
                      min: 8,
                      message: "Minimum Character count not reached",
                    },
                    {
                      max: 50,
                      message: "Character Limit exceeded",
                    },
                  ]}
                >
                  <Input placeholder="Value" />
                </Form.Item>
              </Col>
              {/* Mobile Number */}
              <Col xs={24} sm={12} md={8}>
                <Form.Item
                  name="mobileNo"
                  label={mob}
                  rules={[
                    {
                      required: true,
                      message: "Please input your phone number!",
                    },
                    {
                      pattern: /^[0-9]{6,15}$/,
                      message: `Enter a valid mobile number (6-15 digits)`,
                    },
                  ]}
                >
                  <Input
                    placeholder="Phone Number"
                    addonBefore={prefixSelector}
                    style={{
                      width: "100%",
                    }}
                  />
                </Form.Item>
              </Col>
              {/* Alternate Mobile Number */}
              <Col xs={24} sm={12} md={8}>
                <Form.Item
                  name="alternateMobileNo"
                  label={altmob}
                  rules={[
                    {
                      pattern: /^[0-9]{6,15}$/,
                      message: `Enter a valid mobile number (6-15 digits)`,
                    },
                  ]}
                >
                  <Input
                    placeholder="Phone Number"
                    addonBefore={prefixSelector}
                    style={{
                      width: "100%",
                    }}
                  />
                </Form.Item>
              </Col>
              {/* Country */}
              <Col xs={24} sm={12} md={8}>
                <Form.Item
                  label={country}
                  name="country"
                  rules={[
                    {
                      required: true,
                      message: `Please select a ${country}`,
                    },
                  ]}
                >
                  <ReactSelect
                    options={Country.getAllCountries().map((c) => ({
                      label: c.name,
                      value: c.name,
                      isoCode: c.isoCode,
                    }))}
                    onChange={handleCountryChange}
                    placeholder="Select Country"
                  />
                </Form.Item>
              </Col>
              {/* State */}
              <Col xs={24} sm={12} md={8}>
                <Form.Item
                  label={state}
                  name="state"
                  rules={[
                    { required: true, message: `Please select a ${state}` },
                  ]}
                >
                  <ReactSelect
                    options={states.map((s) => ({
                      label: s.name,
                      value: s.isoCode || s.name,
                    }))}
                    onChange={handleStateChange}
                    placeholder="Select State"
                    value={form.getFieldValue("state")}
                    isDisabled={!selectedCountry}
                  />
                </Form.Item>
              </Col>
              {/* Address Line 1*/}
            </Row>
            <Row gutter={16}>
              <Col xs={24} sm={12} md={12}>
                <Form.Item
                  label={adrs1}
                  name="addressLine1"
                  rules={[
                    { required: true, message: `${adrs1} is required` },
                    { max: 200, message: `${adrs1} exceeds character limit` },
                    {
                      min: 3,
                      message: `${adrs1} should at least have 3 Characters`,
                    },
                  ]}
                >
                  <Input placeholder="Value" />
                </Form.Item>
              </Col>
              {/* Address Line 2 */}
              <Col xs={24} sm={12} md={12}>
                <Form.Item
                  label={adrs2}
                  name="addressLine2"
                  rules={[
                    { max: 200, message: `${adrs2} exceeds character limit` },
                    {
                      min: 3,
                      message: `${adrs2} should at least have 3 Characters`,
                    },
                  ]}
                >
                  <Input placeholder="Value" />
                </Form.Item>
              </Col>
            </Row>
            {/* City */}
            <Row gutter={16}>
              <Col xs={24} sm={12} md={6}>
                <Form.Item
                  label={city}
                  name="city"
                  rules={[
                    { required: true, message: `${city} is required` },
                    {
                      pattern: /^[A-Za-z\s]+$/,
                      message: `${city} can only contain alphabets and spaces`,
                    },
                    { max: 50, message: `${city} exceeds character limit` },
                    {
                      min: 2,
                      message: `${city} should at least have 2 Characters`,
                    },
                  ]}
                >
                  <Input placeholder="Value" />
                </Form.Item>
              </Col>
              {/* Division */}
              <Col xs={24} sm={12} md={6}>
                <Form.Item
                  label={divsn}
                  name="divisionTaluk"
                  rules={[
                    { required: true, message: `${divsn} is required` },
                    {
                      pattern: /^[A-Za-z\s]+$/,
                      message: `${divsn} can only contain alphabets and spaces`,
                    },
                    { max: 50, message: `${divsn} exceeds character limit` },
                    {
                      min: 2,
                      message: `${divsn} should at least have 2 Characters`,
                    },
                  ]}
                >
                  <Input placeholder="Value" />
                </Form.Item>
              </Col>
              {/* Village */}
              <Col xs={24} sm={12} md={6}>
                <Form.Item
                  label={Village}
                  name="villageAreaWardBlock"
                  rules={[
                    { required: true, message: `${Village} is required` },
                    {
                      pattern: /^[A-Za-z0-9\s]+$/,
                      message: `${divsn} can only contain alphanumeric and spaces`,
                    },
                    { max: 50, message: `${Village} exceeds character limit` },
                    {
                      min: 2,
                      message: `${Village} should at least have 2 Characters`,
                    },
                  ]}
                >
                  <Input placeholder="Value" />
                </Form.Item>
              </Col>
              {/* Pin Code */}
              <Col xs={24} sm={12} md={6}>
                <Form.Item
                  label={pin}
                  name="zipPinCode"
                  rules={[
                    { required: true, message: `${pin} is required` },
                    {
                      pattern: /^[0-9]{6}$/,
                      message: `Please provide valid ${pin} Number`,
                    },
                  ]}
                >
                  <Input placeholder="Value" />
                </Form.Item>
              </Col>
            </Row>

            <h3 className="subheading">Statutory</h3>
            <br />

            {/* Statutories */}
            <Row gutter={16}>
              {/* CIN No */}
              <Col xs={24} sm={12} md={8}>
                <Form.Item
                  label={cin}
                  name="cinNo"
                  rules={[
                    { required: true, message: `${cin} is required` },
                    {
                      pattern: /^[A-Za-z0-9]{21}$/,
                      message: `Please provide correct ${cin}`,
                    },
                  ]}
                >
                  <Input placeholder="Value" />
                </Form.Item>
              </Col>
              {/* GST No */}
              <Col xs={24} sm={12} md={8}>
                <Form.Item
                  label={gst}
                  name="gstNo"
                  rules={[
                    { required: true, message: `${gst} is required` },
                    {
                      pattern:
                        /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}[Z]{1}[0-9A-Z]{1}$/,
                      message: `Please provide correct ${gst}`,
                    },
                  ]}
                >
                  <Input placeholder="Value" />
                </Form.Item>
              </Col>
              {/* PAN No */}
              <Col xs={24} sm={12} md={8}>
                <Form.Item
                  label={pan}
                  name="panNo"
                  rules={[
                    { required: true, message: `${pan} is required` },
                    {
                      pattern: /^[A-Z]{5}[0-9]{4}[A-Z]$/,
                      message: `Please provide correct ${pan}`,
                    },
                  ]}
                >
                  <Input placeholder="Value" />
                </Form.Item>
              </Col>
              {/* TAN No */}
              <Col xs={24} sm={12} md={8}>
                <Form.Item
                  label={tan}
                  name="tanNo"
                  rules={[
                    { required: true, message: `${tan} is required` },
                    {
                      pattern: /^[A-Z]{4}[0-9]{5}[A-Z]$/,
                      message: `Please provide correct ${tan}`,
                    },
                  ]}
                >
                  <Input placeholder="Value" />
                </Form.Item>
              </Col>
              {/* Trade No */}
              <Col xs={24} sm={12} md={8}>
                <Form.Item
                  label={trade}
                  name="tradeNameOrTradeNo"
                  rules={[
                    { required: true, message: `${trade} is required` },
                    {
                      pattern: /^[A-Za-z0-9]{8,15}$/,
                      message: `Please provide correct ${trade}`,
                    },
                  ]}
                >
                  <Input placeholder="Value" />
                </Form.Item>
              </Col>
              {/* Licence No */}
              <Col xs={24} sm={12} md={8}>
                <Form.Item
                  label={licence}
                  name="factoryLicenceNo"
                  rules={[
                    { required: true, message: `${licence} is required` },
                    {
                      pattern: /^[A-Z0-9]{15}$/,
                      message: `Please provide correct ${licence}`,
                    },
                  ]}
                >
                  <Input placeholder="Value" />
                </Form.Item>
              </Col>
            </Row>
            <div>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  onClick={goToBankDetails}
                >
                  Register
                </Button>
              </Form.Item>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
};

export default VendorDetails;
