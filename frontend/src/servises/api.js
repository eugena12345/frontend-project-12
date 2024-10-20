import axios from 'axios';
import routes from './routes';

export const postNewUser = (newUser) => axios.post(routes.login(), newUser);
export const registrateNewUser = (newUser) => axios.post('/api/v1/signup', newUser);

export const getChannels = (userToken) => axios.get(routes.getChannels(), {
  headers: {
    Authorization: `Bearer ${userToken}`,
  },
});

export const getMessages = (userToken) => axios.get(routes.getMessages(), {
  headers: {
    Authorization: `Bearer ${userToken}`,
  },
});

export const postNewMessage = (newMessage, userToken) => axios.post(
  routes.postMessage(),
  newMessage,
  {
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  },
);

export const postNewChannel = (censoredChannelName, userToken) => axios.post(
  routes.postChannel(),
  { name: censoredChannelName },
  {
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  },
);

export const patchChangedChannelName = (channelId, censoredChannelName, userToken) => axios.patch(
  routes.changeName(channelId),
  { name: censoredChannelName },
  {
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  },
);
