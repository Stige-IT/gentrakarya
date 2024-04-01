import { Helmet } from "react-helmet"

import Backgound from "../../assets/images/background.svg";
import Icon from "../../assets/images/icon.svg";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { resendEmail, verifyEmail } from "../../services/verify_email_service";


const EmailConfirmation = () => {
    const navigate = useNavigate()
    const location = useLocation()

    const queryParams = new URLSearchParams(location.search);
    const email = queryParams.get('email');
    const type = queryParams.get('type');

    const [code, setCode] = useState('')

    const [errorMessage, setErrorMessage] = useState(null)

    const handleChangeCode = (e) => {
        const newCode = e.target.value
        setCode(newCode)
    }

    const handleVerifyEmail = () => {
        if (code === null) {
            setErrorMessage('Kode Verifikasi harus di isi..!')
        } else if (code.length > 6 || code.length < 6) {
            setErrorMessage('Kode harus berjumlah 6')

        } else {

            verifyEmail(email, code, type).then((response) => {
                if (response && response.status === 200) {
                    if (type === 'REGISTER') {
                        navigate('/login')
                    }else{
                        navigate(`/create-new-password?email=${email}`)
                    }
                } else if (response && response.status === 201) {
                    if (response.data.message === 'silahkan daftar terlebih dahulu..!') {
                        setErrorMessage('Akun Anda belum terdaftar, silahkan daftar terlebih dahulu..!')
                    }else if (response.data.message === 'maaf kode yang anda masukan telah kedaluarsa..!'){
                        setErrorMessage('maaf kode yang anda masukan telah kedaluarsa..!')
                    } else {
                        setErrorMessage('maaf kode yang anda masukan salah..!')
                    }
                } else {
                    alert('Koneksi Terputus')
                }
            })
        }
    }

    const handleResenEmail = () => {
        resendEmail(email, type).then((response) => {
            if (response && response.status === 200) {
                alert('Kode verifikasi telah kami kirim ke email Anda..! silahkan cek email')
            }
        })
    }

    useEffect(() => {

    }, [email, type])
    return (
        <>
            <Helmet>
                <title>Konfirmasi Email</title>
            </Helmet>
            <div className="h-screen w-full bg-custom-dark">
                <div
                    id="welcomeSection"
                    className="w-full mx-auto h-[100%] bg-cover text-white"
                    style={{ backgroundImage: `url(${Backgound})` }}
                >
                    <div className="h-full  lg:bg-gradient-to-r lg:from-custom-dark/90 lg:to-custom-blue/75 flex flex-col lg:flex-row items-center justify-center relative px-5 lg:px-0">
                        <div className="lg:w-[65%] md:w-[80%] lg:pl-24 text-center lg:text-start order-2 lg:order-1">
                            <div className="bg-black/30 backdrop-blur-sm flex flex-col items-center justify-center py-10 rounded-3xl px-3">
                                <h1 className="text-4xl lg:text-3xl font-semibold">Verifikasi Akun</h1>
                                <h2 className="text-xs md:text-sm lg:text-base mt-3 lg:mt-0 tracking-wide">
                                    Kode verifikasi telah kami kirim ke email Anda..!
                                </h2>
                                <div className="mt-10 text-center flex flex-col items-center">
                                    <p>Masukan kode verifikasi</p>
                                    <input
                                        value={code}
                                        onChange={handleChangeCode}
                                        type="text"
                                        className="block text-black px-3 py-2 outline-none focus:border-custom-yellow rounded-md borxsder text-5xl font-semibold text-center w-60 tracking-wide"
                                        placeholder="123456" />
                                    {errorMessage === null ? '' : <p className="text-red-400">{errorMessage}</p>}
                                </div>
                                <button
                                    onClick={handleVerifyEmail}
                                    type="button"
                                    className="bg-yellow-300 hover:bg-custom-yellow px-5 py-2 rounded-md font-semibold text-black w-32 mt-5 text-sm "
                                >
                                    Kirim
                                </button>
                                <div className="flex flex-col md:flex-row items-center justify-start md:space-x-3 mt-10">
                                    <p>Belum menerima kode verifikasi..?</p>
                                    <button type="button" onClick={handleResenEmail} className="text-custom-yellow hover:text-yellow-400 transition-colors font-semibold">Kirim ulang kode</button>
                                </div>

                                <button type="button" onClick={() => window.history.back()} className="text-custom-yellow font-semibold mt-10">Kembali</button>
                            </div>
                        </div>
                        <div className="hidden  w-full lg:w-1/2 lg:h-full lg:flex items-center justify-center lg:justify-end  lg:pr-24 order-1 lg:order-2">
                            <img
                                src={Icon}
                                alt="Icon"
                                className="h w-[80%] lg:h-[60%] aspect-square object-contain "
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default EmailConfirmation