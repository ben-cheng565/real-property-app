
using System.Threading.Tasks;
using backend.Data.Repo;
using backend.Interface;
using backend.Interfaces;
using backend.Models;
using Microsoft.AspNetCore.Mvc;

namespace Namespace
{
    [Route("api/[controller]")]
    [ApiController]
    public class CityController : ControllerBase
    {
        private readonly IUnitOfWork uow;

        public CityController(IUnitOfWork uow)
        {
            this.uow = uow;
        }

        [HttpGet]
        public async Task<ActionResult> Get()
        {
            var cities = await uow.CityRepo.GetCitiesAsync();
            return Ok(cities);
            // return new string[] { "value1", "value2" };
        }

        [HttpGet("{id}")]
        public async Task<ActionResult> Get(int id)
        {
            var city = await uow.CityRepo.GetCityAsync(id);

            return Ok(city);
        }

        [HttpPost]
        public async Task<ActionResult> AddCity(City city)
        {
            
            uow.CityRepo.AddCity(city);
            await uow.SaveAsync();

            return StatusCode(201);
        }

        

        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            uow.CityRepo.DeleteCity(id);
            await uow.SaveAsync();

            return StatusCode(200);
        }
    }
}