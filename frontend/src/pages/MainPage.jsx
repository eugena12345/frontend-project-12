import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import {
  useDispatch,
} from 'react-redux';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { actions as channelsActions } from '../slices/channelsSlice';
import {
  actions as currentChannelActions,
} from '../slices/actualChannelSlice';
import { actions as messagesActions } from '../slices/messageSlice';

import Navbar from '../components/Navbar';
import Header from '../components/Header';
import ActualChat from '../components/ActualCaht';

const MainPage = () => {
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
  }, [user, navigate, dispatch, t]);

  return (
    <div className="container  vh-100 mw-100 d-flex flex-column">
      <div className="row ">
        <Header onLogoutClick={() => setUser(null)} />
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

export default MainPage;
