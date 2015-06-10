import Fluxible from 'fluxible';
import React from 'react';
import Hapi from 'hapi';
import Joi from 'joi';
import Good from 'good';
import Path from 'path';
import serialize from 'serialize-javascript';

import HtmlComponent from './components/Html';
const htmlComponent = React.createFactory(HtmlComponent);

import messageAction from './actions/messageAction';
import app from './app';

import persistenceService from './services/persistenceService';

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
        // Bootstrap
        const context = app.createContext();
        context.executeAction(messageAction, 'Hello', err => {
            const exposed = 'window.dehydratedState=' + serialize(app.dehydrate(context)) + ';';
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

// curl -X POST -H "Content-Type: application/json" -d '{"greeting": "Test of API"}' http://localhost:8080/api/greeting

server.route({
    method: 'POST',
    path: '/api/greeting',
    handler: (request, reply) => {
        const greeting = request.payload.greeting;
        console.log(`Storing greeting: ${greeting}`);
        persistenceService.save(greeting, (err, greetingObj) => {
            const id = greetingObj._id;
            const response = reply(id);
            response.type('application/json');
        });
    },
    config: {
        validate: {
            payload: {
                greeting: Joi.string().min(1)
            }
        }
    }
});

// curl http://localhost:8080/api/greeting/{id}
// e.g.
// curl http://localhost:8080/api/greeting/55772814229fc020bf443272

server.route({
    method: 'GET',
    path: '/api/greeting/{id}',
    handler: (request, reply) => {
        const id = request.params.id;
        persistenceService.load(id, (err, greetingObjs) => {
            if (greetingObjs && greetingObjs.length) {
                const greetingObj = greetingObjs[0];
                const greeting = greetingObj.greeting;
                const response = reply(greeting);
                response.type('application/json');
            } else {
                const response = reply(`Invalid id ${id}`);
                response.code(404);
            }
        });
    },
    config: {
        validate: {
            params: {
                id: Joi.string().min(1)
            }
        }
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
