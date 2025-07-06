using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using Trayvio.Domain.Entities;
using System.Diagnostics;

public sealed class TokenService
{
    private readonly byte[] _keyBytes;
    private readonly string _issuer;
    private readonly string _audience;
    private readonly int _expiryMinutes;
    private readonly IConfiguration _config;
    private readonly ILogger<TokenService> _logger;

    public TokenService(IConfiguration config, ILogger<TokenService> logger)
    {
        _logger = logger;
        _keyBytes = Convert.FromBase64String(config["Jwt:Key"]!);

        Debug.WriteLine("JWT Key (Base64): {JwtKey}", config["Jwt:Key"]);
        Debug.WriteLine("JWT Key (Bytes): {JwtKeyBytes}", BitConverter.ToString(_keyBytes));

        _issuer = config["Jwt:Issuer"]!;
        _audience = config["Jwt:Audience"]!;
        _expiryMinutes = config.GetValue<int>("Jwt:ExpireMinutes");
        Debug.WriteLine($"[DEBUG] JWT Key: {config["Jwt:Key"]}");
    }

    public string GenerateToken(User user)
    {
        var claims = new[]
        {
        new Claim(JwtRegisteredClaimNames.Sub, user.Id.ToString()),
        new Claim(JwtRegisteredClaimNames.Email, user.Email), // Must match NameClaimType
        new Claim(ClaimTypes.Role, user.Role)
         };

        var key = new SymmetricSecurityKey(_keyBytes);
        var token = new JwtSecurityToken(
            issuer: _issuer,
            audience: _audience,
            claims: claims,
            expires: DateTime.UtcNow.AddMinutes(_expiryMinutes),
            signingCredentials: new SigningCredentials(key, SecurityAlgorithms.HmacSha256)
        );

        return new JwtSecurityTokenHandler().WriteToken(token);
    }
}
