import { useState, useRef, DragEvent } from 'react';
import api from '../../services/api';

interface Suggestion {
  id: number;
  line: number;
  type: 'suggestion' | 'improvement' | 'fix';
  content: string;
  original: string;
  suggested: string;
}

const CodeReview = () => {
  const [code, setCode] = useState('');
  const [reviewMode, setReviewMode] = useState<'manual' | 'upload'>('manual');
  const [isReviewing, setIsReviewing] = useState(false);
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [selectedSuggestion, setSelectedSuggestion] = useState<Suggestion | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [, setError] = useState('');
  const [, setSuccess] = useState('');
  
  // Demo suggestions for the UI
  const demoSuggestions: Suggestion[] = [
    {
      id: 1,
      line: 5,
      type: 'fix',
      content: 'Potential memory leak: resource not properly closed',
      original: 'file.open("data.txt")',
      suggested: 'try (FileReader file = new FileReader("data.txt")) {\n  // your code here\n}'
    },
    {
      id: 2,
      line: 12,
      type: 'suggestion',
      content: 'Consider using a more descriptive variable name',
      original: 'let x = getUser();',
      suggested: 'let currentUser = getUser();'
    },
    {
      id: 3,
      line: 18,
      type: 'improvement',
      content: 'This function could be simplified with array methods',
      original: 'function filterItems(items) {\n  let result = [];\n  for (let i = 0; i < items.length; i++) {\n    if (items[i].active) {\n      result.push(items[i]);\n    }\n  }\n  return result;\n}',
      suggested: 'function filterItems(items) {\n  return items.filter(item => item.active);\n}'
    }
  ];
  
  const handleCodeChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCode(e.target.value);
  };
  
  const handleSubmitForReview = async () => {
    setIsReviewing(true);
    setError('');
    setSuccess('');
    try {
      // Store the main code review in DB
      const resMain = await api.post('/api/reviews', { review: code, codeSnippet: code });
      if (resMain.data.success) {
        // Loop over demo suggestions and store each in DB
        await Promise.all(
          demoSuggestions.map(suggestion =>
            api.post('/api/reviews', { review: suggestion.content, codeSnippet: suggestion.suggested })
          )
        );
        setSuccess('Code review and suggestions stored in database successfully.');
        // Set demo suggestions for display in the UI
        setSuggestions(demoSuggestions);
      } else {
        setError('Failed to store code review in DB.');
      }
    } catch (err: any) {
      setError(err.response?.data?.error || 'Error storing code review.');
    } finally {
      setIsReviewing(false);
    }
  };
  
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    processFile(file);
  };
  
  const processFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        setCode(event.target.result as string);
      }
    };
    reader.readAsText(file);
  };
  
  const handleDragEnter = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };
  
  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };
  
  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isDragging) {
      setIsDragging(true);
    }
  };
  
  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      const validExtensions = ['.js', '.ts', '.py', '.java', '.cs', '.html', '.css'];
      const extension = file.name.substring(file.name.lastIndexOf('.')).toLowerCase();
      
      if (validExtensions.includes(extension)) {
        processFile(file);
      } else {
        alert(`File type not supported. Please upload one of: ${validExtensions.join(', ')}`);
      }
    }
  };
  
  const handleAcceptSuggestion = (suggestion: Suggestion) => {
    // In a real app, this would apply the change to the code
    alert(`Accepted suggestion: ${suggestion.content}`);
  };
  
  const handleDeclineSuggestion = (suggestion: Suggestion) => {
    setSuggestions(suggestions.filter(s => s.id !== suggestion.id));
  };
  
  const handleAddComment = (suggestion: Suggestion) => {
    // In a real app, this would open a comment dialog
    alert(`Adding comment to suggestion: ${suggestion.content}`);
  };
  
  return (
    <div className="code-review">
      <div className="input-section">
        <div className="input-tabs">
          <button 
            className={`input-tab ${reviewMode === 'manual' ? 'active' : ''}`}
            onClick={() => setReviewMode('manual')}
          >
            Manual Entry
          </button>
          <button 
            className={`input-tab ${reviewMode === 'upload' ? 'active' : ''}`}
            onClick={() => setReviewMode('upload')}
          >
            File Upload
          </button>
        </div>
        
        <div className="input-content">
          {reviewMode === 'manual' && (
            <>
              <div className="code-editor-wrapper">
                <div className="code-editor-header">
                  <span>Code Editor</span>
                  <div className="editor-actions">
                    <select className="language-selector">
                      <option value="javascript">JavaScript</option>
                      <option value="typescript">TypeScript</option>
                      <option value="python">Python</option>
                      <option value="java">Java</option>
                      <option value="csharp">C#</option>
                    </select>
                  </div>
                </div>
                <textarea 
                  className="code-editor"
                  placeholder="Paste or type your code here..."
                  value={code}
                  onChange={handleCodeChange}
                ></textarea>
              </div>
              <button 
                className="review-button"
                onClick={handleSubmitForReview}
                disabled={!code.trim() || isReviewing}
              >
                {isReviewing ? (
                  <>
                    <span className="spinner"></span>
                    Analyzing...
                  </>
                ) : (
                  'Review Code'
                )}
              </button>
            </>
          )}
          
          {reviewMode === 'upload' && (
            <div 
              className={`file-upload-area ${isDragging ? 'dragging' : ''}`}
              onDragEnter={handleDragEnter}
              onDragLeave={handleDragLeave}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            >
              <svg viewBox="0 0 24 24" width="48" height="48" stroke="currentColor" fill="none" strokeWidth="1.5">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="17 8 12 3 7 8"></polyline>
                <line x1="12" y1="3" x2="12" y2="15"></line>
              </svg>
              <h3>{isDragging ? 'Drop Your File Here' : 'Drag & Drop Your Code File'}</h3>
              <p>or</p>
              <label className="file-input-label">
                Browse Files
                <input 
                  ref={fileInputRef}
                  type="file" 
                  className="file-input"
                  accept=".js,.ts,.py,.java,.cs,.html,.css"
                  onChange={handleFileUpload}
                />
              </label>
              <p className="file-support-text">Supports: .js, .ts, .py, .java, .cs, .html, .css</p>
            </div>
          )}
        </div>
      </div>
      
      {suggestions.length > 0 && (
        <div className="review-section">
          <h2>Review Results</h2>
          <div className="suggestions-list">
            {suggestions.map(suggestion => (
              <div 
                key={suggestion.id} 
                className={`suggestion-item ${suggestion.type} ${selectedSuggestion?.id === suggestion.id ? 'selected' : ''}`}
                onClick={() => setSelectedSuggestion(suggestion)}
              >
                <div className="suggestion-badge">{suggestion.type}</div>
                <div className="suggestion-line">Line {suggestion.line}</div>
                <div className="suggestion-content">{suggestion.content}</div>
                <div className="suggestion-actions">
                  <button 
                    className="action-button accept" 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAcceptSuggestion(suggestion);
                    }}
                    title="Accept"
                  >
                    <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" fill="none" strokeWidth="2">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </button>
                  <button 
                    className="action-button decline" 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeclineSuggestion(suggestion);
                    }}
                    title="Decline"
                  >
                    <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" fill="none" strokeWidth="2">
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                  </button>
                  <button 
                    className="action-button comment" 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAddComment(suggestion);
                    }}
                    title="Comment"
                  >
                    <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" fill="none" strokeWidth="2">
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          {selectedSuggestion && (
            <div className="suggestion-detail">
              <h3>Suggestion Details</h3>
              <div className="code-comparison">
                <div className="code-block original">
                  <div className="code-header">Original Code</div>
                  <pre>{selectedSuggestion.original}</pre>
                </div>
                <div className="code-arrow">
                  <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" fill="none" strokeWidth="2">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </div>
                <div className="code-block suggested">
                  <div className="code-header">Suggested Code</div>
                  <pre>{selectedSuggestion.suggested}</pre>
                </div>
              </div>
              
              <div className="suggestion-explanation">
                <h4>Why this is recommended:</h4>
                <p>
                  {selectedSuggestion.type === 'fix' && 'This change addresses a potential issue that could cause bugs or unexpected behavior in your code.'}
                  {selectedSuggestion.type === 'suggestion' && 'This change improves the readability and maintainability of your code, making it easier for others to understand.'}
                  {selectedSuggestion.type === 'improvement' && 'This change optimizes your code for better performance or follows modern best practices.'}
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CodeReview;