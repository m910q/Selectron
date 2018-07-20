using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Selenium.DriverTest.WebDriver.Commands
{
    public class FindElementRequest : IRequest
    {
        public const string COMMAND_NAME = "find-element";
        public string Command { get => COMMAND_NAME; }
        public Guid SessionId { get; set; }

        public string CssSelector { get; set; }
    }

    public class FindElementResponse : IResponse
    {
        public string Command { get; set; }
        public Guid? ElementId { get; set; }

        public bool IsValid()
        {
            return FindElementRequest.COMMAND_NAME.Equals(Command);
        }
    }
}
