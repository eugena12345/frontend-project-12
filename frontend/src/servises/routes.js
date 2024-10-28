const routes = {
  login: () => '/api/v1/login',
  getChannels: () => '/api/v1/channels',
  getMessages: () => '/api/v1/messages',
  postMessage: () => '/api/v1/messages',
  postChannel: () => '/api/v1/channels',
  changeName: (channelId) => `/api/v1/channels/${channelId}`,
  removeChannelPath: (channelId) => `/api/v1/channels/${channelId}`,
};

export default routes;
