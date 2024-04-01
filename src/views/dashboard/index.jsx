import { Helmet } from "react-helmet";
import { useEffect, useState } from "react";
import ViewDashboardMaysyarakat from "./views/view_dashbard._masyarakat";
import ViewDashboardLembaga from "./views/view_dashboard_lembaga";
import ViewDashboardAdmin from "./views/view_dashboard_admin";
import { Link, useNavigate } from "react-router-dom";
import { getProfile, logoutService } from "../../services/auth_service";
import { BaseURL } from "../../services/base_url";
import Header from "../../components/header";
import Layout from "../../components/layout";
import { initials } from "../../services/initial";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";

const Dashboard = () => {
  const navigate = useNavigate();

  const [accessToken, setAccessToken] = useState("");
  const [profile, setProfile] = useState(null);
  const [showModal, setShowModal] = useState(false);
  let viewDashboard = <ViewDashboardMaysyarakat></ViewDashboardMaysyarakat>;

  const handleLogout = () => {
    logoutService(accessToken);
    localStorage.clear();
    navigate("/");
  };

  const handleShowModal = () => {
    if (showModal === true) {
      setShowModal(false);
    } else {
      setShowModal(true);
    }
  };

  useEffect(() => {
    const accessToken = localStorage.getItem("access_token");
    if (accessToken !== null || accessToken !== "") {
      setAccessToken(`Bearer ${accessToken}`);
      const category = localStorage.getItem("registration_category");
      switch (category) {
        case "LEMBAGA":
          viewDashboard = <ViewDashboardLembaga></ViewDashboardLembaga>;
          break;

        case "SUPER ADMIN":
          viewDashboard = <ViewDashboardAdmin></ViewDashboardAdmin>;
          break;

        case "ADMIN":
          viewDashboard = <ViewDashboardAdmin></ViewDashboardAdmin>;
          break;

        default:
          viewDashboard = <ViewDashboardMaysyarakat></ViewDashboardMaysyarakat>;
          break;
      }

      getProfile(`Bearer ${accessToken}`).then((response) => {
        if (response && response.status === 200) {
          setProfile(response.data.data);
        }
      });
    } else {
      navigate("/login");
    }
  }, []);
  return (
    <>
      <Helmet>
        <title>Dashboard - Gentra Karya</title>
      </Helmet>
      <Layout>
        <Header>
          <p>Dashboard</p>
          <div className="dropdown">
            <label className=" flex items-center space-x-3 cursor-pointer" tabIndex="0">
              {profile?.image !== null ? (
                <img
                  src={BaseURL + profile?.image}
                  alt="Foto Profile - Gentra Karya"
                  className="w-10 aspect-square bg-white object-cover rounded-full"
                />
              ) : (
                <div className="h-10 aspect-square rounded-full bg-white flex items-center justify-center">
                  {initials(profile?.name)}
                </div>
              )}
              <p>{profile?.name}</p>
              <FontAwesomeIcon icon={faCaretDown}></FontAwesomeIcon>
            </label>
            <div className="dropdown-menu">
              <Link to="/" className="dropdown-item text-sm text-center">
                Halaman Utama
              </Link>
              <button
                  class="block w-full whitespace-nowrap bg-transparent px-3 py-2 text-black hover:bg-red-200 transition-all text-center font-medium text-sm"
                  type="button"
                  onClick={handleLogout}
                  data-te-dropdown-item-ref
                >
                  Keluar
                </button>
            </div>
          </div>
        </Header>
        {viewDashboard}
      </Layout>
    </>
  );
};

export default Dashboard;
