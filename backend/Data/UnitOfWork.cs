using System.Threading.Tasks;
using backend.Data.Repo;
using backend.Interface;
using backend.Interfaces;

namespace backend.Data
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly DataContext dc;

        public UnitOfWork(DataContext dc)
        {
            this.dc = dc;
        }
        public ICityRepo CityRepo => new  CityRepo(dc);

        public async Task<bool> SaveAsync()
        {
            return await dc.SaveChangesAsync() > 0;
        }
    }
}