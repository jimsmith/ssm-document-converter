#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const untildify = require('untildify'); 
const argv = require('minimist')(process.argv.slice(2));


//console.dir(argv)

let validArgs = true;
let input;
let output;
if (argv.h || argv.help) {
    console.log(`
Usage: ssm-convert [options]

Converts AWS SSM document exported string from CLI to JSON
    
Options:
  -h, --help        output usage information
  -i, --input       input file
  -o, --output      output file
    `);
    return;
}
if (!argv.i && !argv.input) {
    console.error("Missing Required Input -i || --input");
    validArgs = false;
} else {
    input = argv.i || argv.input;
    input = path.normalize(untildify(input));
}
if (!argv.o && !argv.output) {
    console.error("Missing Required Output -i || --output");
    validArgs = false;
} else {
    output = argv.o || argv.output;
    output = path.normalize(untildify(output));
}
if (!fs.existsSync(input)) {
    console.error(`Input file is not found: ${input}`);
    validArgs = false;
}
if (fs.existsSync(output)){
    console.info(`Output file exist attempting to overwrite: ${output}`)
    try {
        fs.accessSync(output, fs.constants.W_OK);
    } catch (e) {
        console.error(`Output file is not writable: ${output}`)
        validArgs = false;
    }
} else {
    try {
        const filepath = path.dirname(output)
        fs.accessSync(filepath, fs.constants.W_OK);
    } catch (e) {
        console.error(`Output directory is not writable: ${filepath}`)
        validArgs = false;
    }
}
let parsedInput;
let content;
try {
    parsedInput = JSON.parse(fs.readFileSync(input));
} catch (e) {
    console.error("Could not parse input");
    validArgs= false;
}
try {
    content = parsedInput.Content  
} catch (e) {
    console.error("Input does not contain a \"Content\" property");
    validArgs = false;
}


if (validArgs) {
    console.log(`Converting ${input} to ${output}`)
    fs.writeFileSync(output, content, 'utf8')
}
