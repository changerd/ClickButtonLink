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
    public class LinkRepository : BaseRepository, ILinkRepository
    {
        public LinkRepository(string connectionString, IRepositoryContextFactory contextFactory) : base(connectionString, contextFactory) { }

        public async Task<PageLinks<Link>> GetLinks(int index, int pageSize, int userId, int projectId = 0)
        {
            var result = new PageLinks<Link>() { CurrentPage = index, PageSize = pageSize };

            using (var context = ContextFactory.CreateDbContext(ConnectionString))
            {
                var query = context.Links.Where(u => u.Project.UserId == userId).AsQueryable();
                if (projectId != 0)
                {
                    var project = context.Projects.Find(projectId);
                    if (project == null)
                    {
                        return null;
                    }
                    result.ProjectId = project.ProjectId;
                    result.ProjectName = project.ProjectName;
                    result.ProjectDescription = project.ProjectDescription;
                    result.UserId = project.UserId;
                    query = query.Where(p => p.ProjectId == projectId);
                }                
                result.TotalPages = await query.CountAsync();
                result.Records = await query.Include(s => s.Statistics).OrderByDescending(l => l.LinkId).Skip(index * pageSize).Take(pageSize).ToListAsync();
                result.CountLinks = result.Records.Count;
            }

            return result;
        }
        public async Task<Link> GetLink(int linkId)
        {
            using (var context = ContextFactory.CreateDbContext(ConnectionString))
            {
                return await context.Links.Include(p => p.Project).Include(s => s.Statistics).SingleOrDefaultAsync(l => l.LinkId == linkId);
            }
        }
        public async Task AddLink(Link link)
        {
            using (var context = ContextFactory.CreateDbContext(ConnectionString))
            {
                context.Links.Add(link);
                await context.SaveChangesAsync();
            }
        }
        public async Task EditLink(Link link)
        {
            using (var context = ContextFactory.CreateDbContext(ConnectionString))
            {
                context.Entry(link).State = EntityState.Modified;
                await context.SaveChangesAsync();
            }
        }
        public async Task DeleteLink(int linkId)
        {
            using (var context = ContextFactory.CreateDbContext(ConnectionString))
            {
                var link = new Link { LinkId = linkId };
                context.Links.Remove(link);
                await context.SaveChangesAsync();
            }
        }
    }
}
