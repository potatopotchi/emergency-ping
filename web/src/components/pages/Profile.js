import UserAddress from "@synergy-project-t/ui-components/profile/UserAddress";
import UserDetails from "@synergy-project-t/ui-components/profile/UserDetails";
import React from "react";

const userDetails = {
  email: "abcd@yopmail.com",
  firstName: "Gengee Vor",
  lastName: "Efg",
  status: "SAFE",
  locationCode: "NCR_MANILA_MANILA",
  fullLocation: "My Home Address, manila, Manila",
  address: [7.938080467480591, 122.7804583101427],
  isActive: true,
  profilePic:
    "https://gravatar.com/avatar/27205e5c51cb03f862138b22bcb5dc20f94a342e744ff6df1b8dc8af3c865109",
  roles: ["EMPLOYEE", "ADMIN"],
};

const ProfilePage = () => {
  return (
    <div class="flex h-full gap-2">
      <UserDetails userDetails={userDetails} />
      <UserAddress userDetails={userDetails} />
    </div>
  );
};

export default ProfilePage;
