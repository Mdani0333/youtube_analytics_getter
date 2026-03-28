const btnStyle = {
  padding: "6px 14px",
  fontSize: 13,
  borderRadius: 8,
  border: "1px solid #e5e7eb",
  background: "#fff",
  cursor: "pointer",
  color: "#374151",
  fontWeight: 400,
};

export default function Header({ showActions, onExport, onReset }) {
  return (
    <header
      style={{
        background: "#fff",
        borderBottom: "1px solid #e5e7eb",
        padding: "0 24px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        height: 56,
        position: "sticky",
        top: 0,
        zIndex: 10,
        boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
      }}
    >
      <div
        style={{
          fontWeight: 700,
          fontSize: 16,
          display: "flex",
          alignItems: "center",
          gap: 8,
          letterSpacing: -0.2,
        }}
      >
        <span
          style={{
            width: 8,
            height: 8,
            borderRadius: "50%",
            background: "#6366f1",
            display: "inline-block",
          }}
        />
        VidMetrics
      </div>

      {showActions ? (
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <button onClick={onExport} style={btnStyle}>
            Export CSV
          </button>
          <button onClick={onReset} style={{ ...btnStyle, color: "#6366f1", borderColor: "#c7d2fe" }}>
            ← New analysis
          </button>
        </div>
      ) : (
        <span style={{ fontSize: 12, color: "#9ca3af" }}>Competitor Intelligence</span>
      )}
    </header>
  );
}
