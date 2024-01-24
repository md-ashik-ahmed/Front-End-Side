import { useQuery } from "@tanstack/react-query";
import api from "../../redux/api/api";
import dashboard from "../../assets/house.png";
import HouseListTable from "./HouseListTable";
import NewHouseModal from "./NewHouseModal";

const HouseList = () => {
  const { data: houseList, refetch } = useQuery({
    queryKey: ["houseList"],
    queryFn: async () => {
      const response = await api.get("/auth/house_list");
      return response.data;
    },
  });

  console.log(houseList, "House List");
  return (
    <>
      <section className="flex flex-col gap-y-4 md:gap-y-8 text-textColor">
        <div className=" flex flex-row gap-5 justify-around">
          <div className="bg-[#d1fae5] max-w-xs flex flex-col gap-y-4 px-6 py-3 rounded-lg shadow">
            <p className=" text-xl font-medium">
              {houseList?.length} houses on rent
            </p>
            <p className="text-base">Total Houses own: {houseList?.length}</p>
          </div>
          <div className="bg-[#e6f5eb] max-w-xs flex flex-col gap-y-4 px-6 py-3 rounded-lg border border-[#eef4f9] shadow">
            <p className=" text-xl font-medium">Want to rent a new house!!</p>
            <p
              className="text-sm bg-white rounded-full px-3 py-2 font-medium flex justify-start shadow-md max-w-[130px] mx-auto cursor-pointer hover:shadow-lg"
              onClick={() => window.my_modal_5.showModal()}
            >
              Add new house
            </p>
          </div>
        </div>
        {/* No house image */}
        {houseList?.length === 0 ? (
          <div className=" flex flex-col justify-center pb-5 mx-auto pt-7">
            <h2 className=" text-textColor text-3xl font-medium mx-auto">
              Add New <span className=" text-primary"> Houses</span>
            </h2>
            <img
              src={dashboard}
              alt="See house listing"
              className=" md:max-w-md"
            />
          </div>
        ) : (
          <div className="mt-5">
            <HouseListTable houseList={houseList} refetch={refetch} />
          </div>
        )}
      </section>
      <NewHouseModal refetch={refetch} />
    </>
  );
};

export default HouseList;

<button className="btn">open modal</button>;
