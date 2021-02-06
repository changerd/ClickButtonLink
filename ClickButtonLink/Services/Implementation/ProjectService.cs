using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Models;
using ClickButtonLink.Services.Interfaces;
using ClickButtonLink.ViewModels;
using DBRepository.Interfaces;
using Microsoft.Extensions.Configuration;
using AutoMapper;

namespace ClickButtonLink.Services.Implementation
{
    public class ProjectService : IProjectService
    {
        IProjectRepository _repository;
        IConfiguration _config;
        IMapper _mapper;

        public ProjectService(IProjectRepository repository, IConfiguration configuration, IMapper mapper)
        {
            _repository = repository;
            _config = configuration;
            _mapper = mapper;
        }

        public async Task<PageProjects<ProjectsViewModel>> GetProjects(int pageIndex, int userId)
        {
            var pageSize = _config.GetValue<int>("pageSize");
            var page = await _repository.GetProjects(pageIndex, pageSize, userId);
            var result = _mapper.ToMappedPage<Project, ProjectsViewModel>(page);
            return result;
        }

        public async Task<Project> GetProject(int projectId)
        {
            var result = await _repository.GetProject(projectId);
            return result;
        }

        public async Task<List<ProjectsListViewModel>> GetProjectsListByUser(int userId)
        {
            var projects = await _repository.GetProjectsByUser(userId);
            var list = new List<ProjectsListViewModel>();
            foreach(var item in projects)
            {
                list.Add(new ProjectsListViewModel(item.ProjectId, item.ProjectName));
            }

            return list;
        }

        public async Task AddProject(AddProjectRequest request)
        {
            var project = _mapper.Map<AddProjectRequest, Project>(request);
            await _repository.AddProject(project);
        }  
        
        public async Task EditProject(EditProjectRequest request)
        {
            var project = _mapper.Map<EditProjectRequest, Project>(request);
            await _repository.EditProject(project);
        }

        public async Task DeleteProject(int projectId)
        {
            await _repository.DeleteProject(projectId);
        }
    }
}
