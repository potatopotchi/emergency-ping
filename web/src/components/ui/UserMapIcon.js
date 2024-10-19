import React from "react";
import { RiMapPinUserFill } from "react-icons/ri";

const UserMapIcon = ({ size = 20, color, }) => {
  return (
    <div className={`relative w-[${size}px] h-[${size}px]`}>
      <RiMapPinUserFill size={size} color={color} />
    </div>
  );
};

export default UserMapIcon;