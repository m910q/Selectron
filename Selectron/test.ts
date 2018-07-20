'use strict';

class Test {
    private _loading = true;
    private _loadingQueue: Array<{ resolve: () => void, reject: () => void }> = [];

    private static _parentElement: HTMLElement;
    private static _unusedWebviewsCount = 8;
    private static _unusedWebviewsIndex = 8;
    private static _unusedWebviews: HTMLWebviewElement[] = new Array(Test._unusedWebviewsCount);

    private _id: string;
    public get id(): string { return this._id; }

    private _webview: HTMLWebviewElement;
    //public get webview(): HTMLWebviewElement { return this._webview; }

    constructor(parentElement: HTMLElement) {
        this._id = Test.createGuid();
        this._webview = <HTMLWebviewElement>document.createElement('webview');
        //this._webview.addEventListener('console-message', e => { console.log('Test console msg: ', e.message) });
        this._webview.setAttribute('preload', './preload.js');
        this._webview.setAttribute('partition', this._id);
        this._webview.addEventListener('did-finish-load', () => this.setLoadingState(false))
        this._webview.addEventListener('did-fail-load', () => this.setLoadingState(false))
        this._webview.addEventListener('load-commit', () => this.setLoadingState(true))
        parentElement.appendChild(this._webview);
    }

    private setLoadingState = (loading: boolean) => {
        this._loading = loading;
        if (loading === false) {
            while (this._loadingQueue.length !== 0) {
                let item = this._loadingQueue.pop();
                item.resolve();
            }
        }
    }

    public dispose(): void {
        this._webview.remove();
        this._webview = null;
    }

    public runRequestCommandAsync(request: IRequest): Promise<any> {
        switch (request.Command) {
            case 'go-to-url':
                return this.runGoToUrlAsync(<GoToUrlRequest><any>request);
            case 'find-element':
                return this.runFindElementAsync(<FindElementRequest><any>request);
            case 'element-info':
                return this.runElementInfoAsync(<ElementInfoRequest><any>request);
            case 'get-text':
                return this.getTextAsync(<GetTextRequest><any>request);
            case 'click-element':
                return this.clickElementAsync(<ClickElementRequest><any>request);
            case 'send-keys':
                return this.sendKeysAsync(<SendKeysRequest><any>request);
        }

        return Promise.resolve({});
    }

    private runGoToUrlAsync(request: GoToUrlRequest): Promise<any> {
        this._webview.src = request.Url;
        return Promise.resolve(new GoToUrlResponse());
    }

    private runFindElementAsync(request: FindElementRequest): Promise<FindElementResponse> {
        return this.creatWaitForLoadPromise().then(() => {
            return new Promise((resolve, reject) => {
                this._webview.executeJavaScript('window.__TestHelper.findElementByCssSelector("' + request.CssSelector + '")', false, (elementId: string) => {
                    let response = new FindElementResponse();
                    response.ElementId = elementId;
                    resolve(response);
                });
            });
        });
    }

    private runElementInfoAsync(request: ElementInfoRequest): Promise<ElementInfoResponse> {
        return this.creatWaitForLoadPromise().then(() => {
            return new Promise((resolve, reject) => {
                this._webview.executeJavaScript('window.__TestHelper.getElementInfo("' + request.ElementId + '")', false, (elementInfo: MyElementInfo) => {
                    let response = new ElementInfoResponse();
                    response.ElementInfo = elementInfo;
                    resolve(response);
                });
            });
        });
    }

    private getTextAsync(request: GetTextRequest): Promise<GetTextResponse> {
        return this.creatWaitForLoadPromise().then(() => {
            return new Promise((resolve, reject) => {
                this._webview.executeJavaScript('window.__TestHelper.getText("' + request.ElementId + '")', false, (text: string) => {
                    let response = new GetTextResponse(text);
                    resolve(response);
                });
            });
        });
    }

    private clickElementAsync(request: ClickElementRequest): Promise<ClickElementResponse> {
        return this.creatWaitForLoadPromise().then(() => {
            return new Promise((resolve, reject) => {
                this._webview.executeJavaScript('window.__TestHelper.clickElement("' + request.ElementId + '")', false, (success: boolean) => {
                    let response = new ClickElementResponse(success === true);
                    resolve(response);
                });
            });
        });
    }

    private sendKeysAsync(request: SendKeysRequest): Promise<SendKeysResponse> {
        return this.creatWaitForLoadPromise().then(() => {
            return new Promise((resolve, reject) => {
                this._webview.executeJavaScript('window.__TestHelper.setActiveElement("' + request.ElementId + '")', false, (success: boolean) => {
                    if (success === true) {
                        let webContents = this._webview.getWebContents();
                        for(let i = 0; i < request.Keys.length; i++) {
                            webContents.sendInputEvent({ type: 'char', keyCode: request.Keys[i] });
                        }
                        let response = new SendKeysResponse(true);
                        setTimeout(() => { resolve(response); }, 10);
                        //resolve(response);
                    }
                    else {
                        let response = new SendKeysResponse(false);
                        reject(response);
                    }
                });
            });
        });
    }

    private creatWaitForLoadPromise() {
        return new Promise((resolve, reject) => {
            if (this._loading)
                this._loadingQueue.push({ resolve: resolve, reject: reject });
            else
                resolve();
        });
    }

    private static createGuid() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            let r = Math.random()*16|0;
            let v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

}