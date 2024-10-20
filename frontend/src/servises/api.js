import axios from 'axios';

export const postNewUser = (newUser) => axios.post('/api/v1/login', newUser);
export const registrateNewUser = (newUser) => axios.post('/api/v1/signup', newUser);

export const getChannels = (userToken) => axios.get('/api/v1/channels', {
  headers: {
    Authorization: `Bearer ${userToken}`,
  },
});

export const getMessages = (userToken) => axios.get('/api/v1/messages', {
  headers: {
    Authorization: `Bearer ${userToken}`,
  },
});

export const postNewMessage = (newMessage, userToken) => axios.post('/api/v1/messages', newMessage, {
  headers: {
    Authorization: `Bearer ${userToken}`,
  },
});

export const postNewChannel = (censoredChannelName, userToken) => axios.post('/api/v1/channels', { name: censoredChannelName }, {
  headers: {
    Authorization: `Bearer ${userToken}`,
  },
});

export const patchChangedChannelName = (channelId, censoredChannelName, userToken) => axios.patch(
  `/api/v1/channels/${channelId}`,
  { name: censoredChannelName },
  {
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  },
);
