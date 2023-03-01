import React, { useState } from "react";
import { Alert, Button, Col, Container, Form, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useLoginMutation } from "../services/appApi";
import "./Login.css";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login, { isError, isLoading, error }] = useLoginMutation();

  const handleLogin = (e) => {
    e.preventDefault();
    login({ email, password });
  };
  return (
    <Container>
      <Row className="row-pos">
        <Col md={6} className="login__form--container">
          <h1 className="login-title">Login to your account</h1>
          <Form
            className="log-form-all"
            style={{ width: "100%" }}
            onSubmit={handleLogin}
          >
            <div className="margin-item">
              <Form.Group>
                <Form.Label className="emai2-lable">Email</Form.Label>
                <Form.Control
                  className="control-size"
                  type="email"
                  placeholder="Enter the email..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {isError ? (
                  <p className="error-mess" variant="danger">
                    Please Confirm your email
                  </p>
                ) : (
                  ""
                )}
              </Form.Group>

              <Form.Group>
                <Form.Label className="password2-lable">Password</Form.Label>
                <Form.Control
                  className="control-size"
                  type="password"
                  placeholder="Enter the password..."
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {isError ? (
                  <p className="error-mess" variant="danger">
                    Please Confirm your password
                  </p>
                ) : (
                  ""
                )}
              </Form.Group>

              <Form.Group className="log-btn-group">
                <button
                  className="single-login-btn"
                  type="submit"
                  disabled={isLoading}
                >
                  Login
                </button>
              </Form.Group>
              <div className="ques-group">
                <p className="qusetion">
                  Don't have an account? <Link to="/signup">Sign Out</Link>
                </p>
                <p className="forgot-pass">
                  <Link to="/password-reset">Forgot password? </Link>
                </p>
              </div>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
