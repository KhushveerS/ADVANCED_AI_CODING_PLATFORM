"use client";

import { useState } from 'react';
import { MessageCircle, Send, X, Sparkles, Search, Loader, Code, BookOpen, Brain, ExternalLink } from 'lucide-react';

interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  sources?: { title: string; url: string }[];
}

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'assistant',
      content: 'Hello! I\'m your AI coding assistant. I can search multiple sources to help you with:\n\n• Programming concepts\n• Code examples\n• Algorithm explanations\n• Debugging help\n• Best practices\n\nWhat would you like to know?',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Public search agent that combines multiple sources
  const searchPublicAPIs = async (query: string): Promise<{ content: string; sources: { title: string; url: string }[] }> => {
    const sources = [];
    let combinedContent = '';

    try {
      // Try DuckDuckGo first
      const ddgResponse = await fetch(
        `https://api.duckduckgo.com/?q=${encodeURIComponent(query + ' programming code')}&format=json&no_html=1&skip_disambig=1`
      );
      const ddgData = await ddgResponse.json();
      
      if (ddgData.AbstractText) {
        combinedContent += `**From DuckDuckGo:**\n${ddgData.AbstractText}\n\n`;
        if (ddgData.AbstractURL) {
          sources.push({ title: 'DuckDuckGo Result', url: ddgData.AbstractURL });
        }
      }

      // Try Wikipedia for conceptual topics
      if (query.length < 50) { // Wikipedia works better for shorter queries
        try {
          const wikiResponse = await fetch(
            `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(query)}`
          );
          if (wikiResponse.ok) {
            const wikiData = await wikiResponse.json();
            if (wikiData.extract && !combinedContent.includes(wikiData.extract.substring(0, 100))) {
              combinedContent += `**Wikipedia:**\n${wikiData.extract}\n\n`;
              sources.push({ 
                title: `Wikipedia: ${wikiData.title}`, 
                url: wikiData.content_urls.desktop.page 
              });
            }
          }
        } catch (wikiError) {
          // Silently continue if Wikipedia fails
        }
      }

      // Add programming-specific knowledge base
      const programmingKnowledge = generateProgrammingKnowledge(query);
      if (programmingKnowledge) {
        combinedContent += `**Programming Knowledge:**\n${programmingKnowledge}\n\n`;
      }

      // If we have good content from searches, return it
      if (combinedContent.length > 200) {
        return {
          content: combinedContent + `\n💡 **Tip:** I've combined information from multiple public sources to answer your question.`,
          sources
        };
      }

      // Fallback to our knowledge base
      return {
        content: generateFallbackResponse(query),
        sources: [
          { title: 'Programming Knowledge Base', url: 'https://developer.mozilla.org' },
          { title: 'JavaScript Docs', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript' }
        ]
      };

    } catch (error) {
      return {
        content: generateFallbackResponse(query),
        sources: [
          { title: 'MDN Web Docs', url: 'https://developer.mozilla.org' },
          { title: 'Stack Overflow', url: 'https://stackoverflow.com' }
        ]
      };
    }
  };

  const generateProgrammingKnowledge = (query: string): string => {
    const lowerQuery = query.toLowerCase();
    
    const knowledgeBase: { [key: string]: string } = {
      'javascript array': `Arrays in JavaScript are dynamic and have built-in methods:
• map(), filter(), reduce() for transformations
• forEach() for iteration
• find(), some(), every() for searching
• Time complexity: O(1) for access, O(n) for search`,

      'react hooks': `React Hooks Rules:
1. Only call hooks at the top level
2. Only call hooks from React functions
3. Use useState for state, useEffect for side effects
4. Use useMemo for expensive calculations`,

      'python list': `Python lists are dynamic arrays:
• append(), extend() for adding elements
• List comprehensions for transformations
• Time complexity: O(1) for append, O(n) for insert`,

      'html css': `HTML structures content, CSS styles it:
• Use semantic HTML for accessibility
• CSS Grid and Flexbox for layout
• Mobile-first responsive design`,

      'node js': `Node.js for server-side JavaScript:
• Event-driven, non-blocking I/O
• npm for package management
• Express.js for web frameworks`,

      'database sql': `SQL Databases:
• Use JOINs to combine tables
• INDEXes for performance
• Normalization reduces redundancy
• ACID properties for transactions`
    };

    for (const [key, value] of Object.entries(knowledgeBase)) {
      if (lowerQuery.includes(key)) {
        return value;
      }
    }

    return '';
  };

  const generateFallbackResponse = (query: string): string => {
    return `I'll help you with "${query}"! Here's what I know:

🔍 **Based on programming knowledge:**

For this topic, I recommend:
1. Breaking down the problem into smaller parts
2. Checking official documentation
3. Looking at similar examples
4. Testing your code incrementally

💡 **Useful Resources:**
• MDN Web Docs - JavaScript/Web APIs
• Official framework documentation  
• Stack Overflow for specific issues
• GitHub for code examples

Would you like me to explain any particular aspect in more detail?`;
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const { content, sources } = await searchPublicAPIs(input);
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content,
        sources,
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: generateFallbackResponse(input),
        sources: [
          { title: 'MDN Web Docs', url: 'https://developer.mozilla.org' },
          { title: 'Stack Overflow', url: 'https://stackoverflow.com' }
        ],
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const quickActions = [
    { 
      label: 'JavaScript arrays', 
      prompt: 'Explain JavaScript array methods and time complexity' 
    },
    { 
      label: 'React hooks guide', 
      prompt: 'Explain React hooks with examples and best practices' 
    },
    { 
      label: 'Python lists vs tuples', 
      prompt: 'Difference between Python lists and tuples with examples' 
    },
    { 
      label: 'SQL joins explained', 
      prompt: 'Explain different types of SQL joins with examples' 
    },
  ];

  const learningResources = [
    {
      title: 'MDN Web Docs',
      description: 'Web technologies documentation',
      url: 'https://developer.mozilla.org'
    },
    {
      title: 'Stack Overflow',
      description: 'Programming Q&A community',
      url: 'https://stackoverflow.com'
    },
    {
      title: 'GitHub',
      description: 'Code repositories and examples',
      url: 'https://github.com'
    },
    {
      title: 'freeCodeCamp',
      description: 'Free programming tutorials',
      url: 'https://freecodecamp.org'
    },
    {
      title: 'W3Schools',
      description: 'Web development tutorials',
      url: 'https://w3schools.com'
    },
    {
      title: 'DevDocs',
      description: 'API documentation',
      url: 'https://devdocs.io'
    }
  ];

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 p-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all z-50 group"
      >
        <MessageCircle className="w-6 h-6" />
        <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white animate-pulse"></span>
      </button>

      {isOpen && (
        <div className="fixed bottom-6 right-6 w-96 h-[600px] bg-white rounded-2xl shadow-2xl flex flex-col z-50 border border-gray-200">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-t-2xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold">AI Coding Assistant</h3>
                <p className="text-xs text-blue-100">Powered by Public APIs</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl p-3 ${
                    message.type === 'user'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-900'
                  }`}
                >
                  <p className="text-sm whitespace-pre-line">{message.content}</p>
                  <p className="text-xs mt-1 opacity-70">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                  
                  {message.sources && message.sources.length > 0 && (
                    <div className="mt-2 pt-2 border-t border-gray-200">
                      <p className="text-xs font-medium text-gray-600 mb-1">Sources:</p>
                      <div className="space-y-1">
                        {message.sources.map((source, index) => (
                          <a
                            key={index}
                            href={source.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 text-xs text-blue-600 hover:text-blue-800"
                          >
                            {source.title}
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 rounded-2xl p-3 flex items-center gap-2">
                  <Loader className="w-4 h-4 animate-spin text-gray-600" />
                  <span className="text-sm text-gray-600">Searching multiple sources...</span>
                </div>
              </div>
            )}

            {messages.length === 1 && (
              <div className="space-y-2">
                <p className="text-xs text-gray-500 font-medium">Quick actions:</p>
                {quickActions.map((action, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setInput(action.prompt);
                      setTimeout(() => handleSend(), 100);
                    }}
                    className="block w-full text-left p-3 bg-blue-50 hover:bg-blue-100 rounded-lg text-sm text-blue-700 transition-colors border border-blue-100"
                  >
                    {action.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="p-4 border-t border-gray-200">
            <div className="flex gap-2">
              <button
                onClick={() => window.open(`https://www.google.com/search?q=${encodeURIComponent(input + ' programming')}`, '_blank')}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                title="Search on Google"
              >
                <Search className="w-5 h-5 text-gray-600" />
              </button>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask me anything about programming..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              />
              <button
                onClick={handleSend}
                disabled={!input.trim() || isLoading}
                className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-2 text-center">
              Powered by DuckDuckGo + Wikipedia + Programming Knowledge Base
            </p>
          </div>
        </div>
      )}
    </>
  );
}