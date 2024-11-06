import routes from './routes';
import base from './interceptors';

export const postNewUser = async (newUser) => base.post(routes.login(), newUser);
export const registrateNewUser = async (newUser) => base.post('/api/v1/signup', newUser);

export const getChannels = async () => base.get(routes.getChannels());

export const getMessages = async () => base.get(routes.getMessages());

export const postNewMessage = async (newMessage) => base.post(
  routes.postMessage(),
  newMessage,
);

export const postNewChannel = async (censoredChannelName) => base.post(
  routes.postChannel(),
  { name: censoredChannelName },
);

export const patchChangedChannelName = async (channelId, censoredChannelName) => base.patch(
  routes.changeName(channelId),
  { name: censoredChannelName },
);

export const removeChannelApi = async (channelId) => base
  .delete(routes.removeChannelPath(channelId));
