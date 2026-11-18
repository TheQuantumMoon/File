import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import type { DashboardBreakdownItem, SupervisorDashboardResponse } from "../types/Reponses";

const emptyDashboard: SupervisorDashboardResponse = {
  totalPlayers: 0,
  stillAtHomePercentage: 0,
  averageAmountAtThirty: 0,
  playersWithSubmittedData: 0,
  mobilityBreakdown: [],
  insuranceBreakdown: [],
};

const euroFormat = new Intl.NumberFormat("nl-BE", {
  style: "currency",
  currency: "EUR",
  maximumFractionDigits: 0,
});

function BreakdownList({
  items,
  emptyText,
  translateLabel,
}: {
  items: DashboardBreakdownItem[];
  emptyText: string;
  translateLabel: (label: string) => string;
}) {
  if (items.length === 0) {
    return <p className="text-sm text-slate-500">{emptyText}</p>;
  }

  return (
    <ul className="space-y-2">
      {items.map((item) => (
        <li
          key={item.label}
          className="flex items-center justify-between rounded-xl bg-slate-50 px-3 py-2"
        >
          <span className="font-semibold text-slate-700">{translateLabel(item.label)}</span>
          <span className="text-sm font-bold text-teal-700">
            {item.count} ({item.percentage.toFixed(1)}%)
          </span>
        </li>
      ))}
    </ul>
  );
}

