const express = require('express');
const app = express();
const port = 8080;
const { load, shori } = require('./utils/tools');
const config = require('./env.json');

app.use((_req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Vary", "Origin");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/', (_req, res) => {
  res.send({message: "test"})
})

app.get('/getFile', async (req, res) => {
    const message = await load(req.query.file);
    res.send({ message });
});

app.get('/filterOn', async (req, res) => {
    let executed = [null, null], options = null, status, tab; 
    if(config.files.includes(req.query.file)){
        tab = await load(req.query.file);
        [executed, options, status] = shori(tab, req.query.filter, req.query);
    } else {
        status = 0;
    }
    res.send({tab: executed[0], labels: executed[1], options, status});
});

app.listen(port, () => {
    console.log("Écoute sur le port: "+port);
});