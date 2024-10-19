import React from "react";

const textColor = {
  safe: "text-green-500 text-base font-normal",
  danger: "text-red-600 text-base font-normal",
};

const UserDetails = ({ userDetails }) => {
  return (
      <div className="w-3/4 h-[100%] flex flex-col relative border rounded-[0.22rem]">
        <div className="w-[100%] bg-[rgb(244,247,247)] px-7 py-4">
          User Profile
        </div>
        <div className="flex gap-10 flex-col items-center justify-center p-4">
          <img
            src={userDetails.profilePic}
            alt="User"
            class="w-48 h-48 rounded-full"
          />
          <div className="flex gap-4 flex-row items-center justify-between min-w-full px-20">
            <div className="text-base font-semibold">
              Name:
            </div>
            <div className="text-base font-normal">
              {`${userDetails.firstName} ${userDetails.lastName}`}
            </div>
          </div>
          <div className="flex gap-4 flex-row items-center justify-between min-w-full px-20">
            <div className="text-base font-semibold">
              Email:
            </div>
            <div className="text-base font-normal">
              {userDetails.email}
            </div>
          </div>
          <div className="flex gap-4 flex-row items-center justify-between min-w-full px-20">
            <div className="text-base font-semibold">
              Address:
            </div>
            <div className="text-base font-normal">
              {userDetails.fullLocation}
            </div>
          </div>
          <div className="flex gap-4 flex-row items-center justify-between min-w-full px-20">
            <div className="text-base font-semibold">
              Status:
            </div>
            <div className={textColor[userDetails.status.toLowerCase()]}>
              {userDetails.status}
            </div>
          </div>
        </div>
      </div>
  );
};

export default UserDetails;
