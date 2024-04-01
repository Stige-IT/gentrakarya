import Icon from "../../../assets/images/icon 2.svg";

const VisiMisi = () => {
  return (
    <div className="  md:w-[80%] md:h-96 mx-auto my-10">
      <div
        id="visiMisiSection"
        className="py-46 bg-custom-yellow rounded-xl lg:mx-auto px-10 py-10 text-center relative"
      >
        <img
          src={Icon}
          alt="Icon 2"
          className="lg:hidden W-[60%] aspect-square object-contain mx-auto mb-3"
        />
        <div className="my-10">
          <h1 className="text-2xl lg:text-3xl font-semibold">
            Visi Kabupaten Garut
          </h1>
          <p className="mt-3 text-xs md:text-base">
            Garut yang Bertaqwa, Maju dan Sejahtera
          </p>
        </div>
        <div className="my-10">
          <h1 className="text-2xl lg:text-3xl font-semibold mt-10">
            Misi Kabupaten Garut
          </h1>
          <p className="mt-3 text-xs md:text-base">
            Mewujudkan kualitas kehidupan masyarakat yang agamis, sehat, cerdas,
            dan berbudaya
          </p>
        </div>
        <img
          src={Icon}
          alt="Icon 2"
          className="hidden lg:block h-[80%] aspect-square object-contain absolute -right-24 top-0"
        />
      </div>
    </div>
  );
};

export default VisiMisi;
