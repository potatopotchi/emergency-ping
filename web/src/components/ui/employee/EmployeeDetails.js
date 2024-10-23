import React, { useState } from "react";
import CustomButton from "../CustomButton";
import CustomModal from "../CustomModal";

const textColor = {
  safe: "text-green-500 text-4xl font-medium",
  danger: "text-red-600 text-4xl font-medium",
};

const UserDetails = ({ userDetails }) => {
  const [modalType, setModalType] = useState();

  //type - NOT_SAFE/SAFE
  const handleOnClickHelp = (type) => {
    setModalType((prev) => (!prev ? type : undefined));
  };
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
            onClick={() => handleOnClickHelp("SAFE")}
          >
            I AM SAFE
          </CustomButton>
          <CustomButton
            type="primary"
            size="large"
            className="w-full max-w-md"
            onClick={() => handleOnClickHelp("NOT_SAFE")}
          >
            I AM NOT SAFE
          </CustomButton>
        </div>
      </div>
      <CustomModal
        visible={!!modalType}
        onClose={handleOnClickHelp}
        title={modalType === "NOT_SAFE" ? "I am Not Safe" : "I am Safe"}
        footer={[
          <CustomButton key="cancel" onClick={handleOnClickHelp}>
            Cancel
          </CustomButton>,
          <CustomButton key="submit" type="primary" onClick={handleOnClickHelp}>
            Send
          </CustomButton>,
        ]}
      >
        {modalType === "NOT_SAFE"
          ? "Are you sure you are not safe and could not work?"
          : "Are you sure you are safe?"}
      </CustomModal>
    </div>
  );
};

export default UserDetails;
