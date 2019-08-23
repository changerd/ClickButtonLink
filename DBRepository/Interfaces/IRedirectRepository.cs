using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace DBRepository.Interfaces
{
    public interface IRedirectRepository
    {
        Task<string> StartRedirect(int linkId);
    }
}
