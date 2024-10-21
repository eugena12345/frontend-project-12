/* eslint-disable react/prop-types */
import React from 'react';

import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useTranslation } from 'react-i18next';
import axios from 'axios';

import { useFormik } from 'formik';
import * as yup from 'yup';
import filter from 'leo-profanity';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { actions as channelsSliceActions } from '../store/slices/channelsSlice';
import { actions as currentChannelActions } from '../store/slices/actualChannelSlice';

import { postNewChannel } from '../servises/api';
import store from '../store';

const ChannelNameModal = ({ show, onHide, channelsNameColl }) => {
  const { t } = useTranslation();
  const userToken = store.getState().user.ids[0];
  const dispatch = useDispatch();
  const notify = (notifyMessage) => toast(t(notifyMessage));
  const setCurrentChannel = (channelData) => {
    dispatch(currentChannelActions.deleteCurrentChannel());
    dispatch(currentChannelActions.addCurrentChannel(channelData));
  };

  const addNewChannel = (newChannel) => {
    const isNameGood = !filter.check(newChannel.name);
    const censoredChannelName = newChannel.name;
    if (isNameGood) {
      postNewChannel(censoredChannelName, userToken)
        .then((response) => {
          onHide();
          dispatch(channelsSliceActions.addChannel(response.data));
          notify('notify.createChannel');
          const newActualChannel = response.data;
          setCurrentChannel(newActualChannel);
        }).catch((error) => {
          if (axios.isAxiosError(error)) {
            notify('notify.networkError');
          }
        });
    }
  };

  const formik = useFormik({
    // enableReinitialize: true,
    initialValues: {
      channelName: '',
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
      addNewChannel(newChannel);
      onHide();
    },
  });

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{t('createChannel')}</Modal.Title>
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

export default ChannelNameModal;
