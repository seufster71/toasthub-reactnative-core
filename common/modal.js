import React from 'react';
import PropTypes from 'prop-types';

const Modal = ({isOpen, width, height, style, backdropStyle, containerClassName, className, backdropClassName, noBackdrop, onClose, children}) => {
  if (isOpen === false) {
    return null;
  }

  let modalStyle = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    zIndex: '9999'
  };

  if (width && height) {
    modalStyle.width = width + 'px';
    modalStyle.height = height + 'px';
    modalStyle.marginLeft = '-' + (width/2) + 'px';
    modalStyle.marginTop = '-' + (height/2) + 'px';
    modalStyle.transform = null;
  }

  if (style) {
    for (let key in style) {
      modalStyle[key] = style[key];
    }
  }

  let backStyle = {
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: '0px',
    left: '0px',
    zIndex: '9998',
    overflow: 'visible',
    background: 'rgba(0,0,0,0.3)'
  };

  if (backdropStyle) {
    for (let key in backdropStyle) {
      backStyle[key] = backStyle[key];
    }
  }

  return (
    <div className={containerClassName}>
      <div className={className} style={modalStyle}>
        {children}
      </div>
      {!noBackdrop && <div className={backdropClassName} style={backStyle}/>}
    </div>
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  width: PropTypes.number,
  height: PropTypes.number,
  style: PropTypes.object,
  backdropStyle: PropTypes.object,
  containerClassName: PropTypes.string,
  className: PropTypes.string,
  backdropClassName: PropTypes.string,
  children: PropTypes.object,
  noBackdrop: PropTypes.bool,
  onClose: PropTypes.func
};

export default Modal;
