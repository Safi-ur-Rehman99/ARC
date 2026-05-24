import { axiosInstance } from "./axios";

export const signup = async (signupData) => {
    const res = await axiosInstance.post("/auth/signup", signupData);
    return res.data;
}
export const login = async (loginData) => {
    const res = await axiosInstance.post("/auth/login", loginData);
    return res.data;
}

export const logout = async () => {
    const res = await axiosInstance.post("/auth/logout");
    return res.data;
}

export const getAuthUser = async () => {

    try{    const res= await axiosInstance.get('/auth/me')
    return res.data
    }catch(err){
        console.log("Error fetching auth user:", err);
        return null; // Return null if there's an error (e.g., not authenticated)
    }

   }
   
export const completeOnboarding = async (userData) => {
    const res = await axiosInstance.post('/auth/onboarding', userData)
    return res.data
}