import { Helmet } from "react-helmet";
import { useEffect, useState } from "react";
import { getLayanan } from "../../../services/layanan_service";
import Navbar from "../../../components/navbar";

const Layanan = () => {
  const [layanan, setLayanan] = useState([]);

  const addListClass = (htmlContent) => {
    // Menambahkan class list-decimal pada elemen <ol>
    return htmlContent.replace(/<ol>/g, '<ol class="list-decimal pl-16">');
  };

  useEffect(() => {
    getLayanan().then((response) => {
      if (response && response.status === 200) {
        setLayanan(response.data.data);
      } else {
        setLayanan([]);
      }
    });
  }, []);
  return (
    <>
      <Helmet>
        <title>Layanan - Gentra Karya</title>
      </Helmet>
      <div className="w-full h-screen overflow-auto bg-white text-black">
        <Navbar></Navbar>
        <div className="mt-20 md:mt-10 w-full pb-10 px-3 lg:px-20">
          <div className="accordion-group">
            {layanan?.map((item, index) => (
              <div className="accordion">
                <input
                  type="checkbox"
                  id={`accordion-${index}`}
                  className="accordion-toggle"
                />
                <label
                  htmlFor={`accordion-${index}`}
                  className="accordion-title text-sm md:text-base"
                >
                  {item?.name}
                </label>
                <div className="accordion-content">
                  <div className="min-h-0 px-3 md:px-5">
                    <div className="text-sm"
                      dangerouslySetInnerHTML={{
                        __html: addListClass(item?.detail),
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Layanan;
