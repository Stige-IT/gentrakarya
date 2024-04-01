import { Helmet } from "react-helmet";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBell,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { showMagangGeneral } from "../../../../services/magang_service";
import { useParams } from "react-router-dom";
import FormatDateTime from "../../../../components/format_datetime";
import FormatDate from "../../../../components/format_date";
import { BaseURL } from "../../../../services/base_url";
import Navbar from "../../../../components/navbar";
import TemplateText from "../../../../components/template_text";
import MagangDetailCard from "../../../../components/card/magang_detail_card";

const DetailMagang = () => {
  const { magang_id } = useParams();
  

  return (
    <>
      <Helmet>
        <title>Detail Magang - Gentra Karya</title>
      </Helmet>
      <div className="h-screen w-full bg-white overflow-auto scrollbar-thin scrollbar-track-rounded-full  scrollbar-thumb-rounded-full scrollbar-thumb-yellow-400">
        <Navbar></Navbar>
        <div className="sticky top-16 h-14 flex items-center px-10 text-sm border-b-2 bg-blue-300 space-x-3">
          <FontAwesomeIcon
            icon={faBell}
            className="h-8 aspect-square text-custom-dark"
          ></FontAwesomeIcon>
          <p className="text-base md:text-2xl font-semibold">
            Detail Informasi Magang Gantra Karya
          </p>
        </div>
        
        <MagangDetailCard magang_id={magang_id}></MagangDetailCard>
      </div>
    </>
  );
};

export default DetailMagang;
