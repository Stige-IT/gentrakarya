import React, { useState } from 'react';

const FileInput = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    // Mendapatkan file yang dipilih oleh pengguna
    const file = event.target.files[0];

    // Memeriksa apakah file yang dipilih adalah PDF
    if (file && file.type === 'application/pdf') {
      // Menyimpan file ke dalam state atau melakukan operasi lain
      setSelectedFile(file);
    } else {
      // Menampilkan pesan kesalahan jika bukan file PDF
      alert('Mohon pilih file PDF.');
      // Mengosongkan nilai input file
      event.target.value = null;
    }
  };

  return (
    <div>
      <label htmlFor="pdfFile">Pilih File PDF:</label>
      <input
        type="file"
        id="pdfFile"
        accept=".pdf"
        onChange={handleFileChange}
      />
      {selectedFile && (
        <p>File terpilih: {selectedFile.name}</p>
      )}
    </div>
  );
};

export default FileInput;
