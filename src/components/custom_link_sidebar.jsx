import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useHref } from "react-router-dom";

const CustomLinkSidebar = ({link, name, icon}) => {
    const path = useHref()
  return (
    <Link
      to={link}
      className="flex items-center space-x-3 font-semibold py-2 px-3 rounded-l-full relative group"
    >
      <FontAwesomeIcon icon={icon} className="z-10"></FontAwesomeIcon>
      <p className="z-10">{name}</p>
      <div
        className={`absolute h-full bg-white right-0 rounded-md md:rounded-l-full  group-hover:w-full transition-all duration-500 ${
          name === "Dashboard"
            ? path === "/dashboard"
              ? "w-full"
              : "w-0"
            : path.startsWith(link)
            ? "w-full"
            : "w-0"
        } h-full bg-white right-0 rounded-md md:rounded-l-full`}
      ></div>
    </Link>
  );
};

export default CustomLinkSidebar;
