using DBRepository.Interfaces;
using Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace DBRepository.Repositories
{
    public class RedirectRepository : BaseRepository, IRedirectRepository
    {
        public RedirectRepository(string connectionString, IRepositoryContextFactory contextFactory) : base(connectionString, contextFactory) { }

        public async Task<string> StartRedirect(int linkId)
        {
            using (var context = ContextFactory.CreateDbContext(ConnectionString))
            {
                var link = context.Links.Find(linkId);
                if(link != null && link.LinkIsActive)
                {
                    var statistic = new Statistic { LinkId = link.LinkId, StatisticDate = DateTime.Parse(DateTime.Now.ToShortDateString()) };
                    context.Statistics.Add(statistic);
                    await context.SaveChangesAsync();
                    return link.LinkValue;
                }
                return null;
            }
        }
    }
}
