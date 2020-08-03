using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ClickButtonLink.Services.Interfaces;
using ClickButtonLink.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Models;

namespace ClickButtonLink.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    public class LinkController : Controller
    {
        ILinkService _linkService;

        public LinkController(ILinkService linkService)
        {
            _linkService = linkService;
        }

        [Route("pagelinks")]
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

        [Route("linkdetails")]
        [HttpGet]
        public async Task<LinkViewModel> GetLinkDetails(int linkId)
        {
            return await _linkService.GetLinkDetails(linkId);
        }

        [Route("link")]
        [HttpPost]
        public async Task<IActionResult> AddLink([FromBody] AddLinkRequest request)
        {
            await _linkService.AddLink(request);
            return NoContent();
        }

        [Route("link")]
        [HttpPut]
        public async Task<IActionResult> EditLink([FromBody] EditLinkRequest request)
        {
            await _linkService.EditLink(request);
            return NoContent();
        }

        [Route("link")]
        [HttpDelete]
        public async Task<IActionResult> DeleteLink(int linkId)
        {
            await _linkService.DeleteLink(linkId);
            return NoContent();
        }
        
    }
}