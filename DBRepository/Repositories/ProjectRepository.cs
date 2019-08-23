using DBRepository.Interfaces;
using Microsoft.EntityFrameworkCore;
using Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DBRepository.Repositories
{
    public class ProjectRepository : BaseRepository, IProjectRepository
    {
        public ProjectRepository(string connectionString, IRepositoryContextFactory contextFactory) : base(connectionString, contextFactory) { }

        public async Task<PageProjects<Project>> GetProjects(int index, int pageSize/*, string userId*/)
        {
            var result = new PageProjects<Project>() { CurrentPage = index, PageSize = pageSize };

            using (var context = ContextFactory.CreateDbContext(ConnectionString))
            {
                var query = context.Projects/*.Where(u => String.Equals(u.UserId, userId))*/.AsQueryable();
                result.TotalPages = await query.CountAsync();
                result.Records = await query.Include(l => l.Links).ThenInclude(s => s.Statistics).OrderByDescending(p => p.ProjectId).Skip(index * pageSize).Take(pageSize).ToListAsync();
                result.CountRecords = result.Records.Sum(s => s.Links.Count());
            }

            return result;
        }
        public async Task<Project> GetProject(int projectId)
        {
            using (var context = ContextFactory.CreateDbContext(ConnectionString))
            {                
                return await context.Projects.FindAsync(projectId);
            }
        }        
        public async Task AddProject(Project project)
        {
            using (var context = ContextFactory.CreateDbContext(ConnectionString))
            {
                context.Projects.Add(project);
                await context.SaveChangesAsync();
            }
        }
        public async Task EditProject(Project project)
        {
            using (var context = ContextFactory.CreateDbContext(ConnectionString))
            {                
                context.Entry(project).State = EntityState.Modified;
                await context.SaveChangesAsync();
            }
        }
        public async Task DeleteProject(int projectId)
        {
            using (var context = ContextFactory.CreateDbContext(ConnectionString))
            {
                var project = new Project { ProjectId = projectId };
                context.Projects.Remove(project);
                await context.SaveChangesAsync();
            }
        }
    }
}
