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

    return (
        <div className='d-flex flex-column h-100'>
            {currentChannel &&
                <>
                    <div className="bg-light mb-4 p-3 shadow-sm small">
                        <p className="m-0">#{currentChannel.name}</p>
                        <span>{messages.length} сообщений</span>
                    </div>
                    <div className='chat-messages'>
                        <div className="overflow-auto px-5">
                            {messages.map((message) => {
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
