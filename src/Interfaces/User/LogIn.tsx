import { Form, Input, Button, Space, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { loginUser } from "../../Services/UserService";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const onFinish = async (data: { username: string; password: string }) => {
    try {
      if (data.username === "" || data.password === "") {
        message.error("Error: Username or password cannot be empty!");
        return;
      }

      const response = await loginUser(data.username, data.password);
      if (response && response.token) {
        const { token } = response;

        message.success("Logged in successfully!");
        localStorage.setItem("token", token);

        navigate("/");
        window.location.reload();
      } else {
        message.error("Invalid response from server. Please try again.");
      }
    } catch (error) {
      message.error("Error when logging in, verify your email and password!");
      console.error("Login Error:", error);
    }
  };

  const handleCreateAccount = () => {
    navigate(`/register`);
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
        <Form name="login" onFinish={onFinish} autoComplete="off">
          <Space direction="vertical" size="large" style={{ width: "100%" }}>
            <div
              style={{
                fontSize: "50px",
                color: "#233067",
                textAlign: "center",
              }}
            >
              <UserOutlined />
            </div>
            <Form.Item
              name="username"
              label="Username"
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
            >
              <Input
                prefix={<UserOutlined />}
                placeholder="Username"
                style={{ fontSize: "16px" }}
              />
            </Form.Item>

            <Form.Item
              name="password"
              label="Password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Password"
                style={{ fontSize: "16px" }}
              />
            </Form.Item>

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
                LOGIN
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
                onClick={handleCreateAccount}
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
                Create Account
              </Button>
            </Form.Item>
          </Space>
        </Form>
      </div>
    </div>
  );
};

export default Login;
