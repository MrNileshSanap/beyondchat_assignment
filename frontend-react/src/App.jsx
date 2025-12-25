import { useEffect, useState } from "react";
import api from "./api";
import ArticleCard from "./components/ArticleCard";

function App() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [enhancing, setEnhancing] = useState(null);
  const [error, setError] = useState(null);

  const fetchArticles = () => {
    setLoading(true);
    api.get("/articles?sort=latest&limit=10")
      .then(res => {
        setArticles(res.data);
        setError(null);
      })
      .catch(err => {
        console.error('Error fetching articles:', err);
        setError('Failed to fetch articles');
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  const handleEnhance = async (articleId) => {
    try {
      setEnhancing(articleId);
      
      // Call the article processor to enhance the article
      const response = await fetch('http://localhost:3001/enhance', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Enhancement result:', result);
        
        // Refresh articles to show updated content
        fetchArticles();
        
        alert('Article enhanced successfully!');
      } else {
        throw new Error('Enhancement failed');
      }
    } catch (error) {
      console.error('Enhancement error:', error);
      alert('Failed to enhance article: ' + error.message);
    } finally {
      setEnhancing(null);
    }
  };

  if (loading) {
    return (
      <div style={{ 
        maxWidth: 900, 
        margin: "40px auto", 
        textAlign: "center",
        padding: "40px"
      }}>
        <h1>📚 BeyondChats Articles</h1>
        <div style={{ fontSize: "18px", color: "#666" }}>
          Loading articles...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ 
        maxWidth: 900, 
        margin: "40px auto", 
        textAlign: "center",
        padding: "40px"
      }}>
        <h1>📚 BeyondChats Articles</h1>
        <div style={{ color: "red", fontSize: "18px" }}>
          ❌ {error}
        </div>
        <button 
          onClick={fetchArticles}
          style={{
            marginTop: "20px",
            padding: "10px 20px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer"
          }}
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div style={{ 
      maxWidth: 1000, 
      margin: "40px auto",
      padding: "0 20px"
    }}>
      <div style={{ 
        textAlign: "center", 
        marginBottom: "40px",
        padding: "20px",
        backgroundColor: "#f8f9fa",
        borderRadius: "10px"
      }}>
        <h1 style={{ color: "#333", marginBottom: "10px" }}>
          📚 BeyondChats Articles
        </h1>
        <p style={{ color: "#666", fontSize: "16px" }}>
          AI-Enhanced Article Management System
        </p>
        <div style={{ marginTop: "20px" }}>
          <button
            onClick={() => handleEnhance('latest')}
            disabled={enhancing === 'latest'}
            style={{
              padding: "12px 24px",
              backgroundColor: enhancing === 'latest' ? "#6c757d" : "#28a745",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: enhancing === 'latest' ? "not-allowed" : "pointer",
              fontSize: "16px",
              fontWeight: "bold",
              marginRight: "10px"
            }}
          >
            {enhancing === 'latest' ? '🔄 Enhancing...' : '🚀 Enhance Latest Article'}
          </button>
          <button
            onClick={fetchArticles}
            style={{
              padding: "12px 24px",
              backgroundColor: "#007bff",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontSize: "16px"
            }}
          >
            🔄 Refresh
          </button>
        </div>
      </div>

      {articles.length === 0 ? (
        <div style={{ 
          textAlign: "center", 
          padding: "40px",
          color: "#666"
        }}>
          <h3>No articles found</h3>
          <p>Create some articles to get started!</p>
        </div>
      ) : (
        <div>
          {articles.map(article => (
            <ArticleCard 
              key={article.id} 
              article={article} 
              onEnhance={handleEnhance}
              isEnhancing={enhancing === article.id}
            />
          ))}
        </div>
      )}

      <div style={{ 
        marginTop: "40px", 
        padding: "20px",
        backgroundColor: "#e9ecef",
        borderRadius: "8px",
        textAlign: "center",
        color: "#6c757d"
      }}>
        <p>
          📊 System Status: {articles.length} articles loaded | 
          Last updated: {new Date().toLocaleString()}
        </p>
      </div>
    </div>
  );
}

export default App;
