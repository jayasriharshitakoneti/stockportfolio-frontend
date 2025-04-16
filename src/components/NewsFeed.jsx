import React, { useEffect, useState } from "react";
import axios from "axios";

const NewsFeed = ({ userId }) => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    const loadNews = async () => {
      const res = await axios.get("http://localhost:8080/user/news", {
        params: { userId },
      });
      setNews(res.data);
    };
    loadNews();
  }, [userId]);

  return (
    <div style={styles.card}>
      <h2>Market News</h2>
      {news.length ? (
        <ul>
          {news.map((n) => (
            <li key={n.news_id} style={styles.item}>
              <strong>{n.headline}</strong>
              <br />
              <span style={styles.meta}>
                {n.symbol} - {n.company_name}
                <br />
                {n.publication_date} | {n.news_source} | Impact:{" "}
                {n.impact_score}%
              </span>
            </li>
          ))}
        </ul>
      ) : (
        <p>No news available.</p>
      )}
    </div>
  );
};

const styles = {
  card: {
    background: "#fff",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    marginBottom: "30px",
  },
  item: {
    marginBottom: "15px",
  },
  meta: {
    fontSize: "14px",
    color: "#555",
  },
};

export default NewsFeed;
