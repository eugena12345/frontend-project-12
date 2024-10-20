/* eslint-disable react/prop-types */
import React from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import filter from 'leo-profanity';
import { actions as channelsSliceActions } from '../store/slices/channelsSlice';
import { actions as currentChannelActions } from '../store/slices/actualChannelSlice';
import { patchChangedChannelName } from '../servises/api';
import store from '../store';

const RenameChannelModal = ({
  show, onHide, channelsNameColl, modalContent,
}) => {
  console.log(modalContent);
  const { t } = useTranslation();
  const {
    id,
    oldChannelName,
  } = modalContent;
  const dispatch = useDispatch();

  const userToken = store.getState().user.ids[0];
  const notify = (notifyMessage) => toast(t(notifyMessage));

  const changeChannelName = (newName, channelId) => {
    const censoredChannelName = filter.clean(newName.name);
    patchChangedChannelName(channelId, censoredChannelName, userToken)
      .then((response) => {
        dispatch(channelsSliceActions
          .updateChannel({ id: response.data.id, changes: { name: response.data.name } }));
        notify('notify.renameChannel');
        dispatch(currentChannelActions.deleteCurrentChannel());
        dispatch(currentChannelActions.addCurrentChannel(response.data));
      }).catch((error) => {
        if (axios.isAxiosError(error)) {
          notify('notify.networkError');
        }
      });
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      channelName: `${oldChannelName}`,
    },
    validationSchema: yup.object({
      channelName: yup.string()
        .required(t('validationError.required'))
        .min(3, t('validationError.minNameLength'))
        .max(20, t('validationError.maxNameLength'))
        .notOneOf(channelsNameColl, t('validationError.sameName')),
    }),
    onSubmit: (values) => {
      const newChannel = { name: values.channelName };
      console.log('id', id);
      // const channelId = id;
      changeChannelName(newChannel, id);
      onHide();
    },
  });

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{t('changeChannelName')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group className="mb-3 focus-ring" controlId="exampleForm.ControlInput1">
            <Form.Label>{t('channelName')}</Form.Label>
            <Form.Control
              name="channelName"
              type="text"
              autoFocus
              value={formik.values.channelName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.submitCount > 0 && formik.errors.channelName && (
            <p className="text-danger small">{formik.errors.channelName}</p>
            )}
          </Form.Group>
          <div className="d-flex justify-content-end">
            <Button variant="secondary m-1" onClick={onHide}>
              {t('button.cancel')}
            </Button>
            <Button variant="primary" type="submit">
              {t('button.create')}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default RenameChannelModal;
