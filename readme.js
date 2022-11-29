const fs = require('fs');

try {
  const data = fs.readFileSync('./tmp.txt', 'utf8');
  let prev = '';
  const mar = {
    'h1': '0px',
    'h2': '50px',
    'h3': '100px',
    'h4': '150px',
    'h5': '200px',
    'h6': '250px',
  }
  let open = false;
  let str = "<!DOCTYPE html><html lang=\"fr\"><head><link type=\"text/css\" rel=\"stylesheet\" href=\"./README.css\"></head><body>";
  data.split('\n').forEach(line => {
    line = line.trim()
    if(line[0] === '#' && (line[1] !== '#' && line[1] !== '\\')){
      if(open) {str += "</div>"; open = false;}
        str += "<h1>"+line.replaceAll('#', '')+"</h1>";
        prev = 'h1';
    }
    else if(line.slice(0, 2) ==='##' && line[2] !== '#'){
      if(open) {str += "</div>"; open = false;}
        str += "<h2>"+line.replaceAll('#', '')+"</h2>";
        prev = 'h2';
    }
    else if(line.slice(0, 3) ==='###' && line[3] !== '#'){
      if(open) {str += "</div>"; open = false;}
        str += "<h3>"+line.replaceAll('#', '')+"</h3>";
        prev = 'h3';
    }
    else {
      if(line[0] === '#'){
        if(open) {str += "</div>"; open = false;}
        str += "<i style=\"margin-left: "+mar[prev]+"\">"+line.slice(2, line.length)+"</i>"
      }else
        if(line.match(/\s/g)){
        if(open)
          str += line+"<br>";
        else
          str += "<div class=\"txt\" style=\"margin-left: "+mar[prev]+"\">"+line+"<br>";
          open = true;
        }
    }
  });
  str += "</body></html>";
  fs.writeFileSync('./README.html', str);
} catch (err) {
  console.error(err);
}