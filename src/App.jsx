import React, { useState, useEffect } from 'react';
import { Instagram, Twitter, Facebook, Send, Crown, Moon, Sun, MapPin, Mail, Phone } from 'lucide-react';

const App = () => {
  const [theme, setTheme] = useState('light');
  const [email, setEmail] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, mins: 0, secs: 0 });

  // 1. DYNAMIC CROWN LOGO & FAVICON LOGIC
  useEffect(() => {
    document.title = "Chai Royal | Premium Tea Reserve";
    
    // Injects the Crown SVG directly into the browser tab favicon
    const link = document.querySelector("link[rel*='icon']") || document.createElement('link');
    link.type = 'image/svg+xml';
    link.rel = 'shortcut icon';
    link.href = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='%23D4AF37' stroke='%23D4AF37' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m2 4 3 12h14l3-12-6 7-4-7-4 7-6-7z'/%3E%3Cpath d='M5 20h14'/%3E%3C/svg%3E`;
    document.getElementsByTagName('head')[0].appendChild(link);
  }, []);

  // 2. Scroll & Theme Logic
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  // 3. Countdown Timer
  useEffect(() => {
    const LAUNCH_DATE = new Date("March 1, 2026 00:00:00").getTime();
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = LAUNCH_DATE - now;
      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        mins: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        secs: Math.floor((distance % (1000 * 60)) / 1000)
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen flex flex-col premium-bg transition-colors duration-700">
      {/* Background Animated Shimmer (From your CSS) */}
      <div className="shimmer-glow pointer-events-none" />

      {/* --- NAVIGATION --- */}
      <nav className={`fixed top-0 w-full z-[100] transition-all duration-500 flex justify-center px-6 ${
        scrolled ? 'bg-[var(--bg-primary)]/80 backdrop-blur-xl border-b border-royal-gold/10 py-3' : 'bg-transparent py-6'
      }`}>
        <div className="w-full max-w-7xl flex justify-between items-center">
          
          {/* BRAND LOGO WITH CROWN */}
          <div className="flex items-center gap-3 cursor-pointer group">
            <div className="relative p-2.5 bg-royal-gold rounded-full text-white shadow-xl transition-all duration-500 group-hover:rotate-[360deg] group-hover:scale-110">
              <Crown size={22} fill="currentColor" />
              <div className="absolute inset-0 bg-white/20 rounded-full animate-pulse"></div>
            </div>
            <div className="flex flex-col -space-y-1">
              <span className="text-xl font-serif font-bold tracking-tighter italic">Chai Royal</span>
              <span className="text-[8px] uppercase tracking-[0.4em] text-royal-gold font-bold">The Gold Standard</span>
            </div>
          </div>

          {/* Nav Links */}
          <div className="hidden md:flex gap-8 text-[10px] uppercase tracking-[0.3em] font-bold opacity-70">
            <a href="#" className="hover:text-royal-gold transition-all">Heritage</a>
            <a href="#" className="hover:text-royal-gold transition-all">Blends</a>
            <a href="#" className="hover:text-royal-gold transition-all">Concierge</a>
          </div>

          {/* Theme Toggle */}
          <button onClick={toggleTheme} className="relative w-14 h-7 rounded-full bg-royal-gold/10 flex items-center px-1 border border-royal-gold/30 hover:scale-105 transition-all">
            <div className={`w-5 h-5 rounded-full gold-gradient-border flex items-center justify-center transition-all duration-500 ${theme === 'dark' ? 'translate-x-7' : 'translate-x-0'}`}>
              {theme === 'light' ? <Sun size={12} className="text-white" /> : <Moon size={12} className="text-white" />}
            </div>
          </button>
        </div>
      </nav>

      {/* --- HERO SECTION --- */}
      <main className="relative flex-1 flex flex-col items-center justify-center text-center max-w-5xl mx-auto z-10 px-6 py-24 animate-royal-fade">
        <div className="inline-block px-4 py-1.5 border border-royal-gold/30 rounded-full mb-8 bg-royal-gold/5 backdrop-blur-sm">
          <span className="text-royal-gold font-sans uppercase tracking-[0.5em] text-[9px] font-black">
            Est. 2026 • Private Collection
          </span>
        </div>
        
        <h1 className="text-6xl md:text-9xl font-serif mb-8 leading-[0.85] tracking-tight text-[var(--text-primary)]">
          Brewing <br />
          <span className="italic font-normal text-royal-gold">Royalty</span>
        </h1>

        {/* Countdown */}
        <div className="flex gap-4 md:gap-8 mb-14">
          {[
            { label: 'Days', value: timeLeft.days },
            { label: 'Hrs', value: timeLeft.hours },
            { label: 'Mins', value: timeLeft.mins },
            { label: 'Secs', value: timeLeft.secs }
          ].map((item, i) => (
            <div key={i} className="flex flex-col items-center bg-white/40 dark:bg-black/20 backdrop-blur-md p-5 rounded-2xl border border-royal-gold/10 min-w-[80px] md:min-w-[110px] shadow-lg">
              <span className="text-3xl md:text-5xl font-serif font-bold text-royal-gold">{String(item.value).padStart(2, '0')}</span>
              <span className="text-[10px] uppercase tracking-widest opacity-40 mt-2 font-bold">{item.label}</span>
            </div>
          ))}
        </div>
        
        <p className="text-lg md:text-2xl opacity-70 mb-12 max-w-2xl leading-relaxed font-light italic serif text-[var(--text-primary)]">
          Escape the ordinary with an instant tea premix crafted for the modern monarch.

          Rich spices, premium leaves, and the legacy of India in every sip.
        </p>

        {/* Waitlist Form */}
        <div className="relative w-full max-w-lg group">
          <div className="absolute -inset-1 bg-royal-gold/20 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
            <form className="w-full max-w-md flex flex-col md:flex-row shadow-2xl rounded-2xl overflow-hidden border border-royal-gold/20">
              <input
                type="email"
                required
                placeholder="Enter email for early access"
                className="flex-1 px-6 py-5 focus:outline-none bg-white text-black"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button 
                type="submit"
                className="px-8 py-5 bg-[#2C1810] text-[#D4AF37] font-bold uppercase tracking-widest text-xs hover:bg-black transition-all flex items-center justify-center gap-2 group"
              >
                Join Waitlist
                <Send size={14} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
        </div>
      </main>

      {/* --- ELABORATE FOOTER (Right-Aligned Socials) --- */}
      <footer className="w-full bg-[#1a1512] text-[#fdfaf5]/80 pt-16 pb-8 px-10">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 border-b border-white/5 pb-12">
            
            {/* Left: Branding */}
            <div className="space-y-4 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-2">
                <Crown className="text-royal-gold" size={20} />
                <span className="font-serif font-bold tracking-widest">CHAI ROYAL</span>
              </div>
              <p className="text-[11px] leading-relaxed opacity-50 max-w-xs mx-auto md:mx-0">
                Sourcing the finest leaves from the gardens of Assam and Darjeeling to bring the royal tea room experience to your home.
              </p>
            </div>

            {/* Middle: Contact Info */}
            <div className="space-y-4 text-center md:text-left">
              <h4 className="text-royal-gold text-[10px] font-bold uppercase tracking-widest">Inquiries</h4>
              <ul className="text-[11px] space-y-2 opacity-70">
                <li className="flex items-center justify-center md:justify-start gap-2 font-light">
                  <Mail size={12} className="text-royal-gold" /> palace@chairoyal.com
                </li>
                <li className="flex items-center justify-center md:justify-start gap-3 font-light">
                  <Phone size={12} className="text-royal-gold" /> +91 1800 200 400
                </li>
                <li className="flex items-center justify-center md:justify-start gap-3 font-light">
                  <MapPin size={12} className="text-royal-gold" /> Jaipur, Rajasthan, India
                </li>
              </ul>
            </div>

            {/* Right: Socials (Now Right-Aligned) */}
            <div className="space-y-4 text-center md:text-right">
              <h4 className="text-royal-gold text-[10px] font-bold uppercase tracking-widest">Social</h4>
              <div className="flex justify-center md:justify-end gap-6">
                <Instagram size={20} className="hover:text-royal-gold cursor-pointer transition-all hover:-translate-y-1" />
                <Twitter size={20} className="hover:text-royal-gold cursor-pointer transition-all hover:-translate-y-1" />
                <Facebook size={20} className="hover:text-royal-gold cursor-pointer transition-all hover:-translate-y-1" />
              </div>
            </div>

          </div>
          
          <div className="pt-8 text-center text-[9px] uppercase tracking-[0.3em] opacity-30">
            © 2026 The Royal Tea Company. All Rights Reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;