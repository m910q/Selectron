using OpenQA.Selenium;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Collections.ObjectModel;
using System.Drawing;

namespace Selenium.DriverTest.WebDriver
{
    class MyWebElement : IWebElement
    {
        private Communication _communication;
        private Guid _elementId;

        public string TagName => _communication.GetElementInfo(_elementId).TagName;
        public string Text => _communication.GetText(_elementId);
        public bool Enabled => _communication.GetElementInfo(_elementId).Enabled;
        public bool Selected => _communication.GetElementInfo(_elementId).Selected;
        public Point Location => _communication.GetElementInfo(_elementId).Location;
        public Size Size => _communication.GetElementInfo(_elementId).Size;
        public bool Displayed => _communication.GetElementInfo(_elementId).Displayed;

        public MyWebElement(Communication communication, Guid elementId)
        {
            _communication = communication;
            _elementId = elementId;
        }

        public void Clear()
        {
            throw new NotImplementedException();
        }

        public void Click()
        {
            _communication.ClickElement(_elementId);
        }

        public IWebElement FindElement(By by)
        {
            throw new NotImplementedException();
        }

        public ReadOnlyCollection<IWebElement> FindElements(By by)
        {
            throw new NotImplementedException();
        }

        public string GetAttribute(string attributeName)
        {
            throw new NotImplementedException();
        }

        public string GetCssValue(string propertyName)
        {
            throw new NotImplementedException();
        }

        public void SendKeys(string text)
        {
            _communication.SendKeys(_elementId, text);
        }

        public void Submit()
        {
            throw new NotImplementedException();
        }

        public string GetProperty(string propertyName)
        {
            throw new NotImplementedException();    
        }
    }
}
