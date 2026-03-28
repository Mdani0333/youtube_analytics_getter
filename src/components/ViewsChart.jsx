import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell,
} from "recharts";
import { fmt, fmtFull, CHART_COLOR, TRENDING_COLOR } from "../lib/utils";

export default function ViewsChart({ chartData, avgViews }) {
  if (!chartData.length) return null;

  return (
    <div
      style={{
        background: "#fff",
        border: "1px solid #e5e7eb",
        borderRadius: 14,
        padding: "20px 24px",
        marginBottom: 16,
        boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
      }}
    >
      <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 16, color: "#111827" }}>
        Top 10 videos by views
      </div>
      <div style={{ width: "100%", height: Math.max(280, chartData.length * 38) }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            layout="vertical"
            margin={{ top: 0, right: 20, bottom: 0, left: 8 }}
          >
            <XAxis
              type="number"
              tickFormatter={fmt}
              tick={{ fontSize: 11, fill: "#9ca3af" }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              type="category"
              dataKey="name"
              width={185}
              tick={{ fontSize: 11, fill: "#6b7280" }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              formatter={(v) => [fmtFull(v), "Views"]}
              contentStyle={{
                fontSize: 12,
                borderRadius: 10,
                border: "1px solid #e5e7eb",
                boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
              }}
            />
            <Bar dataKey="views" radius={[0, 5, 5, 0]}>
              {chartData.map((entry, i) => (
                <Cell
                  key={i}
                  fill={entry.views > avgViews * 1.5 ? TRENDING_COLOR : CHART_COLOR}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div style={{ display: "flex", gap: 16, marginTop: 14, fontSize: 11, color: "#9ca3af" }}>
        {[
          ["Normal", CHART_COLOR],
          ["Trending (1.5× avg)", TRENDING_COLOR],
        ].map(([label, color]) => (
          <span key={label} style={{ display: "flex", alignItems: "center", gap: 5 }}>
            <span
              style={{ width: 10, height: 10, borderRadius: 2, background: color, display: "inline-block" }}
            />
            {label}
          </span>
        ))}
      </div>
    </div>
  );
}
