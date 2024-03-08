import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { useCookies } from "react-cookie";
import { useLocation } from "react-router-dom";

function Login() {
  const [cookies, setCookie] = useCookies(["token"]);
  const location = useLocation();

  const responseMessage = (response: CredentialResponse) => {
    console.log(response);
    setCookie("token", response.credential);
  };
  const errorMessage = () => {
    console.log("error");
  };
  return (
    <>
      <header className="h-16 bg-black ">
        <span className="text-white font-semibold text-2xl tracking-wider leading-[4rem] ps-5">
          UBER
        </span>
      </header>
      <section>
        <div className="container">
          <form className="space-y-2" onSubmit={(e) => e.preventDefault()}>
            <div className="flex flex-col-reverse">
              <input
                className="peer px-3 py-2 border-b border-gray-700 focus:outline-none focus:border-black"
                type="text"
                id="username"
                name="username"
                autoComplete="true"
                onChange={(e) =>
                  e.target.value.length > 0
                    ? e.target.classList.add("typing")
                    : e.target.classList.remove("typing")
                }
              />
              <label
                aria-label="username"
                htmlFor="username"
                className="peer-hover:top-0 peer-focus:top-0 peer-[.typing]:top-0 capitalize relative top-8 left-2 transition-all duration-200"
              >
                username
              </label>
            </div>
            <div className="flex flex-col-reverse">
              <input
                className="peer px-3 py-2 border-b border-gray-700 focus:outline-none focus:border-black"
                type="password"
                id="password"
                name="password"
                autoComplete="true"
                onChange={(e) =>
                  e.target.value.length > 0
                    ? e.target.classList.add("typing")
                    : e.target.classList.remove("typing")
                }
              />
              <label
                htmlFor="password"
                className="peer-hover:top-0 peer-focus:top-0 peer-[.typing]:top-0 capitalize relative top-8 left-2 transition-all duration-200"
              >
                password
              </label>
            </div>
            <button className="bg-black text-white  px-3 py-1 rounded-md ">
              Login
            </button>
          </form>
          {/* <GoogleLogin
            ux_mode="redirect"
            onSuccess={responseMessage}
            onError={errorMessage}
            useOneTap
          /> */}
        </div>
      </section>
    </>
  );
}

export default Login;
