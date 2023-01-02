const express = require('express');
const cors = require('cors');

const config = require('./env.json');
const { load, shori } = require('./utils/tools');

const app = express();
const port = 8080;
let datas = undefined;

//Protection vis-à-vis de la source de la requête
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

//Route primaire de test
app.get('/', (_req, res) => {
    res.send({message: "test"})
})

//Route pour afficher le temps de lecture du fichier suivant un certain nombre de ligne
app.get('/read', async (req, res) => {
    const time = await load(req.query.file, req.query.size);
    res.send(`Pour lire ${req.query.size} lignes l'algorithme a mit ${time}ms, soit ${time/req.query.size}µs par ligne`);
});

//Route pour charger les données
app.get('/getFile', async (req, res) => {
    if(datas === undefined)
        datas = await load(req.query.file);
    res.send({ datas });
});

//Route principale pour toutes les requêtes de l'application | sécurisation de la requête via un status de retour
app.get('/filterOn', async (req, res) => {
    let executed = [null, null], options = null, status; 
    if(config.files.includes(req.query.file)){
        if(datas === undefined)
            datas = await load(req.query.file);
        [executed, options, status] = shori(datas, req.query.filter, req.query);
    } else {
        status = 0;
    }
    res.send({tab: executed[0], labels: executed[1], options, status});
});

//Route en cours de développement afin de chercher un individu précis en fonction de son : nom, prénom et/ou date de décès
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

//Ouverture du port à l'écoute des requêtes
app.listen(port, () => {
    console.log("Écoute sur le port: "+port);
});