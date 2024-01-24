import { useQuery } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import api from "../redux/api/api";

const RenterDashboard = () => {
  const { data: renterBookedList, refetch } = useQuery({
    queryKey: ["renterBookedList"],
    queryFn: async () => {
      const response = await api.get("/auth/renter_booked_houses");
      return response.data;
    },
  });

  const handleDeleteHouse = async (houseId) => {
    try {
      const editResponse = await api.delete(
        `/auth/delete_booked_houses/${houseId}`
      );
      console.log(editResponse);
      if (editResponse?.data.status === 200) {
        toast.success(editResponse?.data.message);
        refetch();
      }
    } catch (error) {
      console.log(error);
      toast.error(error);
    }
  };
  return (
    <div>
      <div className="overflow-x-scroll md:overflow-x-auto max-w-screen">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>House name</th>
              <th>Details</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {renterBookedList &&
              renterBookedList?.map((house, i) => {
                return (
                  <>
                    <tr key={i}>
                      <th>{i + 1}</th>
                      <td>
                        <div className="flex items-center space-x-3">
                          <div className="avatar">
                            <div className="mask mask-squirrel w-12 h-12">
                              <img src={house?.houseImage} alt="House images" />
                            </div>
                          </div>
                          <div>
                            <div className="font-bold">{house?.name}</div>
                            <div className="text-sm opacity-50">
                              {house?.city}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>
                        {house?.address}
                        <br />
                        <span className="text-xs">
                          Bedrooms: {house?.bedrooms}, Room size:{" "}
                          {house?.roomSize} sft
                          <br />
                          Available from: {house?.availabilityDate}
                          <br />
                          Phone number: {house?.phoneNumber}
                          <br />
                          Rent per month: {house?.rentPerMonth}tk
                        </span>
                      </td>
                      <th>
                        <button
                          className="btn btn-ghost hover:btn-error hover:text-white btn-xs"
                          onClick={() => {
                            handleDeleteHouse(house._id);
                          }}
                        >
                          Cancel
                        </button>
                      </th>
                    </tr>
                  </>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RenterDashboard;
