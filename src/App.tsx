import React, { useState, useEffect } from 'react';
import { Mail, Instagram, Facebook } from 'lucide-react';

function App() {
  const [email, setEmail] = useState('');
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success'>('idle');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const backgroundImages = [
    'https://images.unsplash.com/photo-1584917865442-de89df76afd3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80',
    'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80',
    'https://images.unsplash.com/photo-1613896640137-bb5b31496315?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80',
    'https://images.unsplash.com/photo-1523779105320-d1cd346ff52b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === backgroundImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitStatus('success');
  };

  return (
    <div className="min-h-screen relative cursor-fancy">
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
      
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4">
        <div className="max-w-4xl w-full text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-white">VINCIERE</h1>
          <p className="mt-4 text-xl text-gray-300">Coming Soon</p>

          <form 
            name="newsletter" 
            method="POST" 
            data-netlify="true" 
            onSubmit={handleSubmit}
            className="max-w-md mx-auto mt-6 flex gap-2"
          >
            <input type="hidden" name="form-name" value="newsletter" />
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="flex-1 px-4 py-2 rounded-lg bg-white bg-opacity-20 text-white placeholder-gray-400 border border-white focus:outline-none focus:ring-2 focus:ring-white transition-all"
              required
            />
            <button
              type="submit"
              className={`px-6 py-2 rounded-lg font-semibold transition-all ${submitStatus === 'success' ? 'bg-green-500 text-white' : 'bg-white text-black hover:bg-opacity-90'}`}
            >
              {submitStatus === 'success' ? 'Success' : 'Notify Me'}
            </button>
          </form>

          <div className="flex justify-center space-x-6 mt-8">
            {[{ Icon: Instagram, href: 'https://www.instagram.com/vinciere_shop/' },
              { Icon: Facebook, href: 'https://web.facebook.com/profile.php?id=61572228401183' },
              { Icon: Mail, href: 'mailto:contact@vinciere.com' }
            ].map((social, index) => (
              <a
                key={index}
                href={social.href}
                className="text-white hover:text-gray-300 transition-all hover:scale-125"
                target="_blank"
                rel="noopener noreferrer"
              >
                <social.Icon size={24} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
