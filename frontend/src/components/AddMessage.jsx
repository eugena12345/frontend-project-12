import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from "axios";
import { useTranslation } from 'react-i18next';


function AddMessage({currentChannelId}) {
    let userToken = localStorage.getItem('token');
    let userName = localStorage.getItem('username');
    const { t, i18n } = useTranslation();


    const sendMessage = (e) => {
        e.preventDefault();
        console.log(e);
        const form = e.target;
        const messageText = e.target[0].value;
        // const text = formData.querySelector(('name'));
        // console.log(messageText);
        const newMessage = {
            body: messageText,
            channelId: currentChannelId,
            username: userName,
        }
        // console.log(newMessage);
        form.reset();

        axios.post('/api/v1/messages', newMessage, {
            headers: {
                Authorization: `Bearer ${userToken}`,
            },
        }).then((response) => {
            console.log(response.data); // => { id: '1', body: 'new message', channelId: '1', username: 'admin }
        });
    }

    return (
        <Form onSubmit={sendMessage} >
            {/* controlId="text" */}
            <div className='d-flex flex-row'>
                <input className='form-control me-2' type="text" name='message' />
                <Button variant="primary" type="submit" >
                    {t('send')}
                </Button>
            </div>
        </Form>
    );
}

export default AddMessage;