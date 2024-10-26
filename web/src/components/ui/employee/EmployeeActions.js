import React, { useState } from "react";
import { RiMap2Fill } from "react-icons/ri";
import { GrDocument } from "react-icons/gr";
import CustomModal from "../CustomModal";
import PhilippineMap from "../PhilippineMap";

const UserAddress = ({ userDetails }) => {
  const [openMap, setOpenMap] = useState();

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
          onClick={() => setOpenMap(true)}
        >
          {<RiMap2Fill className="text-6xl" />}
          MAP
        </div>
        <div
          className="
          flex flex-col gap-6 w-full items-center justify-center w-full max-w-md py-6 text-4xl text-red-500
          bg-transparent border-4 rounded-md border-red-500 hover:border-red-700 hover:text-red-700 hover:cursor-pointer"
        >
          {<GrDocument className="text-6xl" />}
          Documents
        </div>
      </div>
      <CustomModal
        visible={openMap}
        onClose={() => setOpenMap(false)}
        title={"Nearest Amenities"}
      >
       <div className="p-1 h-[60vh] w-[60vw]">
            <PhilippineMap zoomLevel={5} user={userDetails} />
          </div>
      </CustomModal>
    </div>
  );
};

export default UserAddress;
