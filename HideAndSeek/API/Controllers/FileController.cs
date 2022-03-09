using Microsoft.AspNetCore.Mvc;
using HideAndSeek.Utils;
using System.Text;
using System.Text.RegularExpressions;

namespace HideAndSeek.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FileController : ControllerBase
    {
        [HttpPost("import")]
        public IActionResult ImportFile([FromForm] IFormFile file, [FromForm] string key, [FromForm] string operation)
        {
            string name = file.FileName;
            string extension = Regex.Match(name, @"\..*").Value;
            string fileName = name.Replace(extension, "");
            byte[] fileToBytes;
            byte[] keyToBytes = Encoding.ASCII.GetBytes(key);
            using (var memoryStream = new MemoryStream())
            {
                file.CopyTo(memoryStream);

                fileToBytes = memoryStream.ToArray();
                if(operation=="encrypt")
                    extension += ".enc";
                else
                {
                    int n = extension.Split('.').Length;
                    if (extension.Split('.').Length > 2)
                        extension = extension.Replace(".enc", "");
                    else
                        extension += ".dec";
                }
            }
            byte[] encryptedDataBytes = Cryptographer.EncryptDecrypt(fileToBytes, keyToBytes);
            string folderName = @".\EncryptedDataStore";
            fileName += extension;
            string pathString = System.IO.Path.Combine(folderName, fileName);
            
            System.IO.File.WriteAllBytes(pathString, encryptedDataBytes);
               
            return Ok(fileToBytes);
        }

    }
}
