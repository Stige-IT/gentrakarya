import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LandingPage from './views/landing_page';
import Login from './views/auth/login';
import Register from './views/auth/register';
import ForgotPassword from './views/auth/forgot_password';
import EmailConfirmation from './views/auth/email_confirmation';
import CreateNewPassword from './views/auth/create_new_password';
import Loker from './views/landing_page/pages/loker';
import DetailLoker from './views/landing_page/pages/loker/detail_loker';
import Magang from './views/landing_page/pages/magang';
import Sertifikasi from './views/landing_page/pages/sertifikasi';
import Pelatihan from './views/landing_page/pages/pelatihan';
import Workshop from './views/landing_page/pages/workshop';
import Layanan from './views/landing_page/pages/layanan';
import DetailMagang from './views/landing_page/pages/magang/detail_magang';
import Dashboard from './views/dashboard';
import NetworkError from './views/error_pages/network_error';
import LokerD from './views/dashboard/loker';
import DetaiLokerD from './views/dashboard/loker/detail_loker';
import CreateInfoLoker from './views/dashboard/loker/create_info_loker';
import MagangD from './views/dashboard/magang';
import DetailMagangD from './views/dashboard/magang/detail_magang';
import DetailPelatihan from './views/landing_page/pages/pelatihan/detail_pelatihan';
import PengaturanD from './views/dashboard/pengaturan';
import PelatihanD from './views/dashboard/pelatihan';
import DetailPelatihanD from './views/dashboard/pelatihan/detail_pelatihan';
import DetailWorkshop from './views/landing_page/pages/workshop/detail_workshop';
import DetailSertifikasi from './views/landing_page/pages/sertifikasi/detail_sertifikasi';
import SertifikasiD from './views/dashboard/sertifikasi';
import DetailSertifikasiD from './views/dashboard/sertifikasi/detail_sertifikasi';
import CreateInfoMagang from './views/dashboard/magang/create_info_magang';
import CreateInfoSertifikasi from './views/dashboard/sertifikasi/create_info_sertifikasi';
import CreateInfoPelatihan from './views/dashboard/pelatihan/create_info_pelatihan';
import WorkshopD from './views/dashboard/workshop';
import DetailWorkshopD from './views/dashboard/workshop/detail_workshop';
import CreateInfoWorkshop from './views/dashboard/workshop/create_info_workshop';
import LamaranD from './views/dashboard/lamaran';
import DetailLamaranD from './views/dashboard/lamaran/detail_lamaran';
import LayananD from './views/dashboard/layanan';
import Admin from './views/dashboard/admin';
import Pengguna from './views/dashboard/pengguna';
import Galery from './views/dashboard/galery';
import SlideShow from './views/dashboard/slideshow';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
    <Routes>
      <Route path='/' Component={LandingPage}></Route>
      <Route path='/login' Component={Login}></Route>
      <Route path='/register' Component={Register}></Route>
      <Route path="/email-confirmation" Component={EmailConfirmation}></Route>
      <Route path='/forgot-password' Component={ForgotPassword}></Route>
      <Route path="/create-new-password" Component={CreateNewPassword}></Route>

      <Route path='/loker' Component={Loker}></Route>
      <Route path="/loker/detail/:loker_id" Component={DetailLoker}></Route>

      <Route path="/magang" Component={Magang}></Route>
      <Route path="/magang/detail/:magang_id" Component={DetailMagang}></Route>

      <Route path="/sertifikasi" Component={Sertifikasi}></Route>
      <Route path="/sertifikasi/detail/:sertifikasi_id" Component={DetailSertifikasi}></Route>

      <Route path="/workshop" Component={Workshop}></Route>
      <Route path="/workshop/detail/:workshop_id" Component={DetailWorkshop}></Route>

      <Route path="/pelatihan" Component={Pelatihan}></Route>
      <Route path="/pelatihan/detail/:pelatihan_id" Component={DetailPelatihan}></Route>

      <Route path="/layanan" Component={Layanan}></Route>




      {/* Dashboard */}
      <Route path="/dashboard" Component={Dashboard}></Route>

      <Route path="/dashboard/admin" Component={Admin}></Route>

      <Route path="/dashboard/pengguna" Component={Pengguna}></Route>

      <Route path="dashboard/slide-show" Component={SlideShow}></Route>
      <Route path="dashboard/galery" Component={Galery}></Route>

      <Route path="dashboard/layanan" Component={LayananD}></Route>

      <Route path="/dashboard/loker" Component={LokerD}></Route>
      <Route path="/dashboard/loker/detail/:loker_id" Component={DetaiLokerD}></Route>
      <Route path="/dashboard/loker/tambah-data" Component={CreateInfoLoker}></Route>

      <Route path="/dashboard/lamaran" Component={LamaranD}></Route>
      <Route path="/dashboard/lamaran/detail/:lamaran_id" Component={DetailLamaranD}></Route>

      <Route path="/dashboard/magang" Component={MagangD}></Route>
      <Route path="/dashboard/magang/detail/:magang_id" Component={DetailMagangD}></Route>
      <Route path="/dashboard/magang/add" Component={CreateInfoMagang}></Route>

      <Route path="/dashboard/pelatihan" Component={PelatihanD}></Route>
      <Route path="/dashboard/pelatihan/detail/:pelatihan_id" Component={DetailPelatihanD}></Route>
      <Route path="/dashboard/pelatihan/add" Component={CreateInfoPelatihan}></Route>

      <Route path="/dashboard/sertifikasi" Component={SertifikasiD}></Route>
      <Route path="/dashboard/sertifikasi/detail/:sertifikasi_id" Component={DetailSertifikasiD}></Route>
      <Route path="/dashboard/sertifikasi/add" Component={CreateInfoSertifikasi}></Route>

      <Route path="/dashboard/workshop" Component={WorkshopD}></Route>
      <Route path="/dashboard/workshop/detail/:workshop_id" Component={DetailWorkshopD}></Route>
      <Route path="/dashboard/workshop/add" Component={CreateInfoWorkshop}></Route>


      <Route path="/dashboard/pengaturan" Component={PengaturanD}></Route>

      {/* Error Page */}
      <Route path="/network-error" Component={NetworkError}></Route>
    </Routes>
  </Router>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
