'use strict';
class TestHelper {
    static findElementByCssSelector(cssSelector) {
        let element = document.querySelector(cssSelector);
        if (element === null)
            return null;
        let elementId = TestHelper.createGuid();
        this._elementsById.set(elementId, element);
        return elementId;
    }
    static getElementInfo(elementId) {
        let element = this._elementsById.get(elementId);
        if (!element)
            return null;
        let isInPage = document.body.contains(element);
        if (isInPage === false) {
            this._elementsById.delete(elementId);
            return null;
        }
        var bound = element.getBoundingClientRect();
        let result = {
            TagName: element.tagName,
            Enabled: element.disabled !== true,
            Selected: element.checked === true,
            LocationX: bound.left,
            LocationY: bound.top,
            SizeWidth: bound.width,
            SizeHeight: bound.height,
            Displayed: !(bound.width === 0 && bound.height === 0)
        };
        return result;
    }
    static getText(elementId) {
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
    static clickElement(elementId) {
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
    static setActiveElement(elementId) {
        try {
            let element = this._elementsById.get(elementId);
            if (!element)
                return false;
            element.focus();
            return true;
        }
        catch (ex) {
            console.log('Exception in setActiveElement()', ex);
            return false;
        }
    }
    static createGuid() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            let r = Math.random() * 16 | 0;
            let v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }
}
TestHelper._elementsById = new Map();
window['__TestHelper'] = TestHelper;
