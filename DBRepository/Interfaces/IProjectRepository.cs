using Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace DBRepository.Interfaces
{
    public interface IProjectRepository
    {
        Task<PageProjects<Project>> GetProjects(int index, int pageSize, int userId);
        Task<Project> GetProject(int projectId);
        Task<List<Project>> GetProjectsByUser(int userId);
        Task AddProject(Project project);
        Task EditProject(Project project);        
        Task DeleteProject(int projectId);        
    }
}
