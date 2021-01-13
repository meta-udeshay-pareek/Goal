var fs = require('fs');
filePath = process.argv[2];
fileBuffer = fs.readFileSync(filePath);
to_string = fileBuffer.toString();
split_lines = to_string.split("\n");
console.log(split_lines.length-1);