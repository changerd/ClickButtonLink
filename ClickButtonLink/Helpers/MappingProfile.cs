﻿using AutoMapper;
using ClickButtonLink.ViewModels;
using Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ClickButtonLink.Helpers
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Project, ProjectsViewModel>()
                .ForMember(m => m.LinkCount, opt => opt.MapFrom(m => m.Links != null ? m.Links.Count : 0))
                .ForMember(m => m.TransitionCount, opt => opt.MapFrom(m => m.Links != null ? m.Links.Sum(s => s.Statistics.Count) : 0));
            CreateMap<AddProjectRequest, Project>();
        }
    }
}
