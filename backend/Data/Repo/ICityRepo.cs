using System.Collections.Generic;
using System.Threading.Tasks;
using backend.Models;

namespace backend.Data.Repo
{
    public interface ICityRepo
    {
         Task<IEnumerable<City>> GetCitiesAsync();
         Task<City> GetCityAsync(int cityId);
         void AddCity(City city);
         void DeleteCity(int cityId);
         Task<bool> SaveAsync();
    }
}