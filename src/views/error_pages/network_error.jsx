import { Helmet } from "react-helmet";
import imageErrorConnection from "../../assets/images/error_connection.png";
import { useState } from "react";
import SpinnerWave from "../../components/spinner/spinner_wave";
import { useNavigate } from "react-router-dom";

const NetworkError = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false);
  const handleRefresh = () => {
    setLoading(true)
    if (window.navigator.onLine === true) {
        navigate('/')
    }else{
      loading(false)
    }
  }
  return (
    <>
      <Helmet>
        <title>Network Error - Gentra Karya</title>
      </Helmet>
      <div className="w-full h-screen flex flex-col items-center justify-center space-y-3">
        <img
          src={imageErrorConnection}
          className="w-[80%] max-w-[500px] lg:w-1/2 "
          alt="Koneksi Bermasalah - Gentra Karya"
        />
        <div className="text-base lg:text-xl font-semibold text-center">
          <p>Koneksi Bermasalah</p>
          <p>Silahkan periksa sambungan internet Anda..!</p>
        </div>
        {loading === true ? 
        <SpinnerWave></SpinnerWave> :
        <button
          type="button"
          onClick={handleRefresh}
          className="px-3 py-2 bg-custom-blue rounded-md text-white font-semibold"
        >
          Refresh Halaman
        </button>
          }
      </div>
    </>
  );
};

export default NetworkError;
