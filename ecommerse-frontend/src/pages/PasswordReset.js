// import axios from "../axios";
import React, { useState } from "react";
import { Col, Container, Form, Row, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "./PasswordReset.css";
const PasswordReset = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const setVal = (e) => {
    setEmail(e.target.value);
  };
  const sendLink = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:8080/users/sendpasswordlink", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });
    const data = await res.json();
    if (data.status === 201) {
      setEmail("");
      setMessage(true);
    } else {
      toast.error("Invalid User", {
        position: "top-center",
      });
    }
  };

  return (
    <Container>
      <Row className="row-pos">
        <Col md={6} className="login__form--container">
          <h1 className="reset-emi-title">Enter your email</h1>
          {message ? (
            <p className="success-mess">
              Please check the link in your email !
            </p>
          ) : (
            ""
          )}
          <Form className="log-form-all" style={{ width: "100%" }}>
            <div className="margin-item">
              <Form.Group>
                <Form.Label className="email-lable3">Email</Form.Label>

                <Form.Control
                  className="control-size"
                  type="email"
                  placeholder="Enter the email..."
                  value={email}
                  onChange={setVal}
                />
              </Form.Group>
              <Form.Group className="log-btn-group">
                <button className="send-btn" type="submit" onClick={sendLink}>
                  send
                </button>
              </Form.Group>
              <p className="qusetion2">
                Remember you account? <Link to="/login">Sign in</Link>
              </p>
              {/* {!message ? (
                <p className="alert-mess">Please enter correct email!!!</p>
              ) : (
                ""
              )} */}
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default PasswordReset;
