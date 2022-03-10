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
        [HttpGet("download")]
        public IActionResult SendFile()
        {
            //return File(System.IO.File.ReadAllBytes(Directory.GetFiles(@".\EncryptedDataStore")[0]), "application/octet-stream", Path.GetFileName(Directory.GetFiles(@".\EncryptedDataStore")[0]));
            var files = Directory.GetFiles(@".\EncryptedDataStore");
            var data = System.IO.File.ReadAllBytes(files[0]);
            var fileName = Path.GetFileName(files[0]);
            
            var result = new FileContentResult(data, "application/octet-stream")
            {
                FileDownloadName = fileName,
            };
            return result;
        }

        [HttpPost]
        public IActionResult UploadFile([FromForm] IFormFile file, [FromForm] string key, [FromForm] string operation)
        {
            var files = Directory.GetFiles(@".\EncryptedDataStore");
            foreach(var f in files)
            {
                System.IO.File.Delete(f);
            }
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
