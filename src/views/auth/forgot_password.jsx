import Background from "../../assets/images/background-login.svg"
import Logo from '../../assets/images/Logo.svg'
import Icon from "../../assets/images/icon.svg"
import { Helmet } from 'react-helmet'
import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import { sendEmail } from "../../services/verify_email_service"

const ForgotPassword = () => {
    const navigate = useNavigate()

    const [loading, setLoading] = useState(false)
    const [email, setEmail] = useState('')

    const handlesubmit = (e) => {
        e.preventDefault()
        setLoading(true)
        sendEmail(email).then((response) => {
            if (response && response.status === 200) {
                setLoading(false)
                navigate(`/email-confirmation?email=${email}&type=FORGOT PASSWORD`)
            } else {
                setLoading(false)
                alert('gagal mengirim kode verifikasi..!')
            }
        })
    }

    return (
        <>
            <Helmet>
                <title>Lupa Password</title>
            </Helmet>
            <form onSubmit={handlesubmit}>
                <div className="hidden  w-full lg:flex text-white bg-cover" style={{ backgroundImage: `url(${Background})` }}>
                    <div className="w-full bg-black/30 flex flex-col lg:flex-row px-5 lg:px-0">
                        <div className="w-full lg:w-1/2 h-screen flex items-center justify-center ">
                            <div className="w-full lg:w-[70%] bg-black/30 backdrop-blur-md rounded-xl p-5">
                                <div className="flex space-x-3 items-center w-full justify-center">
                                    <img src={Logo} alt="Logo Gentra Karya" />
                                    <p className="text-3xl font-bold">
                                        Lupa Password
                                    </p>
                                </div>
                                {/* Input */}
                                <div className="my-3 flex flex-col space-y-3">
                                    <div className="my-1">
                                        <label htmlFor="email" className="font-semibold">Email</label>
                                        <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" name="email" className="block text-black w-full px-3 py-2 outline-none focus:border-custom-yellow rounded-md border" placeholder="example@gmail.com" required />
                                    </div>
                                </div>


                                <div className="flex flex-col space-y-3 mt-5">
                                    <button type="submit" className="px-5 py-2 w-1/2 mx-auto bg-custom-yellow/80 hover:bg-custom-yellow rounded-md font-semibold text-black transition-colors flex items-center justify-center space-x-3">
                                        {loading === true ? <div className="w-5 aspect-square bg-black animate-spin"></div> : ''}
                                        <p>Kirim kode Verifikasi</p>
                                    </button>
                                    <Link to="/login" className="text-custom-yellow hover:text-yellow-400 text-center">kembali ke halaman login</Link>
                                </div>
                            </div>
                        </div>
                        <div className="w-1/2 h-screen hidden lg:flex items-center justify-center">
                            <img src={Icon} alt="Icon" />
                        </div>
                    </div>
                </div>
            </form>
        </>
    )
}

export default ForgotPassword