import React, { useState, useEffect } from "react";
import "./CustomerProfile.scss";

export const CustomerProfile = ({ selectedCustomerId }) => {
  const [showProfile, setShowProfile] = useState(0);

  useEffect(() => {
    fetch(`https://cyf-hotel-api.netlify.app/customers/${selectedCustomerId}`)
      .then((response) => response.json())
      .then((data) => setShowProfile(data));
  }, [selectedCustomerId]);

  return (
    <div>
      {selectedCustomerId > 0 && (
        <div className="profile-card">
          <h2>Customer {selectedCustomerId} profile</h2>{" "}
          <p>
            {showProfile.title} {showProfile.firstName} {showProfile.surname}{" "}
            <span className={showProfile.vip ? "vip" : "not-vip"}>VIP!</span>
          </p>
          <p>{showProfile.email}</p>
          <p>{showProfile.phoneNumber}</p>
        </div>
      )}
    </div>
  );
};

export default CustomerProfile;
