import React from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import Breadcrumbp from '../components/Breadcrumbp'
import MainMenuSimple from '../components/MainMenuSimple'
import { mainMenuSimpleState } from '../redusers/initState'
import { ILoginForm } from '../types';
import { changeLoginFormField, cleanLoginForm, setLoginErrors } from '../actions';
import { LOGIN_URL } from '../constants';


const mapStateToProps = (reducer:any) => {
    const { LoginReducer } = reducer
    return {
        ...LoginReducer
    }
}

const mapDispatchToProps = (dispatch:any) => {
    return {
        changeLoginFormField: (payload:{name:string, value:string}) => {dispatch(changeLoginFormField(payload))},
        cleanLoginForm: () => {dispatch(cleanLoginForm())},
        setLoginErrors:(errors:string) => {dispatch(setLoginErrors(errors))}
    }
}

const renderErrors = (errors:string) => {
    if (errors !== "") {
        return (
            <div className="alert alert-danger custom-alert" role="alert">
                {errors}
            </div>
        )
    }
}


class Login extends React.Component<ILoginForm, ILoginForm> {

    constructor(props:ILoginForm, state:ILoginForm) {
        super(props, state)

        this.handleFieldChange = this.handleFieldChange.bind(this)
        this.handleFormSubmit = this.handleFormSubmit.bind(this)
        this.loginUser = this.loginUser.bind(this)
    }

    handleFieldChange(event:React.ChangeEvent<HTMLInputElement>) {
        event.preventDefault()
        const { changeLoginFormField } = this.props
        changeLoginFormField({
            name:event.target.name,
            value:event.target.value
        })
    }

    loginUser() {
        const { email, password, cleanLoginForm } = this.props
        axios.post(LOGIN_URL, {
            email, password
        })
        .then((response) => {
            console.log("RESPONSE", response.status)
            if (response.status === 200) {
                const { access, refresh } = response.data
                localStorage.setItem("accessToken", access)
                localStorage.setItem("refreshToken", refresh)
                cleanLoginForm()
                window.location.href = "/"
            }
        })
        .catch((error) => {
            const { setLoginErrors } = this.props
            const { status } = error.response
            if (status === 400) {
                setLoginErrors("Invalid request")
            } else if (status === 401) {
                setLoginErrors("Невірний логін або пароль")
            } else {
                setLoginErrors("Server error")
            }
        })
        .finally(() => {

        })
    }

    handleFormSubmit(event:React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        this.loginUser()
    }

    render() {
        const { email, password, errors } = this.props
        return (
            <div className="Register">
                <MainMenuSimple { ...mainMenuSimpleState }/>
                <div className="header">
                    <div className="content standart-container">
                        <h1 className="title">Вхід</h1>
                        <Breadcrumbp
                            pages={[{
                                name:"Головна",
                                url:"/"
                            },{
                                name:"Вхід",
                                url:null
                            }]}
                        />
                    </div>
                </div>
                <div className="body standart-container">
                    <form className="form" onSubmit={this.handleFormSubmit}>
                        <div className="form-group">
                            <label>Електронна Скринька</label>
                            <input onChange={this.handleFieldChange} value={email} name="email" type="email" className="form-control" id="inputEmail" aria-describedby="emailHelp" placeholder="Email" />
                        </div>
                        <div className="form-group">
                            <label>Пароль</label>
                            <input onChange={this.handleFieldChange} value={password} type="password" name="password" className="form-control" id="exampleInputPassword1" placeholder="********" />
                        </div>
                        <button type="submit" className="btn btn-primary default-button">Увійти</button>
                        {renderErrors(errors)}
                    </form>
                </div>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)