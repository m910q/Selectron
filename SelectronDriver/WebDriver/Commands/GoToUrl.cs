using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Selenium.DriverTest.WebDriver.Commands
{
    public class GoToUrlRequest : IRequest
    {
        public const string COMMAND_NAME = "go-to-url";
        public string Command { get => COMMAND_NAME; }
        public Guid SessionId { get; set; }
        public string Url { get; set; }

        public GoToUrlRequest(string url)
        {
            Url = url;
        }
    }

    public class GoToUrlResponse : IResponse
    {
        public string Command { get; set; }

        public bool IsValid()
        {
            return GoToUrlRequest.COMMAND_NAME.Equals(Command);
        }
    }
}
