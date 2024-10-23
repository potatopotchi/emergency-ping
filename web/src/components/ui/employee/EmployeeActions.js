import React from "react";
import { RiContactsBook2Line, RiMap2Fill } from "react-icons/ri";
import { GrDocument } from "react-icons/gr";

const UserAddress = () => {
  return (
    <div className="w-full h-[100%] flex flex-col relative border rounded-[0.22rem]">
      <div className="w-[100%] bg-[rgb(244,247,247)] px-7 py-4">
        Employee Actions
      </div>
      <div className="flex flex-col gap-6 w-full items-center justify-center p-4">
        <div
          className="
          flex flex-col gap-6 w-full items-center justify-center w-full max-w-md py-4 text-4xl text-red-500
          bg-transparent border-4 rounded-md border-red-500 hover:border-red-700 hover:text-red-700 hover:cursor-pointer"
        >
          {<RiMap2Fill className="text-6xl"/>}
          MAP
        </div>
        <div
          className="
          flex flex-col gap-6 w-full items-center justify-center w-full max-w-md py-4 text-4xl text-red-500
          bg-transparent border-4 rounded-md border-red-500 hover:border-red-700 hover:text-red-700 hover:cursor-pointer"
        >
          {<GrDocument className="text-6xl"/>}
          Documents 
        </div>
        <div
          className="
          flex flex-col gap-6 w-full items-center justify-center w-full max-w-md py-4 text-4xl text-red-500
          bg-transparent border-4 rounded-md border-red-500 hover:border-red-700 hover:text-red-700 hover:cursor-pointer"
        >
          {<RiContactsBook2Line className="text-6xl"/>}
          Contacts 
        </div>
      </div>
    </div>
  );
};

export default UserAddress;
