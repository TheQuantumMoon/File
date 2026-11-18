using System;
using System.Text.Json.Serialization;

namespace LYL.Domain.Model;

public class CharacterProfile
{
    [JsonPropertyName("id")] public required string Id { get; set; }
    [JsonPropertyName("nameKey")] public required string Name { get; set; }
    [JsonPropertyName("age")] public required int Age { get; set; }
    [JsonPropertyName("educationKey")] public required string EducationKey { get; set; }
    [JsonPropertyName("interestsKey")] public required string InterestKey { get; set; }
    [JsonPropertyName("infoKey")] public required string InfoKey { get; set; }
    [JsonPropertyName("experienceKey")] public required string ExperienceKey { get; set; }

    [JsonPropertyName("parentalSupportKey")]
    public required string ParentalSupportKey { get; set; }

    [JsonPropertyName("experienceInMonths")]
    public int ExperienceInMonths { get; set; }
}
