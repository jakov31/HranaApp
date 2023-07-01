import { Fragment } from "react";
import  ReactDOM from "react-dom";
import stilovi from "./Modal.module.css";

const Backdrop = (props) => {
  return <div onClick={props.onClick} className={stilovi.backdrop} />;
};

const Overlay = (props) => {
  return (
    <div className={stilovi.modal}>
      <div className={stilovi.content}>{props.children}</div>
    </div>
  );
};

const portalLokacija = document.getElementById("portal")

const Modal = (props) => {
  return (
    <Fragment>
      {ReactDOM.createPortal(<Backdrop onClick={props.onClick} />, portalLokacija)}  
      {ReactDOM.createPortal( <Overlay>{props.children}</Overlay>, portalLokacija)} 
     
    </Fragment>
  );
};

export default Modal;
