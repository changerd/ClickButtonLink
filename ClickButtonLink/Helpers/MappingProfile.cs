using AutoMapper;
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
            CreateMap<EditProjectRequest, Project>();
            CreateMap<Link, LinksViewModel>()
                .ForMember(m => m.TransitionCount, opt => opt.MapFrom(s => s.Statistics != null ? s.Statistics.Count : 0));
            CreateMap<AddLinkRequest, Link>();
            CreateMap<EditLinkRequest, Link>();
            CreateMap<Link, LinkViewModel>()
                .ForMember(m => m.TransitionCount, opt => opt.MapFrom(m => m.Statistics != null ? m.Statistics.Count : 0))
                .ForMember(m => m.Transitions, opt => opt.MapFrom(m => m.Statistics.GroupBy(d => d.StatisticDate).Select(g => new { TransitionDate = g.Key, TransitionCount = g.Count() })))
                .ForMember(m => m.ArrCount, opt => opt.MapFrom(m => m.Statistics != null ? m.Statistics.GroupBy(d => d.StatisticDate).Count() : 0));
        }
    }
}
