using Microsoft.AspNetCore.Mvc;

namespace HideAndSeek.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FileController : ControllerBase
    {
        //[HttpGet]
        //public IEnumerable<string> Get()
        //{
        //    return new string[] { "value1", "value2" };
        //}

        //[HttpGet("{id}")]
        //public string Get(int id)
        //{
        //    return "value";
        //}

        [HttpPost("import")]
        public IActionResult ImportFile([FromForm] IFormFile file, [FromForm] string key)
        {
            string name = file.FileName;
            string extension = Path.GetExtension(file.FileName);
            byte[] fileToBytes;
            using (var memoryStream = new MemoryStream())
            {
                file.CopyTo(memoryStream);
                fileToBytes = memoryStream.ToArray();
                extension += ".enc";
            }
            return Ok(fileToBytes);
        }

    }
}
