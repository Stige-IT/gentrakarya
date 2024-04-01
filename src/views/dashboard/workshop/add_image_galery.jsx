import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Modal } from "flowbite-react"
import { useEffect, useState } from "react";
import { postImageGaleryWorkshop } from "../../../services/image_workshop_service";

const AddImageGaleryWorkshop = ({ workshop_id }) => {

    const [accessToken, setAccessToken] = useState('')
    const [openModal, setOpenModal] = useState(false);
    const [loading, setLoading] = useState(false)
    const [images, setImages] = useState([])

    const handleImageChange = (e) => {
        const selectedFiles = e.target.files;
        setImages([...images, ...selectedFiles]);
    };

    const handleSubmit = (e) => {
        e.preventDefault()
        setLoading(true)

        postImageGaleryWorkshop(accessToken, workshop_id, images).then((response) => {
            if (response && response.status === 200) {
                window.location.reload()
                setLoading(false)
                setOpenModal(false)
            } else {
                setLoading(false)
            }
        })
    }

    useEffect(() => {
        const accessToken = `Bearer ${localStorage.getItem('access_token')}`
        setAccessToken(accessToken)
    })
    return (
        <>
            <button onClick={() => setOpenModal(true)} className="px-3 py-2 bg-custom-yellow rounded-md flex items-center font-semibold space-x-3">
                <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>
                <p>Tambah Galery</p>
            </button>
            <Modal show={openModal} onClose={() => setOpenModal(false)}>
                <Modal.Header>Tambah Galery Workshop/Modal.Header</Modal.Header>
                <form onSubmit={handleSubmit}>
                    <Modal.Body>
                        <input type="file" multiple accept="image/*" onChange={handleImageChange} />
                        <div className="flex items-center flex-wrap w-full">
                            {images.map((image, index) => (
                                <img src={URL.createObjectURL(image)} alt={`image-${index}`} className="w-32 aspect-video object-contain bg-slate-300 rounded-md m-1" />
                            ))}
                        </div>
                    </Modal.Body>
                    <div class="flex items-center justify-end space-x-3 font-medium text-white pb-3 px-5 py-5">
                        <button
                            onClick={() => setOpenModal(false)}
                            type="button"
                            class=" rounded-md px-3 py-2 bg-red-500 hover:bg-red-600 transition-colors w-32"
                            data-te-modal-dismiss
                            data-te-ripple-init
                            data-te-ripple-color="light">
                            Kembali
                        </button>
                        <button
                            type="submit"
                            class=" rounded-md px-3 py-2 bg-blue-500 hover:bg-blue-600 transition-colors flex items-center justify-center space-x-3 w-32"
                            data-te-ripple-init
                            data-te-ripple-color="light">
                            {loading !== true ? '' : <div className="h-5 aspect-square bg-black animate-spin"></div>}
                            <p>Simpan</p>
                        </button>
                    </div>
                </form >
            </Modal>
        </>
    )
}

export default AddImageGaleryWorkshop