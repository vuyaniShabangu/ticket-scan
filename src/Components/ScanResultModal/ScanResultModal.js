import React from 'react'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';

const scanResultModal = (props) => {
    const successAlert = (<Alert variant="success">
                            <Alert.Heading>Ticket Accepted</Alert.Heading>
                            <p>
                                This is a valid ticket as is being scanned for the first time.
                            </p>
                            <hr />
                            <p className="mb-0">
                            Ticket ID: {props.ticket_id}
                            </p>
                    </Alert>);
    
    const dangerAlert = (<Alert variant="danger">
                            <Alert.Heading>Duplicate Ticket</Alert.Heading>
                            <p>
                                This ticket has already been scanned before.
                            </p>
                            <hr />
                            <p className="mb-0">
                                Ticket ID: {props.ticket_id}
                            </p>
                    </Alert>);

    return(
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
                Scan Completed!
            </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {props.acceptedticket ? successAlert : dangerAlert}
            </Modal.Body>
            <Modal.Footer>
            <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );

}

export default scanResultModal;