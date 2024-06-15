import React, { useState, useEffect } from "react";

export const CustomerProfile = ({ selectedCustomerId }) => {
  const [showProfile, setShowProfile] = useState(0);

  useEffect(() => {
    fetch(`https://cyf-hotel-api.netlify.app/customers/${selectedCustomerId}`)
      .then((response) => response.json())
      .then((data) => setShowProfile(data));
  }, [selectedCustomerId]);
  console.log(showProfile);
  return (
    <div>
      {selectedCustomerId && <p>Customer {selectedCustomerId} profile </p>}
    </div>
  );
};

export default CustomerProfile;
