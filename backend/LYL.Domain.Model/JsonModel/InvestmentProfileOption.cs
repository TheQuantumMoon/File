using System.Text.Json.Serialization;

namespace LYL.Domain.Model.JsonModel;

public class InvestmentProfileOption
{
    [JsonPropertyName("id")]
    public string Id { get; set; } = string.Empty;

    [JsonPropertyName("nameKey")]
    public string NameKey { get; set; } = string.Empty;

    [JsonPropertyName("rate")]
    public decimal Rate { get; set; }

    [JsonPropertyName("marketModifiers")]
    public MarketModifiers MarketModifiers { get; set; } = new();
}
