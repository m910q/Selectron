'use strict';
class CreateSessionResponse {
    constructor(sessionId) {
        this.Command = 'create-session';
        this.SessionId = sessionId;
    }
}
class DeleteSessionResponse {
    constructor() {
        this.Command = 'delete-session';
    }
}
class GoToUrlResponse {
    constructor() {
        this.Command = 'go-to-url';
    }
}
class FindElementResponse {
    constructor() {
        this.Command = 'find-element';
    }
}
class ElementInfoResponse {
    constructor() {
        this.Command = 'element-info';
    }
}
class ClickElementResponse {
    constructor(success) {
        this.Command = 'click-element';
        this.Success = success;
    }
}
class SendKeysResponse {
    constructor(success) {
        this.Command = 'send-keys';
        this.Success = success;
    }
}
class GetTextResponse {
    constructor(text) {
        this.Command = 'get-text';
        this.Text = text;
    }
}
