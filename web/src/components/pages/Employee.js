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
  address: [13.945792598978544, 121.1358466368051],
  phone: "09123456789",
  isActive: true,
  profilePic:
    "https://gravatar.com/avatar/27205e5c51cb03f862138b22bcb5dc20f94a342e744ff6df1b8dc8af3c865109",
  roles: ["EMPLOYEE", "ADMIN"],
};

const amenities = [
  {
    address: [13.94287705402975, 121.13696243600263],
    type: "HOSPITAL",
    name: "Jollibee",
  },
  {
    address: [13.94301475117621, 121.13415874823322],
    type: "EVACUATION_CENTER",
    name: "24 Chicken",
  },
  {
    address: [13.945345580350967, 121.13886370498118],
    type: "COFFEE_SHOP",
    name: "Starbuko",
  },
];
const EmployeePage = () => {
  return (
    <div class="flex h-full gap-2">
      <EmployeeDetails userDetails={userDetails} />
      <EmployeeActions userDetails={userDetails} amenities={amenities}/>
    </div>
  );
};

export default EmployeePage;
