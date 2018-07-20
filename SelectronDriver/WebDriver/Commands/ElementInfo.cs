using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Selenium.DriverTest.WebDriver.Commands
{
    public class ElementInfoRequest : IRequest
    {
        public const string COMMAND_NAME = "element-info";
        public string Command { get => COMMAND_NAME; }
        public Guid SessionId { get; set; }

        public Guid ElementId { get; set; }
    }

    public class ElementInfoResponse : IResponse
    {
        public string Command { get; set; }
        public MyElementInfo ElementInfo { get; set; }

        public bool IsValid()
        {
            return ElementInfoRequest.COMMAND_NAME.Equals(Command);
        }
    }
}
