import React from "react";
import { RiMapPinUserFill } from "react-icons/ri";

const UserIcon = ({ userImage, size = 20, color, }) => {
  return (
    <div className={`relative w-[${size}px] h-[${size}px]`}>
      <RiMapPinUserFill size={size} color={color} />
      {!!userImage && (
        <img
          src={userImage}
          alt="User"
          className="absolute top-[15%] left-[22%] w-[60%] h-[60%] rounded-full object-cover"
        />
      )}

    </div>
  );
};

export default UserIcon;