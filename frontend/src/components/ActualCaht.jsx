// import Nav from 'react-bootstrap/Nav';
import AddMessage from "./AddMessage";

const ActualChat = () => {
    let userToken = localStorage.getItem('token');
    

    return (
        <div className='container g-0'>
            <div className='row'>
                <div className='col'>
                    <div className=" border border-primary ">
                        <p>HeaderChat</p>
                        <p>Chat name</p>
                        <p>unread messages conter</p>
                    </div>
                    <div className=" border border-primary">
                        <p>many massages</p>
                        <p>many massages</p>
                        <p>many massages</p>

                    </div>
                    <div className=" border border-primary">
                        <AddMessage/>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default ActualChat;
