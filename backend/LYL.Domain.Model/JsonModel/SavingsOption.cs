using System.Text.Json.Serialization;
namespace LYL.Domain.Model.JsonModel
{
    public class SavingsOption
    {
        [JsonPropertyName("id")]
        public string Id { get; set; } = string.Empty;

        [JsonPropertyName("nameKey")]
        public string NameKey { get; set; } = string.Empty;

        [JsonPropertyName("amountKey")]
        public string AmountKey { get; set; } = string.Empty;

        [JsonPropertyName("returnKey")]
        public string ReturnKey { get; set; } = string.Empty;

        [JsonPropertyName("infoKey")]
        public string InfoKey { get; set; } = string.Empty;
    }
}