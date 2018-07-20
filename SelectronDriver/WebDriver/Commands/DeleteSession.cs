using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Selenium.DriverTest.WebDriver.Commands
{
    public class DeleteSessionRequest : IRequest
    {
        public const string COMMAND_NAME = "delete-session";
        public string Command { get => COMMAND_NAME; }
        public Guid SessionId { get; set; }
    }

    public class DeleteSessionResponse : IResponse
    {
        public string Command { get; set; }

        public bool IsValid()
        {
            return DeleteSessionRequest.COMMAND_NAME.Equals(Command);
        }
    }
}