export default function SupervisorDashboardPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [dashboard, setDashboard] = useState<SupervisorDashboardResponse>(emptyDashboard);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const translateBreakdownLabel = (label: string) => {
    const keyMap: Record<string, string> = {
      "Geen wagen": "supervisor_dashboard.breakdown_labels.no_car",
      "Kleine wagen": "supervisor_dashboard.breakdown_labels.small_car",
      Gezinswagen: "supervisor_dashboard.breakdown_labels.family_car",
      Sportwagen: "supervisor_dashboard.breakdown_labels.sports_car",
      Autoverzekering: "supervisor_dashboard.breakdown_labels.car_insurance",
      Brandverzekering: "supervisor_dashboard.breakdown_labels.fire_insurance",
      "Familiale verzekering": "supervisor_dashboard.breakdown_labels.family_insurance",
      Hospitalisatieverzekering: "supervisor_dashboard.breakdown_labels.hospitalization_insurance",
      Ongevallenverzekering: "supervisor_dashboard.breakdown_labels.accident_insurance",
    };

    const key = keyMap[label];
    return key ? t(key) : label;
  };

  useEffect(() => {
    const loadDashboard = async () => {
      const roomCode = localStorage.getItem("supervisorRoomCode");
      if (!roomCode) {
        setError(t("supervisor_dashboard.errors.no_active_room"));
        setIsLoading(false);
        return;
      }

      try {
        const response = await axios.get<SupervisorDashboardResponse>(
          `${import.meta.env.VITE_API_BASE_URL}/api/game/${roomCode}/supervisor-dashboard`,
        );
        setDashboard(response.data);
      } catch {
        setError(t("supervisor_dashboard.errors.load_failed"));
      } finally {
        setIsLoading(false);
      }
    };

    loadDashboard();
  }, [t]);

  return (
    <div className="min-h-screen bg-slate-100 px-4 py-6 md:px-8">
      <div className="mx-auto max-w-6xl space-y-6">
        <div className="flex items-center justify-between rounded-3xl bg-white px-6 py-4 shadow-sm border-2 border-teal-50">
          <div>
            <p className="text-sm font-bold uppercase tracking-widest text-teal-600">
              {t("supervisor_dashboard.kicker")}
            </p>
            <h1 className="text-2xl md:text-3xl font-black text-teal-900">
              {t("supervisor_dashboard.title")}
            </h1>
          </div>
          <button
            onClick={() => navigate("/supervisor")}
            className="rounded-full bg-teal-500 px-5 py-2 text-sm font-black uppercase tracking-wide text-white hover:bg-teal-600"
          >
            {t("supervisor_dashboard.back_to_supervisor")}
          </button>
        </div>

        {isLoading && (
          <div className="rounded-3xl bg-white p-6 shadow-sm border-2 border-teal-50 text-slate-600">
            {t("supervisor_dashboard.loading")}
          </div>
        )}

        {error && !isLoading && (
          <div className="rounded-3xl bg-rose-50 p-6 shadow-sm border-2 border-rose-100 text-rose-700 font-semibold">
            {error}
          </div>
        )}

        {!isLoading && !error && (
          <>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="rounded-3xl bg-white p-6 shadow-sm border-2 border-teal-50">
                <div className="mb-3 flex items-center gap-2">
                  <img
                    src="/huisvestiging.svg"
                    alt={t("supervisor_dashboard.alt.housing")}
                    className="h-6 w-6"
                  />
                  <h2 className="font-black text-teal-900">
                    {t("supervisor_dashboard.housing.title")}
                  </h2>
                </div>
                <p className="text-sm text-slate-600">
                  {t("supervisor_dashboard.housing.still_home")}
                </p>
                <p className="mt-2 text-3xl font-black text-teal-700">
                  {dashboard.stillAtHomePercentage.toFixed(1)}%
                </p>
              </div>

              <div className="rounded-3xl bg-white p-6 shadow-sm border-2 border-teal-50">
                <div className="mb-3 flex items-center gap-2">
                  <img
                    src="/sparenenbeleggen.svg"
                    alt={t("supervisor_dashboard.alt.wealth")}
                    className="h-6 w-6"
                  />
                  <h2 className="font-black text-teal-900">
                    {t("supervisor_dashboard.wealth.title")}
                  </h2>
                </div>
                <p className="text-sm text-slate-600">
                  {t("supervisor_dashboard.wealth.subtitle")}
                </p>
                <p className="mt-2 text-3xl font-black text-teal-700">
                  {euroFormat.format(dashboard.averageAmountAtThirty)}
                </p>
              </div>

              <div className="rounded-3xl bg-white p-6 shadow-sm border-2 border-teal-50">
                <div className="mb-3 flex items-center gap-2">
                  <img
                    src="/student.svg"
                    alt={t("supervisor_dashboard.alt.players")}
                    className="h-6 w-6"
                  />
                  <h2 className="font-black text-teal-900">
                    {t("supervisor_dashboard.coverage.title")}
                  </h2>
                </div>
                <p className="text-sm text-slate-600">
                  {t("supervisor_dashboard.coverage.subtitle")}
                </p>
                <p className="mt-2 text-3xl font-black text-teal-700">
                  {dashboard.playersWithSubmittedData}/{dashboard.totalPlayers}
                </p>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-3xl bg-white p-6 shadow-sm border-2 border-teal-50">
                <div className="mb-4 flex items-center gap-2">
                  <img
                    src="/mobiliteit.svg"
                    alt={t("supervisor_dashboard.alt.mobility")}
                    className="h-6 w-6"
                  />
                  <h2 className="font-black text-teal-900">
                    {t("supervisor_dashboard.mobility.title")}
                  </h2>
                </div>
                <BreakdownList
                  items={dashboard.mobilityBreakdown}
                  emptyText={t("supervisor_dashboard.no_data")}
                  translateLabel={translateBreakdownLabel}
                />
              </div>

              <div className="rounded-3xl bg-white p-6 shadow-sm border-2 border-teal-50">
                <div className="mb-4 flex items-center gap-2">
                  <img
                    src="/verzekering.svg"
                    alt={t("supervisor_dashboard.alt.insurance")}
                    className="h-6 w-6"
                  />
                  <h2 className="font-black text-teal-900">
                    {t("supervisor_dashboard.insurance.title")}
                  </h2>
                </div>
                <BreakdownList
                  items={dashboard.insuranceBreakdown}
                  emptyText={t("supervisor_dashboard.no_data")}
                  translateLabel={translateBreakdownLabel}
                />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
