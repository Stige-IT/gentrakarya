import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";
import Navbar from "../../../../components/navbar";
import LokerDetailCard from "../../../../components/card/loker_detail_card";

const DetailLoker = () => {
  const { loker_id } = useParams();

  return (
    <>
      <Helmet>
        <title>Detail Loker - Gentra Karya</title>
      </Helmet>
      <div className="h-screen w-full overflow-auto">
        <Navbar></Navbar>
        <LokerDetailCard loker_id={loker_id} category="masyarakat"></LokerDetailCard>
      </div>
    </>
  );
};

export default DetailLoker;
