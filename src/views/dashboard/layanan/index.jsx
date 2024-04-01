import { Helmet } from "react-helmet"
import Header from "../../../components/dashboard_component/header"
import Layout from "../../../components/dashboard_component/layout"
import {
    Collapse,
    Modal,
    Ripple,
    initTE,
} from "tw-elements";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { deleteLayanan, getLayanan, postLayanan } from "../../../services/layanan_service";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css'
import TemplateInput from "../../../components/template_input";


const Layanan = () => {

    const [open, setOpen] = useState(false)
    const [accessToken, setAccessToken] = useState('')
    const [name, setName] = useState('')
    const [detail, setDetail] = useState('')
    const [errorName, setErrorName] = useState(false)

    const [showModalAdd, setShowModalAdd] = useState(false)
    const [loadingAdd, setLoadingAdd] = useState(false)
    const [loadingDelete, setLoadingDelete] = useState(false)


    const [layanan, setLayanan] = useState([])

    const handleSubmit = async (e) => {
        setLoadingAdd(true)
        e.preventDefault()
        if (name === '') {
            setErrorName(true)
            setLoadingAdd(false)
        } else {
            try {
                setLoadingAdd(false)
                await postLayanan(accessToken, name, detail)
                getLayanan(accessToken).then((response) => {
                    if (response && response.status === 200) {
                        setLayanan(response.data.data)
                    } else {
                        setLayanan([])
                    }
                })
            } catch (error) {
                setLoadingAdd(false)
                alert('gagal tambah data..?')
            }
            setShowModalAdd(false)
        }

    }

    const handleShowModalAdd = (e) => {
        if (showModalAdd === true) {
            setShowModalAdd(false)
        } else {
            setShowModalAdd(true)
        }
    }

    const handleDeleteLayanan = async (layananId) => {
        setLoadingDelete(true)
        try {
            const response = await deleteLayanan(accessToken, layananId)
            if (response.status === 200) {
                getLayanan(accessToken).then((response) => {
                    if (response && response.status === 200) {
                        setLayanan(response.data.data)
                    } else {
                        setLayanan([])
                    }
                })
            }
            setLoadingDelete(false)
        } catch (error) {
            setLoadingDelete(false)
            alert('data gagal di hapus..!')
        }

    }

    useEffect(() => {
        const accessToken = `Bearer ${localStorage.getItem('access_token')}`
        setAccessToken(accessToken)

        getLayanan(accessToken).then((response) => {
            if (response && response.status === 200) {
                setLayanan(response.data.data)
            } else {
                setLayanan([])
            }
        })

        initTE({ Collapse, Modal, Ripple, });
    }, [])
    return (
        <>
            <Helmet>
                <title>Jenis Layanan Gentra Karya</title>
            </Helmet>

            <Layout>
                <Header>
                    <p>Jenis Layanan Gentra Karya</p>
                    <button
                        type="button"
                        onClick={handleShowModalAdd}
                        className="my-2 btn btn-primary flex space-x-2">
                        <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>
                        <p className="hidden md:block">Tambah Layanan</p>
                    </button>
                </Header>

                <div className="accordion-group accordion-group-secondary">
                    {layanan?.map((item, index) => (
                        <div className="accordion">
                            <input type="checkbox" id={`toggle-${index}`} className="accordion-toggle" />
                            <label htmlFor={`toggle-${index}`} className="accordion-title py-0  px-3 text-base font-semibold flex flex-row items-center justify-between">
                                <p>{item?.name}</p>
                                <div className="flex items-center space-x-3">
                                    <button className="btn btn-solid-warning">
                                        <FontAwesomeIcon icon={faEdit} />
                                    </button>

                                    <div className="dropdown">
                                        <label className="btn btn-solid-error my-2" tabIndex="0">
                                            <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon>
                                        </label>
                                        <div className="dropdown-menu w-72 z-50">
                                            <div className="p-5 flex flex-col items-center justify-center space-y-3 z-50">
                                                <svg width="60" height="60" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M24 4C12.96 4 4 12.96 4 24C4 35.04 12.96 44 24 44C35.04 44 44 35.04 44 24C44 12.96 35.04 4 24 4ZM24 26C22.9 26 22 25.1 22 24V16C22 14.9 22.9 14 24 14C25.1 14 26 14.9 26 16V24C26 25.1 25.1 26 24 26ZM26 34H22V30H26V34Z" fill="#E92C2C" />
                                                </svg>
                                                <p className="text-center">Apakah Anda yakin akan menghapus data layanan ini..?</p>
                                                <div className="flex items-center space-x-3 text-sm text-white">
                                                    <label className="btn btn-success w-32">
                                                        Tidak
                                                    </label>

                                                    <label onClick={() => handleDeleteLayanan(item?.id)} className="btn btn-error w-32">
                                                        Ya
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </label>
                            <div className="accordion-content text-content2">
                                <div className="min-h-0 pl-10 pr-5">
                                    <div dangerouslySetInnerHTML={{ __html: item?.detail }} />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </Layout>

            {/* Modal Add */}
            <input className="modal-state" id="modal-2" checked={showModalAdd} type="checkbox" />
            <div className="modal w-screen">
                <form onSubmit={handleSubmit}>
                    <label className="modal-overlay" htmlFor="modal-2"></label>
                    <div className="modal-content flex flex-col gap-5 max-w-3xl">
                        <label htmlFor="modal-2" onClick={handleShowModalAdd} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</label>
                        <h2 className="text-xl border-b-2 pb-3 border-gray-400">Tambah Admin</h2>
                        <div className="space-y-2 text-sm lg:w-96">
                            <div>
                                <TemplateInput
                                    typeInput="text"
                                    name="Nama Layanan"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Nama Layanan"
                                />
                                {errorName === true ? <p className="text-red-500">Nama layanan harus di isi..!</p> : ''}
                            </div>

                            <div>
                                <label htmlFor="">Deskripsi Layanan</label>
                                <ReactQuill value={detail} onChange={(value) => setDetail(value)}></ReactQuill>
                            </div>
                        </div>
                        <div className="flex items-center justify-end gap-3 border-t-2 pt-3 border-gray-400">
                            <button type="button" onClick={handleShowModalAdd} className="btn btn-error w-32">Kembali</button>
                            <button type="submit" className="btn btn-primary w-32 space-x-3">
                                {loadingAdd === true ? <div className="w-5 aspect-square animate-spin bg-white"></div> : ''}
                                <span>Simpan</span>
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )


}

export default Layanan