using System.Threading.Tasks;
using backend.Interface;

namespace backend.Interfaces
{
    public interface IUnitOfWork
    {
         ICityRepo CityRepo { get;}
         Task<bool> SaveAsync();
    }
}