import { useNavigate } from "react-router-dom";
import BookingListTable from "./BookingListTable";

const Booking = () => {
  const navigate = useNavigate();
  return (
    <section className="flex flex-col gap-y-4 md:gap-y-8 text-textColor">
      <div className=" flex flex-row gap-5 justify-around">
        <div className="bg-[#d1fae5] max-w-xs flex flex-col gap-y-4 px-6 py-3 rounded-lg shadow">
          <p className=" text-xl font-medium">0 houses booked</p>
          <p className="text-base">Total Houses booked: 0</p>
        </div>
        <div className="bg-[#e6f5eb] max-w-xs flex flex-col gap-y-4 px-6 py-3 rounded-lg border border-[#eef4f9] shadow">
          <p className=" text-xl font-medium">Want to book a new house!!</p>
          <p
            className="text-sm bg-white rounded-full px-3 py-2 font-medium flex justify-start shadow-md max-w-[130px] mx-auto cursor-pointer hover:shadow-lg"
            onClick={() => {
              navigate("/");
            }}
          >
            Go to home
          </p>
        </div>
      </div>
      {/* booking data */}
      <section className="py-4 md:py-8 lg:py-12">
        <div>
          <BookingListTable />
        </div>
      </section>
    </section>
  );
};

export default Booking;
