import React from 'react'
import { connect } from 'react-redux'
import { IBackForm } from '../types'
import axios from 'axios'
import { SEND_FEEDBACK } from '../constants'


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
    }

    handleSearchFormSubmit(e:any) {
        e.preventDefault()
        const { name, cell, message } = this.state
        axios.post(SEND_FEEDBACK, {
            name, cell, message
        })
        .then((response) => {
            if (response.status === 201) {
                console.log(response)
            }
        })
        .catch((error) => {
            console.log("ERROR", error)
        })
        .finally(() => {
    
        })
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

                    <input 
                        type="text"
                        className="searchFormField"
                        id="backFormCell"
                        value={cell}
                        name="cell"
                        placeholder="Телефон"
                        onChange={this.handleFormChange}
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

export default connect()(FooterBackForm)