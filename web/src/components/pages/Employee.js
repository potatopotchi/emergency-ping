import EmployeeActions from "@synergy-project-t/ui-components/employee/EmployeeActions";
import EmployeeDetails from "@synergy-project-t/ui-components/employee/EmployeeDetails";
import React from "react";

const userDetails = {
  email: "abcd@yopmail.com",
  firstName: "Gengee Vor",
  lastName: "Efg",
  status: "SAFE",
  locationCode: "NCR_MANILA_MANILA",
  fullLocation: "My Home Address, manila, Manila",
  address: [7.938080467480591, 122.7804583101427],
  phone: '09123456789',
  isActive: true,
  profilePic:
    "https://gravatar.com/avatar/27205e5c51cb03f862138b22bcb5dc20f94a342e744ff6df1b8dc8af3c865109",
  roles: ["EMPLOYEE", "ADMIN"],
  amenities: [{
    address: [7.9380804674806, 122.79],
    type: 'HOSPITAL',
    name: 'XY',
  }, {
    address: [7.85, 122.69],
    type: 'EVAC_CENTER',
    name: 'XY',
    
  }, {
    address: [7.9, 122.79],
    type: 'COFFEE_SHOP',
    name: 'XY',
    
  }]
};

const EmployeePage = () => {
  return (
    <div class="flex h-full gap-2">
      <EmployeeDetails userDetails={userDetails} />
      <EmployeeActions userDetails={userDetails} />
    </div>
  );
};

export default EmployeePage;
