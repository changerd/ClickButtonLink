using AutoMapper;
using Models;
using System.Collections.Generic;

namespace ClickButtonLink
{
    public static class MappingExtensions
    {
        public static PageProjects<TDestination> ToMappedPage<TSource, TDestination>(this IMapper mapper, PageProjects<TSource> page)
        {
            IEnumerable<TDestination> sourceList = mapper.Map<IEnumerable<TSource>, IEnumerable<TDestination>>(page?.Records);
            PageProjects<TDestination> pagedResult = new PageProjects<TDestination>(sourceList) { CurrentPage = page.CurrentPage, PageSize = page.PageSize, TotalPages = page.TotalPages, CountRecords = page.CountRecords };
            return pagedResult;
        }

        public static PageLinks<TDestination> ToMappedPage<TSource, TDestination>(this IMapper mapper, PageLinks<TSource> page)
        {
            IEnumerable<TDestination> sourceList = mapper.Map<IEnumerable<TSource>, IEnumerable<TDestination>>(page?.Records);
            PageLinks<TDestination> pagedResult = new PageLinks<TDestination>(sourceList) { CurrentPage = page.CurrentPage, PageSize = page.PageSize, TotalPages = page.TotalPages, CountLinks = page.CountLinks, ProjectId = page.ProjectId, ProjectName = page.ProjectName, ProjectDescription = page.ProjectDescription, UserId = page.UserId };
            return pagedResult;
        }
    }
}
