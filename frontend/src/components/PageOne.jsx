// import { useSelector } from "react-redux";
// import { selectors as userSelectors } from '../slices/auorizeSlice.js';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";
import { actions as channelsActions } from '../slices/channelsSlice.js';
import { actions as currentChannelActions } from '../slices/actualChannelSlice.js';
import { actions as messagesActions } from '../slices/messageSlice.js';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import Navbar from './Navbar.jsx';
import { io } from 'socket.io-client';
import Header from './Header.jsx';
import ActualChat from './ActualCaht.jsx';

const socket = io('/');  //    http://0.0.0.0:5001 '<https://api/v1/messages>'

const PageOne = () => {
    let userToken = localStorage.getItem('token');
    const [user, setUser] = useState(userToken);
    const [channels, setCHannels] = useState([]);
    const [messages, setMessages] = useState([]);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    // const user = useSelector((state) => {
    //     console.log('state', JSON.stringify(state.user));
    //     return userSelectors.selectById(state, 1)
    // });

    useEffect(() => {
        if (!user) {
            console.log("юзер не авторизован");
            navigate('/login', { replace: false });
        } else {
            axios.get('/api/v1/channels', {
                headers: {
                    Authorization: `Bearer ${user}`,
                },
            }).then((response) => {
                console.log('axios response channels', response.data); // =>[{ id: '1', name: 'general', removable: false }, ...]
                setCHannels(response.data);
                dispatch(channelsActions.addChannels(response.data));
                // найти канал джеренрал и его задиспатчить
                const currentChannel = { id: '1', name: 'general', removable: false };
                dispatch(currentChannelActions.addCurrentChannel(currentChannel));
            });
            axios.get('/api/v1/messages', {
                headers: {
                    Authorization: `Bearer ${user}`,
                },
            }).then((response) => {
                console.log('axios response messages', response.data); // =>[{ id: '1', body: 'text message', channelId: '1', username: 'admin }, ...]
                setMessages(response.data);
                dispatch(messagesActions.addMessages(response.data));
            });
        }

    }, [user, navigate, dispatch]);
    // console.log('channels', channels);
    // console.log(socket);
    socket.on('newMessage', (payload) => {
        console.log(payload); // => { body: "new message", channelId: 7, id: 8, username: "admin" }
        dispatch(messagesActions.addMessage(payload));
    });

    return (
        <div className="container  vh-100 mw-100 d-flex flex-column">
            <div className="row ">
                <Header setUser={setUser} />
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
    )
}

export default PageOne;
