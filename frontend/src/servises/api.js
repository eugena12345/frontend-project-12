import routes from './routes';
import base from './interceptors';

export const postNewUser = (newUser) => base.post(routes.login(), newUser);
export const registrateNewUser = (newUser) => base.post('/api/v1/signup', newUser);

export const getChannels = () => base.get(routes.getChannels());

export const getMessages = () => base.get(routes.getMessages());

export const postNewMessage = (newMessage) => base.post(
  routes.postMessage(),
  newMessage,
);

export const postNewChannel = (censoredChannelName) => base.post(
  routes.postChannel(),
  { name: censoredChannelName },
);

export const patchChangedChannelName = (channelId, censoredChannelName) => base.patch(
  routes.changeName(channelId),
  { name: censoredChannelName },
);
