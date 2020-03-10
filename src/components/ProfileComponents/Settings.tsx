import React from 'react'
import { Form, Row, Col } from 'react-bootstrap'
import { connect } from 'react-redux'
import { SettingsState } from '../../types'


const Settings = (props:SettingsState) => {
    const {
        userForm,
        generalBlockEditable,
        privacyBlockEditable,
        changeUserFormField,
        submitUserForm,
        submitPrivacyForm,
        changeEditable
    } = props
    const { fname, lname, email, cell, password } = userForm
    console.log("re render")
    return (
        <div className="Settings">
            <div className="general">
                <div className="settings-nav">
                    <h1 className="settings-header">Загальні Налаштування</h1>
                    <button onClick={() => {changeEditable(true, "general")}} className="settings-button default-button">Змінити</button>
                </div>

                <div className="settings-body">
                    <Form onSubmit={submitUserForm}>
                        <Form.Group as={Row} controlId="formPlaintextFName">
                            <Form.Label column sm="4">
                            Ім’я
                            </Form.Label>
                            <Col sm="8">
                            <Form.Control plaintext={!generalBlockEditable} name="fname" onChange={changeUserFormField} readOnly={!generalBlockEditable} value={fname} />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} controlId="formPlaintextLName">
                            <Form.Label column sm="4">
                            Прізвище
                            </Form.Label>
                            <Col sm="8">
                            <Form.Control plaintext={!generalBlockEditable} name="lname" onChange={changeUserFormField} readOnly={!generalBlockEditable} value={lname} />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} controlId="formPlaintextEmail">
                            <Form.Label column sm="4">
                            Електронна скринька
                            </Form.Label>
                            <Col sm="8">
                            <Form.Control plaintext={!generalBlockEditable} name="email" onChange={changeUserFormField} readOnly={!generalBlockEditable} value={email} />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} controlId="formPlaintextCell">
                            <Form.Label column sm="4">
                            Контактний номер
                            </Form.Label>
                            <Col sm="8">
                            <Form.Control plaintext={!generalBlockEditable} name="cell" onChange={changeUserFormField} readOnly={!generalBlockEditable} value={cell} />
                            </Col>
                        </Form.Group>
                    </Form>
                </div>
            </div>
            <div className="privacy">
                <div className="settings-nav">
                    <h1 className="settings-header">Налаштування Приватності</h1>
                    <button onClick={() => {changeEditable(true, "privacy")}} className="settings-button default-button">Змінити</button>
                </div>

                <div className="settings-body">
                    <Form onSubmit={submitPrivacyForm}>
                        <Form.Group as={Row} controlId="formPlaintextPassword">
                            <Form.Label column sm="4">
                            Password
                            </Form.Label>
                            <Col sm="8">
                            <Form.Control plaintext={!privacyBlockEditable} name="password" onChange={changeUserFormField} readOnly={!privacyBlockEditable} type="password" placeholder="Password" value={password}/>
                            </Col>
                        </Form.Group>
                    </Form>
                </div>
            </div>
        </div>
    )
}

export default connect()(Settings)