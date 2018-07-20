using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Selenium.DriverTest.WebDriver.Commands
{
    public class CreateSessionRequest : IRequest
    {
        public const string COMMAND_NAME = "create-session";
        public string Command { get => COMMAND_NAME; }
        public Guid SessionId { get; set; }
    }

    public class CreateSessionResponse : IResponse
    {
        public string Command { get; set; }
        public Guid SessionId { get; set; }

        public bool IsValid()
        {
            return CreateSessionRequest.COMMAND_NAME.Equals(Command);
        }
    }
}
