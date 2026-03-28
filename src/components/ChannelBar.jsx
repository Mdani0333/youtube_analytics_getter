import { fmt } from "../lib/utils";

export default function ChannelBar({ channel }) {
  const { snippet, statistics } = channel;
  const thumb = snippet.thumbnails?.medium?.url || snippet.thumbnails?.default?.url;

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 16,
        background: "#fff",
        border: "1px solid #e5e7eb",
        borderRadius: 14,
        padding: "18px 22px",
        marginBottom: 16,
        boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
      }}
    >
      {thumb && (
        <img
          src={thumb}
          alt=""
          style={{
            width: 56,
            height: 56,
            borderRadius: "50%",
            objectFit: "cover",
            flexShrink: 0,
            border: "2px solid #e5e7eb",
          }}
        />
      )}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontWeight: 700, fontSize: 17, marginBottom: 3, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
          {snippet.title}
        </div>
        <div style={{ fontSize: 13, color: "#6b7280" }}>{snippet.customUrl || ""}</div>
      </div>
      <div style={{ display: "flex", gap: 28, flexWrap: "wrap", flexShrink: 0 }}>
        {[
          ["Subscribers", fmt(statistics.subscriberCount)],
          ["Videos", fmt(statistics.videoCount)],
          ["Total views", fmt(statistics.viewCount)],
        ].map(([label, value]) => (
          <div key={label} style={{ textAlign: "right" }}>
            <div style={{ fontSize: 11, color: "#9ca3af", marginBottom: 3, textTransform: "uppercase", letterSpacing: 0.4 }}>
              {label}
            </div>
            <div style={{ fontWeight: 700, fontSize: 16 }}>{value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
