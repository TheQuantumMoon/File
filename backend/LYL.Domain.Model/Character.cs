using System;
using System.Text.Json.Serialization;

namespace LYL.Domain.Model;

public class Character
{
    [JsonPropertyName("profile")] public required CharacterProfile Profile { get; set; }
    public int AllocatablePoints { get; private set; } = 3;
    [JsonPropertyName("studentPhase")] public required CharacterStudentPhase StudentPhase { get; set; }
    [JsonPropertyName("career")] public required CharacterCareer Career { get; set; }
    public Job? ChosenJob { get; set; }
    
    public LivingSituation? LivingSituation {get; set;}

    public void AssignRandomJob()
    {
        Random random = new Random();
        int randomNumber = random.Next(0, 3);
        ChosenJob = Career.AvailableJobs[randomNumber];
    }
}
