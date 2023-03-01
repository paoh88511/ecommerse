import React, { useEffect, useState } from "react";
import { Container, Row, Form, Button, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "./PasswordReset.css";

const PasswordForgot = () => {
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const { id, token } = useParams();
  console.log(id, token);

  const history = useNavigate();
  const setval = (e) => {
    setPassword(e.target.value);
  };
  const sendpassword = async (e) => {
    e.preventDefault();
    const res = await fetch(`http://localhost:8080/users/${id}/${token}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password }),
    });
    const data = await res.json();
    if (data.status == 201) {
      setPassword("");
      setMessage(true);
    } else {
      toast.error("! Token Expired generate new LInk", {});
    }
  };

  const userValid = async () => {
    const res = await fetch(
      `http://localhost:8080/users/forgotpassword/${id}/${token}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await res.json();
    if (data.status == 201) {
      console.log("user valid");
    } else {
      history("*");
    }
  };
  useEffect(() => {
    userValid();
  }, []);

  return (
    <Container>
      <Row className="row-pos">
        <Col md={6} className="login__form--container">
          <h1 className="reset-emi-title">Enter your new password</h1>
          <Form className="log-form-all" style={{ width: "100%" }}>
            <div className="margin-item">
              {message ? (
                <p className="success-mess">pasword reset Succsfully !</p>
              ) : (
                ""
              )}

              <Form.Group>
                <Form.Label className="email-lable">Password</Form.Label>

                <Form.Control
                  className="control-size"
                  type="password"
                  placeholder="Enter new password"
                  value={password}
                  onChange={setval}
                />
              </Form.Group>

              <Form.Group className="log-btn-group">
                <button
                  className="send-btn"
                  type="submit"
                  onClick={sendpassword}
                >
                  send
                </button>
              </Form.Group>
              <p className="qusetion2">
                Password reset successful ?
                <p>
                  Back to
                  <Link to="/login"> Sign in</Link>
                </p>
              </p>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default PasswordForgot;
