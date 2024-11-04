import { useNavigate } from 'react-router-dom';
import React, { useEffect } from 'react';
import {
  useDispatch,
} from 'react-redux';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { actions as channelsActions } from '../store/slices/channelsSlice';
import { actions as messagesActions } from '../store/slices/messageSlice';
import { actions as autorizeActions } from '../store/slices/auth';
import { getChannels, getMessages } from '../servises/api';
import Navbar from '../components/Navbar';
import ActualChat from '../components/ActualCaht';
import Layout from '../components/Layout';
import errors from '../servises/errorCodes';
import store from '../store/index';

const MainPage = () => {
  const userToken = store.getState().user.token;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    getChannels()
      .then((response) => {
        dispatch(channelsActions.addChannels(response.data));
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

    getMessages()
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
    <Layout logout={logout}>
      <div className="row h-100 bg-white flex-md-row">
        <div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
          <Navbar />
        </div>
        <div className="col p-0 h-100">
          <ActualChat />
        </div>
      </div>

    </Layout>
  );
};

export default MainPage;
