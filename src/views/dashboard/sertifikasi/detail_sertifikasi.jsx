import { Helmet } from "react-helmet"
import Layout from "../../../components/dashboard_component/layout"
import Header from "../../../components/dashboard_component/header"
import TemplateTextMagang from "../../../components/template_text_magang"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronCircleLeft, faLocation, faLocationDot, faPlus } from "@fortawesome/free-solid-svg-icons"
import { useEffect, useState } from "react"
import {
    Modal,
    Ripple,
    initTE,
} from "tw-elements";
import { useParams } from "react-router-dom"
import FormatDateTime from "../../../components/format_datetime"
import FormatDate from "../../../components/format_date"
import { ReactHTML } from "react"
import { BaseURL } from "../../../services/base_url"
import { showSertifikasi } from "../../../services/sertifikasi_service"
import { deleteImageGalerySertifikasi, getImageSertifikasi } from "../../../services/image_sertifikasi_service"
import AddImageGalerySertifikasi from "./add_image_galery"

const DetailSertifikasi = () => {

    const { sertifikasi_id } = useParams()
    const [selectedImage, setSelectedImage] = useState(null);
    const [accessToken, setAccessToken] = useState('')
    const [data, setData] = useState([])
    const [imageGalery, setImageGalery] = useState([])

    const handleImageChange = (event) => {
        setSelectedImage(event.target.files[0]);
    };

    const handleSubmit = (e) => {
        e.preventDefault()
        // postImageSlider(accessToken, selectedImage).then((response) => {
        //     console.log(response);
        //     if (response && response.status === 200) {
        //         getImageslider().then((response) => {
        //             if (response && response.status === 200) {
        //                 setData(response.data.data)
        //             } else {
        //                 setData([])
        //             }
        //         })
        //     } else {
        //         alert('gagal tambah data..!')
        //     }

        // })
    }

    const addListClass = (htmlContent) => {
        return htmlContent.replace(/<ol>/g, '<ol class="list-decimal pl-10">');
    };

    const handleDeleteImage = (imageId) => {
        deleteImageGalerySertifikasi(accessToken, imageId).then((response) => {
            console.log(response);
            getImageSertifikasi(sertifikasi_id).then((response) => {
                if (response && response.status === 200) {
                    setImageGalery(response.data.data)
                } else {
                    setImageGalery([])
                }
            })
        })
    }

    useEffect(() => {
        const accessToken = localStorage.getItem('access_token')
        setAccessToken(accessToken)

        showSertifikasi(sertifikasi_id).then((response) => {
            if (response && response.status === 200) {
                setData(response.data.data)
            } else {
                setData([])
            }

        })

        getImageSertifikasi(sertifikasi_id).then((response) => {
            if (response && response.status === 200) {
                setImageGalery(response.data.data)
            } else {
                setImageGalery([])
            }
        })

        // initTE({ Modal, Ripple });
    }, [])
    return (
        <>
            <Helmet>Detail Informasi Sertifikasi</Helmet>
            <Layout>
                <Header>
                    <a href="/dashboard/sertifikasi" className="flex items-center space-x-3">
                        <FontAwesomeIcon icon={faChevronCircleLeft}></FontAwesomeIcon>
                        <p className="text-sm">Kembali</p>
                    </a>
                    <p>Detail Informasi Sertifikasi</p>
                </Header>
                <div className="w-full px-3 md:px-5 lg:px-10 py-5">
                    <p className="text-2xl font-semibold text-center uppercase bg-gray-300 py-2">{data?.judul_sertifikasi}</p>
                    <div className="w-full flex items-center justify-between mb-5 my-3">
                        <p className="space-x-2">
                            <span className="font-semibold">Dibuat pada :</span>
                            <span><FormatDateTime dateTime={data?.created_at}></FormatDateTime></span>
                        </p>
                        <p className="space-x-2">
                            <span className="font-semibold">Berakhir pada :</span>
                            <span><FormatDate date={data?.expired_at}></FormatDate></span>
                        </p>
                    </div>

                    <div className="w-full flex flex-col lg:flex-row lg:space-x-3 space-y-3 lg:space-y-0">

                        {/* Left Content */}
                        <div className="w-full lg:w-[65%] space-y-3 md:space-y-0">
                            <div className="w-full lg:hidden flex justify-center lg:justify-end mb-3 ">
                                <div className="w-[80%] lg:w-1/2 mx- aspect-video bg-black rounded-xl"></div>
                            </div>
                            <TemplateTextMagang name="Nama Peusahaan" value={data?.profile_lembaga?.nama_lembaga}></TemplateTextMagang>
                            <TemplateTextMagang name="Lembaga" value={data?.profile_lembaga?.lembaga?.name}></TemplateTextMagang>
                            <TemplateTextMagang name="Judul Sertifikasi" value={data?.judul_sertifikasi}></TemplateTextMagang>
                            <TemplateTextMagang name="Biaya Sertifikasi" value={data?.biaya_sertifikasi}></TemplateTextMagang>
                            <TemplateTextMagang name="Metoda Sertifikasi" value={data?.metoda}></TemplateTextMagang>
                            <TemplateTextMagang name="Tanggal Pelaksanaan" value={<FormatDateTime dateTime={data?.tanggal_pelaksanaan}></FormatDateTime>}></TemplateTextMagang>
                            <TemplateTextMagang name="No Telepon / Wa" value={data?.no_telepon}></TemplateTextMagang>
                            <TemplateTextMagang name="Email" value={data?.email}></TemplateTextMagang>
                        </div>

                        {/* Right Content */}
                        <div className="w-full lg:w-[35%] space-y-3 lg:space-y-0">
                            <div className="w-full hidden lg:flex justify-center lg:justify-end mb-3">
                                <div className="w-[80%] lg:w-1/2 mx- aspect-video bg-black rounded-md"></div>
                            </div>
                            <TemplateTextMagang width="w-32" name="Provinsi" value={data?.address?.province?.name}></TemplateTextMagang>
                            <TemplateTextMagang width="w-32" name="Kabupaten / Kota" value={data?.address?.regency?.name}></TemplateTextMagang>
                            <TemplateTextMagang width="w-32" name="Kecamatan" value={data?.address?.district?.name}></TemplateTextMagang>
                            <TemplateTextMagang width="w-32" name="Desa / Kelurahan" value={data?.address?.village?.name}></TemplateTextMagang>
                            <a href="https://maps.app.goo.gl/nHfid9j8pW5rg1VF8" target="_blank" className="text-blue-500 hover:text-blue-600 transition-colors flex items-center space-x-3 py-3">
                                <FontAwesomeIcon icon={faLocationDot}></FontAwesomeIcon>
                                <p>Klik Link Map</p>
                            </a>
                            <div>
                                <p>Detail Alamat :</p>
                                <p>
                                    {data?.address?.detail}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="w-full mt-5">
                        <p className="border-b-2 font-semibold">Detail Sertifikasi :</p>
                        <div dangerouslySetInnerHTML={{ __html: addListClass(data?.detail ?? '') }} />
                    </div>

                    <div className="w-full mt-5">
                        <div className="flex items-center justify-between bg-gray-300 py-2 px-3 mb-3">
                            <p className="font-semibold ">Galeri Sertifikasi :</p>
                            <AddImageGalerySertifikasi sertifikasi_id={sertifikasi_id}></AddImageGalerySertifikasi>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-3">
                            {imageGalery?.map((item) => (
                                <div className="w-full aspect-video bg-gray-300 rounded-md overflow-hidden relative object-center group">
                                    <img src={BaseURL + item?.image} alt={item?.image} className="w-full aspect-video object-center object-contain" />
                                    <button type="button" onClick={() => handleDeleteImage(item?.id)} className="absolute bottom-0 bg-red-500 hover:bg-red-600 text-white transiti duration-500 w-full h-0 group-hover:py-2  group-hover:h-10 ">
                                        Hapus Gambar
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </Layout>

            {/* Moadl Add Galery */}
            <form onSubmit={handleSubmit}>
                <div
                    data-te-modal-init
                    class="fixed left-0 top-0 z-[1055] hidden h-full w-full overflow-y-auto overflow-x-hidden outline-none"
                    id="exampleModalCenter"
                    tabindex="-1"
                    aria-labelledby="exampleModalCenterTitle"
                    aria-modal="true"
                    role="dialog">
                    <div
                        data-te-modal-dialog-ref
                        class="pointer-events-none relative flex min-h-[calc(100%-1rem)] w-auto translate-y-[-50px] items-center opacity-0 transition-all duration-300 ease-in-out min-[576px]:mx-auto min-[576px]:mt-7 min-[576px]:min-h-[calc(100%-3.5rem)] min-[576px]:max-w-[500px]">
                        <div
                            class="pointer-events-auto relative flex w-full flex-col rounded-md border-none bg-white bg-clip-padding text-current shadow-lg outline-none dark:bg-neutral-600">
                            <div
                                class="flex flex-shrink-0 items-center justify-between rounded-t-md border-b-2 border-neutral-100 border-opacity-100 p-4 dark:border-opacity-50">
                                {/* <!--Modal title--> */}
                                <h5
                                    class="text-xl font-medium leading-normal text-neutral-800 dark:text-neutral-200"
                                    id="exampleModalCenterTitle">
                                    Tambah Image Galery
                                </h5>
                                {/* <!--Close button--> */}
                                <button
                                    type="button"
                                    class="box-content rounded-none border-none hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none"
                                    data-te-modal-dismiss
                                    aria-label="Close">
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
                                            d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>

                            {/* <!--Modal body--> */}
                            <div class="relative p-4">
                                <div className="w-full">
                                    <label htmlFor=""></label>
                                    <input type="file" className="w-full" multiple accept="image/*" onChange={handleImageChange} />

                                </div>
                            </div>

                            {/* <!--Modal footer--> */}
                            <div
                                class="flex flex-shrink-0 flex-wrap items-center justify-end rounded-b-md border-t-2 border-neutral-100 border-opacity-100 p-4 dark:border-opacity-50">
                                <button
                                    type="button"
                                    class="inline-block rounded bg-primary-100 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-primary-700 transition duration-150 ease-in-out hover:bg-primary-accent-100 focus:bg-primary-accent-100 focus:outline-none focus:ring-0 active:bg-primary-accent-200"
                                    data-te-modal-dismiss
                                    data-te-ripple-init
                                    data-te-ripple-color="light">
                                    Kembali
                                </button>
                                <button
                                    type="submit"
                                    class="ml-1 inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                                    data-te-ripple-init
                                    data-te-ripple-color="light">
                                    Simpan
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </>
    )
}

export default DetailSertifikasi