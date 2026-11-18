using System;
using System.Text.Json.Serialization;

namespace LYL.Domain.Model;

public class StudentPhaseOption
{
    [JsonPropertyName("id")] public string Id { get; set; } = string.Empty;
    [JsonPropertyName("titleKey")] public string TitleKey { get; set; } = string.Empty;
    [JsonPropertyName("descriptionKey")] public string DescriptionKey { get; set; } = string.Empty;
    [JsonPropertyName("preFilledSlots")] public int FilledSlots { get; set; }
    [JsonPropertyName("maxSlots")] public int MaxSlots { get; set; }

    public void FillSlot()
    {
        FilledSlots++;
    }
}
