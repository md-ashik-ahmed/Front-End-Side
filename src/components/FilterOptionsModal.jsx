/* eslint-disable react/prop-types */
import  { useState } from "react";
import { useForm } from "react-hook-form";

const FilterOptionsModal = ({ setFilterModalData }) => {
  const { register, handleSubmit, reset } = useForm();
  const [rangeValue, setRangeValue] = useState(0);

  const handleChange = (e) => {
    setRangeValue(Number(e.target.value));
  };

  const handleFilterValue = (data) => {
    let filterData = {
      ...data,
      rentPerMonth: rangeValue,
    };
    setFilterModalData(filterData);
    window.my_modal_2.close();
  };

  return (
    <div>
      <dialog id="my_modal_2" className="modal">
        <form
          method="dialog"
          className="modal-box"
          onSubmit={handleSubmit(handleFilterValue)}
        >
          <h3 className="font-bold text-lg">Select filter options!</h3>

          <div>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">City</span>
              </label>
              <input
                type="text"
                placeholder="City"
                className="input input-bordered w-full"
                {...register("city")}
              />
            </div>
            <div className="form-control w-full mt-3">
              <label className="label">
                <span className="label-text">Bedrooms</span>
              </label>
              <input
                type="text"
                placeholder="Bedrooms"
                className="input input-bordered w-full"
                {...register("bedrooms")}
              />
            </div>
            <div className="form-control w-full mt-3">
              <label className="label">
                <span className="label-text">Bathrooms</span>
              </label>
              <input
                type="text"
                placeholder="Bathrooms"
                className="input input-bordered w-full"
                {...register("bathrooms")}
              />
            </div>
            <div className="form-control w-full mt-3">
              <label className="label">
                <span className="label-text">Room size</span>
              </label>
              <input
                type="text"
                placeholder="Room size in square feet"
                className="input input-bordered w-full"
                {...register("roomSize")}
              />
            </div>
            <div className="form-control w-full mt-3">
              <label className="label">
                <span className="label-text">Availability</span>
              </label>
              <input
                type="date"
                placeholder="Availability date"
                className="input input-bordered w-full"
                {...register("availabilityDate")}
              />
            </div>
            <div className="form-control w-full mt-3">
              <input
                type="range"
                min={0}
                max={100000}
                value={rangeValue}
                className="range range-success"
                onChange={handleChange}
              />
              <p className="flex justify-center mt-2">
                Rent per month: {rangeValue} in tk
              </p>
            </div>
          </div>
          <div className="modal-action">
            <button className="bg-primary disabled:btn-error disabled:cursor-not-allowed disabled:bg-[#dddddd] px-3 py-2 rounded-md text-white hover:bg-accent transition duration-200 font-medium">
              Submit
            </button>
          </div>
        </form>
        {/* close button */}
        <form
          method="dialog"
          className="modal-backdrop"
          onClick={() => {
            reset();
            setRangeValue(0);
          }}
        >
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
};

export default FilterOptionsModal;
