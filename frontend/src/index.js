import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Provider } from 'react-redux';
import { I18nextProvider } from 'react-i18next';
import { ToastContainer } from 'react-toastify';
import { io } from 'socket.io-client';
import App from './App';
import store from './store/index';
import i18n from './i18n';
import { actions as channelsAct } from './store/slices/channelsSlice';
import {
  actions as currentChannelActions,
} from './store/slices/actualChannelSlice';
import { actions as messagesActions } from './store/slices/messageSlice';
import 'bootstrap/dist/css/bootstrap.min.css';

const socket = io('/');
const setCurrentChannel = (channelData) => {
  // store.dispatch(currentChannelActions.deleteCurrentChannel());
  store.dispatch(currentChannelActions.setCurrentChannel(channelData));
};

socket.on('newMessage', (payload) => {
  store.dispatch(messagesActions.addMessage(payload));
});

socket.on('newChannel', (payload) => {
  store.dispatch(channelsAct.addChannel(payload));
});

socket.on('removeChannel', (payload) => {
  store.dispatch(channelsAct.removeChannel(payload.id));
  const { entities } = store.getState().messages;
  const messageForRemove = Object.values(entities)
    .filter((item) => item.channelId === payload.id);
  const messageIdsForRemove = messageForRemove.map((filtredItem) => filtredItem.id);
  store.dispatch(messagesActions.removeMessages(messageIdsForRemove));
  const defaultChannel = { id: '1', name: 'general', removable: false };
  setCurrentChannel(defaultChannel);
});

socket.on('renameChannel', (payload) => {
  store.dispatch(channelsAct.updateChannel({ id: payload.id, changes: { name: payload.name } }));
  const state = store.getState();
  const currentChannel = state.currentChannel.ids[0];
  if (currentChannel === payload.id) {
    store.dispatch(currentChannelActions
      .updateCurrentChannel({ id: payload.id, changes: { name: payload.name } }));
  }
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <I18nextProvider i18n={i18n} defaultNS="translation">
    <Provider store={store}>
      <App />
      <ToastContainer />
    </Provider>
  </I18nextProvider>,
);
