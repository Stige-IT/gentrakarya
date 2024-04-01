import { Helmet } from "react-helmet"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { getLamaranMasyarakat } from "../../../../services/lamaran_service"
import Layout from "../../../../components/layout"
import Header from "../../../../components/header"

const ListLamaranMasyarakat = () => {
    let [number, setNumber] = useState(1)
    const navigate = useNavigate()
    const [accessToken, setAccessToken] = useState('')
    const [lamaran, setLamaran] = useState([])
    const [totalLamaran, setTotalLamaran] = useState(0)
    const [currentPage, setCurrentPage] = useState(1)
    const [statusLamaran, setStatusLamaran] = useState('DALAM PENGAJUAN')


    const handleTabs = (status) => {
        setStatusLamaran(status)
        getLamaranMasyarakat(accessToken, status).then((response) => {
            if (response && response.status === 200) {
                setLamaran(response.data.data)
                setTotalLamaran(response.data.meta.total)
                setNumber(response.data.meta.from)
                setCurrentPage(response.data.meta.current_page)
            } else {

            }
        })
    }
console.log(statusLamaran);
    useEffect(() => {
        const accessToken = `Bearer ${localStorage.getItem('access_token')}`
        setAccessToken(accessToken)
        getLamaranMasyarakat(accessToken, statusLamaran).then((response) => {
            if (response && response.status === 200) {
                console.log(response.data.data);
                setLamaran(response.data.data)
                setTotalLamaran(response.data.meta.total)
                setNumber(response.data.meta.from)
                setCurrentPage(response.data.meta.current_page)
            } else {

            }
        })
    }, [statusLamaran])
    return (
        <>
            <Helmet>
                <title>Daftar Lamaran</title>
            </Helmet>
            <Layout>
                <Header>
                    <p className="space-x-3">
                        <span>Daftar Data Lamaran Perkerjaan</span>
                        <span>({totalLamaran})</span>
                    </p>
                </Header>
                <div className="w-full h-16 flex items-center space-x-3 px-5 text-white">
                    <button onClick={() => handleTabs('DALAM PENGAJUAN')} type="button" className={`px-5 py-2 rounded-md font-semibold ${statusLamaran !== 'DALAM PENGAJUAN' ? 'bg-gray-500 hover:bg-gray-600' : 'bg-blue-500 hover:bg-blue-600'}`}>
                        Dalam Pengajuan
                    </button>
                    <button onClick={() => handleTabs('DIPROSES')} type="button" className={`px-5 py-2 rounded-md font-semibold ${statusLamaran !== 'DIPROSES' ? 'bg-gray-500 hover:bg-gray-600' : 'bg-blue-500 hover:bg-blue-600'}`}>
                        Diproses
                    </button>
                    <button onClick={() => handleTabs('DITERIMA')} type="button" className={`px-5 py-2 rounded-md font-semibold ${statusLamaran !== 'DITERIMA' ? 'bg-gray-500 hover:bg-gray-600' : 'bg-blue-500 hover:bg-blue-600'}`}>
                        Diterima
                    </button>
                    <button onClick={() => handleTabs('DITOLAK')} type="button" className={`px-5 py-2 rounded-md font-semibold ${statusLamaran !== 'DITOLAK' ? 'bg-gray-500 hover:bg-gray-600' : 'bg-blue-500 hover:bg-blue-600'}`}>
                        Ditolak
                    </button>
                </div>

                <div className="w-full px-3 py-5">

                    <table className="w-full">
                        <thead>
                            <tr className="text-sm bg-gray-400">
                                <th className="px-3 py-2 rounded-tl-xl">No</th>
                                <th className="px-3 py-2" >Nama</th>
                                <th className="px-3 py-2" >Email</th>
                                <th className="px-3 py-2" >Nama Perusahaan</th>
                                <th className="px-3 py-2" >Jenis Pekerjaan</th>
                                <th className="px-3 py-2" >Posisi</th>
                                <th className="px-3 py-2" >Wilayah Penempatan</th>
                                <th className="px-3 py-2" >Status Lamaran</th>
                            </tr>
                        </thead>
                        <tbody>

                            {lamaran?.map((itemm) => (
                                <tr onClick={() => navigate('/dashboard/lamaran/detail/123')} className={`cursor-pointer text-sm hover:bg-gray-300 ${number % 2 === 0 ? 'bg-gray-200' : 'bg-white'}`}>
                                    <td className="px-3 py-2">{number++}</td>
                                    <td className="px-3 py-2" >{itemm?.user?.name}</td>
                                    <td className="px-3 py-2" >{itemm?.user?.email}</td>
                                    <td className="px-3 py-2" >{itemm?.loker?.lembaga?.nama_perusahaan}</td>
                                    <td className="px-3 py-2" >{itemm?.loker?.jenis_pekerjaan}</td>
                                    <td className="px-3 py-2" >{itemm?.loker?.posisi}</td>
                                    <td className="px-3 py-2" >{itemm?.loker?.kecamatan_penempatan?.name}</td>
                                    <td className={`px-3 py-2 ${itemm?.status?.name === 'DALAM PENGAJUAN' ? 'bg-orange-300' : itemm?.status?.name === 'DIPROSES' ? 'bg-blue-500' : itemm?.status?.name === 'DITERIMA' ? 'bg-green-500' : itemm?.status?.name === 'DITOLAK' ? 'bg-red-600' : ''}`} >{itemm?.status?.name}</td>
                                </tr>
                            ))}

                            <tr className="bg-gray-400">
                                <th colSpan={8} className="">
                                    <div className="w-full px-3 py-2 flex items-center justify-end text-sm space-x-3">
                                        <button type="button" className="text0-black ">
                                            Sebelumnya
                                        </button>
                                        <p className="">{currentPage}</p>
                                        <button type="button" className="text0-black ">
                                            Selanjutnya
                                        </button>
                                    </div>
                                </th>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </Layout>
        </>
    )
}

export default ListLamaranMasyarakat