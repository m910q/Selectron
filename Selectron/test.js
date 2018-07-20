'use strict';
class Test {
    //public get webview(): HTMLWebviewElement { return this._webview; }
    constructor(parentElement) {
        this._loading = true;
        this._loadingQueue = [];
        this.setLoadingState = (loading) => {
            this._loading = loading;
            if (loading === false) {
                while (this._loadingQueue.length !== 0) {
                    let item = this._loadingQueue.pop();
                    item.resolve();
                }
            }
        };
        this._id = Test.createGuid();
        this._webview = document.createElement('webview');
        //this._webview.addEventListener('console-message', e => { console.log('Test console msg: ', e.message) });
        this._webview.setAttribute('preload', './preload.js');
        this._webview.setAttribute('partition', this._id);
        this._webview.addEventListener('did-finish-load', () => this.setLoadingState(false));
        this._webview.addEventListener('did-fail-load', () => this.setLoadingState(false));
        this._webview.addEventListener('load-commit', () => this.setLoadingState(true));
        parentElement.appendChild(this._webview);
    }
    get id() { return this._id; }
    dispose() {
        this._webview.remove();
        this._webview = null;
    }
    runRequestCommandAsync(request) {
        switch (request.Command) {
            case 'go-to-url':
                return this.runGoToUrlAsync(request);
            case 'find-element':
                return this.runFindElementAsync(request);
            case 'element-info':
                return this.runElementInfoAsync(request);
            case 'get-text':
                return this.getTextAsync(request);
            case 'click-element':
                return this.clickElementAsync(request);
            case 'send-keys':
                return this.sendKeysAsync(request);
        }
        return Promise.resolve({});
    }
    runGoToUrlAsync(request) {
        this._webview.src = request.Url;
        return Promise.resolve(new GoToUrlResponse());
    }
    runFindElementAsync(request) {
        return this.creatWaitForLoadPromise().then(() => {
            return new Promise((resolve, reject) => {
                this._webview.executeJavaScript('window.__TestHelper.findElementByCssSelector("' + request.CssSelector + '")', false, (elementId) => {
                    let response = new FindElementResponse();
                    response.ElementId = elementId;
                    resolve(response);
                });
            });
        });
    }
    runElementInfoAsync(request) {
        return this.creatWaitForLoadPromise().then(() => {
            return new Promise((resolve, reject) => {
                this._webview.executeJavaScript('window.__TestHelper.getElementInfo("' + request.ElementId + '")', false, (elementInfo) => {
                    let response = new ElementInfoResponse();
                    response.ElementInfo = elementInfo;
                    resolve(response);
                });
            });
        });
    }
    getTextAsync(request) {
        return this.creatWaitForLoadPromise().then(() => {
            return new Promise((resolve, reject) => {
                this._webview.executeJavaScript('window.__TestHelper.getText("' + request.ElementId + '")', false, (text) => {
                    let response = new GetTextResponse(text);
                    resolve(response);
                });
            });
        });
    }
    clickElementAsync(request) {
        return this.creatWaitForLoadPromise().then(() => {
            return new Promise((resolve, reject) => {
                this._webview.executeJavaScript('window.__TestHelper.clickElement("' + request.ElementId + '")', false, (success) => {
                    let response = new ClickElementResponse(success === true);
                    resolve(response);
                });
            });
        });
    }
    sendKeysAsync(request) {
        return this.creatWaitForLoadPromise().then(() => {
            return new Promise((resolve, reject) => {
                this._webview.executeJavaScript('window.__TestHelper.setActiveElement("' + request.ElementId + '")', false, (success) => {
                    if (success === true) {
                        let webContents = this._webview.getWebContents();
                        for (let i = 0; i < request.Keys.length; i++) {
                            webContents.sendInputEvent({ type: 'char', keyCode: request.Keys[i] });
                        }
                        let response = new SendKeysResponse(true);
                        setTimeout(() => { resolve(response); }, 10);
                    }
                    else {
                        let response = new SendKeysResponse(false);
                        reject(response);
                    }
                });
            });
        });
    }
    creatWaitForLoadPromise() {
        return new Promise((resolve, reject) => {
            if (this._loading)
                this._loadingQueue.push({ resolve: resolve, reject: reject });
            else
                resolve();
        });
    }
    static createGuid() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            let r = Math.random() * 16 | 0;
            let v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }
}
Test._unusedWebviewsCount = 8;
Test._unusedWebviewsIndex = 8;
Test._unusedWebviews = new Array(Test._unusedWebviewsCount);
