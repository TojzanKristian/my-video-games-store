using Amazon.S3;
using Amazon.S3.Model;
using Microsoft.AspNetCore.Mvc;
using MyVideoGamesStoreAPI.Models;

namespace MyVideoGamesStoreAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FilesController : ControllerBase
    {
        private readonly IAmazonS3 _s3Client;

        public FilesController(IAmazonS3 s3Client)
        {
            _s3Client = s3Client;
        }

        /// <summary>
        /// POST method.
        /// Uploads a file to an S3 bucket with an optional prefix. The file is stored with the provided bucket name and prefix, if specified.
        /// Upis fajla u S3 bucket.
        /// </summary>
        /// <param name="file">The file to be uploaded.</param>
        /// <param name="bucketName">The name of the S3 bucket.</param>
        /// <param name="prefix">An optional prefix to be added to the file key in the bucket.</param>
        /// <returns>An IActionResult indicating the result of the upload operation.</returns>
        [HttpPost]
        public async Task<IActionResult> UploadFileAsync(IFormFile file, string bucketName, string? prefix)
        {
            var bucketExists = await Amazon.S3.Util.AmazonS3Util.DoesS3BucketExistV2Async(_s3Client, bucketName);
            if (!bucketExists) return NotFound($"Bucket {bucketName} does not exist.");
            var request = new PutObjectRequest()
            {
                BucketName = bucketName,
                Key = string.IsNullOrEmpty(prefix) ? file.FileName : $"{prefix?.TrimEnd('/')}/{file.FileName}",
                InputStream = file.OpenReadStream()
            };

            request.Metadata.Add("Content-Type", file.ContentType);
            await _s3Client.PutObjectAsync(request);
            return Ok($"File {prefix}/{file.FileName} uploaded to S3 successfully!");
        }

        /// <summary>
        /// GET method.
        /// Retrieves all files from an S3 bucket with an optional prefix and returns their names and pre-signed URLs.
        /// Čitanje svih fajlova iz S3 bucketa.
        /// </summary>
        /// <param name="bucketName">The name of the S3 bucket.</param>
        /// <param name="prefix">An optional prefix to filter the files in the bucket.</param>
        /// <returns>A list of objects containing the file names and pre-signed URLs.</returns>
        [HttpGet]
        public async Task<IActionResult> GetAllFilesAsync(string bucketName, string? prefix)
        {
            var bucketExists = await Amazon.S3.Util.AmazonS3Util.DoesS3BucketExistV2Async(_s3Client, bucketName);
            if (!bucketExists) return NotFound($"Bucket {bucketName} does not exist.");
            var request = new ListObjectsV2Request()
            {
                BucketName = bucketName,
                Prefix = prefix
            };

            var result = await _s3Client.ListObjectsV2Async(request);
            var s3Objects = result.S3Objects.Select(s =>
            {
                var urlRequest = new GetPreSignedUrlRequest()
                {
                    BucketName = bucketName,
                    Key = s.Key,
                    Expires = DateTime.UtcNow.AddMinutes(1)
                };
                return new MyS3Object()
                {
                    Name = s.Key.ToString(),
                    PresignedUrl = _s3Client.GetPreSignedURL(urlRequest),
                };
            });

            return Ok(s3Objects);
        }

        /// <summary>
        /// Normalizes a string by removing file extensions, punctuation, and converting it to lowercase.
        /// Funkcijza za normalizaciju zadatog stringa.
        /// </summary>
        /// <param name="input">The string to be normalized.</param>
        /// <returns>A normalized version of the input string, with file extensions and certain punctuation removed, and all characters converted to lowercase.</returns>
        public string NormalizeString(string input)
        {
            int dotIndex = input.LastIndexOf('.');
            if (dotIndex >= 0)
            {
                input = input.Substring(0, dotIndex);
            }

            input = input.Replace(":", "").Replace(" ", "").ToLowerInvariant();
            return input;
        }
    }
}