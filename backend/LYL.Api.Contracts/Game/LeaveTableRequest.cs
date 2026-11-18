using System;

namespace LYL.Api.Contracts.Game;

public class LeaveTableRequest
{
    public string RoomCode { get; set; } = string.Empty;
    public int TableNumber { get; set; }
    public string NickName { get; set; } = string.Empty;
    public Guid PlayerId { get; set; }
}
