import { useEffect } from "react";
import { useHref, useNavigate } from "react-router-dom";

const GentraKarya = () => {
  const path = useHref();
  const navigate = useNavigate()
  useEffect(() => {
    console.log(path);
    if (path === "/gentra_karya" || path === "gentra_karya") {
        navigate('/')
    }
  }, [path]);
  return <></>;
};

export default GentraKarya;
