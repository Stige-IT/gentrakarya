const FormatDate = ({ date }) => {
    const dateObject = new Date(date);

    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = dateObject.toLocaleDateString('id-ID', options);
    return (
        <p> {formattedDate}</p >
    )
}

export default FormatDate

