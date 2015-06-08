import React from 'react';
import {connectToStores, provideContext} from 'fluxible/addons';

import Form from './Form';
import Preview from './Preview';

import MessageStore from '../../stores/MessageStore';
import messageAction from '../../actions/messageAction';

class HomeControllerView extends React.Component {
    static get contextTypes() {
        return {
            getStore: React.PropTypes.func.isRequired,
            executeAction: React.PropTypes.func.isRequired
        };
    }

    reset() {
        this._sendGreeting('');
        this.refs.inputForm.focus();
    }

    updateModel(event) {
        this._sendGreeting(event.target.value);
    }

    _sendGreeting(greeting) {
        this.context.executeAction(messageAction, greeting);
    }

    render() {
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-4">
                        <Form ref="inputForm"
                              greeting={this.props.greeting}
                              resetHandler={::this.reset}
                              updateHandler={::this.updateModel} />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-4">
                        <hr />
                        <Preview greeting={this.props.greeting}
                                 link={this.props.link}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default provideContext(connectToStores(HomeControllerView, [MessageStore], (stores) => {
    return {
        greeting: stores.MessageStore.message,
        link: stores.MessageStore.link
    };
}));