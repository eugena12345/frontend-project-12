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

        <div className='container g-0 h-100 '>
            <div className='row h-100'>
                {currentChannel &&
                    <div className='col h-100 d-block'>
                        <div className=" border border-primary rounded">
                            <p>{currentChannel.name}</p>
                            <p>unread messages conter</p>
                        </div>
                        <div className=" border border-primary overflow-auto">
                            <div className="overflow-auto">
                                {messages.map((message) => {
                                    return (
                                        <p>{message.body}</p>
                                    )
                                })}
                            </div>

                        </div>
                        <div className=" border border-primary">
                            <AddMessage />
                        </div>
                    </div>
                }

            </div>
        </div>
    )
};

export default ActualChat;
