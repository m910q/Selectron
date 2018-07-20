using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Selenium.DriverTest.WebDriver.Commands
{
    public interface IResponse
    {
        string Command { get;  set; }
        bool IsValid();
    }
}
