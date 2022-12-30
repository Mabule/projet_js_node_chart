const express = require('express');
const app = express();
const port = 8080;
const { load, shori } = require('./utils/tools');
const config = require('./env.json');
let datas = undefined;

app.use((_req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000/");
    res.header("Vary", "Origin");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/', (_req, res) => {
    res.send({message: "test"})
})

app.get('/getFile', async (req, res) => {
    if(datas === undefined)
        datas = await load(req.query.file);
    res.send({ datas });
});

app.get('/filterOn', async (req, res) => {
    let executed = [null, null], options = null, status, tab; 
    if(config.files.includes(req.query.file)){
        if(datas === undefined)
            datas = await load(req.query.file);
        [executed, options, status] = shori(datas, req.query.filter, req.query);
    } else {
        status = 0;
    }
    res.send({tab: executed[0], labels: executed[1], options, status});
});

app.get('/get', async (req, res) => {

    const restrict = req.query.restrict;
    if(restrict === undefined)
        res.send("Veuillez saisir une valeur parmi 1 et 2 pour le paramètre \"restrict\"");

    if(datas === undefined)
        datas = await load("deces-2022-m07.txt");
    const date = req.query.date;
    const name = req.query.name !== undefined ? req.query.name.toLocaleUpperCase() : undefined;
    const firstname = req.query.firstname !== undefined ? req.query.firstname.toLocaleUpperCase() : undefined;
    let tab = [];
    let yes;
    datas.forEach(el => {
        yes = false;
        if((date !== undefined && date === el['date de décès']) || (name !== undefined && el.nom.includes(name)) || (firstname !== undefined && el.prenom.includes(firstname)))
            yes = true;
        if(restrict === "1"){
            if(name !== undefined && !el.nom.includes(name) && firstname !== undefined && !el.prenom.split(" ").includes(firstname))
                yes = false
        }
        if(yes)
            tab.push(el);
    })
    res.send(tab);
});

app.listen(port, () => {
    console.log("Écoute sur le port: "+port);
});