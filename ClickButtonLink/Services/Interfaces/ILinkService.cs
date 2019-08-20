using ClickButtonLink.ViewModels;
using Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ClickButtonLink.Services.Interfaces
{
    public interface ILinkService
    {
        Task<PageLinks<LinksViewModel>> GetLinks(int pageIndex, int projectId);
        Task<Link> GetLink(int linkId);
        Task AddLink(AddLinkRequest request);
        Task EditLink(EditLinkRequest request);
        Task DeleteLink(int linkId);
    }
}
