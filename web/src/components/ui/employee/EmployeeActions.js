import React, { useState } from "react";
import { RiMap2Fill } from "react-icons/ri";
import { GrDocument } from "react-icons/gr";
import CustomModal from "../CustomModal";
import PhilippineMap from "../PhilippineMap";
import CustomDropdown from "../CustomDropdown";
import CustomButton from "../CustomButton";
import { FaBuildingShield, FaHospital } from "react-icons/fa6";
import { BiSolidCoffee } from "react-icons/bi";
import { FaMapMarkerAlt } from "react-icons/fa";

const UserAddress = ({ userDetails, amenities }) => {
  const [openMap, setOpenMap] = useState();
  const [selectedAmenity, setSelectedAmenity] = useState();
  const [amenityTypes, setAmenityTypes] = useState({ label: "All", value: "ALL", icon: <FaMapMarkerAlt /> });

  const handleSelect = (option) => {
    setAmenityTypes(option);
  };

  const dropdownOptions = [
    { label: "All", value: "ALL", icon: <FaMapMarkerAlt /> },
    {
      label: "Evacuation Center",
      value: "EVACUATION_CENTER",
      icon: <FaBuildingShield className="text-blue-400" />,
    },
    {
      label: "Hospital",
      value: "HOSPITAL",
      icon: <FaHospital className="text-red-400" />,
    },
    {
      label: "Coffee Shop",
      value: "COFFEE_SHOP",
      icon: <BiSolidCoffee className="text-green-400" />,
    },
  ];

  const handleCloseMapModal = () => {
    setOpenMap(false)
    setAmenityTypes({ label: "All", value: "ALL", icon: <FaMapMarkerAlt /> })
    setSelectedAmenity(null)
  }

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
        onClose={handleCloseMapModal}
        title={"Nearest Amenities"}
      >
        <div className="p-4 h-[70vh] w-[60vw]">
          <div className="flex flex-row px-5 items-center justify-between">
            <div>
              <CustomDropdown
                trigger={
                  <CustomButton type="primary">{amenityTypes.label}</CustomButton>
                }
                options={dropdownOptions}
                onSelect={handleSelect}
              />
            </div>
            {selectedAmenity && (
              <div className="flex flex-row gap-5 items-center justify-between">
                <div>{`Name: ${
                  selectedAmenity ? selectedAmenity.name : ""
                }`}</div>
                <div>
                  {`Type: ${
                    selectedAmenity
                      ? selectedAmenity.type.split("_").join(" ")
                      : ""
                  }`}
                </div>
              </div>
            )}
          </div>
          <PhilippineMap
            zoomLevel={5}
            user={userDetails}
            amenities={amenities.filter((ame) => amenityTypes.value === 'ALL' ? true : ame.type === amenityTypes.value)}
            onMarkerClick={(amenity) => setSelectedAmenity(amenity)}
          />
        </div>
      </CustomModal>
    </div>
  );
};

export default UserAddress;
