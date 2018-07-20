using OpenQA.Selenium;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Selenium.DriverTest.WebDriver
{
    class MyTimeouts : ITimeouts
    {
        public TimeSpan ImplicitWait { get; set; }
        public TimeSpan AsynchronousJavaScript { get => throw new NotImplementedException(); set => throw new NotImplementedException(); }
        public TimeSpan PageLoad { get => throw new NotImplementedException(); set => throw new NotImplementedException(); }

        public ITimeouts ImplicitlyWait(TimeSpan timeToWait)
        {
            ImplicitWait = timeToWait;
            return this;
        }

        public ITimeouts SetPageLoadTimeout(TimeSpan timeToWait)
        {
            throw new NotImplementedException();
        }

        public ITimeouts SetScriptTimeout(TimeSpan timeToWait)
        {
            throw new NotImplementedException();
        }
    }
}
