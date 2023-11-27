import api from "./api";

export type UserType = {
  id: string;
  name: string;
  userTag: string;
  followers: number;
  following: number;
  repos: number;
  bio: string;
  twitter: string;
  company: string;
  site: string;
  email: string;
  password: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
};

const userService = {
    getProfileUser: async (id: string, token: string) => {
      const res = await api.get(`${process.env.NEXT_PUBLIC_BASEURL}/users/${id}`, { 
          headers: {
            Authorization: `Bearer ${token}`,
          },
      }).catch((error) => {
        return error.response;
      });
      return res;
    },
  };
  
  export default userService