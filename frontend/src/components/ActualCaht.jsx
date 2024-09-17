// import Nav from 'react-bootstrap/Nav';
import AddMessage from "./AddMessage";
import { useSelector } from "react-redux";
import { selectors as currentChannelSelectors } from './../slices/actualChannelSlice.js';
import { selectors as messagesSelectors } from "../slices/messageSlice.js";

const ActualChat = () => {
    let userToken = localStorage.getItem('token');
    const currentChannel = useSelector(currentChannelSelectors.selectAll)[0];
    console.log('currentChannel', currentChannel);
    const messages = useSelector(messagesSelectors.selectAll);
    console.log('messages!!!!!!!!!!!!!! /n', messages);

    const currentMessages = currentChannel ?
        messages.filter((message) => message.channelId === currentChannel.id)
        : [];



    return (
        <div className='d-flex flex-column h-100'>
            {currentChannel &&
                <>
                    <div className="bg-light mb-4 p-3 shadow-sm small">
                        <p className="m-0">#{currentChannel.name}</p>
                        <span>{currentMessages.length} сообщений</span>
                    </div>
                    <div className='chat-messages'>
                        <div className="overflow-auto px-5">
                            {currentMessages.map((message) => {
                                return (
                                    <p><b>{message.username}:</b> {message.body}</p>
                                )
                            })}
                        </div>
                    </div>
                    <div className="mt-auto px-5 py-3">
                        <AddMessage />
                    </div>
                </>
            }
        </div>
    )
};

export default ActualChat;
