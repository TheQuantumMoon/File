export interface JoinTableResponse {
  playerId: string;
  nickName: string;
  tableNumber: number;
  currentPhase: string;
  isGameAlreadyStarted: boolean;
}

export interface LeaveTableResponse {
  playerId: string;
  nickName: string;
  tableNumber: number;
}

export interface DashboardBreakdownItem {
  label: string;
  count: number;
  percentage: number;
}

export interface SupervisorDashboardResponse {
  totalPlayers: number;
  stillAtHomePercentage: number;
  averageAmountAtThirty: number;
  playersWithSubmittedData: number;
  mobilityBreakdown: DashboardBreakdownItem[];
  insuranceBreakdown: DashboardBreakdownItem[];
}
