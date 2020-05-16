require('log-timestamp');
const fs = require('fs');
const { spawn } = require('child_process');
const document = './document/memory.md';
const express = require('express')
const http = require('http');
const reload = require('reload');
const path = require('path');
const app = express();
const chokidar = require('chokidar');
const pandocParameters = JSON.parse(fs.readFileSync(__dirname + "/pandoc_parameters.json"));

console.log(`Watching for file changes on ${document}`);
console.log(process.cwd() + "/document");

createPdf().then(() => {
    app.get('/', (req, res) => {
        res.sendFile(path.join(__dirname, './index.html'));
    });
    app.use('/document',express.static(__dirname + '/document'));
    app.use('/js', express.static(__dirname + '/js'));
    app.listen(3000, () => console.log('Server started at localhost:3000'));
    let server = http.createServer(app);
    let reloadServer = reload(app);
    const chokidarProperties = {
        ignored: [
            "./document/book.pdf",
            "./node_modules/"
        ]
    }
    chokidar.watch('.', chokidarProperties).on('change', (event, path) => {
        console.log(`Change detected`);
        createPdf().then(() => {
            reloadServer.reload();
        }).catch((error) => {
            console.log(error);
        });
    });
});

function createCommand() {
    let command = [pandocParameters.input];
    for(parameter of pandocParameters.parameters) {
        command.push(parameter.argName);
        let argValue = parameter.argValue;
        if(argValue !== undefined) {
            command.push(argValue);
        }
    }
    command.push("-o", pandocParameters.output);
    return command;
}

function createPdf() {return new Promise((resolve, reject) => {
    console.log(createCommand());
    const command = spawn('pandoc', createCommand(), {
        cwd: process.cwd() + "/document"
    });

    command.stdout.on('data', (data) => {
        console.log(`${data}`);
    });

    command.stderr.on('data', (data) => {
        console.log(`${data}`);
    })

    command.on('error', (err) => {
        console.log('Failed to start markdown compilation.');
        console.log(err);
        reject(err);
    });

    command.on('close', () => {
        console.log("Created Pdf");
        resolve();
    })
})};