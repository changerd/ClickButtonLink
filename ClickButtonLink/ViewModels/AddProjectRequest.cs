﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ClickButtonLink.ViewModels
{
    public class AddProjectRequest
    {
        public string ProjectName { get; set; }
        public string ProjectDescription { get; set; }
        public int UserId { get; set; }
    }
}
