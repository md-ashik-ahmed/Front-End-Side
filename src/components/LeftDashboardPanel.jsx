/* eslint-disable react/prop-types */
import dashboard from "../../src/assets/house.png";
import booking from "../../src/assets/house.png";
import { useSelector } from "react-redux";
// import list from "../../assets/dashboardIcons/list.png";

const LeftDashboardPanel = ({ selectedMenu, setSelectedMenu }) => {
  const userRole = useSelector((state) => state.user?.userDetails?.role);
  return (
    <section className=" bg-white flex flex-col rounded-lg text-textColor py-5 shadow-md border border-neutral-300 h-full">
      <h3 className=" flex justify-center text-base md:text-xl">Dashboard</h3>

      <div className="flex flex-col gap-y-3 my-6">
        {!userRole ? null : userRole === "House Renter" ? (
          <div
            className={`flex flex-row items-center gap-3 px-4 py-2 cursor-pointer ${
              !selectedMenu ? "bg-secondary" : ""
            }`}
          >
            <img src={booking} alt="dashboard" className=" w-5 2xl:w-7" />
            <p className=" text-base md:text-lg">Booking</p>
          </div>
        ) : (
          <>
            <div
              onClick={() => {
                setSelectedMenu(false);
              }}
              className={`flex flex-row items-center gap-3 px-4 py-2 cursor-pointer ${
                !selectedMenu ? " bg-secondary" : ""
              }`}
            >
              <img src={dashboard} alt="dashboard" className=" w-6 2xl:w-7" />
              <p className=" text-base md:text-lg">House list</p>
            </div>
            <div
              onClick={() => {
                setSelectedMenu(true);
              }}
              className={`flex flex-row items-center gap-3 px-4 py-2 cursor-pointer ${
                selectedMenu ? "bg-secondary" : ""
              }`}
            >
              <img src={booking} alt="dashboard" className=" w-5 2xl:w-7" />
              <p className=" text-base md:text-lg">Booking</p>
            </div>
          </>
        )}
        {/* <div className=" flex flex-row items-center gap-3 mx-4">
          <img src={list} alt="dashboard" className=" w-6 md:w-8" />
          <p className=" text-base md:text-lg"> </p>
        </div> */}
      </div>
    </section>
  );
};

export default LeftDashboardPanel;
