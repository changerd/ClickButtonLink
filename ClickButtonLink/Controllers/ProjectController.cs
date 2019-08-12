using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ClickButtonLink.Services.Interfaces;
using ClickButtonLink.ViewModels;
using Microsoft.AspNetCore.Mvc;
using Models;

namespace ClickButtonLink.Controllers
{
    [Route("api/[controller]")]
    public class ProjectController : Controller
    {
        IProjectService _projectService;

        public ProjectController(IProjectService projectService)
        {
            _projectService = projectService;
        }

        [Route("page")]
        [HttpGet]
        public async Task<Page<ProjectsViewModel>> GetProjects(int pageIndex)
        {
            return await _projectService.GetProjects(pageIndex);
        }

        [Route("project")]
        [HttpGet]
        public async Task<Project> GetProject(int projectId)
        {
            return await _projectService.GetProject(projectId);
        }

        [Route("project")]
        [HttpPost]
        public async Task AddProject([FromBody] AddProjectRequest request)
        {
            await _projectService.AddProject(request);
        }

        [Route("project")]
        [HttpDelete]
        public async Task DeleteProject(int projectId)
        {
            await _projectService.DeleteProject(projectId);
        }
    }
}