import React from "react";
import { FaBuildingShield, FaHospital } from "react-icons/fa6";
import { BiSolidCoffee } from "react-icons/bi";


const AmenitiesIcon = ({ size = 20, type = 'EVACUATION_CENTER' }) => {
  const renderIcon = () => {
    switch(type) {
      case 'EVACUATION_CENTER': {
        return <FaBuildingShield size={size} className="text-blue-400 hover:cursor-pointer hover:text-blue-500"/>
      }
      case 'HOSPITAL': {
        return <FaHospital size={size} className="text-red-400 hover:cursor-pointer hover:text-red-500"/>
      }
      case 'COFFEE_SHOP': {
        return <BiSolidCoffee size={size} className="text-green-400 hover:cursor-pointer hover:text-green-500"/>
      }
      default: {
        return <FaBuildingShield size={size} className="text-blue-400 hover:cursor-pointer hover:text-blue-500"/>
      }
    }
  }
  return (
    <div className={`relative w-[${size}px] h-[${size}px]`}>
      {renderIcon()}
    </div>
  );
};

export default AmenitiesIcon;