using System.Text.Json.Serialization;

namespace LYL.Domain.Model.JsonModel;

public class RootConfig
{
    [JsonPropertyName("housing")]
    public Housing Housing { get; set; } = new();

    [JsonPropertyName("living_costs")]
    public LivingCosts LivingCosts { get; set; } = new();

    [JsonPropertyName("mobility")]
    public Mobility Mobility { get; set; } = new();

    [JsonPropertyName("general_insurance")]
    public GeneralInsurance GeneralInsurance { get; set; } = new();

    [JsonPropertyName("savings")]
    public Savings Savings { get; set; } = new();

}
