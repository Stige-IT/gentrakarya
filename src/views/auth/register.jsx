import Background from "../../assets/images/background-login.svg";
import Logo from "../../assets/images/Logo.svg";
import Icon from "../../assets/images/icon.svg";
import { Helmet } from "react-helmet";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import {
  getRegistrasionCategory,
  getRegistrasionSubCategory,
} from "../../services/registration_service";
import { register } from "../../services/auth_service";
import { getGender } from "../../services/gender_service";
import SpinnerWave from "../../components/spinner/spinner_wave";

const Register = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const [gender, setGender] = useState([]);
  const [genderId, setGenderId] = useState(null);

  const [registrationCategory, setRegistrationCategory] = useState([]);
  const [registrationCategoryId, setRegistrationCategoryId] = useState("--");

  const [registrationSubCategory, setRegistrationSubCategory] = useState([]);
  const [registrationSubCategoryId, setRegistrationSubCategoryId] =
    useState("--");

  const [loading, setLoading] = useState(false);

  const handleShowPassword = () => {
    if (showPassword === true) {
      setShowPassword(false);
    } else {
      setShowPassword(true);
    }
  };

  const handleChangeName = (e) => {
    const newName = e.target.value;
    setName(newName);
  };

  const handleChangeEmail = (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
  };

  const handleChangePassword = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
  };

  const handleChangePasswordConfirmation = (e) => {
    const newPasswordConfirmation = e.target.value;
    setPasswordConfirmation(newPasswordConfirmation);
  };

  const handleChangeGender = (e) => {
    const newGenderId = e.target.value;
    setGenderId(newGenderId);
  };

  const handleRegisterCategory = (e) => {
    const registrationCategoryId = e.target.value;
    setRegistrationCategoryId(registrationCategoryId);
    console.log(registrationCategoryId);
    getRegistrasionSubCategory(registrationCategoryId).then((response) => {
      if (response && response.status === 200) {
        setRegistrationSubCategory(response.data);
        setRegistrationSubCategoryId(response?.data[0]?.id ?? "--");
      } else {
        setRegistrationSubCategory([]);
        setRegistrationSubCategoryId("--");
      }
    });
  };

  const handleRegisterSubCategory = (e) => {
    const id = e.target.value;
    setRegistrationSubCategoryId(id);
  };

  const handleSubmit = (e) => {
    setLoading(true);
    e.preventDefault();
    register(
      name,
      email,
      password,
      passwordConfirmation,
      genderId,
      registrationCategoryId,
      registrationSubCategoryId
    ).then((response) => {
      if (response && response.status === 200) {
        navigate(`/email-confirmation?email=${email}&type=REGISTER`);
        setLoading(false);
      } else {
        alert(
          "gagal, registrasi anda gagal, pastikan semua data diisi dengan benar..!"
        );
        setLoading(false);
      }
    });
  };

  useEffect(() => {
    getRegistrasionCategory().then((response) => {
      if (response && response.status === 200) {
        setRegistrationCategory(response.data);
        setRegistrationCategoryId(response.data[0].id);
        getRegistrasionSubCategory(registrationCategoryId).then((response) => {
          if (response && response.status === 200) {
            setRegistrationSubCategory(response.data);
            setRegistrationSubCategoryId(response?.data[0]?.id ?? "--");
          } else {
            setRegistrationSubCategory([]);
            setRegistrationSubCategoryId("--");
          }
        });
      } else {
        setRegistrationCategory([]);
        setRegistrationCategoryId("--");
      }
    });

    getGender().then((response) => {
      if (response && response.status === 200) {
        setGender(response.data.data);
        if (response.data.data.length > 0) {
          setGenderId(response.data.data[0].id);
        } else {
          setGenderId(null);
        }
      } else {
        setGender([]);
      }
    });

    // eslint-disable-next-line
  }, []);

  return (
    <>
      <Helmet>
        <title>Register - Gentra Karya</title>
      </Helmet>
      <form onSubmit={handleSubmit}>
        <div
          className="w-full flex text-white bg-cover"
          style={{ backgroundImage: `url(${Background})` }}
        >
          <div className="w-full bg-black/30 flex flex-col lg:flex-row px-5 lg:px-0 text-sm overflow-auto py-5 lg:py-0">
            <div className="w-full lg:w-1/2 h-screen flex items-center justify-center  ">
              <div className="w-full lg:w-[90%] bg-black/30 backdrop-blur-md rounded-xl p-5">
                <div className="flex space-x-3 items-center w-full justify-center">
                  <img src={Logo} alt="Logo Gentra Karya" />
                  <p className="text-3xl font-bold">Daftar</p>
                </div>
                {/* Input */}
                <div className="my-3 flex flex-col space-y-3 text-sm">
                  <div className="my-1 flex flex-col lg:flex-row lg:items-center">
                    <label htmlFor="email" className="font-semibold lg:w-44">
                      Nama
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={handleChangeName}
                      name="name"
                      className="block text-black w-full px-3 py-2 outline-none focus:border-custom-yellow rounded-md border"
                      placeholder="nama lengkap"
                      required
                    />
                  </div>

                  <div className="my-1 flex flex-col lg:flex-row lg:items-center">
                    <label htmlFor="email" className="font-semibold lg:w-44">
                      Email
                    </label>
                    <input
                      type="text"
                      value={email}
                      onChange={handleChangeEmail}
                      name="email"
                      className="block text-black w-full px-3 py-2 outline-none focus:border-custom-yellow rounded-md border"
                      placeholder="example@gmail.com"
                      required
                    />
                  </div>

                  <div className="my-1 flex flex-col lg:flex-row lg:items-center">
                    <label htmlFor="password" className="font-semibold lg:w-44">
                      Password
                    </label>
                    <div className="w-full relative">
                      <input
                        value={password}
                        onChange={handleChangePassword}
                        type={showPassword === true ? "text" : "password"}
                        name="password"
                        className="block text-black w-full px-3 py-2 outline-none focus:border-custom-yellow rounded-md border"
                        required
                        placeholder="password"
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

                  <div className="my-1 flex flex-col lg:flex-row lg:items-center">
                    <label htmlFor="password" className="font-semibold lg:w-44">
                      Konfirmasi Password
                    </label>
                    <div className="w-full relative">
                      <input
                        value={passwordConfirmation}
                        onChange={handleChangePasswordConfirmation}
                        type={showPassword === true ? "text" : "password"}
                        name="password"
                        className="block text-black w-full px-3 py-2 outline-none focus:border-custom-yellow rounded-md border"
                        required
                        placeholder="password"
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

                  <div className="my-1 flex flex-col lg:flex-row lg:items-center">
                    <label htmlFor="" className="font-semibold lg:w-44">
                      Pilih Jenis Kelamin
                    </label>
                    <select
                      value={genderId}
                      onChange={handleChangeGender}
                      className="w-full px-3 py-2 outline-none rounded-md text-black focus:border-custom-yellow"
                    >
                      {gender?.map((item) => (
                        <option value={item?.id}>{item?.name}</option>
                      ))}
                    </select>
                  </div>

                  <div className="my-1 flex flex-col lg:flex-row lg:items-center">
                    <label htmlFor="" className="font-semibold lg:w-44">
                      Pilih Kategory
                    </label>
                    <select
                      value={registrationCategoryId}
                      onChange={handleRegisterCategory}
                      className="w-full px-3 py-2 outline-none rounded-md text-black focus:border-custom-yellow"
                    >
                      {registrationCategory?.map((item) => (
                        <option value={item?.id}>{item?.name}</option>
                      ))}
                    </select>
                  </div>
                  {registrationSubCategory.length !== 0 &&
                  Array.isArray(registrationSubCategory) ? (
                    <div className="my-1 flex flex-col lg:flex-row lg:items-center">
                      <label htmlFor="" className="font-semibold lg:w-44">
                        Pilih Lembaga
                      </label>
                      <select
                        value={registrationSubCategoryId}
                        onChange={handleRegisterSubCategory}
                        className="w-full px-3 py-2 outline-none rounded-md text-black focus:border-custom-yellow"
                      >
                        {registrationSubCategory?.map((item) => (
                          <option value={item?.id}>{item?.name}</option>
                        ))}
                      </select>
                    </div>
                  ) : (
                    <div></div>
                  )}
                </div>

                <div className="flex flex-col space-y-3 mt-5">
                  <button
                    type="submit"
                    className="flex items-center justify-center bg-custom-yellow/80 hover:bg-custom-yellow rounded-md w-full h-10 font-semibold text-black transition-colors"
                  >
                    {loading === true ? (
                      <SpinnerWave></SpinnerWave>
                    ) : (
                      <p>Daftar</p>
                    )}
                    
                  </button>
                  <div className="flex items-center justify-center space-x-3">
                    <p className="text-center">Tidak memiliki akun..?</p>
                    <button type="button" onClick={() => navigate("/login")}>
                      <div className="text-custom-yellow hover:text-yellow-400">
                        Login
                      </div>
                    </button>
                  </div>
                  <Link
                    to="/"
                    className="text-custom-yellow hover:text-yellow-400 text-center"
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

export default Register;
