const express = require('express');
const app = express();
const port = 8080;
const { load, shori } = require('./utils/tools');

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Vary", "Origin");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/', (req, res) => {
  res.send({message: "oui"})
})

app.get('/getFile', async (req, res) => {
    const tab = await load(req.query.file);
    res.send({message: tab});
});

app.get('/filterOn', async (req, res) => {
    const tab = await load(req.query.file);
    const [executed, maxx] = shori(tab, req.query.filter);
    res.send({message: executed, max: maxx});
});

app.listen(port, () => {
    console.log("Écoute sur le port: "+port);
});