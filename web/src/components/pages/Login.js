import { useState } from "react";
import logo from "../../assets/images/emergency-logo.png";
import CodevLogo from "../../assets/images/logo.png";
import CustomInput from "@synergy-project-t/ui-components/CustomInput";
import CustomButton from "@synergy-project-t/ui-components/CustomButton";
import { useNavigate } from "react-router-dom";
import { AuthUtil } from "@synergy-project-t/utils";
import { useUserAuthStore } from "@synergy-project-t/utils/stores";

const LoginPage = () => {
  const navigate = useNavigate()
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { setUserAuth } = useUserAuthStore((state) => state);

  const onClick = async () => {
    setIsLoading(true);

    const { data } = await AuthUtil.login("http://localhost:5000", {
      username,
      password
    });

    if (data?.id) {
      setUserAuth(data);
    }

    setIsLoading(false);
  }

  return (
    <div className="min-h-screen bg-white flex flex-col md:flex-row">
      <div
        className="md:w-1/2 bg-cover bg-center m-5"
        style={{ backgroundImage: `url(${logo})` }}
      ></div>

      <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
        <div className="flex justify-center mb-4">
          <img src={CodevLogo} alt="Logo" className="h-20" />
        </div>
        <div className="text-lg font-semibold text-xl text-center mb-4">SIGN IN</div>
        <div className="flex gap-4 flex-col items-center justify-center">
          <CustomInput
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full max-w-md"
          />
          <CustomInput
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            className="w-full max-w-md"
          />
          <CustomButton type="primary" size="medium" onClick={onClick} className="w-full max-w-md" isLoading={isLoading}>
            Login
          </CustomButton>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
