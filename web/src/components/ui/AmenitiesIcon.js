import React from "react";
import { FaBuildingShield, FaHospital } from "react-icons/fa6";
import { FiCoffee } from "react-icons/fi";


const AmenitiesIcon = ({ size = 20, type = 'EVAC_CENTER' }) => {
  const renderIcon = () => {
    switch(type) {
      case 'EVAC_CENTER': {
        return <FaBuildingShield size={size} className="text-blue-400"/>
      }
      case 'HOSPITAL': {
        return <FaHospital size={size} className="text-blue-400"/>
      }
      case 'COFFEE_SHOP': {
        return <FiCoffee size={size} className="text-blue-400"/>
      }
      default: {
        return <FaBuildingShield size={size} className="text-blue-400"/>
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