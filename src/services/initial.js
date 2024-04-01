export const initials = (fullName) =>{
    return fullName
    .split(" ")  // Memecah string menjadi array kata-kata
    .map(word => word.charAt(0).toUpperCase())  // Mengambil huruf depan dan mengonversi ke huruf kapital
    .join("");
}