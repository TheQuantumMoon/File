using System;
using System.Text.Json.Serialization;

namespace LYL.Domain.Model;

public class Partner
{
    
    [JsonPropertyName("id")]
    public string Id {get; set;} = string.Empty;

    [JsonPropertyName("wageKey")]
    public string WageKey {get; set;} = string.Empty;

    [JsonPropertyName("wage")]
    public decimal Wage {get; set;}

    [JsonPropertyName("savingsKey")]
    public string SavingsKey {get; set;} = string.Empty;

    [JsonPropertyName("savings")]
    public decimal Savings {get; set;}
}
