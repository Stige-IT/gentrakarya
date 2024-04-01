import Background from "../../assets/images/background-login.svg"
import Logo from '../../assets/images/Logo.svg'
import Icon from "../../assets/images/icon.svg"
import { Helmet } from 'react-helmet'
import { Link, useLocation, useNavigate } from "react-router-dom"
import { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEye } from "@fortawesome/free-solid-svg-icons"

const CreateNewPassword = () => {
    const navigate = useNavigate()
    const location = useLocation()

    const queryParams = new URLSearchParams(location.search);
    const email = queryParams.get('email');

    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false)

    const [password, setPassword] = useState('')
    const [passwordConfirmation, setPasswordConfirmation] = useState('')

    const handleShowPassword = () => {
        if (showPassword === true) {
            setShowPassword(false)
        } else {
            setShowPassword(true)
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setLoading(true)
        CreateNewPassword(email, password, passwordConfirmation).then((response) => {
            console.log(response);
            if (response && response.status === 200) {
                setLoading(false)
                navigate('/login')
            } else {
                setLoading(false)
                alert('gagal membuat password baru..!')
            }
        })
    }

    return (
        <>
            <Helmet>
                <title>Buat Password Baru</title>
            </Helmet>
            <form onSubmit={handleSubmit}>
                <div className="hidden  w-full lg:flex text-white bg-cover" style={{ backgroundImage: `url(${Background})` }}>
                    <div className="w-full bg-black/30 flex flex-col lg:flex-row px-5 lg:px-0">
                        <div className="w-full lg:w-1/2 h-screen flex items-center justify-center ">
                            <div className="w-full lg:w-[70%] bg-black/30 backdrop-blur-md rounded-xl p-5">
                                <div className="flex space-x-3 items-center w-full justify-center">
                                    <img src={Logo} alt="Logo Gentra Karya" />
                                    <p className="text-3xl font-bold">
                                        Buat Password Baru
                                    </p>
                                </div>
                                {/* Input */}
                                <div className="my-3 flex flex-col space-y-3">
                                    <div className="my-1">
                                        <label htmlFor="password" className="font-semibold">Password Baru</label>
                                        <div className="w-full relative">
                                            <input
                                                type={showPassword === true ? 'text' : 'password'}
                                                name="password"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                className="block text-black w-full px-3 py-2 outline-none focus:border-custom-yellow rounded-md border" required />
                                        </div>
                                    </div>

                                    <div className="my-1">
                                        <label htmlFor="password" className="font-semibold">Konfirmasi Password Baru</label>
                                        <div className="w-full relative">
                                            <input
                                                type={showPassword === true ? 'text' : 'password'}
                                                name="password"
                                                value={passwordConfirmation}
                                                onChange={(e) => setPasswordConfirmation(e.target.value)}
                                                className="block text-black w-full px-3 py-2 outline-none focus:border-custom-yellow rounded-md border" required />
                                        </div>
                                    </div>

                                    <button type="button" onClick={handleShowPassword} className={`flex items-center space-x-3 hover:text-custom-yellow transition-colors ${showPassword === true ? 'text-custom-yellow' : 'text-white'}`}>
                                        <FontAwesomeIcon icon={faEye}></FontAwesomeIcon>
                                        <p>Perlihatkan pasword</p>
                                    </button>
                                </div>


                                <div className="flex flex-col space-y-3 mt-5">
                                    <button type="submit" className="px-5 py-2 bg-custom-yellow/80 hover:bg-custom-yellow rounded-md w-full font-semibold text-black transition-colors flex items-center justify-center space-x-3">
                                        {loading === true ? <div className="w-5 aspect-square bg-black animate-spin"></div> : ''}
                                        <p>Simpan Perubahan</p>
                                    </button>
                                    <Link to="/" className="text-custom-yellow hover:text-yellow-400 text-center">kembali ke halaman utama</Link>
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
    )
}

export default CreateNewPassword