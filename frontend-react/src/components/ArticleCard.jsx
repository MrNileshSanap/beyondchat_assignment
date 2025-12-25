export default function ArticleCard({ article, onEnhance, isEnhancing }) {
  const isEnhanced = article.content.includes('References used:');
  const createdDate = new Date(article.created_at).toLocaleDateString();
  const updatedDate = new Date(article.updated_at).toLocaleDateString();

  return (
    <div style={{
      backgroundColor: "white",
      border: "1px solid #e0e0e0",
      borderRadius: "12px",
      padding: "24px",
      marginBottom: "24px",
      boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      transition: "transform 0.2s ease"
    }}>
      {/* Article Header */}
      <div style={{ 
        display: "flex", 
        justifyContent: "space-between", 
        alignItems: "flex-start",
        marginBottom: "16px"
      }}>
        <div style={{ flex: 1 }}>
          <h2 style={{ 
            color: "#333", 
            margin: "0 0 8px 0",
            fontSize: "24px",
            fontWeight: "bold"
          }}>
            {article.title}
          </h2>
          <div style={{ 
            display: "flex", 
            gap: "16px", 
            fontSize: "14px", 
            color: "#666",
            marginBottom: "8px"
          }}>
            <span>📅 Created: {createdDate}</span>
            <span>📝 Updated: {updatedDate}</span>
            <span>🆔 ID: {article.id}</span>
          </div>
          <div style={{ 
            display: "flex", 
            gap: "8px", 
            alignItems: "center"
          }}>
            <span style={{
              backgroundColor: isEnhanced ? "#28a745" : "#6c757d",
              color: "white",
              padding: "4px 8px",
              borderRadius: "4px",
              fontSize: "12px",
              fontWeight: "bold"
            }}>
              {isEnhanced ? "✨ Enhanced" : "📝 Original"}
            </span>
            {article.source_url && (
              <a 
                href={article.source_url} 
                target="_blank" 
                rel="noopener noreferrer"
                style={{
                  color: "#007bff",
                  textDecoration: "none",
                  fontSize: "12px"
                }}
              >
                🔗 Source
              </a>
            )}
          </div>
        </div>
        <button
          onClick={() => onEnhance(article.id)}
          disabled={isEnhancing}
          style={{
            padding: "8px 16px",
            backgroundColor: isEnhancing ? "#6c757d" : "#007bff",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: isEnhancing ? "not-allowed" : "pointer",
            fontSize: "14px",
            fontWeight: "bold",
            minWidth: "100px"
          }}
        >
          {isEnhancing ? "🔄" : "✨"} {isEnhancing ? "Enhancing..." : "Enhance"}
        </button>
      </div>

      {/* Article Content */}
      <div style={{
        backgroundColor: "#f8f9fa",
        borderRadius: "8px",
        padding: "20px",
        marginBottom: "16px"
      }}>
        <h4 style={{ 
          color: "#495057", 
          margin: "0 0 12px 0",
          fontSize: "16px",
          fontWeight: "bold"
        }}>
          📖 Content
        </h4>
        <div style={{
          lineHeight: "1.6",
          color: "#333",
          whiteSpace: "pre-wrap"
        }}>
          {article.content}
        </div>
      </div>

      {/* Enhancement Info */}
      {isEnhanced && (
        <div style={{
          backgroundColor: "#d4edda",
          border: "1px solid #c3e6cb",
          borderRadius: "8px",
          padding: "16px",
          marginTop: "16px"
        }}>
          <h5 style={{ 
            color: "#155724", 
            margin: "0 0 8px 0",
            fontSize: "14px",
            fontWeight: "bold"
          }}>
            ✨ Enhancement Details
          </h5>
          <p style={{ 
            color: "#155724", 
            margin: "0",
            fontSize: "14px"
          }}>
            This article has been enhanced with additional references and improved content.
          </p>
        </div>
      )}

      {/* Article Metadata */}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: "16px",
        paddingTop: "16px",
        borderTop: "1px solid #e0e0e0",
        fontSize: "12px",
        color: "#999"
      }}>
        <span>Version: {article.version || 'original'}</span>
        <span>Last processed: {new Date(article.updated_at).toLocaleString()}</span>
      </div>
    </div>
  );
}
