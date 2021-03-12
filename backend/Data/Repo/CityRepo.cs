using System.Collections.Generic;
using System.Threading.Tasks;
using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Data.Repo
{
    public class CityRepo : ICityRepo
    {
        private readonly DataContext dc;
        public CityRepo(DataContext dc)
        {
            this.dc = dc;

        }
        public void AddCity(City city)
        {
            dc.Cities.Add(city);
        }

        public void DeleteCity(int cityId)
        {
            City city = dc.Cities.Find(cityId);
            dc.Cities.Remove(city);
        }

        public async Task<IEnumerable<City>> GetCitiesAsync()
        {
            return await dc.Cities.ToListAsync();
        }
        public async Task<City> GetCityAsync(int cityId) 
        {
            var city = await dc.Cities.FindAsync(cityId);
            return city;
        }

        public async Task<bool> SaveAsync()
        {
            return await dc.SaveChangesAsync() > 0;
        }
    }
}