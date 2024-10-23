import React from "react";
import CustomButton from "../CustomButton";

const textColor = {
  safe: "text-green-500 text-4xl font-medium",
  danger: "text-red-600 text-4xl font-medium",
};

const UserDetails = ({ userDetails }) => {
  return (
    <div className="w-3/4 h-[100%] flex flex-col relative border rounded-[0.22rem]">
      <div className="w-[100%] bg-[rgb(244,247,247)] px-7 py-4">
        Emplyee Status
      </div>
      <div className="flex gap-10 flex-col items-center justify-center p-4">
        <img
          src={userDetails.profilePic}
          alt="User"
          class="w-48 h-48 rounded-full"
        />
        <div className={textColor[userDetails.status.toLowerCase()]}>
          {userDetails.status}
        </div>
        <div className="flex flex-col gap-6 w-full items-center justify-center">
          <CustomButton
            type="secondary"
            size="large"
            className="w-full max-w-md"
          >
            I AM SAFE
          </CustomButton>
          <CustomButton type="primary" size="large" className="w-full max-w-md">
            I NEED HELP
          </CustomButton>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
