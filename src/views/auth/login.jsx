import Background from "../../assets/images/background-login.svg";
import Logo from "../../assets/images/Logo.svg";
import Icon from "../../assets/images/icon.svg";
import { Helmet } from "react-helmet";
import { Link, useNavigate } from "react-router-dom";
import { loginService } from "../../services/auth_service";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import SpinnerWave from "../../components/spinner/spinner_wave";

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [unAuthorization, setUnAuthorization] = useState(false)

  const [loading, setLoading] = useState(false);

  const handleChangeEmail = (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
  };

  const handleChangePassword = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.trim() !== "" && password.trim() !== "") {
      setLoading(true);
      loginService(email, password).then((response) => {
        // setUnAuthorization(false)
        // console.log(response.status);
        if (response && response.status === 200) {
          localStorage.setItem(
            "access_token",
            `Bearer ${response.data.access_token}`
          );
          localStorage.setItem(
            "registration_category",
            response.data.registration_category?.name
          );
          localStorage.setItem(
            "registration_sub_category",
            response.data.registration_sub_category.name ?? null
          );
          navigate("/dashboard");
        } else if (response && response.status === 201) {
          if (response.data.message === "Email / password salah") {
            alert("Email atau Password salah..!");
          } else if (
            response.data.message ===
            "silahkan cek email untuk melakukan verifikasi, agar bisa melanjutkan login..!"
          ) {
            navigate(`/email-confirmation?email=${email}&type=REGISTER`);
          }
        } else {
          // alert('email / password salah..! silahkan coba lagi')
          console.log("koneksi terputus");
        }
        setLoading(false);
      });
    } else {
      alert("Formulir input tidak boleh kosong");
    }
  };

  const handleShowPassword = () => {
    if (showPassword === true) {
      setShowPassword(false);
    } else {
      setShowPassword(true);
    }
  };
  return (
    <>
      <Helmet>
        <title>Login - Gentra Karya</title>
      </Helmet>

      <form onSubmit={handleSubmit}>
        <div
          className="w-full lg:flex text-white bg-cover"
          style={{ backgroundImage: `url(${Background})` }}
        >
          <div className="w-full bg-black/30 flex flex-col lg:flex-row px-5 lg:px-0">
            <div className="w-full lg:w-1/2 h-screen flex items-center justify-center ">
              <div className="w-full lg:w-[70%] bg-black/30 backdrop-blur-md rounded-xl p-5">
                <div className="flex space-x-3 items-center w-full justify-center">
                  <img src={Logo} alt="Logo Gentra Karya" />
                  <p className="text-3xl font-bold">Masuk</p>
                </div>
                {/* Input */}
                <div className="my-3 flex flex-col space-y-3">
                  <div className="my-1">
                    <label htmlFor="email" className="font-semibold">
                      Email
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={handleChangeEmail}
                      name="email"
                      className="block text-black w-full px-3 py-2 outline-none focus:border-custom-yellow rounded-md border"
                      placeholder="example@gmail.com"
                      required
                    />
                  </div>

                  <div className="my-1">
                    <label htmlFor="password" className="font-semibold">
                      Password
                    </label>
                    <div className="w-full relative">
                      <input
                        type={showPassword === true ? "text" : "password"}
                        value={password}
                        onChange={handleChangePassword}
                        name="password"
                        className="block text-black w-full px-3 py-2 outline-none focus:border-custom-yellow rounded-md border "
                        required
                      />
                      <button
                        type="button"
                        onClick={handleShowPassword}
                        className={`absolute right-3 top-3 hover:text-custom-yellow transition-colors ${
                          showPassword === true
                            ? "text-custom-yellow"
                            : "text-black"
                        }`}
                      >
                        <FontAwesomeIcon icon={faEye}></FontAwesomeIcon>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Button */}
                <div className="flex justify-between">
                  <div className="flex items-center space-x-3">
                    <input type="checkbox" name="" id="" />
                    <p>Ingatkan Saya..?</p>
                  </div>
                  <Link to="/forgot-password" className="text-custom-yellow">
                    Lupa Password..?
                  </Link>
                </div>
                <div className="flex flex-col space-y-3 mt-5">
                  <button
                    type="submit"
                    className="w-full h-10 bg-custom-yellow/80 hover:bg-custom-yellow rounded-md font-semibold text-black transition-colors flex items-center justify-center space-x-3"
                  >
                    {loading === true ? (
                      <SpinnerWave></SpinnerWave>
                    ) : (
                       <p>Masuk</p> 
                    )}
                    
                  </button>
                  <p className="text-center">Tidak memiliki akun..?</p>
                  <Link
                    to="/register"
                    className="px-5 py-2 bg-custom-yellow/30 border-2 hover:bg-custom-yellow border-custom-yellow rounded-md w-full text-center font-semibold text-black transition-colors"
                  >
                    Daftar
                  </Link>
                  <Link
                    to="/"
                    className="text-custom-yellow hover:text-yellow-500 text-center"
                  >
                    kembali ke halaman utama
                  </Link>
                </div>
                {/* <Button></Button> */}
              </div>
            </div>
            <div className="w-1/2 h-screen hidden lg:flex items-center justify-center">
              <img src={Icon} alt="Icon" />
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default Login;
