import React, { FormEvent } from 'react';
import { connect } from 'react-redux';
import { ISubscribeForm } from '../types';
import ActionButton from './ActionButton';

class SubscribeForm extends React.Component<ISubscribeForm, ISubscribeForm> {

    constructor(props:ISubscribeForm, state:ISubscribeForm) {
        super(props, state)

        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit(_e:FormEvent<HTMLFormElement>) {
        const { action, value } = this.props
        action(value)
    }

    render() {
        const { value } = this.props
        return (
            <div className="SubscribeForm">
                <div className="input-group">
                    <input
                        type="text"
                        id="searchInput"
                        value={value}
                        className="form-control input"
                        aria-label="Sarch in warehouses"
                        // onChange={this.handleSearchFieldChange}
                        placeholder="Ваш email"
                    />
                    <div className="input-group-append">
                        <ActionButton
                            text={"Підписатись"}
                            classList={["default-button", "button"]}
                            action={() => {console.log("Subscribe click")}}
                            iconName={""}
                            iconSvgSrc=""
                        />
                    </div>
                </div>
            </div>
        )
    }
}

export default connect()(SubscribeForm)