const fs = require('fs');

const parse = require('./parse');
const config = require('../env.json');

//Fonction pour lire un fichier
async function load(file, size = null){
    let tab = [];
    console.log("==========\nREADING "+file);
    const readable = fs.createReadStream(file, {encoding: 'utf8'});
    let start = new Date().getTime();
    if(size !== null)
        tab = await parse((await readableToString(readable)).split('\n').slice(0, size));
    else
        tab = await parse((await readableToString(readable)).split('\n'));
    
    readable.on('close', () => {
        console.log("File "+file+" readed !")
    });

    if(size !== null)
        return (new Date().getTime()-start);
    else
        return tab;
}

//Fonction pour transformer un chunk en string
async function readableToString(readable) {
    let result = '';
    for await (const chunk of readable) {
      result += chunk;
    }
    return result;
}

//Fonction de mappage entre les requêtes et le traitement associé
function shori(tab, filter, query){
    let res = [];
    let options;
    let status = 1;
    if(config.filters.includes(filter)){
        switch(filter){
            case 'age':
                for(let i = 0; i < 150; i++){
                    res.push({age: i, nb: 0, lst: []});
                }
                if(config.slices.includes(parseInt(query.tranche)))
                    res = ageFilter(tab, res, query);
                else
                    status = 0;
                options = opt("Nombre de mort par tranche d'âge");
                break;
            case 'country':
                res = countryFilter(tab);
                options = opt("Nombre de mort français par pays");
                break;
            case 'date':
                res = dateFilter(tab, query);
                options = opt("Nombre de mort par date");
                break;
            default:
                break;
        }
    } else {
        status = 0;
    }
    
    return [res, options, status];
}

//Fonction pour le traitement suivant la tranche d'âge
function ageFilter(tab, res, query){
    let maxx = 0;
    tab.forEach(el => {
        const born = el['date de naissance'].split('-');
        const death = el['date de décès'].split('-');
        const age = calcAge(born, death);
        try{
            res[age].nb++;
            res[age].lst.push(el);
            if(age > maxx) maxx = age;
        }catch (e) {
            // console.log("error for: "+age);
        }
    })
    res = res.filter(el => el.nb > 0);
    return treatment(res, maxx, parseInt(query.tranche));
}

//Fonction pour le traitement suivant le pays de mort
function countryFilter(tab){
    let countries = [], nb_people = [], i = 0, max = 0, index_max;
    tab.forEach(el => {
        if(!countries.includes(el.pays)){
            countries.push(el.pays);
            nb_people.push(1);
        } else {
            let index = countries.indexOf(el.pays);
            nb_people[index]++;
            if(nb_people[index] > max){
                max = nb_people[index];
                index_max = index;
            }
        }
        i++;
    });
    if(max >= i*0.5){
        countries.splice(index_max, index_max+1);
        nb_people.splice(index_max, index_max+1);
    }
    return [nb_people, countries];
}

//Fonction pour le traitement suivant la date de mort
function dateFilter(tab){
    let dates = [];
    let nb_people = [];
    tab.sort((a,b) => new Date(a['date de décès']).getTime() - new Date(b['date de décès']).getTime());
    tab.forEach(el => {
        if(new Date(el['date de décès']) > new Date("2022-03-31")){
            let date = new Date(el['date de décès']).toLocaleDateString('fr-FR');
            if(dates.includes(date)){
                let index = dates.indexOf(date);
                nb_people[index]++;
            } else {
                dates.push(date);
                nb_people.push(1);
            }
        }
    })

    return [nb_people, dates];
}

//Fonction de calcul d'âge
function calcAge(born, death){
    return new Date(new Date(death[0], death[1], death[2]).getTime() - new Date( born[0], born[1], born[2]).getTime()).getUTCFullYear()-1970;
}

//Fonction en lien avec le traitement suivant la tranche d'âge
function treatment(tab, maxx, tranche){
    let res = [], labels = [];
    let nb_colonne = Math.ceil(maxx/tranche);
    let min = 0, top = tranche-1, count = 0;
    labels.push(s(min, top));
    let tmp_tab = [];
    if(tranche === 1)
        tmp_tab = tab.filter(el => (el.age === min));
    else
        tmp_tab = tab.filter(el => (el.age >= min && el.age < top));
    tmp_tab.forEach(el => {
        count += el.nb;
    });
    res.push(count);
    for(let i = 1; i < nb_colonne; i++) {
        min = i*tranche;
        top = min+tranche-1;
        labels.push(s(min, top));
        if(tranche === 1)
            tmp_tab = tab.filter(el => (el.age === min));
        else
            tmp_tab = tab.filter(el => ((el.age >= min && el.age < top) || (i === nb_colonne-1 && el.age >= min)));
        count = 0;
        tmp_tab.forEach(el => {
            count += el.nb;
        });
        res.push(count);
    }
    return [res, labels];
}

//Fonction pour formatter une chaîne de caractère
function s(min, maxx){
    return min.toString()+" – "+maxx.toString()+" ans";
}

//Fonction renvoyant les options pour construire le graphique avec ChartJs
function opt(titre){
    return {
        type: 'bar',
        indexAxis: 'x',
        elements: {
            bar: {
                borderWidth: 3,
                fill: true
            }
        },
        responsive: true,
        stacked: false,
        plugins: {
            title: {
                text: titre,
                display: true
            },
            legend: {
                position: 'bottom',
                display: true
            }
        }
    }
}

module.exports = { load, shori };
