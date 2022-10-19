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

const shori = (tab, filter) => {
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
                }
            })
            break;
        default:
            break;
    }
    res = res.filter(el => el.nb > 0)
    return [res, maxx];
}

function calcAge(born, death){
    return new Date(new Date(death[0], death[1], death[2]).getTime() - new Date( born[0], born[1], born[2]).getTime()).getUTCFullYear()-1970;
}

module.exports = { load, shori };
