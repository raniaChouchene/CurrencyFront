import { Form, Input, Button, Row, Col, Space, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { loginUser } from "../../Services/UserService";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Login = () => {
  const navigate = useNavigate();

  const [loginButtonHovered, setLoginButtonHovered] = useState(false);
  const [forgotButtonHovered, setForgotButtonHovered] = useState(false);

  const onFinish = async (data: { username: string; password: string }) => {
    try {
      if (data.username === "" || data.password === "") {
        message.error("Error: Username or password cannot be empty!");
        return;
      }

      console.log("Submitting form...");
      const response = await loginUser(data.username, data.password);
      if (response && response.token && response.roles && response.UserName) {
        const { token, roles, UserName } = response;

        message.success("Logged In successfully!");

        localStorage.setItem("token", token);

        if (Array.isArray(roles) && roles.length > 0) {
          const role = roles[0];
          localStorage.setItem("role", role);
        }

        localStorage.setItem("userEmail", UserName);

        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
        navigate("/homeAuto");
        window.location.reload();
      } else {
        message.error("Invalid response from server. Please try again.");
      }
    } catch (error) {
      message.error("Error when Logging in, verify your email and password!");
      console.error("Login Error:", error);
    }
  };

  const handleForgotPassword = () => {
    navigate(`/forgot-password`);
  };

  return (
    <Row
      justify="center"
      align="middle"
      style={{
        minHeight: "100vh", // Full height of the screen
        fontSize: "20px",
        display: "flex",
      }}
    >
      <Col span={12} xs={24} sm={20} md={16} lg={12}>
        <Space
          direction="vertical"
          size="large"
          align="center"
          style={{
            padding: "20px",
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              backgroundColor: "#ffffff",
              boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
              borderRadius: "10px",
              padding: "20px",
              width: "100%",
              maxWidth: "400px",
              display: "flex",
              justifyContent: "center", // Center the content
              alignItems: "center", // Vertically center within the flex container
            }}
          >
            <Form name="login" onFinish={onFinish} autoComplete="off">
              <Space
                direction="vertical"
                size="middle"
                style={{ width: "100%" }}
              >
                <div
                  style={{
                    fontSize: "50px",
                    color: "#924f49", // Set color for icon
                    textAlign: "center",
                    marginBottom: "20px",
                  }}
                >
                  <UserOutlined />
                </div>
                <Form.Item
                  name="username"
                  label="Username"
                  style={{ marginBottom: 0 }}
                  rules={[
                    { required: true, message: "Please input your username!" },
                  ]}
                >
                  <Input
                    prefix={<UserOutlined />}
                    placeholder="Username"
                    style={{ fontSize: "18px", width: "100%" }}
                  />
                </Form.Item>

                <Form.Item
                  name="password"
                  label="Password"
                  style={{ marginBottom: 0 }}
                  rules={[
                    { required: true, message: "Please input your password!" },
                  ]}
                >
                  <Input.Password
                    prefix={<LockOutlined />}
                    placeholder="Password"
                    style={{ fontSize: "18px", width: "100%" }}
                  />
                </Form.Item>

                <Form.Item style={{ marginBottom: 0 }}>
                  <Button
                    type="primary"
                    htmlType="submit"
                    style={{
                      width: "100%",
                      fontSize: "18px",
                      backgroundColor: loginButtonHovered
                        ? "#adc4da"
                        : "#f0f0f3",
                      border: "1px solid #f0f0f0",
                      color: loginButtonHovered ? "white" : "black",
                      transition: "background-color 0.3s, color 0.3s",
                      borderRadius: "5px",
                      marginBottom: "10px",
                    }}
                    className="custom-button"
                    onMouseEnter={() => setLoginButtonHovered(true)}
                    onMouseLeave={() => setLoginButtonHovered(false)}
                  >
                    LOGIN
                  </Button>
                  <div
                    style={{
                      marginTop: "10px",
                      textAlign: "center",
                      color: "#FF4500",
                    }}
                  >
                    <Button
                      type="primary"
                      htmlType="button"
                      style={{
                        width: "100%",
                        fontSize: "18px",
                        backgroundColor: forgotButtonHovered
                          ? "#adc4da"
                          : "#f0f0f3",
                        border: "1px solid #f0f0f0",
                        color: forgotButtonHovered ? "white" : "red",
                        transition: "background-color 0.3s, color 0.3s",
                        borderRadius: "5px",
                        marginBottom: "10px",
                      }}
                      className="custom-button"
                      onClick={handleForgotPassword}
                      onMouseEnter={() => setForgotButtonHovered(true)}
                      onMouseLeave={() => setForgotButtonHovered(false)}
                    >
                      Forgot Password?
                    </Button>
                  </div>
                </Form.Item>
              </Space>
            </Form>
          </div>
        </Space>
      </Col>
    </Row>
  );
};

export default Login;
