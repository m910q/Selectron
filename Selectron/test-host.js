'use strict';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
/// <reference path="node.d.ts" />
/// <reference path="electron.d.ts" />
const { remote } = require('electron');
const { ipcRenderer } = require('electron');
ipcRenderer.setMaxListeners(0);
const hostWindow = remote.getCurrentWindow();
const { Menu, MenuItem } = remote;
const webviews = document.getElementById('webviews');
const testById = new Map();
const http = require('http');
//const fs = require('fs');
function createTest() {
    let test = new Test(webviews);
    testById.set(test.id, test);
    return test;
}
//addTest('https://m910q.net/content/v.html');
//addTest('https://m910q.net/content/v.html');
function startServer() {
    const hostname = '127.0.0.1';
    const port = 4480;
    const debug = false;
    const server = http.createServer((req, res) => {
        if (req.method !== 'POST') {
            res.end('{}');
            return;
        }
        let bodyChunks = [];
        req.on('data', (chunk) => {
            bodyChunks.push(chunk);
        }).on('end', () => __awaiter(this, void 0, void 0, function* () {
            let body = Buffer.concat(bodyChunks).toString();
            let requestObj = JSON.parse(body);
            if (debug)
                console.log('Request: ', body);
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            if (requestObj.Command === 'create-session') {
                let test = createTest();
                let response = new CreateSessionResponse(test.id);
                let responseString = JSON.stringify(response);
                if (debug)
                    console.log('Response', responseString);
                res.end(responseString);
                return;
            }
            else if (requestObj.Command === 'delete-session') {
                if (testById.has(requestObj.SessionId)) {
                    let test = testById.get(requestObj.SessionId);
                    testById.delete(requestObj.SessionId);
                    try {
                        test.dispose();
                    }
                    catch (ex) {
                        if (debug)
                            console.log('Error when dispoing test: ', ex);
                    }
                }
                let response = new DeleteSessionResponse();
                let responseString = JSON.stringify(response);
                if (debug)
                    console.log('Response', responseString);
                res.end(responseString);
                return;
            }
            if (testById.has(requestObj.SessionId)) {
                let test = testById.get(requestObj.SessionId);
                let response = yield test.runRequestCommandAsync(requestObj);
                let responseString = JSON.stringify(response);
                if (debug)
                    console.log('Response', responseString);
                res.end(responseString);
                return;
            }
            if (debug)
                console.log('Response: {}', 'Test not found');
            res.end('{}');
        }));
    });
    server.listen(port, hostname, () => {
        console.log(`Server running at http://${hostname}:${port}/`);
    });
}
startServer();
