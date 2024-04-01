import { useEffect, useState } from "react";

const ModalConfirmPengajuanLamaran = ({ checked }) => {
  const [isChecked, setIsChecked] = useState(false);
  useEffect(() => {
    setIsChecked(checked ?? false);
  }, []);
  return (
    <>
      <input
        className="modal-state"
        id="modal-1"
        type="checkbox"
        checked={isChecked}
        onChange={() => setIsChecked(!isChecked)}
      />
      <div className="modal">
        <label className="modal-overlay" htmlFor="modal-1"></label>
        <div className="modal-content flex flex-col gap-5">
          <h2 className="text-xl">Modal title 1</h2>
          <span>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur
            dolorum voluptate ratione dicta. Maxime cupiditate, est commodi
            consectetur earum iure, optio, obcaecati in nulla saepe maiores
            nobis iste quasi alias!
          </span>
          <div className="flex gap-3">
            <button
              onClick={() => {
                setIsChecked(false);
                // isChecked = false;
                // console.log(isChecked);
                // console.log(document.getElementById("modal-1"));
              }}
              className="btn btn-error btn-block"
            >
              Kembali
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalConfirmPengajuanLamaran;
