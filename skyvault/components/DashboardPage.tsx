import React from 'react';
import { Page } from '../types';

interface DashboardPageProps {
  onNavigate: (page: Page) => void;
  onLogout: () => void;
}

const DashboardPage: React.FC<DashboardPageProps> = ({ onNavigate, onLogout }) => {
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-slate-950 text-slate-200">
      {/* Sidebar */}
      <aside className="w-full md:w-80 bg-slate-900 border-r border-white/5 flex flex-col p-6">
        <div className="flex items-center gap-4 mb-12 px-2">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center neo-shadow">
            <i className="fa-solid fa-cloud text-white text-xl"></i>
          </div>
          <span className="text-2xl font-black text-white tracking-tight">SkyVault</span>
        </div>
        
        <nav className="flex-1 space-y-3">
          <NavItem icon="fa-house" label="Home Base" active />
          <NavItem icon="fa-cloud-arrow-up" label="Upload Portal" onClick={() => onNavigate(Page.UPLOAD)} />
          <NavItem icon="fa-folder-tree" label="Deep Storage" />
          <NavItem icon="fa-shield-halved" label="Security" />
          <NavItem icon="fa-chart-pie" label="Analytics" />
        </nav>

        <div className="mt-auto pt-8">
          <div className="bg-white/5 rounded-[30px] p-6 border border-white/5 mb-6">
            <div className="flex justify-between items-center mb-4">
              <span className="text-xs font-bold uppercase tracking-widest text-blue-400">Data Capacity</span>
              <span className="text-xs font-bold text-white">74%</span>
            </div>
            <div className="w-full bg-white/10 rounded-full h-3 mb-4 overflow-hidden">
              <div className="bg-gradient-to-r from-blue-500 to-indigo-500 h-full rounded-full" style={{ width: '74%' }}></div>
            </div>
            <p className="text-xs text-slate-400 font-medium">14.8 GB of 20 GB used</p>
            <button className="w-full mt-4 py-3 bg-blue-600/10 hover:bg-blue-600/20 text-blue-400 text-sm font-bold rounded-xl transition-all">
              Expand Universe
            </button>
          </div>
          
          <button 
            onClick={onLogout}
            className="w-full flex items-center gap-4 px-6 py-4 text-slate-400 hover:text-white hover:bg-white/5 rounded-2xl transition-all font-bold"
          >
            <i className="fa-solid fa-power-off"></i> Terminate Session
          </button>
        </div>
      </aside>

      {/* Main Surface */}
      <main className="flex-1 p-8 md:p-12 overflow-y-auto">
        <header className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-12 gap-6">
          <div>
            <h2 className="text-4xl font-black text-white mb-2">Systems Online.</h2>
            <p className="text-slate-500 text-lg">Your planetary-scale storage is ready for instructions.</p>
          </div>
          <div className="flex gap-4 w-full lg:w-auto">
            <div className="flex-1 lg:flex-none relative">
              <i className="fa-solid fa-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"></i>
              <input type="text" placeholder="Locate file..." className="w-full lg:w-64 pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/50" />
            </div>
            <button 
              onClick={() => onNavigate(Page.UPLOAD)}
              className="px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-2xl neo-shadow transition-all flex items-center gap-3"
            >
              <i className="fa-solid fa-bolt"></i> Quick Upload
            </button>
          </div>
        </header>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <StatCard icon="fa-file-shield" color="blue" label="Encrypted Files" val="12.4k" trend="+12%" />
          <StatCard icon="fa-share-nodes" color="indigo" label="Active Shares" val="84" trend="+5" />
          <StatCard icon="fa-bolt-lightning" color="amber" label="Traffic Load" val="Low" trend="Stable" />
        </div>

        {/* Workspace Overview */}
        <div className="bg-slate-900/50 rounded-[40px] border border-white/5 overflow-hidden">
          <div className="p-8 border-b border-white/5 flex justify-between items-center">
            <h3 className="text-xl font-bold text-white">Recent Artifacts</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-slate-500 text-xs font-black uppercase tracking-[0.2em]">
                  <th className="px-8 py-6">Identity</th>
                  <th className="px-8 py-6">Sector</th>
                  <th className="px-8 py-6">Temporal Sync</th>
                  <th className="px-8 py-6">Volume</th>
                  <th className="px-8 py-6"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                <FileRow name="Global_Strategy_2025.pdf" type="DOCX" date="02:14 PM" size="4.2 MB" icon="fa-file-pdf" iconColor="red" />
                <FileRow name="System_Blueprint_Final.dwg" type="ARCHIVE" date="Yesterday" size="124 MB" icon="fa-file-zipper" iconColor="blue" />
                <FileRow name="Atmosphere_Video.mp4" type="MEDIA" date="Oct 28" size="2.1 GB" icon="fa-video" iconColor="purple" />
                <FileRow name="Identity_Module_V3.png" type="ASSET" date="Oct 24" size="1.8 MB" icon="fa-image" iconColor="emerald" />
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

const NavItem = ({ icon, label, active = false, onClick }: any) => (
  <button 
    onClick={onClick}
    className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl font-bold transition-all ${
      active ? 'bg-blue-600 text-white neo-shadow' : 'text-slate-400 hover:text-white hover:bg-white/5'
    }`}
  >
    <i className={`fa-solid ${icon}`}></i> {label}
  </button>
);

const StatCard = ({ icon, color, label, val, trend }: any) => {
  const colors: any = {
    blue: 'bg-blue-500/10 text-blue-500',
    indigo: 'bg-indigo-500/10 text-indigo-500',
    amber: 'bg-amber-500/10 text-amber-500',
  };
  return (
    <div className="bg-slate-900 p-8 rounded-[35px] border border-white/5 hover:border-white/10 transition-all group">
      <div className={`w-14 h-14 ${colors[color]} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
        <i className={`fa-solid ${icon} text-2xl`}></i>
      </div>
      <p className="text-slate-400 font-bold text-sm uppercase tracking-widest mb-1">{label}</p>
      <div className="flex items-baseline gap-3">
        <h3 className="text-3xl font-black text-white">{val}</h3>
        <span className="text-xs font-bold text-emerald-400">{trend}</span>
      </div>
    </div>
  );
};

const FileRow = ({ name, type, date, size, icon, iconColor }: any) => {
  const colors: any = {
    red: 'bg-red-500/10 text-red-500',
    blue: 'bg-blue-500/10 text-blue-500',
    purple: 'bg-purple-500/10 text-purple-500',
    emerald: 'bg-emerald-500/10 text-emerald-500',
  };
  return (
    <tr className="hover:bg-white/[0.02] transition-colors group">
      <td className="px-8 py-5">
        <div className="flex items-center gap-4">
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${colors[iconColor]}`}>
            <i className={`fa-solid ${icon} text-xl`}></i>
          </div>
          <span className="font-bold text-white group-hover:text-blue-400 transition-colors">{name}</span>
        </div>
      </td>
      <td className="px-8 py-5"><span className="text-xs font-black bg-white/5 px-3 py-1 rounded-full text-slate-400 tracking-wider">{type}</span></td>
      <td className="px-8 py-5 text-slate-500 font-medium">{date}</td>
      <td className="px-8 py-5 text-slate-500 font-medium">{size}</td>
      <td className="px-8 py-5 text-right">
        <button className="w-10 h-10 rounded-full hover:bg-white/10 text-slate-500 hover:text-white transition-all">
          <i className="fa-solid fa-ellipsis"></i>
        </button>
      </td>
    </tr>
  );
};

export default DashboardPage;