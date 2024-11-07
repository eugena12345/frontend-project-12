import Dropdown from 'react-bootstrap/Dropdown';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import filter from 'leo-profanity';
import { selectors as channelsSelectors, actions as channelsSliceActions } from '../store/slices/channelsSlice';
import ChannelNameModal from './ChannelNameModal';
import ConfirmationModal from './ConfirmationModal';
import 'react-toastify/dist/ReactToastify.css';
import RenameChannelModal from './RenameChannelModal';
import { postNewChannel, patchChangedChannelName, removeChannelApi } from '../servises/api';

const Navbar = () => {
  const { t } = useTranslation();
  const [show, setShow] = useState(false);
  const [showRename, setShowRename] = useState({ open: false, data: {} });
  const [showConf, setShowConf] = useState({ open: false, data: {} });
  const handleClose = () => setShow(false);
  const handleCloseRename = () => setShowRename({ open: false, data: {} });

  const handleCloseConf = () => setShowConf({ open: false, data: {} });
  const handleShow = () => setShow(true);
  const dispatch = useDispatch();
  const channels = useSelector(channelsSelectors.selectAll);
  const currentChannel = useSelector((state) => state.channels.currentChannel);
  const channelsNameColl = channels.map((channel) => channel.name);
  const setCurrentChannel = (channelData) => {
    dispatch(channelsSliceActions.setCurrentChannel(channelData));
  };
  const selectChannel = (e) => {
    e.preventDefault();
    const [newCurrentChannel] = channels.filter((channel) => channel.id === e.target.id);
    setCurrentChannel(newCurrentChannel);
  };
  const notify = (notifyMessage) => toast(t(notifyMessage));

  const createChannel = () => handleShow();

  const addNewChannel = async (newChannel) => {
    const censoredChannelName = filter.clean(newChannel.name);
    const { data } = await postNewChannel(censoredChannelName);
    handleClose();
    dispatch(channelsSliceActions.addChannel(data));
    notify('notify.createChannel');
    const newActualChannel = data;
    setCurrentChannel(newActualChannel);
  };

  const onSubmitAddNewChannel = (values, formik) => {
    const newChannel = { name: values.channelName };
    addNewChannel(newChannel);
    formik.resetForm();
    handleClose();
  };

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

  const changeChannelName = async (newName, channelId) => {
    const censoredChannelName = filter.clean(newName.name);
    const { data } = await patchChangedChannelName(channelId, censoredChannelName);
    dispatch(channelsSliceActions.updateChannel({ id: data.id, changes: { name: data.name } }));
    notify('notify.renameChannel');
    setCurrentChannel(data);
  };

  const onSubmitRenameCHannel = (values, id) => {
    const newChannel = { name: values.channelName };
    changeChannelName(newChannel, id);
    handleCloseRename();
  };

  const removeChannel = async (channelId) => {
    await removeChannelApi(channelId);
    notify('notify.removeChannel');
  };
  const deleteChannel = (channelId) => {
    setShowConf({
      open: true,
      data: {
        id: channelId,
      },
    });
  };

  const removeChannelTrue = () => {
    removeChannel(showConf.data.id);
    handleCloseConf();
  };

  return (
    <div className="d-flex flex-column h-100 ">
      <div className="d-flex justify-content-between align-items-center">
        <p className="m-2">{t('channels')}</p>
        <button type="button" className="btn btn-outline-primary" onClick={createChannel}>+</button>
      </div>
      <ChannelNameModal
        show={show}
        onHide={handleClose}
        channelsNameColl={channelsNameColl}
        onSubmit={onSubmitAddNewChannel}
      />
      <RenameChannelModal
        show={showRename.open}
        onHide={handleCloseRename}
        channelsNameColl={channelsNameColl}
        modalContent={showRename.data}
        onSubmit={onSubmitRenameCHannel}
      />
      <ConfirmationModal
        show={showConf.open}
        onSubmit={removeChannelTrue}
        handleClose={handleCloseConf}
      />

      <div className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block">
        {channels.map(
          (channel) => {
            const classStyle = channel.id === currentChannel
              ? 'w-100 rounded-0 text-start text-truncate btn btn-secondary' : 'w-100 rounded-0 text-start text-truncate btn';
            return (
              <Dropdown as={ButtonGroup} className="d-flex mb-1" key={channel.id}>
                <div
                  role="button"
                  className={classStyle}
                  id={channel.id}
                  onKeyDown={selectChannel}
                  onClick={selectChannel}
                  tabIndex={0}
                >
                  {`# ${channel.name}`}
                </div>
                {channel.removable
                  && (
                    <>
                      <Dropdown.Toggle split variant="btn" id="dropdown-custom-2">
                        <span className="visually-hidden">{t('channelManagement')}</span>
                      </Dropdown.Toggle>

                      <Dropdown.Menu className="super-colors">
                        <Dropdown.Item eventKey="1" onClick={() => renameChannel(channel.id)}>{t('button.rename')}</Dropdown.Item>
                        <Dropdown.Item eventKey="2" onClick={() => deleteChannel(channel.id)}>{t('button.delete')}</Dropdown.Item>
                      </Dropdown.Menu>
                    </>
                  )}
              </Dropdown>
            );
          },
        )}
      </div>
    </div>
  );
};

export default Navbar;
