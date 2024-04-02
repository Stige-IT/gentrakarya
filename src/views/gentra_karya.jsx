import { useEffect } from "react";
import { useHref, useNavigate } from "react-router-dom";

const GentraKarya = () => {
  const path = useHref();
  const navigate = useNavigate()
  useEffect(() => {
    console.log(path);
    if (path === "/gentra_karya" || path === "gentra_karya" || path === "/gentra_karya/" || path === "gentrakarya.disnakertrans.garutkab.go.id/gentra_karya/" || path === "gentrakarya.disnakertrans.garutkab.go.id/gentra_karya") {
        navigate('/')
    }

    console.log(window.location);
  }, [path]);
  return <></>;
};

export default GentraKarya;
