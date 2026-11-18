using System.Text.Json.Serialization;
namespace LYL.Domain.Model.JsonModel
{
    public class BuyOption
    {
        [JsonPropertyName("id")]
        public string Id { get; set; } = string.Empty;

        [JsonPropertyName("nameKey")]
        public string NameKey { get; set; } = string.Empty;

        [JsonPropertyName("spaceKey")]
        public string SpaceKey { get; set; } = string.Empty;

        [JsonPropertyName("space")]
        public int Space {get; set;}

        [JsonPropertyName("mobilityKey")]
        public string MobilityKey { get; set; } = string.Empty;

        [JsonPropertyName("needsCar")]
        public bool NeedsCar { get; set; }

        [JsonPropertyName("price")]
        public decimal Price { get; set; }

        [JsonPropertyName("maxLoan")]
        public decimal MaxLoan { get; set; }

        [JsonPropertyName("oneTimeCosts")]
        public decimal OneTimeCosts { get; set; }

        [JsonPropertyName("startBudget")]
        public decimal StartBudget { get; set; }

        [JsonPropertyName("monthlyLoan")]
        public decimal MonthlyLoan { get; set; }
    }
}