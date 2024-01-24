import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import api, { API } from "../../redux/api/api";
import BookingModal from "../../components/HouseOwner/BookingModal";
import searchIcon from "../../assets/house.png";
import { toast } from "react-hot-toast";
import FilterOptionsModal from "../../components/FilterOptionsModal";

const Home = () => {
  const [allHouses, setAllHouses] = useState([]);
  const [houseId, setHouseId] = useState(null);
  const [page, setPage] = useState(1);
  // const [loading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState(null);
  const [filteredSearchData, setFilteredSearchData] = useState(null);
  const [filteredOptionsData, setFilteredOptionsData] = useState(null);
  const [filterModalData, setFilterModalData] = useState({});

  // console.log(filterModalData);

  const { data: bookingList, refetch } = useQuery({
    queryKey: ["houseList"],
    queryFn: async () => {
      const response = await api.get("/auth/booking_list");
      return response.data.data;
    },
  });

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 1 >=
      document.documentElement.scrollHeight
    ) {
      setPage((prev) => prev + 1);
      // setIsLoading(true);
    }
  };
  // console.log(page);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const removeDuplicates = (arr) => {
    const uniqueMap = new Map();
    return arr.reduce((uniqueArr, item) => {
      const key = JSON.stringify(item);
      if (!uniqueMap.has(key)) {
        uniqueMap.set(key, true);
        uniqueArr.push(item);
      }
      return uniqueArr;
    }, []);
  };

  useEffect(() => {
    async function GetAllHouses() {
      const response = await axios.get(
        `${API}auth/all_houses_list?per_page=10&page=${page}`
      );

      setAllHouses((prev) => {
        const mergedHouses = [...prev, ...response.data.data];
        return removeDuplicates(mergedHouses);
      });
      // setIsLoading(false);
    }
    GetAllHouses();
  }, [page]);
  // console.log(allHouses, "All house");

  // filter options

  useEffect(() => {
    const filteredSearchData = allHouses?.filter((item) =>
      item?.name.toLowerCase().includes(searchQuery?.toLowerCase())
    );
    setFilteredSearchData(filteredSearchData);
  }, [searchQuery, allHouses]);

  useEffect(() => {
    if (filterModalData) {
      const filteredData = allHouses?.filter((item) => {
        return Object.entries(filterModalData)?.every(([key, value]) => {
          return value === "" || item[key]?.includes(value);
        });
      });
      setFilteredOptionsData(filteredData);
    }
  }, [allHouses, filterModalData]);
  console.log(filteredOptionsData, "options");

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      setSearchQuery(e.target.value);
      if (filteredSearchData.length === 0) {
        toast.error("Can't find anything");
      }
    }
  };

  return (
    <main
      className=" max-w-[2520px] mx-auto xl:px-20 md:px-10 sm:px-2 px-4 py-5 md:py-9 lg:py-10 2xl:py-14  
     "
    >
      {/* Filters */}
      <section className=" pb-6 md:pb-9 flex flex-row gap-6 justify-around flex-wrap items-center">
        <div className="relative">
          <input
            type="search"
            placeholder="Search houses"
            className="input input-bordered w-[250px] md:w-[360px] pl-12"
            onKeyDown={(e) => {
              handleSearch(e);
            }}
          />
          <img
            src={searchIcon}
            alt="search"
            className="w-7 absolute top-[25%] left-3"
          />
        </div>
        <div className="flex flex-row gap-4">
          <button
            onClick={() => {
              window.my_modal_2.showModal();
            }}
            className=" px-5 py-4 border border-neutral-200 
           shadow-md rounded-xl"
          >
            Filter option
          </button>
        </div>
      </section>
      {/* Houses */}
      <section className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-5 sm:gap-6 md:gap-8 lg:gap-10">
        {filteredSearchData?.length !== 0 ? (
          <>
            {filteredSearchData &&
              filteredSearchData?.map((house, i) => {
                const isIdMatch = bookingList?.some(
                  (list) => list.houseId === house._id
                );
                console.log(isIdMatch);
                return (
                  <div
                    key={i}
                    className=" flex flex-col gap-y-3 shadow-md bg-white border border-neutral-200 rounded-2xl relative pb-14"
                  >
                    <div>
                      <img
                        src={house?.houseImage}
                        alt="House"
                        className="rounded-t-2xl"
                      />
                    </div>
                    <div className=" flex flex-col gap-y-1 text-sm py-3 px-2 md:pt-3 md:pb-5 md:px-4">
                      <p>
                        <span className="font-medium">Bedrooms:</span>{" "}
                        {house?.bedrooms}, Room size: {house?.roomSize} sft
                      </p>
                      <p>
                        {" "}
                        <span className="font-medium">
                          Available from:
                        </span>{" "}
                        {house?.availabilityDate}
                      </p>
                      <p>
                        <span className=" font-medium"> Phone number:</span>{" "}
                        {house?.phoneNumber}
                      </p>
                      <p>
                        <span className=" font-medium"> Rent per month:</span>{" "}
                        {house?.rentPerMonth}tk
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        setHouseId(house?._id);
                        window.my_modal_1.showModal();
                      }}
                      disabled={isIdMatch}
                      className=" py-3 px-6 md:px-9 absolute bottom-0 right-0 rounded-br-2xl rounded-tl-2xl bg-primary hover:bg-accent duration-300 transition text-white font-medium disabled:bg-[#dddddd] disabled:cursor-not-allowed"
                    >
                      {isIdMatch ? (
                        <p className=" text-[#717171] text-sm">Already booked</p>
                      ) : (
                        "Book"
                      )}
                    </button>
                  </div>
                );
              })}
          </>
        ) : filteredOptionsData?.length !== 0 ? (
          <>
            {filteredOptionsData &&
              filteredOptionsData?.map((house, i) => {
                const isIdMatch = bookingList?.some(
                  (list) => list.houseId === house._id
                );
                console.log(isIdMatch);
                return (
                  <div
                    key={i}
                    className=" flex flex-col gap-y-3 shadow-md bg-white border border-neutral-200 rounded-2xl relative pb-14"
                  >
                    <div>
                      <img
                        src={house?.houseImage}
                        alt="House"
                        className="rounded-t-2xl"
                      />
                    </div>
                    <div className=" flex flex-col gap-y-1 text-sm py-3 px-2 md:pt-3 md:pb-5 md:px-4">
                      <p>
                        <span className="font-medium">Bedrooms:</span>{" "}
                        {house?.bedrooms}, Room size: {house?.roomSize} sft
                      </p>
                      <p>
                        {" "}
                        <span className="font-medium">
                          Available from:
                        </span>{" "}
                        {house?.availabilityDate}
                      </p>
                      <p>
                        <span className=" font-medium"> Phone number:</span>{" "}
                        {house?.phoneNumber}
                      </p>
                      <p>
                        <span className=" font-medium"> Rent per month:</span>{" "}
                        {house?.rentPerMonth}tk
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        setHouseId(house?._id);
                        window.my_modal_1.showModal();
                      }}
                      disabled={isIdMatch}
                      className=" py-3 px-6 md:px-9 absolute bottom-0 right-0 rounded-br-2xl rounded-tl-2xl bg-primary hover:bg-accent duration-300 transition text-white font-medium disabled:bg-[#dddddd] disabled:cursor-not-allowed"
                    >
                      {isIdMatch ? (
                        <p className=" text-[#717171] text-sm">Already booked</p>
                      ) : (
                        "Book"
                      )}
                    </button>
                  </div>
                );
              })}
          </>
        ) : (
          <>
            {allHouses &&
              allHouses.map((house, i) => {
                const isIdMatch = bookingList?.some(
                  (list) => list.houseId === house._id
                );
                // console.log(isIdMatch);
                return (
                  <div
                    key={i}
                    className=" flex flex-col gap-y-3 shadow-md bg-white border border-neutral-200 rounded-2xl relative pb-14"
                  >
                    <div>
                      <img
                        src={house?.houseImage}
                        alt="House"
                        className="rounded-t-2xl"
                      />
                    </div>
                    <div className=" flex flex-col gap-y-1 text-sm py-3 px-2 md:pt-3 md:pb-5 md:px-4">
                      <p>
                        <span className="font-medium">Bedrooms:</span>{" "}
                        {house?.bedrooms}, Room size: {house?.roomSize} sft
                      </p>
                      <p>
                        {" "}
                        <span className="font-medium">
                          Available from:
                        </span>{" "}
                        {house?.availabilityDate}
                      </p>
                      <p>
                        <span className=" font-medium"> Phone number:</span>{" "}
                        {house?.phoneNumber}
                      </p>
                      <p>
                        <span className=" font-medium"> Rent per month:</span>{" "}
                        {house?.rentPerMonth}tk
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        setHouseId(house?._id);
                        window.my_modal_1.showModal();
                      }}
                      disabled={isIdMatch}
                      className=" py-3 px-6 md:px-9 absolute bottom-0 right-0 rounded-br-2xl rounded-tl-2xl bg-primary hover:bg-accent duration-300 transition text-white font-medium disabled:bg-[#dddddd] disabled:cursor-not-allowed"
                    >
                      {isIdMatch ? (
                        <p className=" text-[#717171] text-sm">Aready booked</p>
                      ) : (
                        "Book"
                      )}
                    </button>
                  </div>
                );
              })}
          </>
        )}
      </section>
      <>
        <FilterOptionsModal setFilterModalData={setFilterModalData} />
      </>
      <>
        <BookingModal
          houseId={houseId}
          refetch={refetch}
          bookingList={bookingList}
        />
      </>
    </main>
  );
};

export default Home;
