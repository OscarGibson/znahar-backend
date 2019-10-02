import React from 'react';
import { connect } from 'react-redux';
import { IBackForm } from '../types';

class FooterBackForm extends React.Component<IBackForm, IBackForm> {

    handleSearchFormSubmit() {

    }

    render() {
        const { title } = this.props
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
                        value=""
                        placeholder="Ваше Ім’я"
                    />

                    <input 
                        type="text"
                        className="searchFormField"
                        id="backFormCell"
                        value=""
                        placeholder="Телефон"
                    />

                    <textarea
                        id="backFormMessage"
                        value=""
                        name=""
                        cols={30}
                        rows={3}
                        placeholder="Повідомлення"
                    />

                    <button type="submit">Надіслати</button>
                </form>
            </div>
        )
    }
}

export default connect()(FooterBackForm)