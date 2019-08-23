using AutoMapper;
using ClickButtonLink.Services.Interfaces;
using ClickButtonLink.ViewModels;
using DBRepository.Interfaces;
using Microsoft.Extensions.Configuration;
using Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ClickButtonLink.Services.Implementation
{
    public class LinkService : ILinkService
    {
        ILinkRepository _repository;
        IConfiguration _config;
        IMapper _mapper;

        public LinkService(ILinkRepository repository, IConfiguration configuration, IMapper mapper)
        {
            _repository = repository;
            _config = configuration;
            _mapper = mapper;
        }

        public async Task<PageLinks<LinksViewModel>> GetLinks(int pageIndex, int projectId)
        {
            var pageSize = _config.GetValue<int>("pageSize");
            var page = await _repository.GetLinks(pageIndex, pageSize, projectId);
            var result = _mapper.ToMappedPage<Link, LinksViewModel>(page);
            return result;
        }

        public async Task<Link> GetLink(int linkId)
        {            
            var result = await _repository.GetLink(linkId);
            return result;
        }

        public async Task<LinkViewModel> GetLinkDetails(int linkId)
        {
            var link = await _repository.GetLink(linkId);
            var result = _mapper.Map<Link, LinkViewModel>(link);
            return result;
        }

        public async Task AddLink(AddLinkRequest request)
        {
            var link = _mapper.Map<AddLinkRequest, Link>(request);
            await _repository.AddLink(link);
        }

        public async Task EditLink(EditLinkRequest request)
        {
            var link = _mapper.Map<EditLinkRequest, Link>(request);
            await _repository.EditLink(link);
        }

        public async Task DeleteLink(int linkId)
        {
            await _repository.DeleteLink(linkId);
        }
    }
}
