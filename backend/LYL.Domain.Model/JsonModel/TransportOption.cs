using System.Text.Json.Serialization;
namespace LYL.Domain.Model.JsonModel
{
    public class TransportOption
    {
        [JsonPropertyName("id")]
        public string Id { get; set; } = string.Empty;

        [JsonPropertyName("nameKey")]
        public string NameKey { get; set; } = string.Empty;

        [JsonPropertyName("infoKey")]
        public string InfoKey { get; set; } = string.Empty;

        [JsonPropertyName("purchasePrice")]
        public decimal PurchasePrice { get; set; }

        [JsonPropertyName("monthlyPurchase")]
        public decimal MonthlyPurchase { get; set; }

        [JsonPropertyName("monthlyCost")]
        public decimal MonthlyCost { get; set; }

        [JsonPropertyName("space")]
        public int Space  { get; set; }
    }
}