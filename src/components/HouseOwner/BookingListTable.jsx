import { useQuery } from "@tanstack/react-query";
import api from "../../redux/api/api";

const BookingListTable = () => {
  const { data: bookList } = useQuery({
    queryKey: ["bookList"],
    queryFn: async () => {
      const response = await api.get("/auth/booked_houses");
      return response.data;
    },
  });
  return (
    <>
      <div className="overflow-x-scroll md:overflow-x-auto max-w-screen">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>House name</th>
              <th>Booked by</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {bookList &&
              bookList.map((house, i) => {
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
                        Name: {house?.userInfo?.name}
                        <br />
                        <span className="text-xs">
                          Phone number: {house?.userInfo?.phoneNumber}
                        </span>
                      </td>
                    </tr>
                  </>
                );
              })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default BookingListTable;
