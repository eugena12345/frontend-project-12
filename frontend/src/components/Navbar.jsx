import Dropdown from 'react-bootstrap/Dropdown';
// import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import React, { useState } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { selectors as channelsSelectors, actions as channelsSliceActions } from '../store/slices/channelsSlice';
import { selectors as currentChannelSelectors, actions as currentChannelActions } from '../store/slices/actualChannelSlice';
import { selectors as messagesSelectors, actions as messagesSliceActions } from '../store/slices/messageSlice';
import ChannelNameModal from './ChannelNameModal';
import ConfirmationModal from './ConfirmationModal';
import 'react-toastify/dist/ReactToastify.css';
import store from '../store';
import RenameChannelModal from './RenameChannelModal';

const Navbar = () => {
  const userToken = store.getState().user.ids[0];
  const { t } = useTranslation();
  const [show, setShow] = useState(false);
  const [showRename, setShowRename] = useState({ open: false, data: {} });
  const [showConf, setShowConf] = useState({ open: false, data: {} });
  const handleClose = () => setShow(false);
  const handleCloseRename = () => setShowRename({ open: false, data: {} });

  const handleCloseConf = () => setShowConf(false);
  const handleShow = () => setShow(true);
  const dispatch = useDispatch();
  const channels = useSelector(channelsSelectors.selectAll);
  const currentChannel = useSelector(currentChannelSelectors.selectAll)[0];
  const messages = useSelector(messagesSelectors.selectAll);
  const channelsNameColl = channels.map((channel) => channel.name);
  const setCurrentChannel = (channelData) => {
    dispatch(currentChannelActions.deleteCurrentChannel());
    dispatch(currentChannelActions.addCurrentChannel(channelData));
  };
  const selectChannel = (e) => {
    e.preventDefault();
    const [newCurrentChannel] = channels.filter((channel) => channel.id === e.target.id);
    setCurrentChannel(newCurrentChannel);
  };
  const notify = (notifyMessage) => toast(t(notifyMessage));

  const createChannel = () => handleShow();

  const renameChannel = (channelId) => {
    const oldChannelName = channels.filter((channel) => channel.id === channelId)[0].name;
    setShowRename({
      open: true,
      data: {
        id: channelId,
        oldChannelName,
      },
    });
  };

  const removeChannel = (channelId) => {
    axios.delete(`/api/v1/channels/${channelId}`, {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    }).then((response) => {
      const deletedChannelID = response.data.id;
      dispatch(channelsSliceActions.removeChannel(channelId));
      const messagesForDelete = messages.filter((message) => message.channelId === deletedChannelID)
        .map((item) => item.id);
      dispatch(messagesSliceActions.removeMessages(messagesForDelete));
      const defaultChannel = { id: '1', name: 'general', removable: false };
      setCurrentChannel(defaultChannel);
      notify('notify.removeChannel');
    }).catch((error) => {
      if (axios.isAxiosError(error)) {
        notify('notify.networkError');
      }
    });
  };
  const deleteChannel = (channelId) => {
    setShowConf({
      open: true,
      data: {
        modalCallback: removeChannel,
        id: channelId,
      },
    });
  };

  return (
    <div className="flex-column g-0">
      <div className="mb-4 p-3 d-flex justify-content-between align-items-center">
        <p className="m-2">{t('channels')}</p>
        <button type="button" className="btn btn-outline-primary" onClick={createChannel}>+</button>
      </div>
      <ChannelNameModal
        show={show}
        onHide={handleClose}
        channelsNameColl={channelsNameColl}
      />
      <RenameChannelModal
        show={showRename.open}
        onHide={handleCloseRename}
        channelsNameColl={channelsNameColl}
        modalContent={showRename.data}
      />
      <ConfirmationModal
        show={showConf.open}
        handleClose={handleCloseConf}
        modalContent={showConf.data}
      />

      <div className="channels">
        {channels.map(
          (channel) => {
            const classStyle = channel.id === currentChannel.id
              ? 'w-100 rounded-0 text-start text-truncate btn btn-secondary' : 'w-100 rounded-0 text-start btn';
            return (
              <Dropdown as={ButtonGroup} className="d-flex mb-1" key={channel.id}>
                {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,
                 jsx-a11y/interactive-supports-focus */}
                <div role="button" className={classStyle} id={channel.id} onClick={selectChannel}>
                  {/* variant */}
                  {`# ${channel.name}`}
                  {/* {} */}
                </div>
                {channel.removable
                  ? (
                    <>
                      <Dropdown.Toggle split variant="btn" id="dropdown-custom-2">
                        <span className="visually-hidden">{t('channelManagement')}</span>
                      </Dropdown.Toggle>

                      <Dropdown.Menu className="super-colors">
                        <Dropdown.Item eventKey="1" onClick={() => renameChannel(channel.id)}>{t('button.rename')}</Dropdown.Item>
                        <Dropdown.Item eventKey="2" onClick={() => deleteChannel(channel.id)}>{t('button.delete')}</Dropdown.Item>
                      </Dropdown.Menu>
                    </>
                  )
                  : null}
              </Dropdown>
            );
          },
        )}
      </div>
    </div>
  );
};

export default Navbar;
