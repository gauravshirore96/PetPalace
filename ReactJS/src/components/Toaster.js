import React, { useState } from 'react';
import { Toast, ToastContainer } from 'react-bootstrap';

const SuccessToast = ({ show, message, setShow }) => {
  return (
    <ToastContainer position="top-end" className="p-3">
      <Toast show={show} onClose={() => setShow(false)} delay={3000} autohide>
        <Toast.Body>{message}</Toast.Body>
      </Toast>
    </ToastContainer>
  );
};

export default SuccessToast;
