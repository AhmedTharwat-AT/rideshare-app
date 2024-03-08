import { useTranslation } from "react-i18next";

import RideForm from "../features/ride/RideForm";
import NavBar from "../components/NavBar";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

function Home() {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  return (
    <>
      <NavBar />

      <main className="bg-gray-950 min-h-[80vh] flex items-center justify-center py-10">
        <div className="py-5 flex justify-center w-full lg:items-center container max-lg:flex-col lg:gap-28 gap-10">
          <div className="max-lg:self-start">
            <h1 className="text-gray-100  text-5xl font-bold leading-snug max-w-96 break-words ">
              {t("heading")}
            </h1>
            <p className="text-gray-100 mt-7 mb-4">{t("heading_sub")}</p>
            <RideForm />
          </div>
          <img
            className="lg:w-1/2 w-full lg:max-w-[512px]"
            src="assets/Ride-with-Uber.png"
          />
        </div>
      </main>
    </>
  );
}

export default Home;
