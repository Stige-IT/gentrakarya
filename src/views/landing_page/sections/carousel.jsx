
import { useEffect, useState } from "react"
import { getImageslider } from "../../../services/image_slider_service"
import { BaseURL } from "../../../services/base_url"
import { Carousel } from "flowbite-react"

const MyCarousel = () => {
    const [data, setData] = useState([])

    useEffect(() => {
        getImageslider().then((response) => {
            if (response && response.status === 200) {
                setData(response.data.data)
            } else {
                setData([])
            }
        })
    }, [])

    // console.log( data[0]['image']);
    return (
        <div className="w-full lg:h-[80%] aspect-video bg-black/30">
            <Carousel className="">
                {
                    data?.map((item, index) => (
                        <img key={index} src={`${BaseURL}${item?.image}`} alt={`im slider ${index} - Gentra Karya`} className="h-full aspect-video object-contain" />
                    ))
                }
            </Carousel>
        </div>
    )
}

export default MyCarousel