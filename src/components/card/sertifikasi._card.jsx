import { Link } from 'react-router-dom'
import Logo from '../../assets/images/Logo.svg'
import LogoGentra from '../../assets/images/LogoGentra.png'
import FormatDateTime from '../format_datetime'

const SertifikasiCard = ({ link, tanggalPelaksanaan, posisi, namaPerusahaan, lembaga, biaya, metoda, dibuatTanggal, }) => {
    return (
        <div className="w-full drop-shadow-2xl shadow-gray-300 shadow-md rounded-xl border-2 hover:border-custom-yellow transition-colors p-3">
            <div className="flex items-center justify-between border-b-2 border-black pb-3 mb-3">
                <img src={LogoGentra} alt="Logo Gentra Karya v2" className='h-14 object-contain' />
                <img src={Logo} alt="Logo Gentra Karya v1" className='h-12 object-contain' />
            </div>
            <p className='uppercase text-center text-lg font-semibold'>{posisi}</p>

            <div className="flex text-sm mt-3">
                <div className="w-32 font-semibold">Pelaksanaan</div>
                <div className='px-2 font-semibold'>:</div>
                <div>
                    <FormatDateTime dateTime={tanggalPelaksanaan}></FormatDateTime>
                </div>
            </div>

            <div className="flex text-sm mt-3">
                <div className="w-32 font-semibold">Nama Instansi</div>
                <div className='px-2 font-semibold'>:</div>
                <div>{namaPerusahaan}</div>
            </div>

            <div className="flex text-sm">
                <div className="w-32 font-semibold">Nama Lembaga</div>
                <div className='px-2 font-semibold'>:</div>
                <div>{lembaga}</div>
            </div>

            <div className="flex text-sm">
                <div className="w-32 font-semibold">Biaya Sertifikasi</div>
                <div className='px-2 font-semibold'>:</div>
                <div>{biaya}</div>
            </div>

            <div className="flex text-sm">
                <div className="w-32 font-semibold">Metoda Sertifikasi</div>
                <div className='px-2 font-semibold'>:</div>
                <div>{metoda}</div>
            </div>


            <div className=' mt-5'>
                <div className="flex space-x-3 text-xs">
                    <div className="">Dibuat Pada</div>
                    <div>:</div>
                    <div>
                        <FormatDateTime dateTime={dibuatTanggal}></FormatDateTime>
                    </div>
                </div>

            </div>
            <div className='text-sm border-t-2 border-black mt-2 flex items-center justify-between pt-2'>
                <p className='text-end mb-2'>Sertifikasi</p>
                <Link to={link} className='px-3 py-2 text-sm bg-custom-yellow rounded-md left-0 text-center font-medium'>
                    Lihat Detail
                </Link>
            </div>
        </div>
    )
}

export default SertifikasiCard