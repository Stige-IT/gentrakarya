import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Modal } from "flowbite-react"
import { useEffect, useState } from "react";
import { updateFotoP, updateFotoProfile } from "../../../services/profile_service";
import { useNavigate } from "react-router-dom";
import { updateFotoProfileLembaga } from "../../../services/profile_lembaga_service";

const EditFotoProfileLembaga = () => {

    const navigate = useNavigate()
    const [accessToken, setAccessToken] = useState('')
    const [openModal, setOpenModal] = useState(false);
    const [loading, setLoading] = useState(false)
    const [image, setImage] = useState(null)

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!image) {
            console.error("Pilih file gambar terlebih dahulu");
            return;
        }

        setLoading(true)
        updateFotoProfileLembaga(accessToken, image).then((response) => {
            if (response && response.status === 200) {
                // navigate('/dashboard/pengaturan')
                window.location.reload();
                setLoading(false)
                setOpenModal(false)
            } else {
                setLoading(false)
            }
        })
    }

    useEffect(() => {
        const accessToken = localStorage.getItem('access_token')
        setAccessToken(accessToken)
    })
    return (
        <>
            <button onClick={() => setOpenModal(true)} className="absolute top-3 right-3">
                <FontAwesomeIcon icon={faEdit} className=" text-custom-yellow hover:text-yellow-400 text-xl"></FontAwesomeIcon>
            </button>
            <Modal show={openModal} onClose={() => setOpenModal(false)}>
                <Modal.Header>Edit Foto Profil Lembaga</Modal.Header>
                <form onSubmit={handleSubmit}>
                    <Modal.Body>
                        <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} />
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

export default EditFotoProfileLembaga