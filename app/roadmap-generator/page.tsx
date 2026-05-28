'use client';

export const dynamic = 'force-dynamic';

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Send } from "lucide-react";
import toast from "react-hot-toast";

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
}

export default function RoadmapGeneratorPage() {
  const router = useRouter();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [conversationData, setConversationData] = useState({
    company: '',
    role: '',
    goals: [] as string[],
    painPoints: [] as string[],
    distractions: [] as string[],
    timeline: '',
    level: '',
  });
  const [step, setStep] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const welcomeMessage: Message = {
      id: '0',
      type: 'bot',
      content: "Hey there! 👋 I'm GlowGrid, your personal interview prep coach. I'm excited to help you land your dream job!\n\nLet's start by understanding what you're aiming for. What company are you interviewing for?",
      timestamp: new Date(),
    };
    setMessages([welcomeMessage]);
  }, []);

  const generateBotResponse = (userMessage: string, currentStep: number): string => {
    const responses: { [key: number]: (msg: string) => string } = {
      1: (msg) => `Great! ${msg} - solid choice! 💼\n\nNow, what role are you targeting? (e.g., Software Engineer, Product Manager, Data Scientist)`,
      2: (msg) => `${msg} is an awesome role! 🚀\n\nTell me about your interview prep goals. What do you want to achieve? (e.g., master DSA, improve system design, get comfortable with behavioral questions)`,
      3: (msg) => `Excellent goals! 🎯\n\nNow, let's be real - what are your main pain points or challenges? What worries you most about this interview? (e.g., time management, coding speed, confidence, blank mind under pressure)`,
      4: (msg) => `Thanks for being honest! 😊\n\nEvery one of us struggles with something. What tends to distract you or derail your prep? (e.g., social media, overthinking, not staying consistent)`,
      5: (msg) => `I totally get it! 💪\n\nHow much time do you have to prepare? (e.g., 15 days, 30 days, 60 days, 90 days, or 6 months)`,
      6: (msg) => `Perfect timeline! ⏰\n\nOne more thing - how would you rate your current skill level? (Beginner, Intermediate, or Advanced)`,
      7: (msg) => `Awesome! 🌟\n\nGreat! Now I have a complete picture of your situation. Let me create a personalized roadmap just for you...`,
    };
    return responses[currentStep]?.(userMessage) || "Got it! 👍";
  };

  const handleSendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    const newData = { ...conversationData };
    switch (step) {
      case 0:
        newData.company = input;
        break;
      case 1:
        newData.role = input;
        break;
      case 2:
        newData.goals = input.split(',').map(g => g.trim());
        break;
      case 3:
        newData.painPoints = input.split(',').map(p => p.trim());
        break;
      case 4:
        newData.distractions = input.split(',').map(d => d.trim());
        break;
      case 5:
        newData.timeline = input.match(/\d+/)?.[0] || '30';
        break;
      case 6:
        newData.level = input.toLowerCase();
        break;
    }
    setConversationData(newData);

    await new Promise(resolve => setTimeout(resolve, 1000));

    if (step < 7) {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: generateBotResponse(input, step),
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botResponse]);
      setStep(prev => prev + 1);
      setLoading(false);
    } else {
      await generateRoadmap(newData);
    }
  };

  const generateRoadmap = async (data: typeof conversationData) => {
    try {
      const response = await fetch('/api/roadmaps/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: 'guest-user',
          company: data.company,
          role: data.role,
          timeline: data.timeline,
          level: data.level,
          jdSummary: `Goals: ${data.goals.join(', ')}\nPain Points: ${data.painPoints.join(', ')}\nDistractions: ${data.distractions.join(', ')}`,
        }),
      });

      if (response.ok) {
        const roadmap = await response.json();
        
        const botMessage: Message = {
          id: (Date.now() + 2).toString(),
          type: 'bot',
          content: `🎉 Awesome! I've created a personalized ${data.timeline}-day roadmap for you at ${data.company} for the ${data.role} role!\n\nYour roadmap includes:\n✅ ${data.goals.length} targeted goals\n✅ Strategies to overcome your pain points\n✅ Tips to stay focused despite distractions\n✅ A structured daily routine\n\nLet me take you to your new roadmap!`,
          timestamp: new Date(),
        };
        
        setMessages(prev => [...prev, botMessage]);
        
        setTimeout(() => {
          router.push(`/roadmap/${roadmap.id}`);
        }, 2000);
      } else {
        throw new Error('Failed to generate roadmap');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to generate roadmap');
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: 'rgb(3, 7, 18)',
      color: 'rgb(241, 245, 249)',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto',
      display: 'flex',
      flexDirection: 'column',
    }}>
      {/* Header */}
      <header style={{
        borderBottom: '1px solid rgba(148, 163, 184, 0.1)',
        backgroundColor: 'rgba(15, 23, 42, 0.8)',
        backdropFilter: 'blur(10px)',
        padding: '20px 40px',
      }}>
        <h1 style={{
          fontSize: '24px',
          fontWeight: 'bold',
          background: 'linear-gradient(135deg, #f43f5e 0%, #ec4899 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          margin: 0,
        }}>
          ✨ GlowGrid AI Coach
        </h1>
      </header>

      {/* Chat Container */}
      <div style={{
        flex: 1,
        overflowY: 'auto',
        padding: '40px',
        maxWidth: '800px',
        margin: '0 auto',
        width: '100%',
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {messages.map(msg => (
            <div
              key={msg.id}
              style={{
                display: 'flex',
                justifyContent: msg.type === 'user' ? 'flex-end' : 'flex-start',
              }}
            >
              <div
                style={{
                  maxWidth: '70%',
                  padding: '16px 20px',
                  borderRadius: '12px',
                  background: msg.type === 'user'
                    ? 'linear-gradient(135deg, #f43f5e, #ec4899)'
                    : 'rgba(148, 163, 184, 0.1)',
                  border: msg.type === 'user'
                    ? 'none'
                    : '1px solid rgba(148, 163, 184, 0.2)',
                  lineHeight: '1.6',
                  fontSize: '15px',
                  whiteSpace: 'pre-wrap',
                }}
              >
                {msg.content}
              </div>
            </div>
          ))}
          {loading && (
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <div style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                backgroundColor: '#f43f5e',
                animation: 'bounce 1.4s infinite',
              }} />
              <div style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                backgroundColor: '#f43f5e',
                animation: 'bounce 1.4s infinite 0.2s',
              }} />
              <div style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                backgroundColor: '#f43f5e',
                animation: 'bounce 1.4s infinite 0.4s',
              }} />
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <div style={{
        borderTop: '1px solid rgba(148, 163, 184, 0.1)',
        backgroundColor: 'rgba(15, 23, 42, 0.8)',
        backdropFilter: 'blur(10px)',
        padding: '20px 40px',
      }}>
        <div style={{
          maxWidth: '800px',
          margin: '0 auto',
          width: '100%',
          display: 'flex',
          gap: '12px',
        }}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Type your response..."
            disabled={loading}
            style={{
              flex: 1,
              padding: '14px 16px',
              backgroundColor: 'rgba(15, 23, 42, 0.6)',
              border: '1px solid rgba(148, 163, 184, 0.3)',
              borderRadius: '8px',
              color: '#f1f5f9',
              fontSize: '15px',
              outline: 'none',
              transition: '0.3s',
              opacity: loading ? 0.5 : 1,
            }}
            onFocus={(e) => {
              if (!loading) {
                e.currentTarget.style.borderColor = '#f43f5e';
                e.currentTarget.style.backgroundColor = 'rgba(15, 23, 42, 0.8)';
              }
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = 'rgba(148, 163, 184, 0.3)';
              e.currentTarget.style.backgroundColor = 'rgba(15, 23, 42, 0.6)';
            }}
          />
          <button
            onClick={handleSendMessage}
            disabled={!input.trim() || loading}
            style={{
              padding: '14px 24px',
              background: 'linear-gradient(135deg, #f43f5e, #ec4899)',
              border: 'none',
              borderRadius: '8px',
              color: 'white',
              fontWeight: '600',
              cursor: input.trim() && !loading ? 'pointer' : 'not-allowed',
              opacity: input.trim() && !loading ? 1 : 0.5,
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              transition: '0.3s',
            }}
            onMouseEnter={(e) => {
              if (input.trim() && !loading) {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 10px 25px rgba(244, 63, 94, 0.3)';
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <Send style={{ width: '18px', height: '18px' }} />
          </button>
        </div>
      </div>

      <style>{`
        @keyframes bounce {
          0%, 80%, 100% {
            opacity: 1;
            transform: translateY(0);
          }
          40% {
            opacity: 0.5;
            transform: translateY(-10px);
          }
        }
        
        ::-webkit-scrollbar {
          width: 8px;
        }
        
        ::-webkit-scrollbar-track {
          background: transparent;
        }
        
        ::-webkit-scrollbar-thumb {
          background: rgba(244, 63, 94, 0.4);
          border-radius: 4px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: rgba(244, 63, 94, 0.6);
        }
      `}</style>
    </div>
  );
}
