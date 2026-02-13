
import React, { useState, useRef } from 'react';
import { Page, CloudFile } from '../types';

interface UploadPageProps {
  onNavigate: (page: Page) => void;
  onLogout: () => void;
}

const UploadPage: React.FC<UploadPageProps> = ({ onNavigate, onLogout }) => {
  const [files, setFiles] = useState<CloudFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const formatSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFiles = event.target.files;
    if (uploadedFiles) {
      const newFiles: CloudFile[] = Array.from(uploadedFiles).map((file: File) => ({
        id: Math.random().toString(36).substr(2, 9),
        name: file.name,
        size: formatSize(file.size),
        type: file.type || 'Binary',
        uploadDate: new Date().toLocaleTimeString()
      }));
      setFiles(prev => [...newFiles, ...prev]);
    }
  };

  const removeFile = (id: string) => {
    setFiles(prev => prev.filter(f => f.id !== id));
  };

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
          <button onClick={() => onNavigate(Page.DASHBOARD)} className="w-full flex items-center gap-4 px-6 py-4 text-slate-400 hover:text-white hover:bg-white/5 rounded-2xl transition-all font-bold">
            <i className="fa-solid fa-house"></i> Dashboard
          </button>
          <button className="w-full flex items-center gap-4 px-6 py-4 bg-blue-600 text-white rounded-2xl font-bold neo-shadow">
            <i className="fa-solid fa-cloud-arrow-up"></i> Upload
          </button>
          <button className="w-full flex items-center gap-4 px-6 py-4 text-slate-400 hover:text-white hover:bg-white/5 rounded-2xl transition-all font-bold">
            <i className="fa-solid fa-folder"></i> My Library
          </button>
        </nav>

        <div className="mt-auto pt-8 border-t border-white/5">
          <button 
            onClick={onLogout}
            className="w-full flex items-center justify-center gap-3 px-6 py-4 text-red-400 hover:bg-red-400/10 rounded-2xl font-bold transition-all"
          >
            <i className="fa-solid fa-right-from-bracket"></i> Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 md:p-12 flex flex-col overflow-y-auto">
        <header className="mb-10">
          <h2 className="text-4xl font-black text-white mb-2">Initialize Transfer</h2>
          <p className="text-slate-500 text-lg">Push your data into the vault's distributed network.</p>
        </header>

        {/* Dynamic Upload Zone */}
        <div 
          className={`relative border-2 border-dashed rounded-[40px] p-16 transition-all duration-500 text-center mb-12 group overflow-hidden ${
            isDragging ? 'border-blue-400 bg-blue-600/10 scale-[0.98]' : 'border-white/10 hover:border-blue-400/50 bg-slate-900/50'
          }`}
          onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={(e) => { e.preventDefault(); setIsDragging(false); }}
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/5 to-purple-600/5 pointer-events-none"></div>
          
          <input 
            type="file" 
            multiple 
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
            ref={fileInputRef}
            onChange={handleFileUpload}
          />

          <div className="relative z-10 pointer-events-none">
            <div className={`w-28 h-28 bg-blue-600/10 text-blue-400 rounded-full flex items-center justify-center mx-auto mb-8 transition-all duration-500 ${isDragging ? 'scale-125 pulsing-border border-2' : 'group-hover:scale-110'}`}>
              <i className="fa-solid fa-cloud-arrow-up text-5xl"></i>
            </div>
            <h3 className="text-3xl font-black text-white mb-3">Drop files here to sync</h3>
            <p className="text-slate-500 text-lg mb-8 max-w-md mx-auto">Click to browse or drag documents, images, and videos directly into the vault zone.</p>
            <div className="flex justify-center gap-4">
              <span className="px-6 py-2 bg-white/5 border border-white/10 rounded-full text-xs font-bold uppercase tracking-widest text-slate-400">PDF</span>
              <span className="px-6 py-2 bg-white/5 border border-white/10 rounded-full text-xs font-bold uppercase tracking-widest text-slate-400">ZIP</span>
              <span className="px-6 py-2 bg-white/5 border border-white/10 rounded-full text-xs font-bold uppercase tracking-widest text-slate-400">MP4</span>
            </div>
          </div>
        </div>

        {/* Transfer Queue */}
        <div className="flex-1 bg-slate-900/50 rounded-[40px] border border-white/5 flex flex-col overflow-hidden">
          <div className="p-8 border-b border-white/5 flex justify-between items-center bg-slate-900/80">
            <div>
              <h3 className="text-xl font-bold text-white">Transfer Queue</h3>
              <p className="text-sm text-slate-500 font-medium">Monitoring {files.length} active streams</p>
            </div>
            {files.length > 0 && (
              <button 
                onClick={() => setFiles([])}
                className="px-6 py-2 bg-red-400/10 text-red-400 text-xs font-black uppercase tracking-widest rounded-full hover:bg-red-400/20 transition-all"
              >
                Abort All
              </button>
            )}
          </div>
          
          <div className="flex-1 p-6 overflow-y-auto">
            {files.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-slate-600 space-y-4 py-20">
                <div className="w-20 h-20 bg-white/5 rounded-3xl flex items-center justify-center">
                  <i className="fa-solid fa-inbox text-4xl opacity-20"></i>
                </div>
                <p className="text-lg font-bold opacity-30">Queue is currently idle.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                {files.map((file) => (
                  <div key={file.id} className="file-card-enter group relative p-6 bg-slate-900 border border-white/5 rounded-3xl hover:border-blue-400/30 transition-all">
                    <div className="flex items-center gap-5">
                      <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-blue-400 group-hover:bg-blue-400/10 transition-colors">
                        <i className={`fa-solid ${file.type.includes('image') ? 'fa-image' : 'fa-file-code'} text-2xl`}></i>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-white truncate text-lg">{file.name}</p>
                        <div className="flex gap-3 text-xs font-bold text-slate-500 uppercase tracking-widest mt-1">
                          <span>{file.size}</span>
                          <span>•</span>
                          <span>{file.uploadDate}</span>
                        </div>
                      </div>
                      <button 
                        onClick={() => removeFile(file.id)}
                        className="w-10 h-10 flex items-center justify-center text-slate-600 hover:text-red-400 hover:bg-red-400/10 rounded-xl transition-all"
                      >
                        <i className="fa-solid fa-trash-can"></i>
                      </button>
                    </div>
                    {/* Progress Bar Simulation */}
                    <div className="mt-6 w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-gradient-to-r from-blue-500 to-indigo-500 h-full rounded-full" style={{ width: '100%' }}></div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          {files.length > 0 && (
            <div className="p-8 bg-slate-900 border-t border-white/5">
              <button className="w-full py-5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-black text-xl rounded-2xl shadow-2xl neo-shadow transition-all transform hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-4">
                <i className="fa-solid fa-rocket"></i>
                Finalize Global Sync
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default UploadPage;
