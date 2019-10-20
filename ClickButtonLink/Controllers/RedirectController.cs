using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DBRepository.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace ClickButtonLink.Controllers
{    
    public class RedirectController : Controller
    {
        IRedirectRepository _repository;
        
        public RedirectController(IRedirectRepository repository)
        {
            _repository = repository;
        }
        
        [HttpGet]
        public async Task<IActionResult> StartRedirect(int id)
        {
            string FullLink = await _repository.StartRedirect(id);
            if (!String.IsNullOrEmpty(FullLink))
            {
                return Redirect(FullLink);
            }
            return NotFound();
        }
    }
}