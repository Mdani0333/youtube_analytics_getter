export function fmt(n) {
  n = parseInt(n) || 0;
  if (n >= 1e9) return (n / 1e9).toFixed(1) + "B";
  if (n >= 1e6) return (n / 1e6).toFixed(1) + "M";
  if (n >= 1e3) return (n / 1e3).toFixed(1) + "K";
  return n.toLocaleString();
}

export function fmtFull(n) {
  return (parseInt(n) || 0).toLocaleString();
}

export function parseDur(iso) {
  if (!iso) return "-";
  const m = iso.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!m) return "-";
  const h = parseInt(m[1] || 0), mn = parseInt(m[2] || 0), s = parseInt(m[3] || 0);
  return h > 0
    ? `${h}:${String(mn).padStart(2, "0")}:${String(s).padStart(2, "0")}`
    : `${mn}:${String(s).padStart(2, "0")}`;
}

export function ago(dateStr) {
  const d = Math.floor((Date.now() - new Date(dateStr)) / 86400000);
  if (d === 0) return "Today";
  if (d === 1) return "Yesterday";
  if (d < 7) return `${d}d ago`;
  if (d < 30) return `${Math.floor(d / 7)}w ago`;
  if (d < 365) return `${Math.floor(d / 30)}mo ago`;
  return `${Math.floor(d / 365)}y ago`;
}

export function exportCSV(videos) {
  const rows = [["Title", "Views", "Likes", "Comments", "Duration", "Published", "URL"]];
  videos.forEach((v) => {
    rows.push([
      `"${v.snippet.title.replace(/"/g, '""')}"`,
      v.statistics.viewCount || 0,
      v.statistics.likeCount || 0,
      v.statistics.commentCount || 0,
      parseDur(v.contentDetails.duration),
      v.snippet.publishedAt?.slice(0, 10),
      `https://youtube.com/watch?v=${v.id}`,
    ]);
  });
  const blob = new Blob([rows.map((r) => r.join(",")).join("\n")], { type: "text/csv" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "vidmetrics_export.csv";
  a.click();
}

export const SORT_OPTIONS = [
  { value: "views", label: "Views" },
  { value: "likes", label: "Likes" },
  { value: "comments", label: "Comments" },
  { value: "date", label: "Date" },
];

export const PERIOD_OPTIONS = [
  { value: 7, label: "7d" },
  { value: 30, label: "30d" },
  { value: 90, label: "90d" },
  { value: 365, label: "1yr" },
  { value: 9999, label: "All" },
];

export const CHART_COLOR = "#6366f1";
export const TRENDING_COLOR = "#f59e0b";
