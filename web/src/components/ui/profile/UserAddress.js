import React from "react";
import PhilippineMap from "../PhilippineMap";

const UserAddress = ({ userDetails }) => {
  return (
    <div className="w-full h-[100%] flex flex-col relative border rounded-[0.22rem]">
      <div className="w-[100%] bg-[rgb(244,247,247)] px-7 py-4">MAP</div>
      <div className="p-1 w-[100%] flex-1">
        <PhilippineMap
          zoomLevel={5}
          user={userDetails}
        />
      </div>
    </div>
  );
};

export default UserAddress;
