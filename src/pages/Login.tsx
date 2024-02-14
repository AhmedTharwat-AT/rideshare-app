import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { useCookies } from "react-cookie";

function Login() {
  const [cookies, setCookie] = useCookies(["token"]);
  console.log(cookies.token ? "yea" : "nah");

  const responseMessage = (response: CredentialResponse) => {
    setCookie("token", response.credential);
  };
  const errorMessage = () => {
    console.log("error");
  };
  return (
    <div>
      asd
      <GoogleLogin
        onSuccess={responseMessage}
        onError={errorMessage}
        useOneTap
      />
    </div>
  );
}

export default Login;
