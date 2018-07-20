using OpenQA.Selenium;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Selenium.DriverTest.WebDriver
{
    public class MyOptions : IOptions
    {
        private ITimeouts _timeouts = new MyTimeouts();

        public ICookieJar Cookies => throw new NotImplementedException();
        public IWindow Window => throw new NotImplementedException();
        public ILogs Logs => throw new NotImplementedException();
        public ITimeouts Timeouts()
        {
            return _timeouts;
        }

        public MyOptions()
        {
        }
    }
}
