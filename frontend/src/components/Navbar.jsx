import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { selectors as channelsSelectors } from './../slices/channelsSlice.js'; // 
import { selectors as currentChannelSelectors } from './../slices/actualChannelSlice.js';
import { selectors as messagesSelectors } from './../slices/messageSlice.js'; // 
import { useDispatch } from 'react-redux';
import { actions as currentChannelActions } from '../slices/actualChannelSlice.js';
import { actions as channelsSliceActions } from './../slices/channelsSlice.js';
import { actions as messagesSliceActions } from './../slices/messageSlice.js';
import ChannelNameModal from './ChannelNameModal.jsx';
import ConfirmationModal from './ConfirmationModal.jsx';
import { useTranslation } from 'react-i18next';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import filter from 'leo-profanity';

function Navbar() {
    let userToken = localStorage.getItem('token');
    const { t, i18n } = useTranslation();
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
    console.log('messages', messages);
    const channelsNameColl = channels.map((channel) => channel.name);
    const selectChannel = (e) => {
        e.preventDefault();
        const [newCurrentChannel] = channels.filter((channel) => channel.id === e.target.id);
        dispatch(currentChannelActions.deleteCurrentChannel());
        dispatch(currentChannelActions.addCurrentChannel(newCurrentChannel))
    }
    const notify = (notifyMessage) => toast(t(notifyMessage));

    const addNewChannel = (newChannel) => {
        console.log('newChannel', newChannel)
        const censoredChannelName = filter.clean(newChannel.name);
        axios.post('/api/v1/channels', {name: censoredChannelName}, {
            headers: {
                Authorization: `Bearer ${userToken}`,
            },
        }).then((response) => {
            console.log('отчет по созданию нового канала', response.data); // => { id: '3', name: 'new channel', removable: true }
            handleClose();
            dispatch(channelsSliceActions.addChannel(response.data));
            notify('notify.createChannel');
        });
    }
    const createChannel = () => {
        setModalContent({
            text: 'Создание нового канала',
            modalCallback: addNewChannel,
            id: null
        });
        handleShow();
    }

    const changeChannelName = (newName, channelId) => {
        const censoredChannelName = filter.clean(newName.name);
        axios.patch(`/api/v1/channels/${channelId}`, {name:censoredChannelName}, {
            headers: {
                Authorization: `Bearer ${userToken}`,
            },
        }).then((response) => {
            console.log(response.data); // => { id: '3', name: 'new name channel', removable: true }
            dispatch(channelsSliceActions.updateChannel({ id: response.data.id, changes: { name: response.data.name } }));
            notify('notify.renameChannel');
        });

    };

    const renameChannel = (channelId) => {
        setModalContent({
            text: 'Переименовать канал',
            modalCallback: changeChannelName,
            id: channelId,
        });
        handleShow();
    }

    const deleteChannel = (channelId) => {
        setModalContent({
            //text: 'Создание нового канала',
            modalCallback: removeChannel,
            id: channelId,
        });
        setShowConf(channelId);
    }

    const removeChannel = (channelId) => {
        //console.log(channelId);
        axios.delete(`/api/v1/channels/${channelId}`, {
            headers: {
                Authorization: `Bearer ${userToken}`,
            },
        }).then((response) => {
            const deletedChannelID = response.data.id; // => { id: '3' }
            dispatch(channelsSliceActions.removeChannel(channelId));
            const messagesForDelete = messages.filter((message) => message.channelId === deletedChannelID)
                .map((item) => item.id);
            dispatch(messagesSliceActions.removeMessages(messagesForDelete));
            dispatch(currentChannelActions.deleteCurrentChannel());
            const defaultChannel = { id: '1', name: 'general', removable: false };
            dispatch(currentChannelActions.addCurrentChannel(defaultChannel));
            notify('notify.removeChannel');
        });
    }

    return (
        <div className="flex-column g-0">
            {/* defaultActiveKey="/home" */}
            <div className="mb-4 p-3 d-flex justify-content-between align-items-center">
                <p className="m-2">{t('channels')}</p>
                <div onClick={createChannel}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus-square" viewBox="0 0 16 16">
                        <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
                        <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                    </svg>
                </div>
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

            <div>
                {channels.map(
                    (channel) => {
                        const classStyle = channel.id === currentChannel.id ?
                            'btn text-start text-truncate active' : 'btn text-start text-truncate';
                        return <Dropdown as={ButtonGroup} className='d-flex mb-1' key={channel.id}>
                            <Button variant={classStyle} id={channel.id} onClick={selectChannel}># {channel.name}</Button>
                            {channel.removable ?
                                <>
                                    <Dropdown.Toggle split variant="btn" id="dropdown-custom-2" />
                                    <Dropdown.Menu className="super-colors">
                                        <Dropdown.Item eventKey="1" onClick={() => renameChannel(channel.id)}>Переименовать</Dropdown.Item>

                                        <Dropdown.Item eventKey="2" onClick={() => deleteChannel(channel.id)}>Удалить</Dropdown.Item>

                                    </Dropdown.Menu>
                                </>
                                : null
                            }
                        </Dropdown>
                    })
                }
            </div>
            <ToastContainer />
        </div>
    );
}

export default Navbar;