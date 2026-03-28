const API_BASE = "https://www.googleapis.com/youtube/v3";
const API_KEY = import.meta.env.VITE_YT_API_KEY ?? "";

function parseChannelUrl(raw) {
  const s = raw.trim();
  try {
    const u = new URL(s.startsWith("http") ? s : "https://" + s);
    const p = u.pathname;
    if (p.startsWith("/@")) return { type: "handle", value: p.slice(2).split("/")[0] };
    if (p.startsWith("/channel/")) return { type: "id", value: p.split("/channel/")[1].split("/")[0] };
    if (p.startsWith("/user/")) return { type: "username", value: p.split("/user/")[1].split("/")[0] };
  } catch {}
  if (s.startsWith("@")) return { type: "handle", value: s.slice(1) };
  if (/^UC[a-zA-Z0-9_-]{22}$/.test(s)) return { type: "id", value: s };
  return null;
}

async function yt(endpoint, params) {
  const url = `${API_BASE}/${endpoint}?${new URLSearchParams({ ...params, key: API_KEY })}`;
  const r = await fetch(url);
  const d = await r.json();
  if (d.error) throw new Error(d.error.message);
  return d;
}

export async function analyze(channelUrl) {
  const parsed = parseChannelUrl(channelUrl);
  if (!parsed) throw new Error("Invalid YouTube channel URL");

  let channelInfo;
  if (parsed.type === "id") {
    const d = await yt("channels", { part: "snippet,statistics", id: parsed.value });
    if (!d.items?.length) throw new Error("Channel not found");
    channelInfo = d.items[0];
  } else if (parsed.type === "handle") {
    const d = await yt("channels", { part: "snippet,statistics", forHandle: parsed.value });
    if (!d.items?.length) throw new Error("Channel not found. Try using the full channel URL.");
    channelInfo = d.items[0];
  } else {
    const d = await yt("channels", { part: "snippet,statistics", forUsername: parsed.value });
    if (!d.items?.length) throw new Error("Channel not found");
    channelInfo = d.items[0];
  }

  const channelId = channelInfo.id;
  const search = await yt("search", {
    part: "snippet",
    channelId,
    maxResults: 50,
    order: "date",
    type: "video",
  });
  const ids = search.items.map((i) => i.id.videoId).filter(Boolean).join(",");
  if (!ids) throw new Error("No videos found");

  const vids = await yt("videos", { part: "statistics,snippet,contentDetails", id: ids });
  return { channel: channelInfo, videos: vids.items || [] };
}
