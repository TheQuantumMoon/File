namespace LYL.Api.Contracts.Supervisor;

public class SupervisorDashboardResponse
{
    public int TotalPlayers { get; set; }
    public decimal StillAtHomePercentage { get; set; }
    public decimal AverageAmountAtThirty { get; set; }
    public int PlayersWithSubmittedData { get; set; }
    public List<DashboardBreakdownItem> MobilityBreakdown { get; set; } = new();
    public List<DashboardBreakdownItem> InsuranceBreakdown { get; set; } = new();
}

public class DashboardBreakdownItem
{
    public string Label { get; set; } = string.Empty;
    public int Count { get; set; }
    public decimal Percentage { get; set; }
}
