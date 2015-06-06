import React from 'react';
import {connectToStores, provideContext} from 'fluxible/addons';
import MessageStore from '../stores/MessageStore';
import messageAction from '../actions/messageAction';
import MessageDisplay from './MessageDisplay';
import ResetButton from './ResetButton';

class HelloMessage extends React.Component {
    static get contextTypes() {
        return {
            getStore: React.PropTypes.func.isRequired,
            executeAction: React.PropTypes.func.isRequired
        };
    }

    constructor(props) {
        super(props);
    }

    reset() {
        this._sendGreeting('');
        this.refs.in.getDOMNode().focus();
    }

    updateModel(event) {
        this._sendGreeting(event.target.value);
    }

    _sendGreeting(greeting) {
        this.context.executeAction(messageAction, greeting);
    }

    render() {
        return (
            <div>
                <input ref="in"
                       onChange={this.updateModel.bind(this)}
                       value={this.props.greeting}/>
                <MessageDisplay message={this.props.greeting + ', World'}/>
                <ResetButton resetHandler={this.reset.bind(this)} />
            </div>);
    }
}

export default provideContext(connectToStores(HelloMessage, [MessageStore], (stores) => {
    return {
        greeting: stores.MessageStore.message
    };
}));