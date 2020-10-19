using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ClickButtonLink.Helpers.VK
{
    public class VkUser
    {
        [JsonProperty("response")]
        public VKResponse[] Response { get; set; }

        public class VKResponse
        {
            [JsonProperty("id")]
            public int Id { get; set; }

            [JsonProperty("first_name")]
            public string FirstName { get; set; }

            [JsonProperty("last_name")]
            public string LastName { get; set; }
        }
    }
}
