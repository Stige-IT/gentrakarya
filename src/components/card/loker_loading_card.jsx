const LokerLoadingCard = () => {
  return (
    <div className="w-full drop-shadow-2xl shadow-gray-300 shadow-md rounded-xl border-2 hover:border-custom-yellow transition-colors p-3 animate-pulse">
      <div className="flex items-center justify-between border-b-2 border-black pb-3 mb-3">
        <div className="h-14 aspect-square rounded-xl bg-gray-300 animate-pulse"></div>
        <div className="h-14 aspect-square rounded-xl bg-gray-300 animate-pulse"></div>
      </div>
      {/* <p className='uppercase text-center text-lg font-semibold'>{posisi}</p> */}
      <div className="w-1/2 mx-auto my-2 h-5 font-semibold rounded-full bg-gray-300 animate-pulse"></div>
      {Array.from({ length: 4 }, (_, index) => (
        <div className="flex text-sm mt-3 space-x-5">
          <div className="w-48 h-3 font-semibold rounded-full bg-gray-300 animate-pulse"></div>
          <div className="w-full h-3 font-semibold rounded-full bg-gray-300 animate-pulse"></div>
        </div>
      ))}

      <div className="flex flex-col space-y-3 items-start pt-5">
        <div className="w-1/3 h-3 font-semibold rounded-full bg-gray-300 animate-pulse"></div>
        <div className="w-1/3 h-3 font-semibold rounded-full bg-gray-300 animate-pulse"></div>
      </div>
      <div className="text-sm border-t-2 border-black mt-2 flex items-center justify-between pt-2">
        <div className="w-1/4 h-3 font-semibold rounded-full bg-gray-300 animate-pulse"></div>
        <div className="w-1/4 h-8 font-semibold rounded-md bg-gray-300 animate-pulse"></div>
      </div>
    </div>
  );
};

export default LokerLoadingCard;
