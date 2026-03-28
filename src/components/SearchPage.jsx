export default function SearchPage({ channelUrl, setChannelUrl, onAnalyze, loading, error }) {
  return (
    <main
      style={{
        minHeight: "calc(100vh - 56px)",
        background: "linear-gradient(145deg, #f5f3ff 0%, #f7f8fc 50%, #fef9f0 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px 20px",
      }}
    >
      <div style={{ width: "100%", maxWidth: 500 }}>
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              background: "#ede9fe",
              borderRadius: 20,
              padding: "4px 14px",
              fontSize: 12,
              color: "#6366f1",
              fontWeight: 600,
              marginBottom: 18,
              letterSpacing: 0.3,
            }}
          >
            YouTube Analytics
          </div>
          <h1
            style={{
              fontSize: 30,
              fontWeight: 800,
              color: "#111827",
              marginBottom: 12,
              lineHeight: 1.25,
              letterSpacing: -0.5,
            }}
          >
            Analyze any YouTube channel
          </h1>
          <p style={{ color: "#6b7280", lineHeight: 1.7, fontSize: 15, maxWidth: 400, margin: "0 auto" }}>
            Paste a competitor&apos;s channel URL to instantly see which videos are performing best.
          </p>
        </div>

        <div
          style={{
            background: "#fff",
            border: "1px solid #e5e7eb",
            borderRadius: 18,
            padding: "28px",
            boxShadow: "0 8px 32px rgba(99,102,241,0.08), 0 2px 8px rgba(0,0,0,0.06)",
          }}
        >
          <label
            style={{ fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 8, display: "block" }}
          >
            Channel URL
          </label>
          <input
            value={channelUrl}
            onChange={(e) => setChannelUrl(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && onAnalyze()}
            placeholder="https://youtube.com/@mkbhd  ·  @handle  ·  UCxxxxx"
            style={{ marginBottom: error ? 10 : 16 }}
          />
          {error && (
            <p style={{ color: "#dc2626", fontSize: 13, marginBottom: 14 }}>{error}</p>
          )}
          <button
            onClick={onAnalyze}
            disabled={loading}
            style={{
              width: "100%",
              padding: "11px",
              background: loading ? "#818cf8" : "#6366f1",
              color: "#fff",
              border: "none",
              borderRadius: 10,
              fontSize: 14,
              fontWeight: 700,
              cursor: loading ? "not-allowed" : "pointer",
              letterSpacing: 0.1,
              boxShadow: loading ? "none" : "0 2px 8px rgba(99,102,241,0.35)",
            }}
          >
            {loading ? "Fetching data…" : "Analyze channel →"}
          </button>
        </div>

        <p style={{ fontSize: 12, color: "#9ca3af", textAlign: "center", marginTop: 18 }}>
          Supports @handles · channel IDs · /user/ URLs
        </p>
      </div>
    </main>
  );
}
