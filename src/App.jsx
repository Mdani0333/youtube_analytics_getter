import { useState, useMemo } from "react";
import { analyze } from "./lib/youtube";
import { exportCSV } from "./lib/utils";
import Header from "./components/Header";
import SearchPage from "./components/SearchPage";
import ChannelBar from "./components/ChannelBar";
import StatsGrid from "./components/StatsGrid";
import ViewsChart from "./components/ViewsChart";
import VideoTable from "./components/VideoTable";

export default function App() {
  const [channelUrl, setChannelUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [data, setData] = useState(null);
  const [sortBy, setSortBy] = useState("views");
  const [filter, setFilter] = useState("");
  const [period, setPeriod] = useState(30);

  const handleAnalyze = async () => {
    if (!channelUrl.trim()) { setError("Please enter a channel URL."); return; }
    setLoading(true);
    setError("");
    setData(null);
    try {
      setData(await analyze(channelUrl));
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const filteredVideos = useMemo(() => {
    if (!data) return [];
    const cutoff = new Date(Date.now() - period * 86400000);
    return data.videos.filter((v) => {
      const inPeriod = new Date(v.snippet.publishedAt) >= cutoff;
      const matchesFilter = !filter || v.snippet.title.toLowerCase().includes(filter.toLowerCase());
      return inPeriod && matchesFilter;
    });
  }, [data, period, filter]);

  const sortedVideos = useMemo(() => {
    return [...filteredVideos].sort((a, b) => {
      if (sortBy === "date") return new Date(b.snippet.publishedAt) - new Date(a.snippet.publishedAt);
      const key = sortBy === "views" ? "viewCount" : sortBy === "likes" ? "likeCount" : "commentCount";
      return (parseInt(b.statistics[key]) || 0) - (parseInt(a.statistics[key]) || 0);
    });
  }, [filteredVideos, sortBy]);

  const avgViews = useMemo(() => {
    if (!filteredVideos.length) return 0;
    return filteredVideos.reduce((s, v) => s + (parseInt(v.statistics.viewCount) || 0), 0) / filteredVideos.length;
  }, [filteredVideos]);

  const totalViews = filteredVideos.reduce((s, v) => s + (parseInt(v.statistics.viewCount) || 0), 0);
  const totalLikes = filteredVideos.reduce((s, v) => s + (parseInt(v.statistics.likeCount) || 0), 0);
  const totalComments = filteredVideos.reduce((s, v) => s + (parseInt(v.statistics.commentCount) || 0), 0);

  const chartData = useMemo(
    () =>
      sortedVideos.slice(0, 10).map((v) => ({
        name: v.snippet.title.length > 28 ? v.snippet.title.slice(0, 28) + "…" : v.snippet.title,
        views: parseInt(v.statistics.viewCount) || 0,
        id: v.id,
      })),
    [sortedVideos],
  );

  const isTrending = (v) => (parseInt(v.statistics.viewCount) || 0) > avgViews * 1.5;

  if (!data) {
    return (
      <>
        <Header showActions={false} />
        <SearchPage
          channelUrl={channelUrl}
          setChannelUrl={setChannelUrl}
          onAnalyze={handleAnalyze}
          loading={loading}
          error={error}
        />
      </>
    );
  }

  return (
    <>
      <Header
        showActions
        onExport={() => exportCSV(sortedVideos)}
        onReset={() => setData(null)}
      />
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "24px 20px" }}>
        <ChannelBar channel={data.channel} />
        <StatsGrid
          filteredVideos={filteredVideos}
          totalViews={totalViews}
          totalLikes={totalLikes}
          totalComments={totalComments}
          avgViews={avgViews}
          isTrending={isTrending}
        />
        <ViewsChart chartData={chartData} avgViews={avgViews} />
        <VideoTable
          sortedVideos={sortedVideos}
          filter={filter}
          setFilter={setFilter}
          sortBy={sortBy}
          setSortBy={setSortBy}
          period={period}
          setPeriod={setPeriod}
          isTrending={isTrending}
        />
      </div>
    </>
  );
}
