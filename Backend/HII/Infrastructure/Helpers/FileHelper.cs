using Microsoft.AspNetCore.Http;
using System;
using System.IO;
using System.Threading.Tasks;

namespace Core.Helpers
{
    public static class FileHelper
    {
        private static readonly string[] ValidImageMimeTypes = { "image/jpeg", "image/png", "image/gif" };
        private static readonly string[] ValidDocumentMimeTypes =
            { "application/pdf", "application/vnd.openxmlformats-officedocument.wordprocessingml.document", "application/msword" };

        public static async Task<string> SaveFileAsync(IFormFile file, string folderPath)
        {
            if (file == null || file.Length == 0)
                throw new ArgumentException("File cannot be null or empty.");

            var uniqueFileName = $"{Guid.NewGuid() + file.FileName}{Path.GetExtension(file.FileName)}";
            var savePath = Path.Combine(folderPath, uniqueFileName);

            using (var stream = new FileStream(savePath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }

            return uniqueFileName; // Sunucu üzerindeki yolu veritabanına kaydedersiniz.
        }
        public static async Task<byte[]> DownloadFileAsync(string filePath)
        {
            // Dosya mevcut mu kontrolü
            if (string.IsNullOrEmpty(filePath) || !File.Exists(filePath))
                throw new FileNotFoundException("File not found.");

            // Dosya içeriğini byte dizisi olarak oku ve döndür
            return await File.ReadAllBytesAsync(filePath);
        }

        public static bool IsValidImage(IFormFile file) => ValidImageMimeTypes.Contains(file.ContentType);
        public static bool IsValidDocument(IFormFile file) => ValidDocumentMimeTypes.Contains(file.ContentType);
    }
}
