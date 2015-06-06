import Fluxible from 'fluxible';
import React from 'react';
import Hapi from 'hapi';
import Good from 'good';
import Path from 'path';
import serialize from 'serialize-javascript';

import HelloMessage from './components/HelloMessage';
import HtmlComponent from './components/Html';
const htmlComponent = React.createFactory(HtmlComponent);

import MessageStore from './stores/MessageStore';

import messageAction from './actions/messageAction';

const server = new Hapi.Server();
server.connection({port: 8080});

server.route({
    method: 'GET',
    path: '/public/{param*}',
    handler: {
        directory: {
            path: 'build'
        }
    }
});

server.route({
    method: 'GET',
    path: '/',
    handler: (request, reply) => {
        const app = new Fluxible({
            component: HelloMessage,
            stores: [MessageStore]
        });
        // Bootstrap
        const context = app.createContext();
        context.executeAction(messageAction, 'Hello', err => {
            const exposed = 'window.App=' + serialize(app.dehydrate(context)) + ';';
            const message = React.renderToString(context.createElement());
            const html = React.renderToStaticMarkup(htmlComponent({
                context: context.getComponentContext(),
                state: exposed,
                markup: message
            }));

            const response = reply(html);
            response.type('text/html');
        });
    }
});

server.register({
    register: Good,
    options: {
        reporters: [{
            reporter: require('good-console'),
            events: {
                response: '*',
                log: '*'
            }
        }]
    }
}, err => {
    if (err) {
        throw err; // something bad happened loading the plugin
    }

    server.start(() => server.log('info', 'Server running at: ' + server.info.uri));
});
