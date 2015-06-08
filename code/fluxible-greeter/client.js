import React from 'react';
import app from './app';

app.rehydrate(window.dehydratedState, function (err, context) {
    if (err) {
        throw err;
    }
    const mountNode = document.getElementById('app');
    React.render(context.createElement(), mountNode, function () {
        console.log('React Rendered');
    });
});
