import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from "axios";

function AddMessage() {
    let userToken = localStorage.getItem('token');

    const sendMessage = (e) => {
        e.preventDefault();
        console.log(e);
        const form = e.target;
        const messageText = e.target[0].value;
       // const text = formData.querySelector(('name'));
       // console.log(messageText);
        const newMessage = {
            body: messageText,
            channelId: '1',
            username: 'admin',
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
        <Form onSubmit={sendMessage} className="mb-3" controlId="text">
            <input className='form-control' type="text" name='message' />
            <Button variant="primary" type="submit" >
                Send
            </Button>
        </Form>
    );
}

export default AddMessage;