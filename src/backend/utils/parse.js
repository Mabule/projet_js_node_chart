const parse = async (data) => {
    let tab = [];
    // const s = data.split('\n');
    let i = 0;
    for (const index in data) {
        const j = i;
        new Promise((resolve, reject) => {
            // console.log("thread: "+j);
            let p = false;
            if(data[index].replace(/\s/g, '').length === 0) p = true;
            const res = process(data[index]);
            resolve({pass: p, res: res});
            reject(res);
        }).then(res => {
            if(!res.pass)
                tab.push(res.res);
        })
        .catch(err => {
            console.log(err);
        })
        i++;
    }
    return tab;
}

function process(line = ""){
    const nom = line.split('*')[0];
    const prenom = line.split('*')[1].split('/')[0];
    const sexe = line.slice(81, 82);
    const naissance = line.slice(81,85)+"-"+line.slice(85, 87)+"-"+line.slice(87, 89);
    const naissance_place = line.slice(89, 94);
    const ville = line.slice(94,124);
    let land = line.slice(124, 154);
    if(land.replace(/\s/g, '').length === 0) land = "France";
    const death = line.slice(154,158)+"-"+line.slice(158,160)+"-"+line.slice(160,162);
    const death_place = line.slice(162, 168);
    return {
    'nom': nom,
    'prenom': prenom,
    'sexe': sexe,
    'date de naissance': naissance,
    'code lieu de naissance': naissance_place,
    'ville': ville.replace(/\s/g, ''),
    'pays': land.replace(/\s/g, ''),
    'date de décès': death,
    'code lieu de décès': death_place
    };
}

module.exports = parse;