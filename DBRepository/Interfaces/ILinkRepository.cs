using Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace DBRepository.Interfaces
{
    public interface ILinkRepository
    {
        Task<PageLinks<Link>> GetLinks(int index, int pageSize, int userId, int projectId = 0);
        Task<Link> GetLink(int linkId);
        Task AddLink(Link link);
        Task EditLink(Link link);
        Task DeleteLink(int linkId);
    }
}
