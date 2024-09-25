import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

import { useFormik } from 'formik';
import * as yup from 'yup';


const ChannelNameModal = ({show, handleClose, channelsNameColl, modalContent}) => {
    console.log(modalContent);
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
            const channelId = modalContent.id;
            console.log(newChannel);
            modalContent.modalCallback(newChannel, channelId);
            values.channelName = '';
            handleClose();
            //почему не закрывается автоматически если менять название канала
        },
    });

return (
    <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{modalContent.text}</Modal.Title>
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
)
};

export default ChannelNameModal;