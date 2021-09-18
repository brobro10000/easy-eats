import React, { useState, useEffect } from 'react';
import { Container, Button, Modal, FormText } from 'react-bootstrap'
import { UPDATE_LOGIN } from '../utils/actions';
import LoginForm from './LoginForm';
import { useSelector, useDispatch } from 'react-redux';
import SignupForm from './SignupForm';
function ModalObject(props) {
    console.log(props)
    const isOpen = useSelector(state => state.currentForm)
    const dispatch = useDispatch()
    const [show, setShow] = useState(isOpen);
    const handleClose = () => {
        setShow(false)
        dispatch({
            type: UPDATE_LOGIN,
            currentForm: show,
        })
    };
    return (
        <Container>
            <Modal show={isOpen} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                {props.type == 0 ? <LoginForm /> : <SignupForm />}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    )
}

export default ModalObject