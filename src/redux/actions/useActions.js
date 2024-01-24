import axios from "axios";
import { toast } from "react-hot-toast";
import api, { API } from "../api/api.jsx";

export const registerNewUser = (formData) => async (dispatch) => {

    console.log(formData);
    let user = {
        name: formData.name,
        role: formData.role,
        emailId: formData.emailId,
        phoneNumber: formData.phoneNumber,
        password: formData.password,
    };
    try {
        const response = await axios.post(`${API}auth/register`, user, {
            headers: { "Content-Type": "application/json" },
        });

        console.log(response);
        const responseData = response?.data;
        let accessToken = localStorage.getItem("accessToken");
        let refreshToken = localStorage.getItem("refreshToken");
        if (responseData?.success === 1) {
            console.log(refreshToken);
            toast.success(responseData.info);
            if (!accessToken) {
                localStorage.setItem(
                    "accessToken",
                    JSON.stringify(responseData?.accessToken)
                );
            } else if (accessToken) {
                accessToken = responseData?.accessToken;
                localStorage.setItem("accessToken", JSON.stringify(accessToken));
            }
            if (!refreshToken) {
                localStorage.setItem(
                    "refreshToken",
                    JSON.stringify(responseData?.refreshToken)
                );
            } else if (refreshToken) {
                refreshToken = responseData?.refreshToken;
                console.log(refreshToken);
                localStorage.setItem("refreshToken", JSON.stringify(refreshToken));
            }

        }
        dispatch({
            type: "USER_REGISTER",
            payload: responseData
        })
    } catch (error) {
        console.log(error);
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        toast.error("Network error try again later!");
    }
}

export const userLogin = (formData) => async (dispatch) => {
    try {
        const response = await axios.post(`${API}auth/log_in`, {
            email: formData.email,
            password: formData.password,
        });
        const userData = response.data;
        console.log(userData);

        if (userData?.success === 0) {
            console.log(userData?.message)
            toast.error(userData?.info)
        } else if (userData?.status === 500) {
            toast.error(userData?.info)
        }
        else if (userData?.success === 1) {
            let accessToken = localStorage.getItem("accessToken");
            let refreshToken = localStorage.getItem("refreshToken");
            console.log(refreshToken);

            if (!accessToken) {
                localStorage.setItem(
                    "accessToken",
                    JSON.stringify(userData?.accessToken)
                );
            } else if (accessToken) {
                accessToken = userData?.accessToken;
                localStorage.setItem("accessToken", JSON.stringify(accessToken));
            }
            if (!refreshToken) {
                localStorage.setItem(
                    "refreshToken",
                    JSON.stringify(userData?.refreshToken)
                );
            } else if (refreshToken) {
                refreshToken = userData?.refreshToken;
                console.log(refreshToken);
                localStorage.setItem("refreshToken", JSON.stringify(refreshToken));
            }
            toast.success(userData.info)
            dispatch({
                type: "USER_LOG_IN",
                payload: userData
            })
        }
    } catch (error) {
        console.log(error);
        toast.warn("Network error!");
    }
}


export const getUser = () => async (dispatch, getState) => {
    const { user } = getState().user;

    if (user) {
        return;
    }

    try {
        const response = await api.post("/auth/get_user_details");
        console.log(response.data, "GET USER DETAILS");
        if (response.data.status === 200) {
            dispatch({
                type: "GET_USER_DETAILS",
                payload: response.data.user_details,
            });
        } else {
            dispatch({ type: "USER_LOG_OUT" });
        }
    } catch (error) {
        // Handle error
    }
};


export const userLogOut = () => async (dispatch) => {
    const response = await api.post("/auth/logout");
    console.log(response)
    dispatch({ type: "USER_LOG_OUT" })
}