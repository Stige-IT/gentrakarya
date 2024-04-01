import { Helmet } from "react-helmet"
import { useEffect, useState } from "react"
import { deletePengguna, getPengguna, searchPengguna } from "../../../services/pengguna_service";
import { useNavigate } from "react-router-dom";
import { getGender } from "../../../services/gender_service";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faEye, faTrash } from "@fortawesome/free-solid-svg-icons";
import { BaseURL } from "../../../services/base_url";
import { initials } from "../../../services/initial";
import { useRef } from "react";
import Layout from "../../../components/layout";
import Header from "../../../components/header";

const Pengguna = () => {
    const modalAddRef = useRef(null);
    const navigate = useNavigate()
    const [accessToken, setAccessToken] = useState('')
    const [data, setData] = useState([])
    let [number, setNumber] = useState(1);
    const [totalData, setTotalData] = useState(0)
    const [currentPage, setCurrentPage] = useState(1)

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirmation, setPasswordConfirmation] = useState('')

    const [gender, setGender] = useState([])
    const [genderId, setGenderId] = useState(null)

    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false)
    const [loadingAdd, setLoadingAdd] = useState(false)

    const [keyword, setKeyword] = useState('')
    const [showModalAdd, setShowModalAdd] = useState(false)
    const [openPopover, setOpenPopover] = useState(false)

    useEffect(() => {
        const accessToken = localStorage.getItem('access_token')
        setAccessToken(accessToken)
        if (accessToken === null || accessToken === '') {
            navigate('/login')
        } else {
            getPengguna(accessToken).then((response) => {
                // console.log(response.data.data);
                if (response && response.status === 200) {
                    setData(response.data.data)
                    setTotalData(response.data.total)
                    setNumber(response.data.from)
                    setCurrentPage(response.data.current_page)
                } else {
                    setData([])
                    setTotalData([])
                    setNumber(1)
                    setCurrentPage(1)
                }
            })

            getGender().then((response) => {
                if (response && response.status === 200) {
                    setGender(response.data.data)
                    if (response.data.data.length > 0) {
                        setGenderId(response.data.data[0].id)
                    } else {
                        setGenderId(null)
                    }
                } else {
                    setGender([])
                }
            })

        }

    }, [navigate, accessToken, currentPage])

    const handleShowPassword = () => {
        if (showPassword === true) {
            setShowPassword(false)
        } else {
            setShowPassword(true)
        }
    }


    const handleSearch = (e) => {
        e.preventDefault()
        searchPengguna(accessToken, keyword).then((response) => {
            console.log(response.data.data);
            if (response && response.status === 200) {
                setData(response.data.data)
                setTotalData(response.data.total)
                setNumber(response.data.from)
                setCurrentPage(response.data.current_page)
            } else {
                setData([])
                setTotalData([])
                setNumber(1)
                setCurrentPage(1)
            }
        })
    }
    const handleDeletePengguna = (penggunaId) => {
        deletePengguna(accessToken, penggunaId).then((response) => {
            console.log(response);
        })
        getPengguna(accessToken).then((response) => {
            // console.log(response.data.data);
            if (response && response.status === 200) {
                setData(response.data.data)
                setTotalData(response.data.total)
                setNumber(response.data.from)
                setCurrentPage(response.data.current_page)
            } else {
                setData([])
                setTotalData([])
                setNumber(1)
                setCurrentPage(1)
            }
        })
    }

    const handleShowModalAdd = (e) => {
        if (showModalAdd === true) {
            setShowModalAdd(false)
        } else {
            setShowModalAdd(true)
        }
    }

    const handleOpenPopover = () => {
        if (openPopover === false) {
            setOpenPopover(true)
        } else {
            setOpenPopover(false)
        }
    }

    return (
        <>
            <Helmet>
                <title>Pengguna - Gentra Karya</title>
            </Helmet>
            <Layout>
                <Header>
                    <p>Data Pengguna <span className="text-xl">({totalData})</span></p>
                </Header>
                <div className="w-full px-5 flex items-center justify-between">
                    {/* Search */}
                    <div class="py-3">
                        <form action="" onSubmit={handleSearch}>
                            <div class="relative flex w-full flex-wrap items-stretch">
                                <input
                                    type="search"
                                    class="relative m-0 -mr-0.5 block min-w-0 flex-auto rounded-l border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
                                    placeholder="Search"
                                    aria-label="Search"
                                    value={keyword}
                                    onChange={(e) => setKeyword(e.target.value)}
                                    aria-describedby="button-addon1" />

                                {/* <!--Search button--> */}
                                <button
                                    class="relative z-[2] flex items-center rounded-r bg-primary px-6 py-2.5 text-xs font-medium uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out hover:bg-primary-700 hover:shadow-lg focus:bg-primary-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-primary-800 active:shadow-lg"
                                    type="submit"
                                    id="button-addon1"
                                    data-te-ripple-init
                                    data-te-ripple-color="light">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                        class="h-5 w-5">
                                        <path
                                            fill-rule="evenodd"
                                            d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                                            clip-rule="evenodd" />
                                    </svg>
                                </button>
                            </div>
                        </form>
                    </div>

                    <div className="dropdown">
                        <label className="btn btn-solid-primary my-2" tabIndex="0">Filter</label>
                        <div className="dropdown-menu">
                            <a className="dropdown-item text-sm">Profile</a>
                            <a tabIndex="-1" className="dropdown-item text-sm">Account settings</a>
                            <a tabIndex="-1" className="dropdown-item text-sm">Subscriptions</a>
                        </div>
                    </div>
                </div>
                <div className="w-full px-5">
                    <table className="w-full">
                        <thead>
                            <tr className="bg-blue-300">
                                <th className="px-3 py-2">No</th>
                                <th className="px-3 py-2">Profile</th>
                                <th className="px-3 py-2">Nama</th>
                                <th className="px-3 py-2">Email</th>
                                <th className="px-3 py-2 text-center w-fit" colSpan={3}>Aksi</th>
                            </tr>
                        </thead>
                        <tbody>

                            {data?.map((item) => (
                                <tr className={`hover:bg-gray-300 ${number % 2 === 0 ? 'bg-gray-200' : ''}`}>
                                    <td className="px-3 py-2 text-center">{number++}</td>
                                    <td className="px-3 py-2 ">
                                        {item?.image === null ?
                                            <div className="w-14 aspect-square bg-gray-400 rounded-full flex items-center justify-center font-semibold mx-auto">
                                                {initials(item.name)}
                                            </div> :
                                            <img src={BaseURL + item?.image} alt="Foto Profile Pengguna - Gentra Karya" className="w-14 aspect-square rounded-full object-cover mx-auto" />
                                        }
                                    </td>
                                    <td className="px-3 py-2">{item?.name}</td>
                                    <td className="px-3 py-2">{item?.email}</td>
                                    <td className="px-3 py-2 w-20 h-full  transition-colors">
                                        <button
                                            type="button"
                                            id="dropdownMenuButton1u"
                                            data-te-dropdown-toggle-ref
                                            aria-expanded="false"
                                            data-te-ripple-init
                                            data-te-ripple-color="light"
                                            className="my-2 btn btn-solid-success" >
                                            <FontAwesomeIcon icon={faEye}></FontAwesomeIcon>
                                        </button>
                                    </td>
                                    <td className="px-3 py-2 w-20 h-full transition-colors">
                                        <button onClick={handleOpenPopover} type="button" className=" my-2 btn btn-solid-warning">
                                            <FontAwesomeIcon icon={faEdit}></FontAwesomeIcon>
                                        </button>
                                    </td>
                                    <td className="px-3 py-2 w-20 h-full transition-colors">
                                        <div className="dropdown">
                                            <label className="btn btn-solid-primary my-2" tabIndex="0">
                                                <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon>
                                            </label>
                                            <div className="dropdown-menu w-72">
                                                <div className="p-5 flex flex-col items-center justify-center space-y-3 ">
                                                    <svg width="60" height="60" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M24 4C12.96 4 4 12.96 4 24C4 35.04 12.96 44 24 44C35.04 44 44 35.04 44 24C44 12.96 35.04 4 24 4ZM24 26C22.9 26 22 25.1 22 24V16C22 14.9 22.9 14 24 14C25.1 14 26 14.9 26 16V24C26 25.1 25.1 26 24 26ZM26 34H22V30H26V34Z" fill="#E92C2C" />
                                                    </svg>
                                                    <p className="text-center">Apakah Anda yakin akan menghapus Pengguna ini..?</p>
                                                    <div className="flex items-center space-x-3 text-sm text-white">
                                                        <label className="btn btn-success w-32">
                                                            Tidak
                                                        </label>

                                                        <label onClick={() => handleDeletePengguna(item?.id)} className="btn btn-error w-32">
                                                            Ya
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="flex items-center justify-end w-full bg-blue-300 px-3 py-2">
                        <div className="pagination ">
                            <button className="btn">
                                <svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M12.2574 5.59165C11.9324 5.26665 11.4074 5.26665 11.0824 5.59165L7.25742 9.41665C6.93242 9.74165 6.93242 10.2667 7.25742 10.5917L11.0824 14.4167C11.4074 14.7417 11.9324 14.7417 12.2574 14.4167C12.5824 14.0917 12.5824 13.5667 12.2574 13.2417L9.02409 9.99998L12.2574 6.76665C12.5824 6.44165 12.5741 5.90832 12.2574 5.59165Z" fill="#969696" />
                                </svg>
                            </button>
                            <button className="btn btn-active">1</button>
                            <button className="btn">2</button>
                            <button className="btn">3</button>
                            <button className="btn">
                                <svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M7.74375 5.2448C7.41875 5.5698 7.41875 6.0948 7.74375 6.4198L10.9771 9.65314L7.74375 12.8865C7.41875 13.2115 7.41875 13.7365 7.74375 14.0615C8.06875 14.3865 8.59375 14.3865 8.91875 14.0615L12.7437 10.2365C13.0687 9.91147 13.0687 9.38647 12.7437 9.06147L8.91875 5.23647C8.60208 4.9198 8.06875 4.9198 7.74375 5.2448Z" fill="#969696" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    )
}

export default Pengguna