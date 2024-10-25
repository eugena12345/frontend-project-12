import React from 'react';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useTranslation } from 'react-i18next';

const ConfirmationModal = ({
  show, onClose, modalContent, handleClose,
}) => {
  const { t } = useTranslation();
  const handleSubmit = (e) => {
    e.preventDefault();
    const { id } = modalContent;
    onClose(id);
  };
  // handle поднять аздесь принимать  onClose show
  // почему не принимать handleClose, если нужно сделать отмену и я передумала удалять

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{t('removeChannel')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">

            <Form.Label>{t('sure')}</Form.Label>

          </Form.Group>
          <div className="d-flex justify-content-end">
            <Button variant="secondary m-1" onClick={handleClose}>
              {t('button.cancel')}
            </Button>
            <Button variant="danger  m-1" type="submit">
              {t('button.delete')}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ConfirmationModal;
