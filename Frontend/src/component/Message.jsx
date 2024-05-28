import React from "react";
import { Modal, Button } from "react-bootstrap";
import { useSelector } from "react-redux";

const Message = (props) => {
  const { show, close, isSuccess } = props;
  const solution = useSelector((state) => state.wordle.solution);
  const newOne = () => {
    window.location.reload(false);
    close();
  };
  return (
    <div>
      <Modal show={show} onHide={close}>
        <Modal.Header closeButton>
          <Modal.Title>
            {isSuccess ? "Congrats" : "Good Luck Next Time"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>The Word is {solution}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={newOne}>
            New One
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Message;
