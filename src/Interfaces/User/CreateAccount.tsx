import { Form, Input, Button, Space, message } from "antd";
import { UserOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { register } from "../../Services/UserService";

const CreateAccount = () => {
  const navigate = useNavigate();
  const onFinish = async (data: {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
  }) => {
    try {
      if (
        !data.name ||
        !data.email ||
        !data.password ||
        !data.confirmPassword
      ) {
        message.error("All fields are required!");
        return;
      }

      if (data.password !== data.confirmPassword) {
        message.error("Passwords do not match!");
        return;
      }

      const response = await register(data.name, data.email, data.password);
      if (response.success) {
        message.success("Account created successfully!");
        navigate("/login");
      } else {
        message.error(response.message || "Failed to create account.");
      }
    } catch (error: any) {
      message.error("An unexpected error occurred. Please try again.");
      console.error("Create Account Error:", error);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <div
        style={{
          backgroundColor: "#ffffff",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
          borderRadius: "10px",
          padding: "30px",
          width: "400px",
          maxWidth: "90%",
        }}
      >
        <Form name="create-account" onFinish={onFinish} autoComplete="off">
          <Space direction="vertical" size="large" style={{ width: "100%" }}>
            <div
              style={{
                fontSize: "50px",
                color: "#ff4500",
                textAlign: "center",
              }}
            >
              <UserOutlined />
            </div>

            {/* Name Field */}
            <Form.Item
              name="name"
              label="Full Name"
              rules={[
                { required: true, message: "Please input your full name!" },
              ]}
            >
              <Input
                prefix={<UserOutlined />}
                placeholder="Full Name"
                style={{ fontSize: "16px" }}
              />
            </Form.Item>

            {/* Email Field */}
            <Form.Item
              name="email"
              label="Email"
              rules={[
                { required: true, message: "Please input your email!" },
                { type: "email", message: "Please enter a valid email!" },
              ]}
            >
              <Input
                prefix={<MailOutlined />}
                placeholder="Email"
                style={{ fontSize: "16px" }}
              />
            </Form.Item>

            {/* Password Field */}
            <Form.Item
              name="password"
              label="Password"
              rules={[
                { required: true, message: "Please input your password!" },
                { min: 6, message: "Password must be at least 6 characters!" },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Password"
                style={{ fontSize: "16px" }}
              />
            </Form.Item>

            {/* Confirm Password Field */}
            <Form.Item
              name="confirmPassword"
              label="Confirm Password"
              rules={[
                { required: true, message: "Please confirm your password!" },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Confirm Password"
                style={{ fontSize: "16px" }}
              />
            </Form.Item>

            {/* Buttons */}
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                style={{
                  width: "100%",
                  fontSize: "16px",
                  borderRadius: "5px",
                }}
              >
                CREATE ACCOUNT
              </Button>
              <Button
                type="link"
                htmlType="button"
                style={{
                  width: "100%",
                  textAlign: "center",
                  fontSize: "16px",
                  fontWeight: "bold",
                  color: "#ffffff",
                  background: "linear-gradient(90deg, #ff4500, #ff7043)",
                  padding: "12px 20px",
                  borderRadius: "8px",
                  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                  transition: "all 0.3s ease-in-out",
                }}
                onClick={() => navigate("/login")}
                onMouseOver={(e) => {
                  //@ts-expect-error
                  e.target.style.background =
                    "linear-gradient(90deg, #ff7043, #ff4500)";
                  //@ts-expect-error
                  e.target.style.transform = "scale(1.05)";
                }}
                onMouseOut={(e) => {
                  //@ts-expect-error
                  e.target.style.background =
                    "linear-gradient(90deg, #ff4500, #ff7043)";
                  //@ts-expect-error
                  e.target.style.transform = "scale(1)";
                }}
              >
                Already have an Account ?
              </Button>
            </Form.Item>
          </Space>
        </Form>
      </div>
    </div>
  );
};

export default CreateAccount;
