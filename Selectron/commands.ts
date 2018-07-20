'use strict';

type CommandType = 'create-session' | 'delete-session' | 'go-to-url' | 'find-element' | 'element-info' | 'click-element' | 'send-keys' | 'get-text';

interface IRequest extends ICommand {
    SessionId: string;
}
interface ICommand {
    Command: CommandType;
}

interface MyElementInfo {
        TagName: string;
        Enabled: boolean;
        Selected: boolean;
        LocationX: number;
        LocationY: number;
        SizeWidth: number;
        SizeHeight: number;
        Displayed: boolean;
}


class CreateSessionResponse implements ICommand {
    public Command: CommandType = 'create-session';
    public SessionId: string;

    constructor(sessionId: string) {
        this.SessionId = sessionId;
    }
}

interface DeleteSessionRequest extends IRequest {
}
class DeleteSessionResponse implements ICommand {
    public Command: CommandType = 'delete-session';
}

interface GoToUrlRequest extends IRequest {
    Url: string;
}
class GoToUrlResponse implements ICommand {
    public Command: CommandType = 'go-to-url';
}

interface FindElementRequest extends IRequest {
    CssSelector: string;
}
class FindElementResponse implements ICommand {
    public Command: CommandType = 'find-element';
    public ElementId: string;
}

interface ElementInfoRequest extends IRequest {
    ElementId: string;
}
class ElementInfoResponse implements ICommand {
    public Command: CommandType = 'element-info';
    public ElementInfo: MyElementInfo;
}

interface ClickElementRequest extends IRequest {
    ElementId: string;
}
class ClickElementResponse implements ICommand {
    public Command: CommandType = 'click-element';
    public ElementInfo: MyElementInfo;
    public Success: boolean;

    constructor(success: boolean) {
        this.Success = success;
    }
}

interface SendKeysRequest extends IRequest {
    ElementId: string;
    Keys: string;
}
class SendKeysResponse implements ICommand {
    public Command: CommandType = 'send-keys';
    public ElementInfo: MyElementInfo;
    public Success: boolean;

    constructor(success: boolean) {
        this.Success = success;
    }
}

interface GetTextRequest extends IRequest {
    ElementId: string;
}
class GetTextResponse implements ICommand {
    public Command: CommandType = 'get-text';
    public Text: string;

    constructor(text: string) {
        this.Text = text;
    }
}