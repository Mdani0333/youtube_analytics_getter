import { fmt } from "../lib/utils";

export default function StatsGrid({ filteredVideos, totalViews, totalLikes, totalComments, avgViews, isTrending }) {
  const trendingCount = filteredVideos.filter(isTrending).length;

  const cards = [
    { label: "Videos", value: filteredVideos.length, accent: false },
    { label: "Total views", value: fmt(totalViews), accent: false },
    { label: "Total likes", value: fmt(totalLikes), accent: false },
    { label: "Comments", value: fmt(totalComments), accent: false },
    { label: "Avg views", value: fmt(Math.round(avgViews)), accent: false },
    { label: "Trending", value: trendingCount, suffix: " 🔥", accent: trendingCount > 0 },
  ];

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
        gap: 12,
        marginBottom: 16,
      }}
    >
      {cards.map(({ label, value, suffix = "", accent }) => (
        <div
          key={label}
          style={{
            background: accent ? "#fffbeb" : "#fff",
            border: `1px solid ${accent ? "#fde68a" : "#e5e7eb"}`,
            borderRadius: 12,
            padding: "16px 18px",
            boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
          }}
        >
          <div
            style={{
              fontSize: 10,
              color: "#9ca3af",
              marginBottom: 8,
              textTransform: "uppercase",
              letterSpacing: 0.6,
              fontWeight: 600,
            }}
          >
            {label}
          </div>
          <div style={{ fontSize: 22, fontWeight: 800, color: accent ? "#92400e" : "#111827" }}>
            {value}{suffix}
          </div>
        </div>
      ))}
    </div>
  );
}
