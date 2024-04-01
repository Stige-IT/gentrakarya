const FormatDateTime = ({ dateTime }) => {

    let formattedDatetime = '-'
    if (dateTime != null) {
        const dateObject = new Date(dateTime);

        const options = {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            timeZoneName: 'short',
        };

        formattedDatetime = new Intl.DateTimeFormat('id-ID', options).format(dateObject);
    }
    return (
        <p>
            {formattedDatetime}
        </p>
    )
}

export default FormatDateTime