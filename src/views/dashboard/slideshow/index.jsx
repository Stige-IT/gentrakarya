import { Helmet } from "react-helmet";
import { useEffect, useState } from "react";
import {
  deleteImageSlider,
  getImageslider,
  postImageSlider,
} from "../../../services/image_slider_service";
import Layout from "../../../components/layout";
import Header from "../../../components/header";
import MyCarousel from "../../landing_page/sections/carousel";
import { useNavigate } from "react-router-dom";
import { BaseURL } from "../../../services/base_url";
import SpinnerWave from "../../../components/spinner/spinner_wave";

const SlideShow = () => {
  const navigate = useNavigate();
  const [accessToken, setAccessToken] = useState("");
  const [data, setData] = useState([]);

  const [openModalAddGalery, setOpenModalAddGalery] = useState(false);
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState([]);
  // const handleSubmit = (e) => {
  //     e.preventDefault()
  //     postImageSlider(accessToken, selectedImage).then((response) => {
  //         console.log(response);
  //         if (response && response.status === 200) {
  //             getImageslider().then((response) => {
  //                 if (response && response.status === 200) {
  //                     setData(response.data.data)
  //                 } else {
  //                     setData([])
  //                 }
  //             })
  //         } else {
  //             alert('gagal tambah data..!')
  //         }

  //     })
  // }
  // useEffect(() => {
  //     const accessToken = `Bearer ${localStorage.getItem('access_token')}`
  //     setAccessToken(accessToken)
  //     getImageslider().then((response) => {
  //         if (response && response.status === 200) {
  //             setData(response.data.data)
  //         } else {
  //             setData([])
  //         }
  //     })
  // }, [])

  const fetchImageSlider = async () => {
    try {
      const response = await getImageslider();
      setData(response.data.data);
    } catch (error) {
      setData([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    const accessToken = localStorage.getItem("access_token");
    if (accessToken === null || accessToken === "") {
      navigate("/login");
    } else {
      setAccessToken(`Bearer ${accessToken}`);
      fetchImageSlider();
    }
  }, []);

  const handleImageChange = (e) => {
    const selectedFiles = e.target.files;
    setImages([...images, ...selectedFiles]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await postImageSlider(accessToken, images);
      fetchImageSlider(accessToken);
    } catch (error) {
      alert("gagal menyimpan data");
    }
    setLoading(false);
    setOpenModalAddGalery(false);
  };

  const handleDeleteImage = async (e, imageId) => {
    e.preventDefault();
    setLoading(true);
    try {
      await deleteImageSlider(accessToken, imageId);
      fetchImageSlider();
      setLoading(false);
    } catch (error) {
      setLoading(false);
      alert("Gagal menghapus..!");
    }
  };

  return (
    <>
      <Helmet>
        <title>Setting Slide Show</title>
      </Helmet>
      <Layout>
        <Header>Setting Slide Show Gentra Karya</Header>
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
            onClick={() => setOpenModalAddGalery(true)}
            className="px-3 py-2 rounded-md bg-yellow-300 font-semibold hover:bg-yellow-400 transition-colors"
          >
            Tambah Gambar
          </button>
        </div>
        <div className="grid grid-cols-3 gap-5 p-5">
          {loading === true ? (
            <>
              {data?.map((item) => (
                <div className="w-full aspect-video object-center object-contain bg-gray-300 animate-pulse flex items-center justify-center">
                  <SpinnerWave></SpinnerWave>
                </div>
              ))}
            </>
          ) : (
            <>
              {data?.map((item) => (
                // <div className="bg-red-300 w-full aspect-video rounded-xl hover:scale-105 transition-all duration-700"></div>
                <div className="relative group">
                  <img
                    src={`${BaseURL}${item.image}`}
                    alt="sdsadsd"
                    className="bg-red-300 w-full aspect-video rounded-xl transition-all duration-700 object-cover"
                  />
                  <button
                    type="button"
                    onClick={(e) => handleDeleteImage(e, item.id)}
                    className="absolute bottom-0 bg-red-500 w-full h-0 text-white group-hover:h-12 transition-all duration-300 font-semibold"
                  >
                    Hapus
                  </button>
                </div>
              ))}
            </>
          )}
        </div>

        {/* Modal add Galery */}
        <input
          className="modal-state scale-0"
          id="modal-1"
          type="checkbox"
          checked={openModalAddGalery}
        />
        <div className="modal">
          <div className="modal-content w-[80%] max-w-[500px] space-y-3">
            <h2 className="text-xl">Tambah Image Galery</h2>
            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageChange}
                className="input-file input-file-primary"
              />
              <div className="flex items-center flex-wrap w-full">
                {images.map((image, index) => (
                  <img
                    src={URL.createObjectURL(image)}
                    alt={`image-${index}`}
                    className="w-32 aspect-video object-contain bg-slate-300 rounded-md m-1"
                  />
                ))}
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setOpenModalAddGalery(false);
                    setImages([]);
                  }}
                  className="btn btn-error btn-block"
                >
                  Kembali
                </button>
                {loading === true ? (
                  <div className="w-1/2">
                    <SpinnerWave />
                  </div>
                ) : (
                  <button type="submit" className="btn btn-primary btn-block">
                    <p>Simpan</p>
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default SlideShow;
