using OpenQA.Selenium;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Collections.ObjectModel;
using System.Drawing;

namespace Selenium.DriverTest.WebDriver
{
    public class MyElementInfo
    {
        public string TagName { get; set; }
        public bool Enabled { get; set; }
        public bool Selected { get; set; }

        public double LocationX { get; set; }
        public double LocationY { get; set; }
        public Point Location { get => new Point((int)LocationX, (int)LocationY); }

        public double SizeWidth { get; set; }
        public double SizeHeight { get; set; }
        public Size Size { get => new Size((int)SizeWidth, (int)SizeHeight); }

        public bool Displayed { get; set; }
    }
}
