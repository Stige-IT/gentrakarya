import { Helmet } from "react-helmet"
import { useEffect, useState } from "react"
import { deleteImageSlider, getImageslider, postImageSlider } from "../../../services/image_slider_service"
import Layout from "../../../components/layout"
import Header from "../../../components/header"
import MyCarousel from "../../landing_page/sections/carousel"

const SlideShow = () => {

    const [selectedImage, setSelectedImage] = useState(null);
    const [accessToken, setAccessToken] = useState('')
    const [data, setData] = useState([])

    const handleDeleteImage = (imageId) => {
        deleteImageSlider(accessToken, imageId).then((response) => {
            if (response && response.status === 200) {
                getImageslider().then((response) => {
                    if (response && response.status === 200) {
                        setData(response.data.data)
                    } else {
                        setData([])
                    }
                })
            } else {
                alert('Gagal Menghapus')
            }
        });
    }

    // const handleImageChange = (event) => {
    //     // Mendapatkan array file gambar yang dipilih oleh pengguna
    //     const files = event.target.files;
    //     setImages(files)

    //     // Mengonversi objek FileList menjadi array
    //     const imagesArray = Array.from(files);

    //     // Menyimpan array file gambar ke dalam state
    //     setSelectedImages(imagesArray);
    // };
    const handleImageChange = (event) => {
        setSelectedImage(event.target.files[0]);
    };

    const handleSubmit = (e) => {
        e.preventDefault()
        postImageSlider(accessToken, selectedImage).then((response) => {
            console.log(response);
            if (response && response.status === 200) {
                getImageslider().then((response) => {
                    if (response && response.status === 200) {
                        setData(response.data.data)
                    } else {
                        setData([])
                    }
                })
            } else {
                alert('gagal tambah data..!')
            }

        })
    }
    useEffect(() => {
        const accessToken = `Bearer ${localStorage.getItem('access_token')}`
        setAccessToken(accessToken)
        getImageslider().then((response) => {
            if (response && response.status === 200) {
                setData(response.data.data)
            } else {
                setData([])
            }
        })
    }, [])

    return (
        <>
            <Helmet>
                <title>Setting Slide Show</title>
            </Helmet>
            <Layout>
                <Header>
                    Setting Slide Show Gentra Karya
                </Header>
                {/* <Carousel className="h-[90%] aspect-video bg-black/30">
                    {images.map((image, index) => {
                        return <img key={index} src={BASEURLIMAGE + image} alt={BASEURLIMAGE + image} className="h-full aspect-video object-contain" />
                    })}
                </Carousel> */}

                <MyCarousel></MyCarousel>
                <div className="h-14 bg-gray-300 w-full flex items-center justify-between px-5">
                    <p className="font-semibold">Daftar Gambar Slide</p>
                    <button
                        type="button"
                        data-te-toggle="modal"
                        data-te-target="#exampleModalCenter"
                        data-te-ripple-init
                        data-te-ripple-color="light"
                        className="px-3 py-2 rounded-md bg-yellow-300 font-semibold hover:bg-yellow-400 transition-colors">
                        Tambah Gambar
                    </button>
                </div>
                <div className="grid grid-cols-3 gap-5 p-5">
                    {data?.map((item) => (
                        // <div className="bg-red-300 w-full aspect-video rounded-xl hover:scale-105 transition-all duration-700"></div>
                        <div className="relative group">
                            <img src={`http://127.0.0.1:8000/${item.image}`} alt="sdsadsd" className="bg-red-300 w-full aspect-video rounded-xl transition-all duration-700 object-cover" />
                            <button type="button" onClick={() => handleDeleteImage(item.id)} className="absolute bottom-0 bg-red-500 w-full h-0 text-white group-hover:h-12 transition-all duration-300 font-semibold">
                                Hapus
                            </button>
                        </div>
                    ))}
                </div>

            </Layout>


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
                                    Tambah Image Slide Show
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
                                {/* {selectedImages.length > 0 && (
                                    <div>
                                        <p>Gambar Terpilih:</p>
                                        <ul>
                                            {selectedImages.map((image, index) => (
                                                <li key={index}>{image.name}</li>
                                            ))}
                                        </ul>
                                    </div>
                                )} */}
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

export default SlideShow