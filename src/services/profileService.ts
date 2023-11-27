import api from "./api";

interface UserParams {
    email: string;
    userTag: string;
    currentPassword: string;
    newPassword: string;
}

const profileService = {
    userUpdate: async (id: string, token: string, params: UserParams) => {
 
      const res = await api.put(`${process.env.NEXT_PUBLIC_BASEURL}/users/${id}`, params, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
      })
      .catch((error) => {
      if (error.response.status === 400 || error.response.status === 401) {
          return error.response;
      }
    
        return error;
      });
    
      return res.status;
    },
};

export default profileService;