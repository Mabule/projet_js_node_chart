const fs = require('fs');
const parse = require('./parse');

const load = async(file) => {
    let tab = [];
    console.log("==========\nREADING "+file);
    const readable = fs.createReadStream(file, {encoding: 'utf8'});
    tab = await parse((await readableToString(readable)).split('\n').slice(0,3000));
    
    readable.on('close', () => {
        console.log("File "+file+" readed !")
    });
    return tab;
}

async function readableToString(readable) {
    let result = '';
    for await (const chunk of readable) {
      result += chunk;
    }
    return result;
}

const shori = (tab, filter, query) => {
    let res = [];
    for(let i = 0; i < 150; i++){
        res.push({age: i, nb: 0, lst: []});
    }
    let maxx = 0;
    switch(filter){
        case 'age':
            tab.forEach(el => {
                const born = el['date de naissance'].split('-');
                const death = el['date de décès'].split('-');
                const age = calcAge(born, death);
                try{
                    res[age].nb++;
                    res[age].lst.push(el);
                    if(age > maxx) maxx = age;
                }catch (e) {
                    console.log("error for: "+age)
                    console.log(res)
                    console.log(el)
                    console.log(e)
                }
            })
            res = res.filter(el => el.nb > 0);
            const [result, labels] = treatment(res, maxx, parseInt(query.tranche));
            res = [result, labels];
            break;
        default:
            break;
    }
    return [res, maxx];
}

function calcAge(born, death){
    return new Date(new Date(death[0], death[1], death[2]).getTime() - new Date( born[0], born[1], born[2]).getTime()).getUTCFullYear()-1970;
}

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

const s = (min, maxx) => {
    return min.toString()+" – "+maxx.toString()+" ans";
}

module.exports = { load, shori };
