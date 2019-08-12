using Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace DBRepository.Interfaces
{
    public interface IProjectRepository
    {
        Task<Page<Project>> GetProjects(int index, int pageSize/*, string userId*/);
        Task<Project> GetProject(int projectId);
        Task AddProject(Project project);
        //Task EditProject(int projectId);
        //Task EditProjectConfirmed(Project project);
        Task DeleteProject(int projectId);        
    }
}
