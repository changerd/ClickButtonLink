﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ClickButtonLink.ViewModels
{
    public class ProjectsListViewModel
    {
        public ProjectsListViewModel(int id, string name)
        {
            Id = id;
            Name = name;
        }

        public int Id { get; set; }
        public string Name { get; set; }
    }
}
