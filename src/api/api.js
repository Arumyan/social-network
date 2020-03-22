import axios from 'axios';

const instance = axios.create({
  withCredentials: true,
  baseURL: 'https://social-network.samuraijs.com/api/1.0/',
  headers: { 'API-KEY': '1d50145e-9b5b-43e8-933a-f2213da6e70b' }
});

export const usersAPI = {
  getUsers() {
    return instance.get('users?count=5').then(response => response.data);
  }
}

