import { Fragment } from "react";
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";

import classes from "./Modal.module.css";

const Backdrop = (props) => {
  return (
    <Link to="/">
      <div className={classes.backdrop} onClick={props.onClose} />
    </Link>
  );
};

const ModalOverlay = (props) => {
  return (
    <div className={classes.modal}>
      <div className={classes.content}>{props.children}</div>
    </div>
  );
};

const portalElement = document.getElementById("overlays");

const Modal = (props) => {
  return (
    <Fragment>
      {ReactDOM.createPortal(
        <Backdrop onClose={props.onClose} />,
        portalElement
      )}
      {ReactDOM.createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        portalElement
      )}
    </Fragment>
  );
};

export default Modal;
