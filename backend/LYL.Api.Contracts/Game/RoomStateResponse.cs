using System;

namespace LYL.Api.Contracts.Game;

public class RoomStateResponse
{
    public string RoomCode { get; set; } = string.Empty;
    public bool IsActive { get; set; }
    public List<PlayerStateDto> Players { get; set; } = new();
}

public class PlayerStateDto
{
    public string PlayerId { get; set; } = string.Empty;
    public string NickName { get; set; } = string.Empty;
    public int TableNumber { get; set; }
    public bool IsOffline { get; set; }
    public string CurrentPhase { get; set; } = string.Empty;
}
