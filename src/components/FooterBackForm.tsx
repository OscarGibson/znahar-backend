import React from 'react'
import { connect } from 'react-redux'
import { IBackForm, IInfoLayer } from '../types'
import axios from 'axios'
import { SEND_FEEDBACK } from '../constants'
import PhoneInput from 'react-phone-number-input'
import { showInfoLayer } from '../actions'
import { userInitState } from '../redusers/initState'


const mapDispatchToProps = (dispatch:any) => {
    return {
        showInfoLayer: (payload:IInfoLayer) => {dispatch(showInfoLayer(payload))}
    }
}

class FooterBackForm extends React.Component<IBackForm, any> {

    constructor(props:any, state:any) {
        super(props, state)

        this.state = {
            name: "",
            cell: "",
            message: ""
        }

        this.handleSearchFormSubmit = this.handleSearchFormSubmit.bind(this)
        this.handleFormChange = this.handleFormChange.bind(this)
        this.cellHandler = this.cellHandler.bind(this)
    }

    handleSearchFormSubmit(e:any) {
        e.preventDefault()
        const { name, cell, message } = this.state
        const { showInfoLayer } = this.props

        if (!cell || cell === userInitState.cell) {
            showInfoLayer({
                text:"У вас не вказаний номер телефону",
                timer:3,
            })
            return false
        } else if (cell.length < 10) {
            showInfoLayer({
                text:"Вказано некоректний номер телефону",
                timer:3,
            })
            return false
        }

        if (name === "") {
            showInfoLayer({
                text:"Вкажіть своє ім'я",
                timer:3,
            })
            return false
        }
        
        axios.post(SEND_FEEDBACK, {
            name, cell, message
        })
        .then((response) => {
            if (response.status === 201) {
                console.log(response)
                this.setState({
                    name: "",
                    cell: "",
                    message: ""
                })
                showInfoLayer({
                    text:"Дякуємо за ваш відгук",
                    timer:3,
                })
            }
        })
        .catch((error) => {
            console.log("ERROR", error)
        })
        .finally(() => {
    
        })
    }

    cellHandler(cell:string) {
        this.setState({ cell })
    }

    handleFormChange(e:any) {
        const { name, value } = e.target
        this.setState({
            [name]:value
        })
    }

    render() {
        const { title } = this.props
        const { name, cell, message } = this.state
        return (
            <div className="FooterBackForm">
                <h2 className="footerHeader">
                    {title}
                </h2>

                <form className="form" onSubmit={this.handleSearchFormSubmit}>

                    <input 
                        type="text"
                        className="searchFormField"
                        id="backFormName"
                        value={name}
                        name="name"
                        placeholder="Ваше Ім’я"
                        onChange={this.handleFormChange}
                    />

                    {/* <input 
                        type="text"
                        className="searchFormField"
                        id="backFormCell"
                        value={cell}
                        name="cell"
                        placeholder="Телефон"
                        onChange={this.handleFormChange}
                    /> */}

                    <PhoneInput
                        country="UA"
                        defaultCountry="UA"
                        international={false}
                        value={cell}
                        onChange={this.cellHandler}
                        placeholder="+380XX XXX XX XX"
                        limitMaxLength
                        maxLength={16}
                    />

                    <textarea
                        id="backFormMessage"
                        value={message}
                        name="message"
                        cols={30}
                        rows={3}
                        placeholder="Повідомлення"
                        onChange={this.handleFormChange}
                    />

                    <button type="submit">Надіслати</button>
                </form>
            </div>
        )
    }
}

export default connect(null, mapDispatchToProps)(FooterBackForm)