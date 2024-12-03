import axios from "axios";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { BEURL } from "../config";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

export function Signin() {
  const usernameRef = useRef<HTMLInputElement>();
  const passwordRef = useRef<HTMLInputElement>();

  const navigate = useNavigate();

  async function singin() {
    const username = usernameRef?.current?.value;
    const password = passwordRef?.current?.value;
    const response = await axios.post(`${BEURL}/api/v1/signin`, {
      username,
      password,
    });

    const jwt = response?.data?.Token;
    localStorage.setItem("token", jwt);
    navigate("/");
  }
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-gray-200">
      <div className="min-w-48 rounded-xl border bg-white p-8">
        <Input referance={usernameRef} placeholder="UserName" />
        <Input referance={passwordRef} placeholder="Password" />
        <div className="flex justify-center">
          <Button
            onClick={singin}
            variant="primary"
            text="SignIn"
            fullWidth={true}
            loading={false}
          />
        </div>
      </div>
    </div>
  );
}
