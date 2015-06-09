import React from 'react';

export default class Preview extends React.Component {
    render() {
        const link = this.props.link ? <p>Link: <a target="_blank" href={this.props.link}>{this.props.link}</a></p> : null;

        return (
            <div>
                <p>Preview:</p>
                <div className="jumbotron">
                    <p>{this.props.greeting}</p>
                </div>
                {link}
            </div>
        );
    }
}
