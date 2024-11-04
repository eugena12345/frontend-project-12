import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useTranslation } from 'react-i18next';
import filter from 'leo-profanity';
import { postNewMessage } from '../servises/api';
import store from '../store';
import { errorHandler } from '../servises/interceptors';

filter.loadDictionary('en');

const AddMessage = ({ currentChannelId }) => {
  const { username } = store.getState().user;
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

    postNewMessage(newMessage)
      .catch((error) => {
        errorHandler(error);
      });
  };

  return (
    <Form onSubmit={sendMessage}>
      <div className="d-flex flex-row">
        <input className="form-control me-2" aria-label="Новое сообщение" type="text" name="message" />
        <Button variant="primary" type="submit">
          {t('send')}
        </Button>
      </div>
    </Form>
  );
};

export default AddMessage;
