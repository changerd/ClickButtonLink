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
        IIdentityService _identityService;

        public LinkController(ILinkService linkService, IIdentityService identityService)
        {
            _linkService = linkService;
            _identityService = identityService;
        }

        [Route("pagelinks")]
        [HttpGet]
        public async Task<PageLinks<LinksViewModel>> GetLinks(int pageIndex, int projectId)
        {
            var user = await _identityService.GetUser(User.Identity.Name);
            var result = await _linkService.GetLinks(pageIndex, user.UserId, projectId);            
            if (projectId != 0 && result.UserId != user.UserId)
            {
                return null;
            }
            return result;
        }

        [Route("link")]
        [HttpGet]
        public async Task<Link> GetLink(int linkId)
        {
            var link = await _linkService.GetLink(linkId);
            var user = await _identityService.GetUser(User.Identity.Name);
            if (link == null || link.Project.UserId != user.UserId)
            {
                return null;
            }
            link.Project = null;
            return link;
        }

        [Route("linkdetails")]
        [HttpGet]
        public async Task<LinkViewModel> GetLinkDetails(int linkId)
        {
            var user = await _identityService.GetUser(User.Identity.Name);
            var link = await _linkService.GetLinkDetails(linkId);
            if (link == null || link.UserId != user.UserId)
            {
                return null;
            }
            return link;
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