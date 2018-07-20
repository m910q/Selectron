using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Selenium.DriverTest.WebDriver.Commands
{
    public class SendKeysRequest : IRequest
    {
        public const string COMMAND_NAME = "send-keys";
        public string Command { get => COMMAND_NAME; }
        public Guid SessionId { get; set; }
        public Guid ElementId { get; set; }
        public string Keys { get; set; }

        public SendKeysRequest(Guid elementId, string keys)
        {
            ElementId = elementId;
            Keys = keys;
        }
    }

    public class SendKeysResponse : IResponse
    {
        public string Command { get; set; }
        public bool Success { get; set; }

        public bool IsValid()
        {
            return SendKeysRequest.COMMAND_NAME.Equals(Command);
        }
    }
}
