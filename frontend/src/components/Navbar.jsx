import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import React, { useState } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import filter from 'leo-profanity';
import { toast } from 'react-toastify';
import { selectors as channelsSelectors, actions as channelsSliceActions } from '../store/slices/channelsSlice';
import { selectors as currentChannelSelectors, actions as currentChannelActions } from '../store/slices/actualChannelSlice';
import { selectors as messagesSelectors, actions as messagesSliceActions } from '../store/slices/messageSlice';
import ChannelNameModal from './ChannelNameModal';
import ConfirmationModal from './ConfirmationModal';
import 'react-toastify/dist/ReactToastify.css';
import { postNewChannel, patchChangedChannelName } from '../servises/api';

const Navbar = () => {
  const userToken = localStorage.getItem('token');
  const { t } = useTranslation();
  const [show, setShow] = useState(false);
  const [showConf, setShowConf] = useState(false);
  const [modalContent, setModalContent] = useState({});
  const handleClose = () => setShow(false);
  const handleCloseConf = () => setShowConf(false);
  const handleShow = () => setShow(true);
  const dispatch = useDispatch();
  const channels = useSelector(channelsSelectors.selectAll);
  const currentChannel = useSelector(currentChannelSelectors.selectAll)[0];
  const messages = useSelector(messagesSelectors.selectAll);
  const channelsNameColl = channels.map((channel) => channel.name);
  const selectChannel = (e) => {
    e.preventDefault();
    const [newCurrentChannel] = channels.filter((channel) => channel.id === e.target.id);
    dispatch(currentChannelActions.deleteCurrentChannel());
    dispatch(currentChannelActions.addCurrentChannel(newCurrentChannel));
  };
  const notify = (notifyMessage) => toast(t(notifyMessage));

  const addNewChannel = (newChannel) => {
    const censoredChannelName = filter.clean(newChannel.name);
    postNewChannel(censoredChannelName, userToken)
      .then((response) => {
        handleClose();
        dispatch(channelsSliceActions.addChannel(response.data));
        notify('notify.createChannel');
        const newActualChannel = response.data;
        dispatch(currentChannelActions.deleteCurrentChannel());
        dispatch(currentChannelActions.addCurrentChannel(newActualChannel));
      }).catch((error) => {
        if (axios.isAxiosError(error)) {
          toast(t('notify.networkError'));
        }
      });
  };
  const createChannel = () => {
    setModalContent({
      text: 'Создание нового канала',
      modalCallback: addNewChannel,
      id: null,
      oldChannelName: '',

    });
    handleShow();
  };

  const changeChannelName = (newName, channelId) => {
    const censoredChannelName = filter.clean(newName.name);
    patchChangedChannelName(channelId, censoredChannelName, userToken)
      .then((response) => {
        dispatch(channelsSliceActions
          .updateChannel({ id: response.data.id, changes: { name: response.data.name } }));
        notify('notify.renameChannel');
        dispatch(currentChannelActions.deleteCurrentChannel());
        dispatch(currentChannelActions.addCurrentChannel(response.data));
      }).catch((error) => {
        if (axios.isAxiosError(error)) {
          toast(t('notify.networkError'));
        }
      });
  };

  const renameChannel = (channelId) => {
    const oldChannelName = channels.filter((channel) => channel.id === channelId)[0].name;
    setModalContent({
      text: 'Переименовать канал',
      modalCallback: changeChannelName,
      id: channelId,
      oldChannelName,
    });
    handleShow();
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
      dispatch(currentChannelActions.deleteCurrentChannel());
      const defaultChannel = { id: '1', name: 'general', removable: false };
      dispatch(currentChannelActions.addCurrentChannel(defaultChannel));
      notify('notify.removeChannel');
    }).catch((error) => {
      if (axios.isAxiosError(error)) {
        toast(t('notify.networkError'));
      }
    });
  };
  const deleteChannel = (channelId) => {
    setModalContent({
      modalCallback: removeChannel,
      id: channelId,
    });
    setShowConf(channelId);
  };

  return (
    <div className="flex-column g-0">
      <div className="mb-4 p-3 d-flex justify-content-between align-items-center">
        <p className="m-2">{t('channels')}</p>
        <button type="button" className="btn btn-outline-primary" onClick={createChannel}>+</button>
      </div>
      <ChannelNameModal
        show={show}
        handleClose={handleClose}
        channelsNameColl={channelsNameColl}
        modalContent={modalContent}
      />
      <ConfirmationModal
        show={showConf}
        handleClose={handleCloseConf}
        modalContent={modalContent}
      />

      <div className="channels">
        {channels.map(
          (channel) => {
            const classStyle = channel.id === currentChannel.id
              ? 'btn text-start text-truncate active' : 'btn text-start text-truncate';
            return (
              <Dropdown as={ButtonGroup} className="d-flex mb-1" key={channel.id}>
                <Button variant={classStyle} id={channel.id} onClick={selectChannel}>
                  #
                  {channel.name}
                </Button>
                {channel.removable
                  ? (
                    <>
                      <Dropdown.Toggle split variant="btn" id="dropdown-custom-2" />
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
