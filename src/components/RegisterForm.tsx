import React from 'react'
import { connect } from 'react-redux'
import { Form, Button, FormControlProps } from 'react-bootstrap'
import { Col } from 'react-bootstrap'
import { IRegisterForm } from '../types'
import { ReplaceProps, BsPrefixProps } from 'react-bootstrap/helpers';

interface IRegisterFormTemplate extends IRegisterForm {
    onChange:(event:React.FormEvent<ReplaceProps<"input", BsPrefixProps<"input"> & FormControlProps>>) => void
}

const RegisterForm = (props:IRegisterFormTemplate) => {
    const {
        handleFormSubmit,
        validated,
        fname,
        lname,
        cell,
        email,
        password,
        onChange
    } = props
    return (
        <Form className="form" noValidate validated={validated} onSubmit={handleFormSubmit}>
            <Form.Row>
                <Form.Group as={Col} md="12" controlId="validationCustom01">
                    <Form.Label>Ім'я*</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        placeholder=""
                        value={fname}
                        name="fname"
                        onChange={onChange}
                    />
                    <Form.Control.Feedback></Form.Control.Feedback>
                </Form.Group>
            </Form.Row>

            <Form.Row>
                <Form.Group as={Col} md="12" controlId="validationCustom02">
                    <Form.Label>Прізвище</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder=""
                        value={lname}
                        name="lname"
                        onChange={onChange}
                    />
                    <Form.Control.Feedback></Form.Control.Feedback>
                </Form.Group>
            </Form.Row>

            <Form.Row>
                <Form.Group as={Col} md="12" controlId="validationCustom03">
                    <Form.Label>Електронна Скринька*</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        placeholder="Email"
                        value={email}
                        name="email"
                        onChange={onChange}
                    />
                    <Form.Control.Feedback></Form.Control.Feedback>
                </Form.Group>
            </Form.Row>

            <Form.Row>
                <Form.Group as={Col} md="12" controlId="validationCustom04">
                <Form.Label>Контактний Номер*</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="+38 000 000 00 00"
                    required
                    name="cell"
                    value={cell}
                    onChange={onChange}
                    />
                <Form.Control.Feedback></Form.Control.Feedback>
                </Form.Group>
            </Form.Row>

            <Form.Row>
                <Form.Group as={Col} md="12" controlId="validationCustom05">
                <Form.Label>Пароль*</Form.Label>
                <Form.Control
                    type="password"
                    placeholder="*****"
                    required
                    name="password"
                    value={password}
                    onChange={onChange}
                    />
                <Form.Control.Feedback></Form.Control.Feedback>
                </Form.Group>
            </Form.Row>

            <Button className="default-button" type="submit">Submit form</Button>
        </Form>
    )
}

export default connect()(RegisterForm)