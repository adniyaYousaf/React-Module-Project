import "./CustomerProfile.scss";
import { useEffect, useState } from "react";

const CustomerProfile = (selectedID) => {

  const [profileData, setProfileData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        fetch(`https://cyf-react.glitch.me/customers/${selectedID}`).then(
          (data) => setProfileData(data)
        );
      } catch (error) {
        console.error("Error fetching data from the server", error);
      }
    };
    fetchData();
  }, []);
  return (
    <div className="customerProfile">
      <ul>
        <li>ID: {profileData.id}</li>
        <li>Email: {profileData.email}</li>
        <li>VIP: {profileData.isVip ? "Yes" : "No"}</li>
        <li>Phone Number: {profileData.phoneNumber}</li>
      </ul>
    </div>
  );
};

export default CustomerProfile;
