/* eslint-disable react/prop-types */

import Booking from "../components/HouseOwner/Booking";
import HouseList from "../components/HouseOwner/HouseList";

const OwnerDashboard = ({ selectedMenu }) => {
  return (
    <>
      {selectedMenu ? (
        <>
          <Booking />
        </>
      ) : (
        <>
          <HouseList />
        </>
      )}
    </>
  );
};

export default OwnerDashboard;
