import React from "react";
import { Container, Nav, Tab, Col, Row } from "react-bootstrap";
import DashboardProducts from "../components/DashboardProducts";
import "../components/DashboardProducts.css";
import "./AdminDashboard.css";
const AdminDashboard = () => {
  return (
    <Container className="dash-table-container">
      <Tab.Container defaultActiveKey="products">
        <Row>
          {/* <Col sm={3}>
            <Nav className="flex-column">
              <Nav.Item>
                <Nav.Link className="admun-dash" eventKey="products">
                  Products
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Col> */}
          <Col>
            <Tab.Content>
              <Tab.Pane eventKey="products">
                <DashboardProducts />
              </Tab.Pane>
              {/* <Tab.Pane eventKey="orders"></Tab.Pane> */}
              {/* <Tab.Pane eventKey="clients"></Tab.Pane> */}
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </Container>
  );
};

export default AdminDashboard;
