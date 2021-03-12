using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Data;
using backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Namespace
{
    [Route("api/[controller]")]
    [ApiController]
    public class CityController : ControllerBase
    {
        private readonly DataContext _dc;
        public CityController(DataContext dc)
        {
            this._dc = dc;
        }

        [HttpGet]
        public async Task<ActionResult> Get()
        {
            var cities = await _dc.Cities.ToListAsync();
            return Ok(cities);
            // return new string[] { "value1", "value2" };
        }

        [HttpGet("{id}")]
        public async Task<ActionResult> Get(int id)
        {
            var city = await _dc.Cities.FindAsync(id);

            return Ok(city);
        }

        [HttpPost]
        public async Task<ActionResult> AddCity(string cityName)
        {
            City city = new City();
            city.Name = cityName;
            await _dc.Cities.AddAsync(city);
            await _dc.SaveChangesAsync();

            return Ok(city);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateCity(string cityName)
        {
            City city = new City();
            _dc.Cities.Update(city);
            await _dc.SaveChangesAsync();
            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            City city = await _dc.Cities.FindAsync(id);
            if(city != null) {
                _dc.Cities.Remove(city);
                await _dc.SaveChangesAsync();
            } else {
                Console.WriteLine("City does not exist.");
                return StatusCode(404);
            }
            return Ok(id);

        }
    }
}