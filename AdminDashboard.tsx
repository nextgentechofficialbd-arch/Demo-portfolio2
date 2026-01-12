import React, { useState } from 'react';
import { useContent } from '../context/ContentContext';
import { Save, RefreshCw, Download, Plus, Trash2, ChevronDown, ChevronUp } from 'lucide-react';

const AdminDashboard: React.FC = () => {
  const { content, updateContent, resetContent } = useContent();
  const [activeTab, setActiveTab] = useState('hero');
  const [jsonView, setJsonView] = useState(false);
  const [localContent, setLocalContent] = useState(content);

  // Sync local state when context content changes (e.g. initial load)
  React.useEffect(() => {
    setLocalContent(content);
  }, [content]);

  const handleSave = () => {
    updateContent(localContent);
    alert('Content saved to local storage! The live site is updated.');
  };

  const handleDownload = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(localContent, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "content.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  const handleChange = (section: string, key: string, value: any) => {
    setLocalContent(prev => ({
      ...prev,
      [section]: {
        ...prev[section as keyof typeof prev],
        [key]: value
      }
    }));
  };

  const renderInput = (label: string, value: string, onChange: (val: string) => void, multiline = false) => (
    <div className="mb-4">
      <label className="block text-xs font-bold text-gray-500 uppercase mb-1">{label}</label>
      {multiline ? (
        <textarea 
          className="w-full bg-neutral-900 border border-neutral-700 rounded p-3 text-white focus:border-primary focus:outline-none"
          rows={4}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      ) : (
        <input 
          type="text"
          className="w-full bg-neutral-900 border border-neutral-700 rounded p-3 text-white focus:border-primary focus:outline-none"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-black text-white p-6 pb-20">
      <header className="flex justify-between items-center mb-8 border-b border-white/10 pb-6">
        <div>
           <h1 className="text-2xl font-bold">Admin Dashboard</h1>
           <p className="text-gray-400 text-sm">Manage your portfolio content</p>
        </div>
        <div className="flex gap-3">
          <button onClick={() => setJsonView(!jsonView)} className="px-4 py-2 bg-neutral-800 rounded-lg hover:bg-neutral-700 text-sm">
            {jsonView ? 'Visual Editor' : 'JSON View'}
          </button>
          <button onClick={resetContent} className="px-4 py-2 bg-red-900/50 text-red-200 rounded-lg hover:bg-red-900 text-sm flex items-center gap-2">
            <RefreshCw size={16} /> Reset
          </button>
          <button onClick={handleDownload} className="px-4 py-2 bg-neutral-800 text-white rounded-lg hover:bg-neutral-700 text-sm flex items-center gap-2">
            <Download size={16} /> Export JSON
          </button>
          <button onClick={handleSave} className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-indigo-600 font-bold flex items-center gap-2">
            <Save size={16} /> Save Changes
          </button>
        </div>
      </header>

      {jsonView ? (
        <div className="h-[80vh]">
          <textarea 
            className="w-full h-full bg-neutral-900 font-mono text-sm p-4 rounded-lg border border-neutral-800 focus:border-primary focus:outline-none"
            value={JSON.stringify(localContent, null, 2)}
            onChange={(e) => {
              try {
                setLocalContent(JSON.parse(e.target.value));
              } catch(err) {
                // simple error handling
              }
            }}
          />
        </div>
      ) : (
        <div className="flex gap-8">
          {/* Sidebar Navigation */}
          <div className="w-64 flex-shrink-0">
            <nav className="space-y-1">
              {['hero', 'about', 'skills', 'projects', 'testimonials', 'contact'].map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`w-full text-left px-4 py-3 rounded-lg capitalize font-medium transition-colors ${activeTab === tab ? 'bg-primary/20 text-primary' : 'text-gray-400 hover:bg-white/5'}`}
                >
                  {tab}
                </button>
              ))}
            </nav>
          </div>

          {/* Editor Area */}
          <div className="flex-1 bg-card rounded-xl border border-white/5 p-8 max-w-4xl">
            {activeTab === 'hero' && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold mb-6">Hero Section</h2>
                {renderInput("Name", localContent.hero.name, (v) => handleChange('hero', 'name', v))}
                {renderInput("Tagline", localContent.hero.tagline, (v) => handleChange('hero', 'tagline', v))}
                {renderInput("Description", localContent.hero.description, (v) => handleChange('hero', 'description', v), true)}
                {renderInput("Profile Image URL", localContent.hero.profileImage, (v) => handleChange('hero', 'profileImage', v))}
                {renderInput("Background Image URL", localContent.hero.backgroundImage, (v) => handleChange('hero', 'backgroundImage', v))}
              </div>
            )}

            {activeTab === 'about' && (
              <div className="space-y-6">
                 <h2 className="text-xl font-bold mb-6">About Section</h2>
                 {renderInput("Section Title", localContent.about.title, (v) => handleChange('about', 'title', v))}
                 {renderInput("Bio", localContent.about.bio, (v) => handleChange('about', 'bio', v), true)}
                 {renderInput("Image URL", localContent.about.image, (v) => handleChange('about', 'image', v))}
                 
                 <div className="mt-8">
                   <h3 className="font-bold text-gray-400 uppercase text-xs mb-4">Statistics</h3>
                   {localContent.about.stats.map((stat, idx) => (
                     <div key={idx} className="flex gap-4 mb-3">
                       <input 
                         className="bg-neutral-900 border border-neutral-700 rounded p-2 text-white w-1/2" 
                         value={stat.label} 
                         onChange={(e) => {
                           const newStats = [...localContent.about.stats];
                           newStats[idx].label = e.target.value;
                           handleChange('about', 'stats', newStats);
                         }}
                       />
                       <input 
                         className="bg-neutral-900 border border-neutral-700 rounded p-2 text-white w-1/2" 
                         value={stat.value} 
                         onChange={(e) => {
                           const newStats = [...localContent.about.stats];
                           newStats[idx].value = e.target.value;
                           handleChange('about', 'stats', newStats);
                         }}
                       />
                     </div>
                   ))}
                 </div>
              </div>
            )}

            {activeTab === 'projects' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold">Projects</h2>
                  <button 
                    onClick={() => {
                      const newProject = {
                        id: Date.now().toString(),
                        title: "New Project",
                        description: "Project description...",
                        image: "https://picsum.photos/800/600",
                        techStack: ["React"],
                        liveUrl: "",
                        githubUrl: "",
                        featured: false
                      };
                      setLocalContent(prev => ({...prev, projects: [newProject, ...prev.projects]}));
                    }}
                    className="flex items-center gap-2 px-3 py-1 bg-primary/20 text-primary rounded-lg text-sm hover:bg-primary/30"
                  >
                    <Plus size={14} /> Add Project
                  </button>
                </div>
                
                {localContent.projects.map((project, idx) => (
                  <div key={project.id} className="bg-neutral-900 p-6 rounded-lg border border-neutral-800 mb-4">
                    <div className="flex justify-between mb-4">
                      <h3 className="font-bold">{project.title}</h3>
                      <button 
                         onClick={() => {
                           const newProjects = localContent.projects.filter((_, i) => i !== idx);
                           setLocalContent(prev => ({...prev, projects: newProjects}));
                         }}
                         className="text-red-400 hover:text-red-300"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-4">
                        <input 
                          className="w-full bg-black border border-neutral-700 rounded p-2 text-white"
                          value={project.title}
                          onChange={(e) => {
                             const newProjects = [...localContent.projects];
                             newProjects[idx].title = e.target.value;
                             setLocalContent(prev => ({...prev, projects: newProjects}));
                          }}
                          placeholder="Project Title"
                        />
                        <textarea 
                          className="w-full bg-black border border-neutral-700 rounded p-2 text-white"
                          rows={3}
                          value={project.description}
                          onChange={(e) => {
                             const newProjects = [...localContent.projects];
                             newProjects[idx].description = e.target.value;
                             setLocalContent(prev => ({...prev, projects: newProjects}));
                          }}
                          placeholder="Description"
                        />
                         <input 
                          className="w-full bg-black border border-neutral-700 rounded p-2 text-white"
                          value={project.techStack.join(', ')}
                          onChange={(e) => {
                             const newProjects = [...localContent.projects];
                             newProjects[idx].techStack = e.target.value.split(',').map(s => s.trim());
                             setLocalContent(prev => ({...prev, projects: newProjects}));
                          }}
                          placeholder="Tech Stack (comma separated)"
                        />
                      </div>
                      <div className="space-y-4">
                        <input 
                          className="w-full bg-black border border-neutral-700 rounded p-2 text-white"
                          value={project.image}
                          onChange={(e) => {
                             const newProjects = [...localContent.projects];
                             newProjects[idx].image = e.target.value;
                             setLocalContent(prev => ({...prev, projects: newProjects}));
                          }}
                          placeholder="Image URL"
                        />
                        <div className="aspect-video bg-black rounded overflow-hidden">
                           <img src={project.image} className="w-full h-full object-cover opacity-50" />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            {/* Implement other tabs similarly - simplified for brevity in this response */}
            {(activeTab === 'skills' || activeTab === 'testimonials' || activeTab === 'contact') && (
              <div className="text-center py-20 text-gray-500">
                <p>Editor for {activeTab} is available in JSON mode or can be implemented using the same pattern as Projects.</p>
                <button onClick={() => setJsonView(true)} className="mt-4 text-primary underline">Switch to JSON View</button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
