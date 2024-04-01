import { Helmet } from "react-helmet"
import Layout from "../../../components/dashboard_component/layout"
import Header from "../../../components/dashboard_component/header"
import TemplateInput from "../../../components/template_input"
import { Collapse, Ripple, initTE } from 'tw-elements'
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getProfile } from "../../../services/auth_service"
import { getProfileLembaga } from "../../../services/profile_lembaga_service"
import EditProfileLembaga from "./edit_profile_lembaga"
import { Modal } from 'flowbite-react';
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
// import { faEdit } from "@fortawesome/free-solid-svg-icons"
import EditFotoProfile from "./edit_foto_profile"
import { BaseURL } from "../../../services/base_url"
import EditAddress from "./edit_address"
import { getAddress } from "../../../services/address_service"
import EditFotoProfileLembaga from "./edit_foto_profile_lembaga"

const Pengaturan = () => {
    const navigate = useNavigate()

    const [accessToken, setAccessToken] = useState('')
    const [profile, setProfile] = useState(null)
    const [profileLembaga, setProfileLembaga] = useState(null)
    // const [address, setAddress] = useState(null)

    // const [profileData, setProfileData] = useState(null);

    const handleProfileUpdate = (updatedProfileData) => {
        getProfileLembaga(accessToken).then((response) => {
            if (response && response.status === 200) {
                setProfileLembaga(response.data.data)
            } else {
                setProfileLembaga(null)
            }
        })

        getProfile(accessToken).then((response) => {
            if (response && response.status === 200) {
                setProfile(response.data.data)
            } else {
                setProfile(null)
            }
        })
    };

    useEffect(() => {
        const accessToken = localStorage.getItem('access_token')
        setAccessToken(accessToken)

        // Lakukan penyegaran halaman
        if (accessToken === '' || accessToken === null) {
            navigate('/login')
        } else {
            getProfile(accessToken).then((response) => {
                if (response && response.status === 200) {
                    setProfile(response.data.data)
                } else {
                    setProfile(null)
                }
            })

            const registrationCategory = localStorage.getItem('registration_category');

            if (registrationCategory === 'LEMBAGA') {
                getProfileLembaga(accessToken).then((response) => {
                    if (response && response.status === 200) {
                        setProfileLembaga(response.data.data)
                    } else {
                        setProfileLembaga(null)
                    }
                })
            }

            getAddress(accessToken).then((response) => {
                if (response && response.status === 200) {
                    // setAddress(response.data.data)
                } else {
                    // setAddress(null)
                }
            });
        }

        initTE({ Collapse, Modal, Ripple, })
    }, [navigate])

    return (
        <>
            <Helmet>
                <title>Pengaturan Akun</title>
            </Helmet>
            <Layout>
                <Header>
                    <div></div>
                    <p className="text-lg uppercase">Pengaturan</p>
                    <div></div>
                </Header>

                {/* Setting Akun */}
                <div
                    class="border border-t-0 border-neutral-200 bg-white dark:border-neutral-600 dark:bg-neutral-800">
                    <h2 class="mb-0" id="headingTwo5">
                        <button
                            class="group relative flex w-full items-center rounded-t-[15px] border-0 bg-white px-5 py-4 text-left text-base text-neutral-800 transition [overflow-anchor:none] hover:z-[2] focus:z-[3] focus:outline-none dark:bg-neutral-800 dark:text-white [&:not([data-te-collapse-collapsed])]:bg-white [&:not([data-te-collapse-collapsed])]:text-primary [&:not([data-te-collapse-collapsed])]:[box-shadow:inset_0_-1px_0_rgba(229,231,235)] dark:[&:not([data-te-collapse-collapsed])]:bg-neutral-800 dark:[&:not([data-te-collapse-collapsed])]:text-primary-400 dark:[&:not([data-te-collapse-collapsed])]:[box-shadow:inset_0_-1px_0_rgba(75,85,99)] font-semibold"
                            type="button"
                            data-te-collapse-init
                            data-te-target="#collapseOne5"
                            aria-expanded="true"
                            aria-controls="collapseOne5">
                            Pengaturan Akun
                            <span
                                class="-mr-1 ml-auto h-5 w-5 shrink-0 rotate-[-180deg] fill-[#336dec] transition-transform duration-200 ease-in-out group-[[data-te-collapse-collapsed]]:mr-0 group-[[data-te-collapse-collapsed]]:rotate-0 group-[[data-te-collapse-collapsed]]:fill-[#212529] motion-reduce:transition-none dark:fill-blue-300 dark:group-[[data-te-collapse-collapsed]]:fill-white">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke-width="1.5"
                                    stroke="currentColor"
                                    class="h-6 w-6">
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                </svg>
                            </span>
                        </button>
                    </h2>
                    <div
                        id="collapseOne5"
                        class="!visible"
                        data-te-collapse-item
                        data-te-collapse-show
                        aria-labelledby="headingOne5">
                        <div className="pr-5 md:pr-5 md:pl-16 flex flex-col md:flex-row items-center justify-center space-x-3 py-2">
                            <div className="w-full md:w-[40%]">
                                <div className="w-[70%] aspect-square rounded-xl bg-gray-400 relative overflow-hidden mx-auto shadow-md">
                                    <EditFotoProfile></EditFotoProfile>
                                    <img src={BaseURL + profile?.image} alt="Foto Profil Pengguna Gentra Karya" className="w-full aspect-square" />
                                </div>
                            </div>
                            <div class="w-full md:w-[60%]  py-4 flex flex-col space-y-3">
                                <TemplateInput name="Nama Lengkap" typeInput="text" value={profile?.name} ></TemplateInput>
                                <TemplateInput name="Email" typeInput="text" value={profile?.email} ></TemplateInput>
                                <TemplateInput name="No Telepon" typeInput="text" value={profile?.phone_number} ></TemplateInput>
                                <TemplateInput name="Jenis Kelamin" typeInput="text" value={profile?.gender} ></TemplateInput>
                                <TemplateInput name="Kategori Registrasi" typeInput="text" value={profile?.registration_category?.name}></TemplateInput>
                                {profile?.registration_sub_category === null ? '' :
                                    <TemplateInput name="Sub Kategori Registrasi" typeInput="text" value={profile?.registration_sub_category?.name ?? null}></TemplateInput>
                                }

                            </div>
                        </div>
                    </div>
                </div>

                {/* Setting Lembaga / Perusahaan */}
                {profile?.registration_category?.name !== 'LEMBAGA' ? '' :
                    <div
                        class="border border-t-0 border-neutral-200 bg-white dark:border-neutral-600 dark:bg-neutral-800">
                        <h2 class="mb-0" id="heading2">
                            <button
                                class="group relative flex w-full items-center rounded-none border-0 bg-white px-5 py-4 text-left text-base text-neutral-800 transition [overflow-anchor:none] hover:z-[2] focus:z-[3] focus:outline-none dark:bg-neutral-800 dark:text-white [&:not([data-te-collapse-collapsed])]:bg-white [&:not([data-te-collapse-collapsed])]:text-primary [&:not([data-te-collapse-collapsed])]:[box-shadow:inset_0_-1px_0_rgba(229,231,235)] dark:[&:not([data-te-collapse-collapsed])]:bg-neutral-800 dark:[&:not([data-te-collapse-collapsed])]:text-primary-400 dark:[&:not([data-te-collapse-collapsed])]:[box-shadow:inset_0_-1px_0_rgba(75,85,99)] font-semibold"
                                type="button"
                                data-te-collapse-init
                                data-te-collapse-collapsed
                                data-te-target="#collapse2"
                                aria-expanded="false"
                                aria-controls="collapse2">
                                Pengaturan Lembaga / Perusahaan
                                <span
                                    class="-mr-1 ml-auto h-5 w-5 shrink-0 rotate-[-180deg] fill-[#336dec] transition-transform duration-200 ease-in-out group-[[data-te-collapse-collapsed]]:mr-0 group-[[data-te-collapse-collapsed]]:rotate-0 group-[[data-te-collapse-collapsed]]:fill-[#212529] motion-reduce:transition-none dark:fill-blue-300 dark:group-[[data-te-collapse-collapsed]]:fill-white">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke-width="1.5"
                                        stroke="currentColor"
                                        class="h-6 w-6">
                                        <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                    </svg>
                                </span>
                            </button>
                        </h2>
                        <div
                            id="collapse2"
                            class="!visible hidden"
                            data-te-collapse-item
                            aria-labelledby="headingTwo5">
                            <div className="px-5 md:pr-5 md:pl-16 flex flex-col md:flex-row md:space-x-3 space-y-3 md:space-y-0">
                                <div className="w-full md:w-1/2 py-4 space-y-3">
                                    <div className="w-1/2 aspect-video rounded-xl bg-gray-400 mx-auto overflow-hidden border shadow-md relative">
                                        {profileLembaga?.image === null ? '' : <img src={BaseURL + profileLembaga?.image} alt="Profile Lembaga - Gentra Karya" className="w-full aspect-video object-cover" />}
                                        <EditFotoProfileLembaga></EditFotoProfileLembaga>
                                    </div>
                                    <TemplateInput name="Nama Lembaga / Perusahaan" value={profileLembaga?.nama_lembaga} typeInput="text" disabled={true} ></TemplateInput>
                                    <TemplateInput name="Lembaga" typeInput="text" value={profileLembaga?.lembaga?.name} disabled={true} ></TemplateInput>
                                    <TemplateInput name="Nama Penanggun Jawab" value={profileLembaga?.nama_penanggung_jawab} typeInput="text" disabled={true}></TemplateInput>
                                    <TemplateInput name="No Telepon" subName="( terdapat pada akun )" value={profileLembaga?.no_telepon} typeInput="text" disabled={true}></TemplateInput>
                                    <TemplateInput name="Email" subName="( terdapat pada akun )" value={profileLembaga?.email} typeInput="text" disabled={true}></TemplateInput>
                                    <EditProfileLembaga onProfileUpdate={handleProfileUpdate}></EditProfileLembaga>
                                </div>

                                <div class="py-4 flex flex-col space-y-3 w-full md:w-1/2">
                                    <div>
                                        <label htmlFor="" className="font-semibold">Provinsi</label>
                                        <select className="w-full py-2 focus:border-yellow-400 border-2 rounded-md outline-none" disabled>
                                            <option value="0" >{profile?.address?.province?.name}</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label htmlFor="" className="font-semibold">Kabupaten</label>
                                        <select className="w-full py-2 focus:border-yellow-400 border-2 rounded-md outline-none" disabled>
                                            <option value="0" >{profile?.address?.regency?.name}</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label htmlFor="" className="font-semibold">Kecamatan</label>
                                        <select className="w-full py-2 focus:border-yellow-400 border-2 rounded-md outline-none " disabled>
                                            <option value="0" >{profile?.address?.district?.name}</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label htmlFor="" className="font-semibold">Kelurahan</label>
                                        <select className="w-full py-2 focus:border-yellow-400 border-2 rounded-md outline-none" disabled>
                                            <option value="0" >{profile?.address?.village?.name}</option>
                                        </select>
                                    </div>

                                    <div className="flex flex-col">
                                        <label htmlFor="" className="font-semibold">Link Google Map (Opsional)</label>
                                        <a href={profile?.address?.map} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-600 transition-colors">Klik Link Map</a>
                                    </div>
                                    <div className="flex flex-col">
                                        <label htmlFor="" className="font-semibold">Detail Alamat</label>
                                        <p>{profile?.address?.detail}</p>
                                    </div>
                                    <EditAddress></EditAddress>
                                </div>
                            </div>
                        </div>
                    </div>}

            </Layout>
        </>
    )
}

export default Pengaturan