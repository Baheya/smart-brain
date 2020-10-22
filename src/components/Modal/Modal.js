import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

import './Modal.css';

const Modal = (props) => {
  const [el] = useState(document.createElement('div'));
  useEffect(() => {
    const modalRoot = document.getElementById('modal-root');
    modalRoot.appendChild(el);
    return () => modalRoot.removeChild(el);
  }, []);

  return ReactDOM.createPortal(props.children, el);
};

export default Modal;
