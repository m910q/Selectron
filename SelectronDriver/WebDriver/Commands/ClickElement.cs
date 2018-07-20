using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Selenium.DriverTest.WebDriver.Commands
{
    public class ClickElementRequest : IRequest
    {
        public const string COMMAND_NAME = "click-element";
        public string Command { get => COMMAND_NAME; }
        public Guid SessionId { get; set; }
        public Guid ElementId { get; set; }

        public ClickElementRequest(Guid elementId)
        {
            ElementId = elementId;
        }
    }

    public class ClickElementResponse : IResponse
    {
        public string Command { get; set; }
        public bool Success { get; set; }

        public bool IsValid()
        {
            return ClickElementRequest.COMMAND_NAME.Equals(Command);
        }
    }
}
