import React, { useState } from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSignupMutation } from "../services/appApi";
import "./Signup.css";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [signup, { error, isLoading, isError }] = useSignupMutation();
  const handleSignup = (e) => {
    e.preventDefault();
    signup({ name, email, password });
  };
  return (
    <Container>
      <Row className="row-pos">
        <Col md={6} className="login__form--container">
          <h1 className="logout-title">Sign Out to your account</h1>
          <Form
            className="log-form-all"
            style={{ width: "100%" }}
            onSubmit={handleSignup}
          >
            <div className="margin-item">
              <Form.Group>
                {/* {isError && (
                  <Alert variant="danger">
                    <p style={{ textAlign: "center", fontSize: "20px" }}>
                      User already exist
                    </p>
                  </Alert>
                )} */}
                <Form.Label className="name-lable">Name</Form.Label>
                <Form.Control
                  className="control-size"
                  type="text"
                  placeholder="Enter your name..."
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                {isError && name.length <= 0 ? (
                  <p className="error-mess">Name can't be empty</p>
                ) : (
                  ""
                )}
              </Form.Group>
              <Form.Group>
                <Form.Label className="email-lable1">Email</Form.Label>
                <Form.Control
                  className="control-size"
                  type="email"
                  placeholder="Enter the email..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {isError && email.length <= 0 ? (
                  <p className="error-mess" variant="danger">
                    Email can't be empty
                  </p>
                ) : (
                  ""
                )}
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label className="password-lable1">Password</Form.Label>
                <Form.Control
                  className="control-size2"
                  type="password"
                  placeholder="Enter the password..."
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {isError && password.length <= 0 ? (
                  <p className="error-mess" variant="danger">
                    Password can't be empty
                  </p>
                ) : (
                  ""
                )}
              </Form.Group>

              <Form.Group className="log-btn-group">
                <button
                  className="single-logout-btn"
                  disabled={isLoading}
                  type="submit"
                >
                  Create account
                </button>
              </Form.Group>
              <div className="ques-group">
                <p className="qusetion">
                  Already have an account? <Link to="/login">Sign in</Link>{" "}
                </p>
              </div>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Signup;
