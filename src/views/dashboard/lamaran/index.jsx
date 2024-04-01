import { Helmet } from "react-helmet"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import ListLamaranMasyarakat from "./views/list_lamaran"
import ListLamaranLembaga from "./views/list_lamaran_lembaga"

const Lamaran = () => {
    let [number, setNumber] = useState(1)
    const navigate = useNavigate()
    const [view, setView] = useState(null);


    // const handleFileChange = (event) => {
    //     // Mendapatkan file yang dipilih oleh pengguna
    //     const file = event.target.files[0];

    //     // Memeriksa apakah file yang dipilih adalah PDF
    //     if (file && file.type === 'application/pdf') {
    //       // Menyimpan file ke dalam state atau melakukan operasi lain
    //       setSelectedFile(file);
    //     } else {
    //       // Menampilkan pesan kesalahan jika bukan file PDF
    //       alert('Mohon pilih file PDF.');
    //       // Mengosongkan nilai input file
    //       event.target.value = null;
    //     }
    //   };

    useEffect(() => {
        const registrationCategory = localStorage.getItem('registration_category')
        if (registrationCategory === 'ADMIN' || registrationCategory === 'SUPER ADMIN') {
            setView(<ListLamaranLembaga />);
        } else if (registrationCategory === 'LEMBAGA') {
            setView(<ListLamaranLembaga />);
        } else {
            setView(<ListLamaranMasyarakat />);
        }
    }, [])
    return (
        <>
            {view}
        </>
    )
}

export default Lamaran