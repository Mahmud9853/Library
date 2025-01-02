using Core.Interfaces;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Microsoft.Extensions.Caching.Memory;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Services
{
    public class ResponseCacheService : IResponseCacheService
    {
        private readonly IMemoryCache _cache;

        public ResponseCacheService(IMemoryCache cache)
        {
            _cache = cache;
        }
        public async Task CacheResponseAsync(string cacheKey, object response, TimeSpan timeToLive)
        {
            var options = new MemoryCacheEntryOptions
            {
                AbsoluteExpirationRelativeToNow = timeToLive
            };

            _cache.Set(cacheKey, response, options);
            await Task.CompletedTask;
        }

        public Task<string> GetCachedResponseAsync(string key)
        {
            _cache.TryGetValue(key, out var cachedResponse);
            return Task.FromResult(cachedResponse as string);
        }
    }
}
