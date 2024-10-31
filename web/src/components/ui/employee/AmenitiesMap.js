import React, { useEffect, useState } from "react";
import PhilippineMap from "../PhilippineMap";
import CustomDropdown from "../CustomDropdown";
import CustomButton from "../CustomButton";
import { FaBuildingShield, FaHospital } from "react-icons/fa6";
import { BiSolidCoffee } from "react-icons/bi";
import { FaMapMarkerAlt } from "react-icons/fa";

const AmenitiesMap = ({ userDetails, amenities }) => {
  const [selectedAmenity, setSelectedAmenity] = useState();
  const [amenityTypes, setAmenityTypes] = useState({
    label: "All",
    value: "ALL",
    icon: <FaMapMarkerAlt />,
  });

  useEffect(() => {
    return () => {
      setAmenityTypes({ label: "All", value: "ALL", icon: <FaMapMarkerAlt /> });
      setSelectedAmenity(null);
    };
  }, []);

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

  return (
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
            <div>{`Name: ${selectedAmenity ? selectedAmenity.name : ""}`}</div>
            <div>
              {`Type: ${
                selectedAmenity ? selectedAmenity.type.split("_").join(" ") : ""
              }`}
            </div>
          </div>
        )}
      </div>
      <PhilippineMap
        zoomLevel={5}
        user={userDetails}
        amenities={amenities.filter((ame) =>
          amenityTypes.value === "ALL" ? true : ame.type === amenityTypes.value
        )}
        onMarkerClick={(amenity) => setSelectedAmenity(amenity)}
      />
    </div>
  );
};

export default AmenitiesMap;
