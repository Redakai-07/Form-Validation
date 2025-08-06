import React, { useState, useEffect } from "react";
import { 
  Steps, 
  Form, 
  Card, 
  Checkbox, 
  Button, 
  Row, 
  Col, 
  Typography, 
  Divider, 
  Modal,
  Result
} from "antd";
import { CheckCircleOutlined, ShopOutlined, ToolOutlined, CarOutlined, HomeOutlined } from '@ant-design/icons';
import "./VenderServices.css";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { saveFormData } from "../../slice.js";

const { Title, Text } = Typography;
const { Meta } = Card;

const VenderServices = () => {
  const [form] = Form.useForm();
  const [selectedServices, setSelectedServices] = useState([]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Handle responsive design
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Service categories with their offerings
  const serviceCategories = [
    {
      id: 'manufacturing',
      title: 'Manufacturing Services',
      icon: <ToolOutlined />,
      description: 'Production and manufacturing capabilities',
      services: [
        'Custom Manufacturing',
        'Mass Production',
        'Quality Control & Testing',
        'Product Assembly',
        'Packaging Services',
        'Research & Development'
      ]
    },
    {
      id: 'supply',
      title: 'Supply & Distribution',
      icon: <CarOutlined />,
      description: 'Supply chain and distribution services',
      services: [
        'Raw Material Supply',
        'Finished Goods Distribution',
        'Logistics & Transportation',
        'Warehouse Management',
        'Inventory Management',
        'Supply Chain Consulting'
      ]
    },
    {
      id: 'retail',
      title: 'Retail & Commercial',
      icon: <ShopOutlined />,
      description: 'Retail and commercial services',
      services: [
        'Retail Sales',
        'Wholesale Trading',
        'E-commerce Solutions',
        'Customer Support',
        'Marketing Services',
        'Business Consulting'
      ]
    },
    {
      id: 'maintenance',
      title: 'Maintenance & Support',
      icon: <HomeOutlined />,
      description: 'Maintenance and technical support services',
      services: [
        'Equipment Maintenance',
        'Technical Support',
        'Installation Services',
        'Repair & Refurbishment',
        'Training & Documentation',
        'Emergency Support'
      ]
    }
  ];

  const handleServiceChange = (categoryId, service, checked) => {
    const serviceKey = `${categoryId}-${service}`;
    
    if (checked) {
      setSelectedServices([...selectedServices, serviceKey]);
    } else {
      setSelectedServices(selectedServices.filter(s => s !== serviceKey));
    }
  };

  const handleSubmit = async () => {
    try {
      const formData = {
        selectedServices: selectedServices,
        timestamp: new Date().toISOString()
      };
      
      dispatch(saveFormData(formData));
      setShowSuccess(true);
      
      // Auto-redirect to Vendor Details after 3 seconds
      setTimeout(() => {
        setShowSuccess(false);
        navigate('/');
      }, 3000);
      
    } catch (error) {
      console.error('Submission failed:', error);
    }
  };

  const handleGoBack = () => {
    navigate('/bank-details');
  };

  return (
    <div className="vsContainer">
      <div className="vs-header">
        <Title level={2} className="heading">Vendor Services</Title>
        <Steps
          className="vdStep"
          progressDot
          current={2}
          direction={isMobile ? "vertical" : "horizontal"}
          size={isMobile ? "small" : "default"}
          items={[
            { title: "Vendor Details" },
            { title: "Bank Details" },
            { title: "Vendor Services" },
          ]}
        />
      </div>

      <div className="vs-content">
        <Card className="intro-card">
          <Title level={4}>Select Your Service Offerings</Title>
          <Text type="secondary">
            Choose the services your company provides. You can select multiple services across different categories.
          </Text>
        </Card>

        <Form form={form} layout="vertical">
          <Row gutter={[16, 16]}>
            {serviceCategories.map((category) => (
              <Col xs={24} md={12} lg={12} key={category.id}>
                <Card 
                  className="service-category-card"
                  title={
                    <div className="category-header">
                      <span className="category-icon">{category.icon}</span>
                      <span className="category-title">{category.title}</span>
                    </div>
                  }
                >
                  <Text type="secondary" className="category-description">
                    {category.description}
                  </Text>
                  <Divider />
                  
                  <div className="services-list">
                    {category.services.map((service) => (
                      <div key={service} className="service-item">
                        <Checkbox
                          onChange={(e) => handleServiceChange(category.id, service, e.target.checked)}
                          className="service-checkbox"
                        >
                          {service}
                        </Checkbox>
                      </div>
                    ))}
                  </div>
                </Card>
              </Col>
            ))}
          </Row>

          <div className="vs-actions">
            <Row justify="center" gutter={16}>
              <Col>
                <Button 
                  size="large" 
                  onClick={handleGoBack}
                  className="back-button"
                >
                  Go Back
                </Button>
              </Col>
              <Col>
                <Button 
                  type="primary" 
                  size="large"
                  onClick={handleSubmit}
                  disabled={selectedServices.length === 0}
                  className="submit-button"
                >
                  Complete Registration
                </Button>
              </Col>
            </Row>
            
            {selectedServices.length > 0 && (
              <div className="selected-count">
                <Text type="secondary">
                  {selectedServices.length} service{selectedServices.length !== 1 ? 's' : ''} selected
                </Text>
              </div>
            )}
          </div>
        </Form>
      </div>

      <Modal
        open={showSuccess}
        footer={null}
        closable={false}
        centered
        className="success-modal"
      >
        <Result
          icon={<CheckCircleOutlined style={{ color: '#52c41a' }} />}
          title="Registration Completed Successfully!"
          subTitle="Your vendor registration has been submitted and is now under review. Redirecting to vendor details..."
        />
      </Modal>
    </div>
  );
};

export default VenderServices;
