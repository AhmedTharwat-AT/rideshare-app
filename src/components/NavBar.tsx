import { useCookies } from "react-cookie";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { GrLanguage } from "react-icons/gr";

function NavBar() {
  const [cookies] = useCookies(["token"]);
  const { t, i18n } = useTranslation();
  const currLng = i18n.resolvedLanguage;

  function toggleLanguage(language: string | undefined) {
    if (language == "ar") {
      i18n.changeLanguage("en");
      document.dir = "ltr";
      document.documentElement.lang = "en";
    }
    if (language == "en") {
      i18n.changeLanguage("ar");
      document.dir = "rtl";
      document.documentElement.lang = "ar";
    }
  }

  return (
    <nav className="w-full bg-gray-950">
      <div className="container">
        <ul className="flex text-gray-100 gap-6 py-4 capitalize">
          <li
            className="cursor-pointer flex items-center gap-2 select-none"
            onClick={() => toggleLanguage(currLng)}
          >
            <GrLanguage />
            <span>{currLng}</span>
          </li>
          <li>
            <NavLink to="/home">home</NavLink>
          </li>
          <li>
            <NavLink to="/ride">ride</NavLink>
          </li>
          <li className="ms-auto">
            {cookies.token ? (
              t(`greeting`, { name: "ahmed" })
            ) : (
              <>
                <NavLink to="/login">login</NavLink>
                <span className="px-2">|</span>
                <NavLink to="/signup">Sign up</NavLink>
              </>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default NavBar;
