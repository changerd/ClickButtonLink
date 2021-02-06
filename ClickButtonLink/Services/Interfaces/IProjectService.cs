using ClickButtonLink.ViewModels;
using Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ClickButtonLink.Services.Interfaces
{
    public interface IProjectService
    {
        Task<PageProjects<ProjectsViewModel>> GetProjects(int pageIndex, int userId);
        Task<Project> GetProject(int projectId);
        Task<List<ProjectsListViewModel>> GetProjectsListByUser(int userId);
        Task AddProject(AddProjectRequest request);
        Task EditProject(EditProjectRequest request);
        Task DeleteProject(int projectId);
    }
}
