import path from 'path';
import fs from 'fs';
import url from 'url';

import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { Provider } from 'react-redux'
import express from 'express';
import { StaticRouter } from 'react-router'
import App from './src/App';
import configureStore from './src/redux/configureStore'

const PORT = process.env.PORT || 3006;
const app = express();

app.get('/', (req, res) => {

    const queryString = url.parse(req.url, true).search;
    const store = configureStore();
    const renderedApp = ReactDOMServer.renderToString(
            <Provider store={store}>
                <App location={{ search: queryString }} />
            </Provider>
    );

    const indexFile = path.resolve('./build/index.html');

    fs.readFile(indexFile, 'utf8', (err, data) => {
        if (err) {
            console.log("Error", err);
            return res.status(500).send("Something went wrong",err);
        }

        return res.send(
            data.replace('<div id="root"></div>', `<div id="root">${renderedApp}</div>`)
        )
    })
})

app.use(express.static('./build'));

app.listen(PORT, () => { console.log(`Listening on Port ${PORT}`) })
