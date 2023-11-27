import api from './api';

const githubService = {
  getUserData: async (userTag: string) => {
    const response = await api.get(`https://api.github.com/users/${userTag}`);
    return response.data;
  },

  getUserRepositories: async (userTag: string) => {
    const response = await api.get(`https://api.github.com/users/${userTag}/repos`);
    return response.data;
  },

  getLanguages: async (userTag: string, repoName: string) => {
    const response = await api.get(`https://api.github.com/repos/${userTag}/${repoName}/languages`);
    return response.data;
  },
};



export default githubService;