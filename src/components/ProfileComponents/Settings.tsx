import React from 'react'
import { Form, Row, Col } from 'react-bootstrap';
// import { connect } from 'react-redux'

interface SettingsState {

}

const Settings = (props:SettingsState) => {

    return (
        <h1></h1>
    )

    return (
        <div className="Settings">
            <div className="general">
                <div className="settings-nav">
                    <h1 className="header"></h1>
                    <button className="default-button">Change</button>
                </div>

                <div className="settings-body">
                    <Form>
                        <Form.Group as={Row} controlId="formPlaintextEmail">
                            <Form.Label column sm="4">
                            Ім’я
                            </Form.Label>
                            <Col sm="8">
                            <Form.Control plaintext readOnly defaultValue="Ім’я" />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} controlId="formPlaintextEmail">
                            <Form.Label column sm="4">
                            Прізвище
                            </Form.Label>
                            <Col sm="8">
                            <Form.Control plaintext readOnly defaultValue="Прізвище" />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} controlId="formPlaintextEmail">
                            <Form.Label column sm="4">
                            Електронна скринька
                            </Form.Label>
                            <Col sm="8">
                            <Form.Control plaintext readOnly defaultValue="Електронна скринька" />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} controlId="formPlaintextEmail">
                            <Form.Label column sm="4">
                            Контактиний номер
                            </Form.Label>
                            <Col sm="8">
                            <Form.Control plaintext readOnly defaultValue="Контактиний номер" />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} controlId="formPlaintextPassword">
                            <Form.Label column sm="4">
                            Password
                            </Form.Label>
                            <Col sm="8">
                            <Form.Control type="password" placeholder="Password" />
                            </Col>
                        </Form.Group>
                    </Form>
                </div>
                
            </div>
            <div className="privacy"></div>
        </div>
    )
}

export default Settings