public class TokenService
{
    private readonly AppDbContext _context;

    public TokenService(AppDbContext context)
    {
        _context = context;
    }

    public async Task SaveTokenAsync(int userId, string token, DateTime expiry)
    {
        var userToken = new UserToken
        {
            UserId = userId,
            Token = token,
            Expiration = expiry
        };

        _context.UserTokens.Add(userToken);
        await _context.SaveChangesAsync();
    }
}
