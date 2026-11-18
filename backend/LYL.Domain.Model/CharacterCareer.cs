using System;
using System.Text.Json.Serialization;

namespace LYL.Domain.Model;

public class CharacterCareer
{
    [JsonPropertyName("perksKey")] public required string PerksKey { get; set; }
    [JsonPropertyName("jobs")] public List<Job> AvailableJobs { get; set; } = [];
}
