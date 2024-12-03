import { useRef } from "react";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import axios from "axios";
import { BEURL } from "../config";
import { useNavigate } from "react-router-dom";

export function Signup() {
  const usernameRef = useRef<HTMLInputElement>();
  const passwordRef = useRef<HTMLInputElement>();

  const navigate = useNavigate();

  async function singup() {
    const username = usernameRef?.current?.value;
    const password = passwordRef?.current?.value;
    await axios.post(`${BEURL}/api/v1/signup`, {
      username,
      password,
    });

    navigate("/signin");
  }

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-gray-200">
      <div className="min-w-48 rounded-xl border bg-white p-8">
        <Input referance={usernameRef} placeholder="UserName" />
        <Input referance={passwordRef} placeholder="Password" />
        <div className="flex justify-center">
          <Button
            onClick={singup}
            variant="primary"
            text="SignUp"
            fullWidth={true}
            loading={false}
          />
        </div>
      </div>
    </div>
  );
}
