import Footer from "../../components/footer";
import Navbar from "../../components/navbar";
import MyCarousel from "./sections/carousel";
import ProfileSection from "./sections/profile_section";
import SampleLoker from "./sections/sample_loker";
import SampleMagang from "./sections/sample_magang";
import SamplePelatihan from "./sections/sample_pelatihan";
import SampleSertiikasi from "./sections/sample_sertifikasi";
import SampleWorkshop from "./sections/sample_workshop";
import VisiMisi from "./sections/visi_misi";
import WelcomeSection from "./sections/welcome_section";

const LandingPage = () => {
  return (
    <>
      <div className="w-full h-screen overflow-auto ">
        <Navbar></Navbar>
        <WelcomeSection></WelcomeSection>
        <ProfileSection></ProfileSection>
        <VisiMisi></VisiMisi>
        <MyCarousel></MyCarousel>
        <SampleLoker></SampleLoker>
        <SampleMagang></SampleMagang>
        <SampleSertiikasi></SampleSertiikasi>
        <SampleWorkshop></SampleWorkshop>
        <SamplePelatihan></SamplePelatihan>
        <Footer></Footer>
      </div>
    </>
  );
};

export default LandingPage;
