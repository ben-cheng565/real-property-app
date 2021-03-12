
using System.Threading.Tasks;
using backend.Data.Repo;
using backend.Models;
using Microsoft.AspNetCore.Mvc;

namespace Namespace
{
    [Route("api/[controller]")]
    [ApiController]
    public class CityController : ControllerBase
    {
        private readonly ICityRepo cr;
        public CityController(ICityRepo cr)
        {
            this.cr = cr;
        }

        [HttpGet]
        public async Task<ActionResult> Get()
        {
            var cities = await cr.GetCitiesAsync();
            return Ok(cities);
            // return new string[] { "value1", "value2" };
        }

        [HttpGet("{id}")]
        public async Task<ActionResult> Get(int id)
        {
            var city = await cr.GetCityAsync(id);

            return Ok(city);
        }

        [HttpPost]
        public async Task<ActionResult> AddCity(City city)
        {
            
            cr.AddCity(city);
            await cr.SaveAsync();

            return StatusCode(201);
        }

        

        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            cr.DeleteCity(id);
            await cr.SaveAsync();

            return StatusCode(200);
        }
    }
}