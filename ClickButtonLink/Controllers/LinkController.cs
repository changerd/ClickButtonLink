using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ClickButtonLink.Services.Interfaces;
using ClickButtonLink.ViewModels;
using Microsoft.AspNetCore.Mvc;
using Models;

namespace ClickButtonLink.Controllers
{
    public class LinkController : Controller
    {
        ILinkService _linkService;

        public LinkController(ILinkService linkService)
        {
            _linkService = linkService;
        }

        [Route("pagelink")]
        [HttpGet]
        public async Task<PageLinks<LinksViewModel>> GetLinks(int pageIndex, int projectId)
        {
            return await _linkService.GetLinks(pageIndex, projectId);
        }

        [Route("link")]
        [HttpGet]
        public async Task<Link> GetLink(int linkId)
        {
            return await _linkService.GetLink(linkId);
        }

        [Route("link")]
        [HttpPost]
        public async Task AddLink([FromBody] AddLinkRequest request)
        {
            await _linkService.AddLink(request);
        }

        [Route("link")]
        [HttpPut]
        public async Task EditLink([FromBody] EditLinkRequest request)
        {
            await _linkService.EditLink(request);
        }

        [Route("link")]
        [HttpDelete]
        public async Task DeleteLink(int linkId)
        {
            await _linkService.DeleteLink(linkId);
        }
        
    }
}