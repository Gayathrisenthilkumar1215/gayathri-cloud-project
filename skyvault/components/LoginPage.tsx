
import React, { useState } from 'react';

interface LoginPageProps {
  onLogin: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      onLogin();
      setIsLoading(false);
    }, 1200);
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden animated-mesh">
      {/* Decorative floating elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-white/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600/20 rounded-full blur-3xl"></div>
      
      {/* Login Card */}
      <div className="relative z-10 w-full max-w-lg px-8 py-14 glass-panel rounded-[40px] mx-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-tr from-blue-500 to-indigo-600 rounded-3xl shadow-2xl neo-shadow mb-6 transform rotate-12">
            <i className="fa-solid fa-cloud text-white text-4xl"></i>
          </div>
          <h1 className="text-5xl font-extrabold text-white tracking-tight glowing-text">SkyVault</h1>
          <p className="text-blue-100/70 mt-3 font-medium text-lg">Your universe, securely synchronized.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="group">
            <label className="block text-xs font-bold uppercase tracking-widest text-blue-200 mb-2 ml-1">Universal ID</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-200/50 group-focus-within:text-white transition-colors">
                <i className="fa-solid fa-envelope"></i>
              </span>
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="explorer@skyvault.io"
                className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-blue-100/30 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white/10 transition-all"
              />
            </div>
          </div>

          <div className="group">
            <label className="block text-xs font-bold uppercase tracking-widest text-blue-200 mb-2 ml-1">Access Key</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-200/50 group-focus-within:text-white transition-colors">
                <i className="fa-solid fa-lock"></i>
              </span>
              <input 
                type="password" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-blue-100/30 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white/10 transition-all"
              />
            </div>
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center cursor-pointer text-blue-100/80 hover:text-white transition-colors">
              <input type="checkbox" className="w-4 h-4 rounded-md border-white/20 bg-white/5 text-blue-500 focus:ring-blue-400 mr-2" />
              Remember device
            </label>
            <a href="#" className="font-bold text-white hover:underline decoration-blue-400 underline-offset-4">Lost access?</a>
          </div>

          <button 
            type="submit"
            disabled={isLoading}
            className="w-full py-5 bg-white text-blue-900 font-extrabold text-lg rounded-2xl shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-1 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed overflow-hidden relative group"
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              {isLoading ? (
                <i className="fa-solid fa-spinner fa-spin"></i>
              ) : (
                <>Enter Vault <i className="fa-solid fa-arrow-right"></i></>
              )}
            </span>
            <div className="absolute inset-0 bg-blue-50 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </button>
        </form>

        <div className="mt-10">
          <div className="relative flex items-center justify-center mb-8">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/10"></div></div>
            <span className="relative z-10 px-4 bg-transparent text-blue-100/40 text-xs font-bold uppercase tracking-widest">Federated Login</span>
          </div>
          <div className="flex gap-4">
            <button className="flex-1 py-4 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all flex items-center justify-center gap-3 text-white font-bold">
              <i className="fa-brands fa-google text-red-400"></i> Google
            </button>
            <button className="flex-1 py-4 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all flex items-center justify-center gap-3 text-white font-bold">
              <i className="fa-brands fa-github text-slate-300"></i> Github
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
