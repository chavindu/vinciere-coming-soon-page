import React, { useState, useEffect } from 'react';
import { Mail, Instagram, Facebook } from 'lucide-react';

function App() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const backgroundImages = [
    'https://images.unsplash.com/photo-1584917865442-de89df76afd3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80',
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80',
    'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80',
    'https://images.unsplash.com/photo-1600607687644-c7171b42498f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80'
  ];

  useEffect(() => {
    // Keep loading screen for at least 5 seconds
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Change background image every 8 seconds
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === backgroundImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitStatus('loading');

    try {
      const response = await fetch('http://localhost:3000/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) throw new Error('Subscription failed');

      setSubmitStatus('success');
      setEmail('');
      setTimeout(() => setSubmitStatus('idle'), 3000);
    } catch (error) {
      console.error('Subscription error:', error);
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus('idle'), 3000);
    }
  };

  return (
    <>
      {/* Loading Screen */}
      <div className={`loading-screen ${!loading ? 'animate-[slideOut_0.8s_ease-in-out_forwards]' : ''}`}>
        <div className="text-center">
          <div className="loading-logo mb-4">
            <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-2xl font-bold text-white">V</span>
          </div>
          <h2 className="text-white text-xl font-light">VINCIERE</h2>
        </div>
      </div>

      {/* Main Content */}
      <div className="min-h-screen relative cursor-fancy">
        {/* Background Images */}
        {backgroundImages.map((image, index) => (
          <div 
            key={index}
            className="absolute inset-0 z-0 transition-opacity duration-1000"
            style={{
              backgroundImage: `url("${image}")`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              filter: 'brightness(0.3)',
              opacity: currentImageIndex === index ? 1 : 0
            }}
          />
        ))}

        {/* Content */}
        <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl w-full space-y-12 text-center" style={{ animation: 'fadeIn 1s ease-out' }}>
            {/* Logo */}
            <div className="mb-8 hover:scale-105 transition-transform duration-300">
              <h1 className="text-5xl md:text-7xl font-bold text-white tracking-wider" style={{ animation: 'float 6s ease-in-out infinite' }}>
                VINCIERE
              </h1>
              <p className="mt-4 text-xl text-gray-300 tracking-wide opacity-0 animate-[fadeIn_1s_ease-out_0.5s_forwards]">
                Luxury Redefined
              </p>
            </div>

            {/* Newsletter */}
            <div className="max-w-md mx-auto opacity-0 animate-[fadeIn_1s_ease-out_1s_forwards]">
              <h2 className="text-xl text-white mb-4">Be the first to know when we launch</h2>
              <form onSubmit={handleSubmit} className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-2 rounded-lg bg-white bg-opacity-20 backdrop-blur-lg text-white placeholder-gray-400 border border-white border-opacity-30 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 transition-all duration-300 hover:bg-opacity-25"
                  required
                  disabled={submitStatus === 'loading'}
                />
                <button
                  type="submit"
                  disabled={submitStatus === 'loading'}
                  className={`px-6 py-2 rounded-lg font-semibold transition-all duration-300 hover:scale-105 active:scale-95 ${
                    submitStatus === 'loading' ? 'bg-gray-400 cursor-not-allowed' :
                    submitStatus === 'success' ? 'bg-green-500 text-white' :
                    submitStatus === 'error' ? 'bg-red-500 text-white' :
                    'bg-white text-black hover:bg-opacity-90'
                  }`}
                >
                  {submitStatus === 'loading' ? 'Sending...' :
                   submitStatus === 'success' ? 'Subscribed!' :
                   submitStatus === 'error' ? 'Failed!' :
                   'Notify Me'}
                </button>
              </form>
            </div>

            {/* Social Links */}
            <div className="flex justify-center space-x-6 mt-8 opacity-0 animate-[fadeIn_1s_ease-out_1.5s_forwards]">
              {[
                { Icon: Instagram, href: '#' },
                { Icon: Facebook, href: '#' },
                { Icon: Mail, href: 'mailto:vinciere@bitlab.lk' }
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="text-white hover:text-gray-300 transition-all duration-300 hover:scale-125 hover:rotate-[360deg]"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ animation: `float ${6 + index}s ease-in-out infinite` }}
                >
                  <social.Icon size={24} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
