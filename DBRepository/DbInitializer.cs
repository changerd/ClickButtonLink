using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace DBRepository
{
    public static class DbInitializer
    {
        public async static Task Initialize(RepositoryContext context)
        {
            await context.Database.MigrateAsync();

            var userCount = await context.Users.CountAsync().ConfigureAwait(false);
            if (userCount == 0)
            {
                context.Users.Add(new Models.User()
                {
                    Login = "admin",
                    Password = "jGl25bVBBBW96Qi9Te4V37Fnqchz/Eu4qB9vKrRIqRg="
                });
            }

            await context.SaveChangesAsync().ConfigureAwait(false);
        }
    }
}
