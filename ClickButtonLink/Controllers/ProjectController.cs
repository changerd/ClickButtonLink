using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ClickButtonLink.Services.Interfaces;
using ClickButtonLink.ViewModels;
using DBRepository.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Models;

namespace ClickButtonLink.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    public class ProjectController : Controller
    {
        IProjectService _projectService;
        IIdentityService _identityService;
       
        public ProjectController(IProjectService projectService, IIdentityService identityService)
        {
            _projectService = projectService;
            _identityService = identityService;
        }

        [Route("page")]
        [HttpGet]
        public async Task<PageProjects<ProjectsViewModel>> GetProjects(int pageIndex)
        {
            var user = await _identityService.GetUser(User.Identity.Name);
            int userId = user.UserId;
            return await _projectService.GetProjects(pageIndex, userId);
        }

        [Route("project")]
        [HttpGet]
        public async Task<Project> GetProject(int projectId)
        {
            var result = await _projectService.GetProject(projectId);
            var user = await _identityService.GetUser(User.Identity.Name);
            if (result == null || result.UserId != user.UserId)
            {
                return null;
            }
            return result;
        }

        [Route("project")]
        [HttpPost]
        public async Task<IActionResult> AddProject([FromBody] AddProjectRequest request)
        {
            var user = await _identityService.GetUser(User.Identity.Name);
            request.UserId = user.UserId;
            await _projectService.AddProject(request);
            return NoContent();
        }

        [Route("project")]
        [HttpPut]
        public async Task<IActionResult> EditProject([FromBody] EditProjectRequest request)
        {
            var user = await _identityService.GetUser(User.Identity.Name);
            request.UserId = user.UserId;
            await _projectService.EditProject(request);
            return NoContent();
        }

        [Route("project")]
        [HttpDelete]
        public async Task<IActionResult> DeleteProject(int projectId)
        {
            await _projectService.DeleteProject(projectId);
            return NoContent();
        }

        [Route("projectslist")]
        [HttpGet]
        public async Task<List<ProjectsListViewModel>> GetProjectsListByUser()
        {
            var user = await _identityService.GetUser(User.Identity.Name);
            var result = await _projectService.GetProjectsListByUser(user.UserId);
            return result;
        }
    }
}