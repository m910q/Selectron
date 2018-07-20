'use strict';

class TestHelper  {
    private static _elementsById: Map<string, Element> = new Map();

    public static findElementByCssSelector(cssSelector: string): string {
        let element = document.querySelector(cssSelector);

        if (element === null)
            return null;

        let elementId = TestHelper.createGuid();
        this._elementsById.set(elementId, element);
        return elementId;
    }

    public static getElementInfo(elementId: string): MyElementInfo {
        let element = this._elementsById.get(elementId);
        if (!element)
            return null;

        let isInPage = document.body.contains(element);
        if (isInPage === false) {
            this._elementsById.delete(elementId);
            return null;
        }

        var bound = element.getBoundingClientRect();

        let result: MyElementInfo = {
            TagName: element.tagName,
            Enabled: (<any>element).disabled !== true,
            Selected: (<any>element).checked === true,
            LocationX: bound.left,
            LocationY: bound.top,
            SizeWidth: bound.width,
            SizeHeight: bound.height,
            Displayed: !(bound.width === 0 && bound.height === 0)
        }
        return result;
    }

    public static getText(elementId: string): string {
        let element = this._elementsById.get(elementId);
        if (!element)
            return null;

        let isInPage = document.body.contains(element);
        if (isInPage === false) {
            this._elementsById.delete(elementId);
            return null;
        }

        return element.textContent;
    }

    public static clickElement(elementId: string): boolean {
        try {
            let element = this._elementsById.get(elementId);
            if (!element)
                return false;

            var clickEvent = new MouseEvent("click", {
                "view": window,
                "bubbles": true,
                "cancelable": false
            });

            element.dispatchEvent(clickEvent);
            return true;
        }
        catch (ex) {
            console.log('Exception in clickElement()', ex);
            return false;
        }
    }

    public static setActiveElement(elementId: string): boolean {
        try {
            let element = this._elementsById.get(elementId);
            if (!element)
                return false;

            (<any>element).focus();
            return true;
        }
        catch (ex) {
            console.log('Exception in setActiveElement()', ex);
            return false;
        }
    }

    private static createGuid() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            let r = Math.random()*16|0;
            let v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }
}
window['__TestHelper'] = TestHelper;