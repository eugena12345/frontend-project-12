import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import React, { useEffect, useRef } from 'react';
import AddMessage from './AddMessage';
import { selectors as channelsSelectors } from '../store/slices/channelsSlice';

import { selectors as messagesSelectors } from '../store/slices/messageSlice';

const Chat = () => {
  const messageEl = useRef(null);
  const { t } = useTranslation();
  const currentChannelID = useSelector((state) => state.channels.currentChannel);
  const currentChannel = useSelector((state) => channelsSelectors
    .selectById(state, currentChannelID));
  const messages = useSelector(messagesSelectors.selectAll);
  const currentMessages = currentChannel
    ? messages.filter((message) => message.channelId === currentChannel.id)
    : [];
  useEffect(() => {
    const { current } = messageEl;
    const handle = (event) => {
      const { currentTarget: target } = event;
      target.scrollTo({ top: target.scrollHeight, behavior: 'smooth' });
    };

    current.addEventListener('DOMNodeInserted', handle);

    return () => {
      current.removeEventListener('DOMNodeInserted', handle);
    };
  }, [messages?.length]);

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
        <div className="chat-messages overflow-auto px-3 ">
          <div className="text-break" ref={messageEl}>
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
        <div className="mt-auto px-3 py-3">
          <AddMessage currentChannelId={currentChannel.id} />
        </div>
      </>
      )}
    </div>
  );
};

export default Chat;
