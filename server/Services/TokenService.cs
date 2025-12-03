using System.Text;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

public class TokenService
{
    private readonly IConfiguration _configuration;
    private readonly AppDbContext _context;

    public TokenService(IConfiguration configuration, AppDbContext context)
    {
        _configuration = configuration;
        _context = context;
    }

    public async Task SaveTokenAsync(int userId, string token)
    {
        var expiry = DateTime.UtcNow.AddMinutes(_configuration.GetValue<int>("JwtSettings:ExpiryMinutes"));
        var userToken = new UserToken
        {
            UserId = userId,
            Token = token,
            Expiration = expiry
        };

        _context.UserTokens.Add(userToken);
        await _context.SaveChangesAsync();
    }

    public async Task<bool> IsTokenExpired(string token)
    {
        var isValid = await _context.UserTokens
               .AnyAsync(t => t.Token == token && t.Expiration > DateTime.UtcNow);

        return !isValid;
    }
}
