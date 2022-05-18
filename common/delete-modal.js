import React from 'react';
import PropTypes from 'prop-types';

const DeleteModal = ({isOpen, title, bodyMsg, width, height, style, backdropStyle, containerClassName,
  className, backdropClassName, noBackdrop, onDelete, onCloseModal, children}) => {
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
    position: 'fixed',
    width: '100%',
    height: '100%',
    top: '0px',
    left: '0px',
    zIndex: '9998',
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
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal" aria-hidden="true"><i className="fa fa-close" onClick={onCloseModal}/></button>
              <h4 className="modal-title">{title}</h4>
            </div>
            <div className="modal-body">
              <h2>{bodyMsg}</h2>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-primary" onClick={onDelete}>Delete</button>
              <button type="button" className="btn btn-secondary" onClick={onCloseModal}>Cancel</button>
            </div>
          </div>
        </div>
      </div>
      {!noBackdrop && <div className={backdropClassName} style={backStyle}/>}
    </div>
  );
};

DeleteModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  title: PropTypes.string,
  bodyMsg: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
  style: PropTypes.object,
  backdropStyle: PropTypes.object,
  containerClassName: PropTypes.string,
  className: PropTypes.string,
  backdropClassName: PropTypes.string,
  children: PropTypes.object,
  noBackdrop: PropTypes.bool,
  onCloseModal: PropTypes.func,
  onDelete: PropTypes.func
};

export default DeleteModal;
