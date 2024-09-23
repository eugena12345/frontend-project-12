import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { useFormik } from 'formik';
import axios from 'axios';
import * as yup from 'yup';
import { useSelector } from 'react-redux';
import { selectors as channelsSelectors } from './../slices/channelsSlice.js'; // 
import { selectors as currentChannelSelectors } from './../slices/actualChannelSlice.js';
import { useDispatch } from 'react-redux';
import { actions as currentChannelActions } from '../slices/actualChannelSlice.js';
import { actions as channelsSliceActions } from './../slices/channelsSlice.js';

//  добавить валидацию названия канала
function Navbar() {
    let userToken = localStorage.getItem('token');
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const dispatch = useDispatch();
    const channels = useSelector(channelsSelectors.selectAll);
    const currentChannel = useSelector(currentChannelSelectors.selectAll)[0];
    console.log('currentChannel', currentChannel);
    console.log('channels из навбара', channels);
    const channelsNameColl = channels.map((channel) => channel.name);
    const selectChannel = (e) => {
        e.preventDefault();
        const [newCurrentChannel] = channels.filter((channel) => channel.id === e.target.id);
        dispatch(currentChannelActions.deleteCurrentChannel());
        dispatch(currentChannelActions.addCurrentChannel(newCurrentChannel))
    }

    const formik = useFormik({
        initialValues: {
            channelName: '',
        },
        validationSchema: yup.object({
            channelName: yup.string()
                .required()
                .min(3, 'Название должно быть больше 3 занокв')
                .max(20, 'Название должно быть меньше 20 занокв')
                .notOneOf(channelsNameColl, 'канал с таким названием уже существует')
        }),
        onSubmit: (values) => {
            const newChannel = { name: values.channelName };
            //  values.channelName = '';
            console.log(newChannel);
            axios.post('/api/v1/channels', newChannel, {
                headers: {
                    Authorization: `Bearer ${userToken}`,
                },
            }).then((response) => {

                console.log('отчет по созданию нового канала', response.data); // => { id: '3', name: 'new channel', removable: true }
                handleClose();
                dispatch(channelsSliceActions.addChannel(response.data));
                values.channelName = '';
            });
        },

    });

    return (
        <div defaultActiveKey="/home" className="flex-column g-0">
            <div className="mb-4 p-3 d-flex justify-content-between align-items-center">
                <p className="m-2">Каналы</p>
                <div onClick={handleShow}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-square" viewBox="0 0 16 16">
                        <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
                        <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                    </svg>
                </div>
            </div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Создание нового канала</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={formik.handleSubmit}>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Название канала</Form.Label>
                            <Form.Control
                                name="channelName"
                                type="text"
                                value={formik.values.channelName}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {formik.submitCount > 0 && formik.errors.channelName && (
                                <p className='text-danger small'>{formik.errors.channelName}</p>
                            )}
                        </Form.Group>
                        <div className='d-flex justify-content-end'>
                            <Button variant="secondary m-1" onClick={handleClose}>
                                Отмена
                            </Button>
                            <Button variant="primary" type='submit'>
                                Создать
                            </Button>
                        </div>
                    </Form>
                </Modal.Body>
            </Modal>
            <div>
                {channels.map(
                    (channel) => {
                        const classStyle = channel.id === currentChannel.id ?
                            'btn text-start active' : 'btn text-start';
                        return <Dropdown as={ButtonGroup} className='d-flex mb-1'>
                            <Button variant={classStyle} id={channel.id} onClick={selectChannel}># {channel.name}</Button>
                            {channel.removable ?
                                <>
                                    <Dropdown.Toggle split variant="btn" id="dropdown-custom-2" />
                                    <Dropdown.Menu className="super-colors">
                                        <Dropdown.Item eventKey="1">Переименовать</Dropdown.Item>
                                        <Dropdown.Item eventKey="2">Удалить</Dropdown.Item>
                                    </Dropdown.Menu>
                                </>
                                : null
                            }
                        </Dropdown>
                    })
                }
            </div>
        </div>
    );
}

export default Navbar;