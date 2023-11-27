import api from "./api";
import Cookies from "js-cookie";

interface LoginParams {
  email: string;
  password: string;
}

interface RegisterParams {
  email: string;
  userTag: string;
  password: string;
}

const authService = {
  register: async (params: RegisterParams) => {
    const res = await api.post(`${process.env.NEXT_PUBLIC_BASEURL}/users`, params).catch((error) => {
        if (error.response.status === 400) {
          return error.response;
        }

        return error;
      });

      return res;
    },

    login: async (params: LoginParams) => {
      try {
        const res = await api.post("/auth/login", params);
        
        if (res.status === 201) {
          Cookies.set("githubapi-token", res.data.token, { expires: 7 });
          Cookies.set("userId", res.data.id, { expires: 7 });
          Cookies.set("userTag", res.data.userTag, { expires: 7 });
        }

        return res;
      } catch (error: any) {

        if (error.response && (error.response.status === 400 || error.response.status === 401)) {
          return error.response;
        }

        return error;
      }
    },
};

export default authService;
