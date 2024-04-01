import { Helmet } from "react-helmet"
import Header from "../../../../components/dashboard_component/header"

const ListLamaranMasyarakat = () => {
    let [number, setNumber] = useState(1)
    const navigate = useNavigate()
    return (
        <>
            <Helmet>
                <title>Daftar Lamaran</title>
            </Helmet>
            <Layout>
                <Header>
                    Daftar Data Lamaran Perkerjaan (2)
                </Header>
                <div className="w-full h-16 flex items-center space-x-3">
                    <button type="button" className="px-5 py-2 rounded-md bg-blue-500 hover:bg-blue-600">
                        Diproses
                    </button>
                    <button type="button" className="px-5 py-2 rounded-md bg-blue-500 hover:bg-blue-600">
                        Diterima
                    </button>
                    <button type="button" className="px-5 py-2 rounded-md bg-blue-500 hover:bg-blue-600">
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
                                <th className="px-3 py-2" >No Telepon</th>
                                <th className="px-3 py-2" >Provinsi</th>
                                <th className="px-3 py-2" >Kabupaten</th>
                                <th className="px-3 py-2" >kecamatan</th>
                                <th className="px-3 py-2 rounded-tr-xl" >Kelurahan</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr onClick={() => navigate('/dashboard/lamaran/detail/123')} className={`cursor-pointer text-sm hover:bg-gray-300 ${number % 2 === 0 ? 'bg-gray-200' : 'bg-white'}`}>
                                <td className="px-3 py-2">{number++}</td>
                                <td className="px-3 py-2" >Andri Ardiansyah</td>
                                <td className="px-3 py-2" >andritea1004@gmail.com</td>
                                <td className="px-3 py-2" >0859113487778</td>
                                <td className="px-3 py-2" >Jawa Barat</td>
                                <td className="px-3 py-2" >Garut</td>
                                <td className="px-3 py-2" >Tarogong Kidul</td>
                                <td className="px-3 py-2" >Sukajaya</td>
                            </tr>
                            <tr onClick={() => navigate('/dashboard/lamaran/detail/123')} className={`cursor-pointer text-sm hover:bg-gray-300 ${number % 2 === 0 ? 'bg-gray-200' : 'bg-white'}`}>
                                <td className="px-3 py-2">{number++}</td>
                                <td className="px-3 py-2" >Andri Ardiansyah</td>
                                <td className="px-3 py-2" >andritea1004@gmail.com</td>
                                <td className="px-3 py-2" >0859113487778</td>
                                <td className="px-3 py-2" >Jawa Barat</td>
                                <td className="px-3 py-2" >Garut</td>
                                <td className="px-3 py-2" >Tarogong Kidul</td>
                                <td className="px-3 py-2" >Sukajaya</td>
                            </tr>
                            <tr className="bg-gray-400">
                                <th colSpan={8} className="">
                                    <div className="w-full px-3 py-2 flex items-center justify-end text-sm space-x-3">
                                        <button type="button" className="text0-black ">
                                            Sebelumnya
                                        </button>
                                        <p className="">1</p>
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