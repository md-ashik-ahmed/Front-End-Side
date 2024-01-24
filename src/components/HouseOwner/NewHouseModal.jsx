/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";
import { PulseLoader } from "react-spinners";
import api from "../../redux/api/api";

import errorIcon from "../../assets/house.png";

const NewHouseModal = ({ refetch }) => {
  const userId = useSelector((state) => state.user.userDetails?._id);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [image, setImage] = useState(null);
  const [houseImageLink, setHouseImageLink] = useState("");
  const [imageError, setImageError] = useState(null);
  const [isImgUploading, setIsImgUploading] = useState(false);
  const [isHouseInfoUploading, setIsHouseInfoUploading] = useState(false);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleHouseInfo = async (data) => {
    try {
      setIsHouseInfoUploading(true);
      const houseData = {
        ...data,
        houseImage: houseImageLink,
        bathrooms: data.bathrooms,
        userId: userId,
      };

      const houseInfoResponse = await api.post(
        "/auth/house_details",
        houseData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      if (houseInfoResponse.data.status === 200) {
        toast.success(houseInfoResponse.data.message);
        setIsHouseInfoUploading(false);
        setImage(null);
        reset();
        refetch();
        window.my_modal_5.close();
      }
    } catch (error) {
      console.log(error);
      setIsHouseInfoUploading(false);
    } finally {
      setIsHouseInfoUploading(false);
    }
  };

  useEffect(() => {
    setIsImgUploading(true);
    if (image !== null && image?.size / 500000 < 5) {
      const imageFormData = new FormData();
      imageFormData.append("file", image);
      imageFormData.append("upload_preset", "house-hunter");
      imageFormData.append("cloud_name", "dlhexsnxq");

      try {
        fetch("https://api.cloudinary.com/v1_1/dlhexsnxq/image/upload", {
          method: "POST",
          body: imageFormData,
        })
          .then((res) => res.json())
          .then((data) => {
            setHouseImageLink(data.url);
            if (data.error) {
              setImageError(data?.error?.message);
              setIsImgUploading(false);
            } else {
              setImageError(null);
              setIsImgUploading(false);
            }
          })
          .catch((err) => {
            toast.error(err.message + "try again");
            setIsImgUploading(false);
          });
      } catch (error) {
        console.log(error);
        setIsImgUploading(false);
      }
    } else if (image?.size / 500000 > 5) {
      setImageError("Image size can't exceed 5mb");
      setIsImgUploading(false);
    }
  }, [image]);

  console.log(image, houseImageLink, isImgUploading);

  return (
    <>
      <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
        <form
          method="dialog"
          className="modal-box"
          onSubmit={handleSubmit(handleHouseInfo)}
        >
          <h3 className="font-bold text-lg flex justify-center">
            Give house information below!
          </h3>
          {/* House information input */}
          <div className=" my-5">
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                placeholder="House name"
                className="input input-bordered w-full"
                {...register("name", {
                  required: true,
                })}
              />
              {errors.name && (
                <div
                  role="alert"
                  className=" flex flex-row items-center gap-2 mt-1"
                >
                  <img
                    src={errorIcon}
                    alt="Last name is requires"
                    className="w-5"
                  />
                  <p className="text-xs text-[#c13515]">Name is required</p>
                </div>
              )}
            </div>
            <div className="form-control w-full mt-3">
              <label className="label">
                <span className="label-text">Address</span>
              </label>
              <input
                type="text"
                placeholder="House address"
                className="input input-bordered w-full"
                {...register("address", {
                  required: true,
                })}
              />
              {errors.address && (
                <div
                  role="alert"
                  className=" flex flex-row items-center gap-2 mt-1"
                >
                  <img
                    src={errorIcon}
                    alt="Last name is requires"
                    className="w-5"
                  />
                  <p className="text-xs text-[#c13515]">Address is required</p>
                </div>
              )}
            </div>
            <div className="form-control w-full mt-3">
              <label className="label">
                <span className="label-text">City</span>
              </label>
              <input
                type="text"
                placeholder="City"
                className="input input-bordered w-full"
                {...register("city", {
                  required: true,
                })}
              />
              {errors.city && (
                <div
                  role="alert"
                  className=" flex flex-row items-center gap-2 mt-1"
                >
                  <img
                    src={errorIcon}
                    alt="Last name is requires"
                    className="w-5"
                  />
                  <p className="text-xs text-[#c13515]">City is required</p>
                </div>
              )}
            </div>
            <div className="form-control w-full mt-3">
              <label className="label">
                <span className="label-text">Bedrooms</span>
              </label>
              <input
                type="text"
                placeholder="Bedrooms"
                className="input input-bordered w-full"
                {...register("bedrooms", {
                  required: true,
                })}
              />
              {errors.bedrooms && (
                <div
                  role="alert"
                  className=" flex flex-row items-center gap-2 mt-1"
                >
                  <img
                    src={errorIcon}
                    alt="Last name is requires"
                    className="w-5"
                  />
                  <p className="text-xs text-[#c13515]">Bedrooms is required</p>
                </div>
              )}
            </div>
            <div className="form-control w-full mt-3">
              <label className="label">
                <span className="label-text">Bathrooms</span>
              </label>
              <input
                type="text"
                placeholder="Bathrooms"
                className="input input-bordered w-full"
                {...register("bathrooms", {
                  required: true,
                })}
              />
              {errors.bathrooms && (
                <div
                  role="alert"
                  className=" flex flex-row items-center gap-2 mt-1"
                >
                  <img
                    src={errorIcon}
                    alt="Last name is requires"
                    className="w-5"
                  />
                  <p className="text-xs text-[#c13515]">
                    Bathrooms is required
                  </p>
                </div>
              )}
            </div>
            <div className="form-control w-full mt-3">
              <label className="label">
                <span className="label-text">Room size</span>
              </label>
              <input
                type="text"
                placeholder="Room size"
                className="input input-bordered w-full"
                {...register("roomSize", {
                  required: true,
                })}
              />
              {errors.roomSize && (
                <div
                  role="alert"
                  className=" flex flex-row items-center gap-2 mt-1"
                >
                  <img
                    src={errorIcon}
                    alt="Last name is requires"
                    className="w-5"
                  />
                  <p className="text-xs text-[#c13515]">This is required</p>
                </div>
              )}
            </div>
            <div className="form-control w-full mt-3">
              <label className="label">
                <span className="label-text">Picture</span>
              </label>
              <input
                type="file"
                id="image-input"
                placeholder="House image"
                className=" hidden"
                {...register("houseImage", {
                  required: true,
                })}
                onChange={(e) => {
                  handleImageChange(e);
                }}
                accept=".jpg,.jpeg,.png,image/jpeg,image/jpg,image/png"
              />
              <div className=" w-full p-3 border border-[#d2d4d7] rounded-lg text-[#9ca3af]">
                <label
                  htmlFor="image-input"
                  className=" cursor-pointer block w-full"
                >
                  {image ? (
                    <p className=" text-textColor">
                      {isImgUploading ? (
                        <div className=" flex justify-center py-1">
                          <PulseLoader
                            color="#5cd183"
                            size={7}
                            margin={4}
                            speedMultiplier={0.6}
                          />
                        </div>
                      ) : (
                        <>{image?.name}</>
                      )}
                    </p>
                  ) : (
                    "Choose image"
                  )}
                </label>
              </div>
              {errors.houseImage && (
                <div
                  role="alert"
                  className=" flex flex-row items-center gap-2 mt-1"
                >
                  <img
                    src={errorIcon}
                    alt="Last name is requires"
                    className="w-5"
                  />
                  <p className="text-xs text-[#c13515]">This is required</p>
                </div>
              )}
              {imageError === "Unsupported source URL: null" ? (
                ""
              ) : (
                <div
                  role="alert"
                  className=" flex flex-row items-center gap-2 mt-1"
                >
                  <p className="text-xs text-[#c13515]">{imageError}</p>
                </div>
              )}
            </div>
            <div className="form-control w-full mt-3">
              <label className="label">
                <span className="label-text">Availability date</span>
              </label>
              <input
                type="date"
                placeholder="Availability date"
                className="input input-bordered w-full"
                {...register("availabilityDate", {
                  required: true,
                })}
              />
              {errors.availabilityDate && (
                <div
                  role="alert"
                  className=" flex flex-row items-center gap-2 mt-1"
                >
                  <img
                    src={errorIcon}
                    alt="Last name is requires"
                    className="w-5"
                  />
                  <p className="text-xs text-[#c13515]">This is required</p>
                </div>
              )}
            </div>
            <div className="form-control w-full mt-3">
              <label className="label">
                <span className="label-text">Rent per month</span>
              </label>
              <input
                type="number"
                placeholder="Rent per month in tk"
                className="input input-bordered w-full"
                {...register("rentPerMonth", { required: true })}
              />
              {errors.rentPerMonth && (
                <div
                  role="alert"
                  className=" flex flex-row items-center gap-2 mt-1"
                >
                  <img
                    src={errorIcon}
                    alt="Last name is requires"
                    className="w-5"
                  />
                  <p className="text-xs text-[#c13515]">This is required</p>
                </div>
              )}
            </div>
            <div className="form-control w-full mt-3">
              <label className="label">
                <span className="label-text">Phone number</span>
              </label>
              <input
                type="text"
                placeholder="Your phone number"
                className="input input-bordered w-full"
                {...register("phoneNumber", {
                  required: true,
                  pattern: {
                    value: /^(?:\+?88)?01[3-9]\d{8}$/,
                    message:
                      "Please provide a valid Bangladeshi phone number. +880..",
                  },
                })}
              />
              {errors.phoneNumber && (
                <div
                  role="alert"
                  className=" flex flex-row items-center gap-2 mt-1"
                >
                  <img
                    src={errorIcon}
                    alt="Last name is requires"
                    className="w-5"
                  />
                  <p className="text-xs text-[#c13515]">
                    {errors.phoneNumber.message}
                  </p>
                </div>
              )}
            </div>
            <div className="form-control w-full mt-3">
              <label className="label">
                <span className="label-text">Description</span>
              </label>
              <input
                type="text"
                placeholder="Description"
                className="input input-bordered w-full"
                {...register("description", {
                  required: true,
                })}
              />
              {errors.description && (
                <div
                  role="alert"
                  className=" flex flex-row items-center gap-2 mt-1"
                >
                  <img
                    src={errorIcon}
                    alt="Last name is requires"
                    className="w-5"
                  />
                  <p className="text-xs text-[#c13515]">This is required</p>
                </div>
              )}
            </div>
          </div>

          {/* submit button */}
          <div className="modal-action">
            <button
              className="bg-primary disabled:btn-error disabled:cursor-not-allowed disabled:bg-[#dddddd] px-3 py-2 rounded-md text-white hover:bg-accent transition duration-200 font-medium"
              disabled={imageError}
            >
              {imageError ? (
                "Give valid image"
              ) : (
                <>
                  {isHouseInfoUploading ? (
                    <PulseLoader
                      color="#afd6e9"
                      size={7}
                      margin={4}
                      speedMultiplier={0.6}
                    />
                  ) : (
                    "Submit"
                  )}
                </>
              )}
            </button>
          </div>
        </form>
        {/* close button */}
        <form
          method="dialog"
          className="modal-backdrop"
          onClick={() => {
            reset();
            setImage(null);
            setImageError(null);
            setHouseImageLink("");
          }}
        >
          <button>close</button>
        </form>
      </dialog>
    </>
  );
};

export default NewHouseModal;
