import React from 'react';

export default class Form extends React.Component {
    focus() {
        React.findDOMNode(this.refs.in).focus();
    }
    _handleSubmit(event) {
        event.preventDefault(); // we do not want it to submit to server
        this.props.submitHandler();
    }
    render() {
        return (
            <form onSubmit={::this._handleSubmit}>
                <div className="form-group">
                    <label htmlFor="greeting">Please enter your greeting</label>
                    <input ref="in"
                           className="form-control"
                           name="greeting"
                           placeholder="Enter Greeting"
                           value={this.props.greeting}
                           onChange={this.props.updateHandler}
                        />
                </div>
                <a className="btn btn-default" onClick={this.props.resetHandler}>Clear</a>
                <input type="submit" className="btn btn-success send" value="Send" disabled={!this.props.canSubmit} />
            </form>
        );
    }
}
