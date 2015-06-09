import React from 'react';
import Form from './Form';

export default class GreetingControllerView extends React.Component {
    render() {
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-4">
                        <div class="jumbotron">
                            <h1>{this.props.greeting}</h1>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
