/* eslint-disable react/prop-types */
import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import filter from 'leo-profanity';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { selectors as userSelectors } from '../store/slices/auorizeSlice';
import { postNewMessage } from '../servises/api';

filter.loadDictionary('ru');

const AddMessage = ({ currentChannelId }) => {
  const { token, username } = useSelector(userSelectors.selectAll)[0];
  const { t } = useTranslation();

  const sendMessage = (e) => {
    e.preventDefault();
    const form = e.target;
    const messageText = e.target[0].value;
    if (messageText.trim() === '') {
      return;
    }
    const censoredMessage = filter.clean(messageText);
    const newMessage = {
      body: censoredMessage,
      channelId: currentChannelId,
      username,
    };
    form.reset();

    postNewMessage(newMessage, token)
      .then(() => {
      //  console.log(response.data);
      // => { id: '1', body: 'new message', channelId: '1', username: 'admin }
      })
      .catch((error) => {
        if (axios.isAxiosError(error)) {
          toast(t('notify.networkError'));
        }
      });
  };

  return (
    <Form onSubmit={sendMessage}>
      <div className="d-flex flex-row">
        <input className="form-control me-2" type="text" name="message" />
        <Button variant="primary" type="submit">
          {t('send')}
        </Button>
      </div>
    </Form>
  );
};

export default AddMessage;
