using OpenQA.Selenium;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Collections.ObjectModel;

namespace Selenium.DriverTest.WebDriver
{
    public class MyWebDriver : IWebDriver
    {
        private Communication _communication;
        private IOptions _options;
        private INavigation _navigation;

        public string Url { get => throw new NotImplementedException(); set => throw new NotImplementedException(); }
        public string Title => throw new NotImplementedException();
        public string PageSource => throw new NotImplementedException();
        public string CurrentWindowHandle => throw new NotImplementedException();
        public ReadOnlyCollection<string> WindowHandles => throw new NotImplementedException();

        public MyWebDriver()
        {
            _communication = new Communication();
            _options = new MyOptions();
            _navigation = new MyNavigation(_communication);

            _communication.CreateSession();
        }

        public void Close()
        {
            Quit();
        }

        public void Dispose()
        {
            Close();
        }

        public IWebElement FindElement(By by)
        {
            var description = by.ToString();
            var typeIndexEnd = description.IndexOf(':');
            if (typeIndexEnd == -1)
                throw new NotImplementedException("Type of By selector is not implemented");

            var type = description.Substring(0, typeIndexEnd);
            var value = description.Substring(typeIndexEnd + 2);
            switch (type)
            {
                case "By.CssSelector":
                    return _communication.FindElementByCssSelector(value);
                default:
                    throw new NotImplementedException("Type of By selector is not implemented");
            }
        }

        public ReadOnlyCollection<IWebElement> FindElements(By by)
        {
            throw new NotImplementedException();
        }

        public IOptions Manage()
        {
            return _options;
        }

        public INavigation Navigate()
        {
            return _navigation;
        }

        public void Quit()
        {
            _communication.DeleteSession();
        }

        public ITargetLocator SwitchTo()
        {
            throw new NotImplementedException();
        }
    }
}
