import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import {
  useDispatch,
} from 'react-redux';
import { toast } from 'react-toastify';
import axios from 'axios';
import { io } from 'socket.io-client';
import { useTranslation } from 'react-i18next';
import store from '../slices/index';
import { actions as channelsActions } from '../slices/channelsSlice';
import {
  actions as currentChannelActions,
} from '../slices/actualChannelSlice';
import { actions as messagesActions } from '../slices/messageSlice';

import Navbar from './Navbar';
import Header from './Header';
import ActualChat from './ActualCaht';

const socket = io('/');

const PageOne = () => {
  const userToken = localStorage.getItem('token');
  const [user, setUser] = useState(userToken);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    if (!user) {
      navigate('/login', { replace: false });
    } else {
      axios.get('/api/v1/channels', {
        headers: {
          Authorization: `Bearer ${user}`,
        },
      })
        .then((response) => {
          dispatch(channelsActions.addChannels(response.data));
          // найти канал дженерал и его задиспатчить
          const initialCurrentChannel = { id: '1', name: 'general', removable: false };
          dispatch(currentChannelActions.addCurrentChannel(initialCurrentChannel));
        })
        .catch((error) => {
          if (axios.isAxiosError(error)) {
            toast(t('notify.networkError'));
          }
        });

      axios.get('/api/v1/messages', {
        headers: {
          Authorization: `Bearer ${user}`,
        },
      })
        .then((response) => {
        //   console.log('axios response messages', response.data);
        // =>[{ id: '1', body: 'text message', channelId: '1', username: 'admin }, ...]
          dispatch(messagesActions.addMessages(response.data));
        })
        .catch((error) => {
          if (axios.isAxiosError(error)) {
            toast(t('notify.networkError'));
          }
        });
    }
  }, [user, navigate, dispatch]);

  socket.on('newMessage', (payload) => {
    dispatch(messagesActions.addMessage(payload));
  });

  socket.on('newChannel', (payload) => {
    dispatch(channelsActions.addChannel(payload));
  });

  socket.on('removeChannel', (payload) => {
    dispatch(channelsActions.removeChannel(payload.id));
    //  удалить сообщения и перекинуть в канал
  });

  socket.on('renameChannel', (payload) => {
    dispatch(channelsActions.updateChannel({ id: payload.id, changes: { name: payload.name } }));
    const state = store.getState();
    const currentChannel = state.currentChannel.ids[0];
    if (currentChannel === payload.id) {
      dispatch(currentChannelActions
        .updateCurrentChannel({ id: payload.id, changes: { name: payload.name } }));
    }
  });

  return (
    <div className="container  vh-100 mw-100 d-flex flex-column">
      <div className="row ">
        <Header setUser={setUser} />
      </div>
      <div className="row  m-3 mh-100 h-100">
        <div className="container overflow-hidden rounded shadow flex-row">
          <div className="row flex-md-row">
            <div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
              <Navbar />
            </div>
            <div className="col p-0 h-100">
              <ActualChat />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageOne;
