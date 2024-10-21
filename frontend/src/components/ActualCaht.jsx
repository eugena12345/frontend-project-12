import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import React, { useEffect, useRef } from 'react';
import AddMessage from './AddMessage';
import { selectors as currentChannelSelectors } from '../store/slices/actualChannelSlice';
import { selectors as messagesSelectors } from '../store/slices/messageSlice';

const ActualChat = () => {
  const messageEl = useRef(null);
  const { t } = useTranslation();
  const currentChannel = useSelector(currentChannelSelectors.selectAll)[0];
  const messages = useSelector(messagesSelectors.selectAll);
  const currentMessages = currentChannel
    ? messages.filter((message) => message.channelId === currentChannel.id)
    : [];
  useEffect(() => {
    if (messageEl.current !== null) {
      messageEl.current.addEventListener('DOMNodeInserted', (event) => {
        const { currentTarget: target } = event;
        target.scrollTo({ top: target.scrollHeight, behavior: 'smooth' });
      });
    }
  });

  return (
    <div className="d-flex flex-column h-100">
      {currentChannel
      && (
      <>
        <div className="bg-light mb-4 p-3 shadow-sm small">
          <p className="m-0">
            {'# '}
            {currentChannel.name}
          </p>
          <span>{t('message', { count: currentMessages.length })}</span>
        </div>
        <div className="chat-messages">
          <div className="overflow-auto px-5" ref={messageEl}>
            {currentMessages.map((msg) => (
              <p key={msg.id}>
                <b>
                  {msg.username}
                  :
                  {' '}
                </b>
                {msg.body}
              </p>
            ))}
          </div>
        </div>
        <div className="mt-auto px-5 py-3">
          <AddMessage currentChannelId={currentChannel.id} />
        </div>
      </>
      )}
    </div>
  );
};

export default ActualChat;
