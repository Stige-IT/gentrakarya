import { Link } from 'react-router-dom'
import Logo from '../../assets/images/Logo.svg'
import LogoGentra from '../../assets/images/LogoGentra.png'
import FormatDate from '../format_date'
import FormatDateTime from '../format_datetime'

const MagangCard = ({ link, posisi, namaPerusahaan, lembaga, gajiMinimum, gajiMaksimum, dibuatTanggal, berakhirTanggal }) => {
    return (
        <div className="w-full drop-shadow-2xl shadow-gray-300 shadow-md rounded-xl border-2 hover:border-custom-yellow transition-colors p-3">
            <div className="flex items-center justify-between border-b-2 border-black pb-3 mb-3">
                <img src={LogoGentra} alt="Logo Gentra Karya v2" className='h-14 object-contain' />
                <img src={Logo} alt="Logo Gentra Karya v1" className='h-12 object-contain' />
            </div>
            <p className='uppercase text-center text-lg font-semibold'>{posisi}</p>
            <div className="flex text-sm mt-3">
                <div className="w-32 font-semibold">Nama Perusahaan</div>
                <div className='px-2 font-semibold'>:</div>
                <div>{namaPerusahaan}</div>
            </div>

            <div className="flex text-sm">
                <div className="w-32 font-semibold">Nama Lembaga</div>
                <div className='px-2 font-semibold'>:</div>
                <div>{lembaga}</div>
            </div>

            <div className="flex text-sm">
                <div className="w-32 font-semibold">Rentang Gaji</div>
                <div className='px-2 font-semibold'>:</div>
                <div className='flex flex-wrap '>
                    <span>{gajiMinimum}</span>
                    {gajiMaksimum === 0 || gajiMaksimum === '0' ? '' :
                        <>
                            <span className='px-2'>-</span>
                            <span>Rp. {gajiMaksimum}</span>
                        </>
                    }
                </div>
            </div>


            <div className='flex items-center justify-between pt-5'>
                <div>
                    <div className="flex space-x-3 text-xs">
                        <div className="">Dibuat Pada</div>
                        <div>:</div>
                        <div>
                            <FormatDateTime dateTime={dibuatTanggal}></FormatDateTime>
                        </div>
                    </div>
                    <div className="flex space-x-3 text-xs">
                        <div className="">Berakhir Pada</div>
                        <div>:</div>
                        <div><FormatDate date={berakhirTanggal}></FormatDate></div>
                    </div>
                </div>
            </div>
            <div className='text-sm border-t-2 border-black mt-2 flex items-center justify-between pt-2'>
                <p className='text-end mb-2'>Magang</p>
                <Link to={link} className='px-3 py-2 text-sm bg-custom-yellow rounded-md left-0 text-center'>
                    Lihat Detail
                </Link>
            </div>
        </div>
    )
}

export default MagangCard