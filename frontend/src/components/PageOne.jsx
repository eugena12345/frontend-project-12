// import { useSelector } from "react-redux";
// import { selectors as userSelectors } from '../slices/auorizeSlice.js';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";
import { actions as autorizedActions } from '../slices/auorizeSlice.js';
import { actions as channelsActions } from '../slices/channelsSlice.js';

import { useDispatch } from 'react-redux';
import axios from 'axios';
import Navbar from './Navbar.jsx';



const PageOne = () => {
    let userToken = localStorage.getItem('token');
    const [user, setUser] = useState(userToken);
    const [channels, setCHannels] = useState([]);
    const [messages, setMessages] = useState([]);
    const logout = () => {
        setUser(null);
        dispatch(autorizedActions.logout())
    };
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
                console.log('axios response channels',response.data); // =>[{ id: '1', name: 'general', removable: false }, ...]
                setCHannels(response.data);
                dispatch(channelsActions.addChannels(response.data));
            });
            axios.get('/api/v1/messages', {
                headers: {
                    Authorization: `Bearer ${user}`,
                },
            }).then((response) => {
                console.log('axios response messages', response.data); // =>[{ id: '1', body: 'text message', channelId: '1', username: 'admin }, ...]
                setMessages(response.data)
            });
        }

    }, [user, navigate, dispatch]);


    // console.log('channels', channels);



    return ((
        <div>
            Всем привет!!!! Это юзер такой {user};
            <Navbar />
            {channels.map((channel) => {
                console.log(channel.name)
                return (
                    <div key={channel.id}>
                        <div>{channel.name}</div>
                        {messages.map((msg) => {
                            console.log(msg)
                            return msg;
                        })}
                    </div>
                )
            })}
            <button onClick={logout}>удалить юзера</button>
        </div>
    ))
}

export default PageOne;