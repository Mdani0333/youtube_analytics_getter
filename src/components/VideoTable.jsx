import { fmt, parseDur, ago, SORT_OPTIONS, PERIOD_OPTIONS } from "../lib/utils";

const th = {
  textAlign: "left",
  padding: "8px 10px",
  fontSize: 10,
  color: "#9ca3af",
  fontWeight: 700,
  borderBottom: "1px solid #f0f0f0",
  whiteSpace: "nowrap",
  textTransform: "uppercase",
  letterSpacing: 0.5,
};

const td = {
  padding: "11px 10px",
  borderBottom: "1px solid #f9fafb",
  verticalAlign: "middle",
};

function pill(active) {
  return {
    padding: "5px 12px",
    borderRadius: 20,
    fontSize: 12,
    cursor: "pointer",
    border: `1px solid ${active ? "#6366f1" : "#e5e7eb"}`,
    background: active ? "#6366f1" : "#fff",
    color: active ? "#fff" : "#6b7280",
    fontWeight: active ? 600 : 400,
  };
}

export default function VideoTable({
  sortedVideos,
  filter,
  setFilter,
  sortBy,
  setSortBy,
  period,
  setPeriod,
  isTrending,
}) {
  return (
    <div
      style={{
        background: "#fff",
        border: "1px solid #e5e7eb",
        borderRadius: 14,
        padding: "20px 24px",
        boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 12,
          marginBottom: 18,
        }}
      >
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap", alignItems: "center" }}>
          <span style={{ fontSize: 12, color: "#9ca3af", fontWeight: 600, marginRight: 2 }}>Period:</span>
          {PERIOD_OPTIONS.map((o) => (
            <button key={o.value} onClick={() => setPeriod(o.value)} style={pill(period === o.value)}>
              {o.label}
            </button>
          ))}
        </div>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <input
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            placeholder="Filter by title…"
            style={{ width: 180 }}
          />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            style={{ fontSize: 13 }}
          >
            {SORT_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>Sort: {o.label}</option>
            ))}
          </select>
        </div>
      </div>

      {sortedVideos.length === 0 ? (
        <p style={{ color: "#9ca3af", textAlign: "center", padding: "32px 0" }}>
          No videos found for this period.
        </p>
      ) : (
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
            <thead>
              <tr>
                <th style={th}>#</th>
                <th style={th}>Video</th>
                <th style={{ ...th, textAlign: "right" }}>Views</th>
                <th style={{ ...th, textAlign: "right" }}>Likes</th>
                <th style={{ ...th, textAlign: "right" }}>Comments</th>
                <th style={{ ...th, textAlign: "right" }}>Duration</th>
                <th style={{ ...th, textAlign: "right" }}>Published</th>
                <th style={th} />
              </tr>
            </thead>
            <tbody>
              {sortedVideos.map((v, i) => {
                const trending = isTrending(v);
                return (
                  <tr
                    key={v.id}
                    className="tr-hover"
                    style={{ background: trending ? "rgba(245,158,11,0.04)" : "transparent" }}
                  >
                    <td style={{ ...td, color: "#9ca3af", width: 28 }}>{i + 1}</td>
                    <td style={{ ...td, maxWidth: 340 }}>
                      <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                        <img
                          src={v.snippet.thumbnails?.default?.url}
                          alt=""
                          style={{ width: 62, height: 35, borderRadius: 5, objectFit: "cover", flexShrink: 0 }}
                        />
                        <a
                          href={`https://youtube.com/watch?v=${v.id}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ color: "#111827", textDecoration: "none", fontWeight: 500, lineHeight: 1.35 }}
                        >
                          {v.snippet.title.length > 65
                            ? v.snippet.title.slice(0, 65) + "…"
                            : v.snippet.title}
                        </a>
                      </div>
                    </td>
                    <td style={{ ...td, textAlign: "right", fontWeight: 700 }}>
                      {fmt(v.statistics.viewCount)}
                    </td>
                    <td style={{ ...td, textAlign: "right", color: "#6b7280" }}>
                      {fmt(v.statistics.likeCount)}
                    </td>
                    <td style={{ ...td, textAlign: "right", color: "#6b7280" }}>
                      {fmt(v.statistics.commentCount)}
                    </td>
                    <td style={{ ...td, textAlign: "right", color: "#9ca3af" }}>
                      {parseDur(v.contentDetails.duration)}
                    </td>
                    <td style={{ ...td, textAlign: "right", color: "#9ca3af", whiteSpace: "nowrap" }}>
                      {ago(v.snippet.publishedAt)}
                    </td>
                    <td style={td}>
                      {trending && (
                        <span
                          style={{
                            display: "inline-block",
                            fontSize: 10,
                            fontWeight: 700,
                            padding: "2px 8px",
                            borderRadius: 10,
                            background: "#fef3c7",
                            color: "#92400e",
                            whiteSpace: "nowrap",
                          }}
                        >
                          Trending
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
      <div style={{ fontSize: 12, color: "#9ca3af", marginTop: 14 }}>
        {sortedVideos.length} video{sortedVideos.length !== 1 ? "s" : ""} ·{" "}
        {period === 9999 ? "All time" : `Last ${period} days`} · Trending = 1.5× avg views
      </div>
    </div>
  );
}
