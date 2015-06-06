import Fluxible from 'fluxible';
import React from 'react';

import HelloMessage from './components/HelloMessage';
import MessageStore from './stores/MessageStore';
import messageAction from './actions/messageAction';

const app = new Fluxible({
    component: HelloMessage,
    stores: [MessageStore]
});

const context = app.createContext();
const mountNode = document.getElementById('example');
const defaultGreeting = 'Hello';
context.executeAction(messageAction, defaultGreeting, err => {
    React.render(context.createElement(), mountNode);
});
