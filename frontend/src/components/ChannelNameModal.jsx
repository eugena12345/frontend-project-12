/* eslint-disable react/prop-types */
import React from 'react';

import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useTranslation } from 'react-i18next';

import { useFormik } from 'formik';
import * as yup from 'yup';

const ChannelNameModal = ({
  show, onHide, channelsNameColl, onSubmit,
}) => {
  const { t } = useTranslation();
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
    onSubmit,
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
