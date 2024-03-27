import Navbar from "../../components/navbar";
import ProfileSection from "./sections/profile_section";
import WelcomeSection from "./sections/welcome_section";

const LandingPage = () => {
  return (
    <>
      <div className="w-full h-screen overflow-auto ">
        <Navbar></Navbar>
        <WelcomeSection></WelcomeSection>
        <ProfileSection></ProfileSection>
        <div id="pro" className="w-full h-screen"></div>
      </div>
    </>
  );
};

export default LandingPage;
