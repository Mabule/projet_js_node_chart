const fs = require('fs');

try {
  const data = fs.readFileSync('./README.md', 'utf8');
  let str = "<!DOCTYPE html><html lang=\"fr\"><head><link type=\"text/css\" rel=\"stylesheet\" href=\"./README.css\"></head><body>";
  data.split('\n').forEach(line => {
    if(line.startsWith('#')){
        str += "<h1>"+line.replaceAll('#', '')+"</h1>";
    }
    else if(line.startsWith('##')){
        str += "<h2>"+line.replaceAll('#', '')+"</h2>";
    }
    else if(line.startsWith('###')){
        str += "<h3>"+line.replaceAll('#', '')+"</h3>";
    }
    else{
        str += line;
    }
  });
  str += "</body></html>";
  fs.writeFileSync('./README.html', str);
} catch (err) {
  console.error(err);
}