using OpenQA.Selenium;
using Selenium.DriverTest.WebDriver.Commands;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace Selenium.DriverTest.WebDriver
{
    public class Communication
    {
        private Guid _sessionId;

        public void ClickElement(Guid elementId)
        {
            var request = new ClickElementRequest(elementId);
            var response = Post<ClickElementRequest, ClickElementResponse>(request);
            if (!response.IsValid())
                throw new Exception("Could not click element: Invalid response");
            if (!response.Success)
                throw new Exception("Could not click element: Element not found?");
        }

        public string GetText(Guid elementId)
        {
            var request = new GetTextRequest(elementId);
            var response = Post<GetTextRequest, GetTextResponse>(request);
            if (!response.IsValid())
                throw new Exception("Could not click element: Invalid response");
            return response.Text;
        }

        public void SendKeys(Guid elementId, string keys)
        {
            var request = new SendKeysRequest(elementId, keys);
            var response = Post<SendKeysRequest, SendKeysResponse>(request);
            if (!response.IsValid())
                throw new Exception("Could not click element: Invalid response");
            if (!response.Success)
                throw new Exception("Could not click element: Element not found?");
        }

        public void CreateSession()
        {
            var request = new CreateSessionRequest();
            var response = Post<CreateSessionRequest, CreateSessionResponse>(request);
            if (!response.IsValid() || response.SessionId == Guid.Empty)
                throw new Exception("Could not create session: Invalid response");

            _sessionId = response.SessionId;
            //Console.WriteLine("Guid: " + _sessionId);
        }
        public void DeleteSession()
        {
            if (_sessionId == Guid.Empty)
                return;

            var request = new DeleteSessionRequest();
            var response = Post<DeleteSessionRequest, DeleteSessionResponse>(request);
            if (!response.IsValid())
                throw new Exception("Could not delete session: Invalid response");

            _sessionId = Guid.Empty;
        }

        public void GoToUrl(string url)
        {
            var request = new GoToUrlRequest(url);
            var response = Post<GoToUrlRequest, GoToUrlResponse>(request);
            if (!response.IsValid())
                throw new Exception("Could not go to URL: Invalid response");
        }

        public IWebElement FindElementByCssSelector(string cssSelector)
        {
            var request = new FindElementRequest() { CssSelector = cssSelector };
            var response = Post<FindElementRequest, FindElementResponse>(request);
            if (!response.IsValid())
                throw new Exception("Could not find element: Invalid response");

            if (!response.ElementId.HasValue)
                throw new Exception("Element not found");

            return new MyWebElement(this, response.ElementId.Value);
        }

        public MyElementInfo GetElementInfo(Guid elementId)
        {
            var request = new ElementInfoRequest() { ElementId = elementId };
            var response = Post<ElementInfoRequest, ElementInfoResponse>(request);
            if (!response.IsValid())
                throw new Exception("Could not get element info: Invalid response");

            if (response.ElementInfo == null)
                throw new Exception("Could not get element info: Element not found");

            return response.ElementInfo;
        }

        private TResponse Post<TRequest, TResponse>(TRequest request) where TRequest : IRequest where TResponse : IResponse
        {
            request.SessionId = _sessionId;

            var jsonRequest = Newtonsoft.Json.JsonConvert.SerializeObject(request);
            var webRequest = WebRequest.CreateHttp("http://127.0.0.1:4480");
            webRequest.ContentType = "application/json";
            webRequest.Method = "POST";
            using (var requestStream = webRequest.GetRequestStream())
            using (var requestStreamWriter = new StreamWriter(requestStream))
            {
                requestStreamWriter.Write(jsonRequest);
                requestStreamWriter.Flush();
            }

            using (var webResponse = (HttpWebResponse)webRequest.GetResponse())
            using (var webResponseStream = webResponse.GetResponseStream())
            using (var webResponseStreamReader = new StreamReader(webResponseStream))
            {
                var jsonResponse = webResponseStreamReader.ReadToEnd();
                var response = Newtonsoft.Json.JsonConvert.DeserializeObject<TResponse>(jsonResponse);
                return response;
            }
        }

    }
}
