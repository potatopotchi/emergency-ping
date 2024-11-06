import React, { useState } from "react";
import { RiMap2Fill } from "react-icons/ri";
import { GrDocument } from "react-icons/gr";
import CustomModal from "../CustomModal";
import AmenitiesMap from "./AmenitiesMap";
import Guides from "./Guides";

const UserAddress = ({ userDetails, amenities }) => {
  const [openModal, setOpenModal] = useState();
  const [modalType, setModalType] = useState();

  const handleCloseMapModal = () => {
    setOpenModal(false);
  };

  const handleOpenMap = () => {
    setModalType("MAP");
    setOpenModal(true);
  };

  const handleOpeGuides = () => {
    setModalType("GUIDES");
    setOpenModal(true);
  };

  return (
    <div className="w-full h-[100%] flex flex-col relative border rounded-[0.22rem]">
      <div className="w-[100%] bg-[rgb(244,247,247)] px-7 py-4">
        Employee Actions
      </div>
      <div className="flex flex-col gap-10 w-full items-center justify-center p-4 mt-6">
        <div
          className="
          flex flex-col gap-6 w-full items-center justify-center w-full max-w-md py-6 text-4xl text-red-500
          bg-transparent border-4 rounded-md border-red-500 hover:border-red-700 hover:text-red-700 hover:cursor-pointer"
          onClick={handleOpenMap}
        >
          {<RiMap2Fill className="text-6xl" />}
          MAP
        </div>
        <div
          onClick={handleOpeGuides}
          className="
          flex flex-col gap-6 w-full items-center justify-center w-full max-w-md py-6 text-4xl text-red-500
          bg-transparent border-4 rounded-md border-red-500 hover:border-red-700 hover:text-red-700 hover:cursor-pointer"
        >
          {<GrDocument className="text-6xl" />}
          EMERGENCY GUIDES
        </div>
      </div>
      <CustomModal
        visible={openModal}
        onClose={handleCloseMapModal}
        title={modalType === "MAP" ? "Nearest Amenities" : "EMERGENCY GUIDES"}
      >
        {modalType === "MAP" ? (
          <AmenitiesMap amenities={amenities} userDetails={userDetails} />
        ) : (
          <Guides />
        )}
      </CustomModal>
    </div>
  );
};

export default UserAddress;
