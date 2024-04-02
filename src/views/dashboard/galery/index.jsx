import { Helmet } from "react-helmet";
import { useEffect, useState } from "react";
import {
  deleteImageGalery,
  getImagGalery,
  postImageGalery,
} from "../../../services/mage_galery";
import Header from "../../../components/header";
import Layout from "../../../components/layout";
import { BaseURL } from "../../../services/base_url";
import { useNavigate } from "react-router-dom";
import SpinnerWave from "../../../components/spinner/spinner_wave";

const Galery = () => {
  const navigate = useNavigate();
  const [accessToken, setAccessToken] = useState("");
  const [data, setData] = useState([]);

  const [openModalAddGalery, setOpenModalAddGalery] = useState(false);

  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState([]);

  const fetchImageGalery = async (accessToken) => {
    try {
      const response = await getImagGalery(accessToken);
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
      fetchImageGalery(`Bearer ${accessToken}`);
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
      await postImageGalery(accessToken, images);
      fetchImageGalery(accessToken);
    } catch (error) {
      alert("gagal menyimpan data");
    }

    fetchImageGalery(accessToken);
    setLoading(false);
    setOpenModalAddGalery(false);
  };

  const handleDeleteImage = async (e, imageId) => {
    e.preventDefault();
    setLoading(true);
    try {
      await deleteImageGalery(accessToken, imageId);
      fetchImageGalery(accessToken);
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
        <Header>
          <p>Galery Show Gentra Karya</p>
          <button
            type="button"
            onClick={() => setOpenModalAddGalery(true)}
            className="px-3 py-2 rounded-md bg-blue-500 font-semibold hover:bg-blue-600 transition-colors"
          >
            Tambah Gambar
          </button>
        </Header>
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

      {/* Modal */}
      <form onSubmit={handleSubmit}>
        <div
          data-te-modal-init
          class="fixed left-0 top-0 z-[1055] hidden h-full w-full overflow-y-auto overflow-x-hidden outline-none"
          id="exampleModalCenter"
          tabindex="-1"
          aria-labelledby="exampleModalCenterTitle"
          aria-modal="true"
          role="dialog"
        >
          <div
            data-te-modal-dialog-ref
            class="pointer-events-none relative flex min-h-[calc(100%-1rem)] w-auto translate-y-[-50px] items-center opacity-0 transition-all duration-300 ease-in-out min-[576px]:mx-auto min-[576px]:mt-7 min-[576px]:min-h-[calc(100%-3.5rem)] min-[576px]:max-w-[500px]"
          >
            <div class="pointer-events-auto relative flex w-full flex-col rounded-md border-none bg-white bg-clip-padding text-current shadow-lg outline-none dark:bg-neutral-600">
              <div class="flex flex-shrink-0 items-center justify-between rounded-t-md border-b-2 border-neutral-100 border-opacity-100 p-4 dark:border-opacity-50">
                {/* <!--Modal title--> */}
                <h5
                  class="text-xl font-medium leading-normal text-neutral-800 dark:text-neutral-200"
                  id="exampleModalCenterTitle"
                >
                  Tambah Image Slide Show
                </h5>
                {/* <!--Close button--> */}
                <button
                  type="button"
                  class="box-content rounded-none border-none hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none"
                  data-te-modal-dismiss
                  aria-label="Close"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="h-6 w-6"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              {/* <!--Modal body--> */}
              <div class="relative p-4">
                <div className="w-full">
                  <label htmlFor=""></label>
                  <input
                    type="file"
                    className="w-full"
                    multiple
                    accept="image/*"
                    onChange={handleImageChange}
                  />
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
              <div class="flex flex-shrink-0 flex-wrap items-center justify-end rounded-b-md border-t-2 border-neutral-100 border-opacity-100 p-4 dark:border-opacity-50">
                <button
                  type="button"
                  class="inline-block rounded bg-primary-100 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-primary-700 transition duration-150 ease-in-out hover:bg-primary-accent-100 focus:bg-primary-accent-100 focus:outline-none focus:ring-0 active:bg-primary-accent-200"
                  data-te-modal-dismiss
                  data-te-ripple-init
                  data-te-ripple-color="light"
                >
                  Kembali
                </button>
                <button
                  type="submit"
                  class="ml-1 inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                  data-te-ripple-init
                  data-te-ripple-color="light"
                >
                  Simpan
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default Galery;
