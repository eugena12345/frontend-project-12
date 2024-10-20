import { useNavigate } from 'react-router-dom';
import React, { useEffect } from 'react'; // , useState
import {
  useDispatch,
} from 'react-redux';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { actions as channelsActions } from '../store/slices/channelsSlice';
import {
  actions as currentChannelActions,
} from '../store/slices/actualChannelSlice';
import { actions as messagesActions } from '../store/slices/messageSlice';
import { actions as autorizeActions } from '../store/slices/auorizeSlice';
import { getChannels, getMessages } from '../servises/api';

import Navbar from '../components/Navbar';
import Header from '../components/Header';
import ActualChat from '../components/ActualCaht';
import errors from '../servises/errorCodes';
import store from '../store/index';

const MainPage = () => {
  const userToken = store.getState().user.ids[0];
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    getChannels(userToken)
      .then((response) => {
        dispatch(channelsActions.addChannels(response.data));
        // найти канал дженерал и его задиспатчить
        const initialCurrentChannel = { id: '1', name: 'general', removable: false };
        dispatch(currentChannelActions.addCurrentChannel(initialCurrentChannel));
      })
      .catch((error) => {
        if (axios.isAxiosError(error)) {
          if (error.status === errors.userNotExsist) {
            toast(t('notify.notAutorized'));
          } else {
            toast(t('notify.networkError'));
          }
        }
      });

    getMessages(userToken)
      .then((response) => {
        dispatch(messagesActions.addMessages(response.data));
      })
      .catch((error) => {
        if (axios.isAxiosError(error)) {
          if (error.status === errors.userNotExsist) {
            toast(t('notify.notAutorized'));
          } else {
            toast(t('notify.networkError'));
          }
        }
      });
  }, [navigate, dispatch, t, userToken]);

  const logout = () => dispatch(autorizeActions.logout());

  return (
    <div className="container  vh-100 mw-100 d-flex flex-column">
      <div className="row ">
        <Header onLogoutClick={logout} />
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
