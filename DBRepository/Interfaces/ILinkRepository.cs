using Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace DBRepository.Interfaces
{
    public interface ILinkRepository
    {
        Task<Page<Link>> GetLinks(int index, int pageSize);
        Task<Link> GetLink(int linkId);
        Task AddLink(Link link);
        Task EditLink(int linkId);
        Task DeleteLink(int linkId);
    }
}
