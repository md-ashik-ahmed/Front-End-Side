import { useState } from "react";
import { useSelector } from "react-redux";
import LeftDashboardPanel from "../../components/LeftDashboardPanel";
import OwnerDashboard from "../../components/OwnerDashboard";
import RenterDashboard from "../../components/RenterDashboard";

const Dashboard = () => {
  const [selectedMenu, setSelectedMenu] = useState(false);

  const userRole = useSelector((state) => state.user.userDetails?.role);
  return (
    <section className="md:grid md:grid-cols-12 gap-3 md:gap-x-10 2xl:gap-x-16 max-w-[2520px] mx-auto xl:px-20 md:px-10 sm:px-2 px-4 py-2 md:py-6 2xl:py-4 h-screen mb-8 md:mb-0">
      <div className=" col-span-3">
        <LeftDashboardPanel
          selectedMenu={selectedMenu}
          setSelectedMenu={setSelectedMenu}
        />
      </div>
      <div className=" col-span-9">
        {userRole === "House Owner" ? (
          <OwnerDashboard selectedMenu={selectedMenu} />
        ) : (
          <RenterDashboard />
        )}
      </div>
    </section>
  );
};

export default Dashboard;
