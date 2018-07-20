using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Selenium.DriverTest.WebDriver.Commands
{
    public class GetTextRequest : IRequest
    {
        public const string COMMAND_NAME = "get-text";
        public string Command { get => COMMAND_NAME; }
        public Guid SessionId { get; set; }
        public Guid ElementId { get; set; }

        public GetTextRequest(Guid elementId)
        {
            ElementId = elementId;
        }
    }

    public class GetTextResponse : IResponse
    {
        public string Command { get; set; }
        public string Text { get; set; }

        public bool IsValid()
        {
            return GetTextRequest.COMMAND_NAME.Equals(Command);
        }
    }
}
