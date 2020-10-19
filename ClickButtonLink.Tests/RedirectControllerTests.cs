using ClickButtonLink.Controllers;
using DBRepository.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Moq;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Xunit;

namespace ClickButtonLink.Tests
{
    
    public class RedirectControllerTests
    {
        [Fact]
        public async Task StartRedirectReturnsNotFoundWhenLinkNull()
        {
            int linkId = 1;
            var mock = new Mock<IRedirectRepository>();
            mock.Setup(r => r.StartRedirect(linkId)).ReturnsAsync(null as string);
            var controller = new RedirectController(mock.Object);

            var result = await controller.StartRedirect(linkId);

            Assert.IsType<NotFoundResult>(result);
        }

        [Fact]
        public async Task StartRedirectReturnsRedirect()
        {
            int linkId = 1;
            var mock = new Mock<IRedirectRepository>();
            mock.Setup(r => r.StartRedirect(linkId)).ReturnsAsync("link example");
            var controller = new RedirectController(mock.Object);

            var result = await controller.StartRedirect(linkId);

            Assert.IsType<RedirectResult>(result);
        }
    }
}
