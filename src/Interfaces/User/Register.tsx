import { Form, Input, Button, message, Space, Row, Col } from "antd";
import { useParams, useNavigate } from "react-router-dom";
import { register } from "../../Services/UserService";
import Logo from "../assets/crm.jpg";
import { LockOutlined, LoginOutlined } from "@ant-design/icons";
interface FormValues {
  email: string;
  password: string;
  confirmPassword: string;
}

const ResetPassword = () => {
  const buttonStyles = {
    base: {
      backgroundColor: "#1890ff",
      borderColor: "#1890ff",
      color: "#fff",
    },
    hover: {
      backgroundColor: "#FF4500",
      borderColor: "#FF4500",
      color: "#fff",
    },
  };
  const { token } = useParams<{ token?: string }>();
  const navigate = useNavigate();

  const onFinish = async (values: FormValues) => {
    const { email, password, confirmPassword } = values;
    try {
      if (!email || !password || !confirmPassword) {
        throw new Error("Please fill in all fields!");
      }
      if (password !== confirmPassword) {
        throw new Error("Passwords do not match!");
      }

      if (!token) {
        throw new Error("Token is missing.");
      } //@ts-expect-error
      await register(name, email, password);

      message.success("Your password has been reset successfully.");
      navigate("/");
    } catch (error) {
      message.error("An error occurred. Please try again.");
      console.error("Reset Password Error:", error);
    }
  };
  const handleLogIn = () => {
    navigate(`/`);
  };

  return (
    <Row
      justify="center"
      align="middle"
      style={{ minHeight: "90vh", fontSize: "20px" }}
    >
      <Col span={12}>
        <Space
          direction="vertical"
          size="large"
          align="center"
          style={{ padding: "20px" }}
        >
          <div
            style={{
              backgroundColor: "#ffffff",
              boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
              borderRadius: "10px",
              padding: "20px",
              width: "100%",
              maxWidth: "400px",
            }}
          >
            <Form name="reset-password" onFinish={onFinish}>
              <Space
                direction="vertical"
                size="middle"
                style={{ width: "100%" }}
              >
                <img
                  src={Logo}
                  alt="Login Image"
                  style={{
                    width: "50%",
                    maxWidth: "200px",
                    borderRadius: "50%",
                    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
                  }}
                />

                <Form.Item
                  name="email"
                  label="Email"
                  rules={[
                    { required: true, message: "Please input your email!" },
                  ]}
                >
                  <Input placeholder="Email" />
                </Form.Item>

                <Form.Item
                  name="password"
                  label="New Password"
                  rules={[
                    {
                      required: true,
                      message: "Please input your new password!",
                    },
                  ]}
                >
                  <Input.Password placeholder="New Password" />
                </Form.Item>

                <Form.Item
                  name="confirmPassword"
                  label="Confirm Password"
                  rules={[
                    {
                      required: true,
                      message: "Please confirm your password!",
                    },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue("password") === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(
                          "The two passwords do not match!"
                        );
                      },
                    }),
                  ]}
                >
                  <Input.Password placeholder="Confirm Password" />
                </Form.Item>

                <Form.Item>
                  <Row gutter={16}>
                    <Col>
                      <Button
                        type="primary"
                        htmlType="submit"
                        icon={<LockOutlined />}
                      >
                        Reset Password
                      </Button>
                    </Col>
                    <Col>
                      <Button
                        type="primary"
                        htmlType="button"
                        onClick={handleLogIn}
                        icon={<LoginOutlined />}
                      >
                        Back to Log In
                      </Button>
                    </Col>
                  </Row>
                </Form.Item>
              </Space>
            </Form>
          </div>
        </Space>
      </Col>
    </Row>
  );
};

export default ResetPassword;
