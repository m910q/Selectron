using OpenQA.Selenium;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Selenium.DriverTest.WebDriver
{
    public class MyNavigation : INavigation
    {
        private Communication _communication;

        public MyNavigation(Communication communication)
        {
            _communication = communication ?? throw new ArgumentException($"{nameof(communication)} cannot be null");
        }

        public void Back()
        {
            throw new NotImplementedException();
        }

        public void Forward()
        {
            throw new NotImplementedException();
        }

        public void GoToUrl(string url)
        {
            _communication.GoToUrl(url);
        }

        public void GoToUrl(Uri url)
        {
            throw new NotImplementedException();
        }

        public void Refresh()
        {
            throw new NotImplementedException();
        }
    }
}
