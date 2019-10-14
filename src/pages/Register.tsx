import React from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import Breadcrumbp from '../components/Breadcrumbp'
import MainMenuSimple from '../components/MainMenuSimple'
import { mainMenuSimpleState } from '../redusers/initState'
import { IRegisterForm } from '../types';
import { changeRegisterFormField, cleanRegisterForm, validateRegisterForm, unValidateRegisterForm } from '../actions';
import { REGISTER_USER } from '../constants';
import RegisterForm from '../components/RegisterForm';
import { ReplaceProps, BsPrefixProps } from 'react-bootstrap/helpers';
import { FormControlProps } from 'react-bootstrap';


const mapStateToProps = (reducer:any) => {
    const { RegisterReducer } = reducer
    return {
        ...RegisterReducer
    }
}

const mapDispatchToProps = (dispatch:any) => {
    return {
        changeRegisterFormField: (payload:{name:string, value:string}) => {dispatch(changeRegisterFormField(payload))},
        cleanRegisterForm: () => {dispatch(cleanRegisterForm())},
        validateRegisterForm:() => dispatch(validateRegisterForm()),
        unValidateRegisterForm:() => dispatch(unValidateRegisterForm())
    }
}


class Register extends React.Component<IRegisterForm, IRegisterForm> {

    constructor(props:IRegisterForm, state:IRegisterForm) {
        super(props, state)

        this.handleFieldChange = this.handleFieldChange.bind(this)
        this.handleFormSubmit = this.handleFormSubmit.bind(this)
        this.registerUser = this.registerUser.bind(this)
        this.changeRegisterFormField = this.changeRegisterFormField.bind(this)
    }

    handleFieldChange(event:React.ChangeEvent<HTMLInputElement>) {
        event.preventDefault()
        const { changeRegisterFormField } = this.props
        changeRegisterFormField({
            name:event.target.name,
            value:event.target.value
        })
    }

    registerUser() {
        const { fname, lname, email, cell, password, cleanRegisterForm } = this.props
        axios.post(REGISTER_USER, {
            fname, lname, email, cell, password
        })
        .then((response) => {
            if (response.status === 201) {
                cleanRegisterForm()
                window.location.href = "/login"
            }
        })
        .catch((error) => {
            console.log("ERROR", error)
        })
        .finally(() => {

        })
    }

    changeRegisterFormField(event: React.FormEvent<ReplaceProps<"input", BsPrefixProps<"input"> & FormControlProps>>) {
        const { changeRegisterFormField } = this.props
        const form = event.currentTarget
        changeRegisterFormField({
            name:form.name || "",
            value:form.value || ""
        })
    }

    handleFormSubmit(event:React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        event.stopPropagation()
        const { validateRegisterForm, unValidateRegisterForm } = this.props
        validateRegisterForm()
        setTimeout( () => {
            unValidateRegisterForm()
        }, 3000)
        // const form = event.currentTarget;
        // if (form.checkValidity() === false) {
        //     event.preventDefault();
        //     event.stopPropagation();
        // }
        this.registerUser()
    }

    /** 
     * (
     *  (event: React.FormEvent<ReplaceProps<"input", BsPrefixProps<"input"> & FormControlProps>>) => void
     * ) | undefined
     * 
     * React.FormEvent<HTMLFormElement>
    */

    render() {
        // const { name, email, cell, password, validated } = this.props
        return (
            <div className="Register">
                <MainMenuSimple { ...mainMenuSimpleState }/>
                <div className="header">
                    <div className="content standart-container">
                        <h1 className="title">Реєстрація</h1>
                        <Breadcrumbp
                            pages={[{
                                name:"Головна",
                                url:"/"
                            },{
                                name:"Реєстрація",
                                url:null
                            }]}
                        />
                    </div>
                </div>
                <div className="body standart-container">
                    <RegisterForm
                        {...this.props}
                        handleFormSubmit={this.handleFormSubmit}
                        onChange={this.changeRegisterFormField}
                        />
                </div>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register)


/* 
<form className="form" onSubmit={this.handleFormSubmit}>
                        <div className="form-group">
                            <label>Ім’я</label>
                            <input onChange={this.handleFieldChange} value={name} name="name" type="text" className="form-control" id="inputName" placeholder="" />
                        </div>
                        <div className="form-group">
                            <label>Електронна Скринька</label>
                            <input onChange={this.handleFieldChange} value={email} name="email" type="email" className="form-control" id="inputEmail" aria-describedby="emailHelp" placeholder="Email" />
                            <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                        </div>
                        <div className="form-group">
                            <label>Контактний Номер</label>
                            <input onChange={this.handleFieldChange} value={cell} type="text" name="cell" className="form-control" id="inputCell" placeholder="+38 000 000 00 00" />
                        </div>
                        <div className="form-group">
                            <label>Пароль</label>
                            <input onChange={this.handleFieldChange} value={password} type="password" name="password" className="form-control" id="exampleInputPassword1" placeholder="********" />
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
*/