"use client";

import { useState, useEffect } from 'react';
import { projectsData, setProjectsData } from '../../utils/projectsData';
import Link from 'next/link';

const PASSWORD = "iloveneset";

export default function EditPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [projects, setProjects] = useState(projectsData);
  const [editingProject, setEditingProject] = useState(null);
  const [formData, setFormData] = useState({ title: '', description: '', repo: '' });

  useEffect(() => {
    setProjectsData(projects);
  }, [projects]);

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (password === PASSWORD) {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('wrong password >:( ');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddProject = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.description || !formData.repo) return;
    setProjects(prev => [...prev, { ...formData, id: Date.now() }]);
    setFormData({ title: '', description: '', repo: '' });
  };

  const handleEditClick = (project) => {
    setEditingProject(project);
    setFormData({ title: project.title, description: project.description, repo: project.repo });
  };

  const handleUpdateProject = (e) => {
    e.preventDefault();
    setProjects(prev => prev.map(p => p.id === editingProject.id ? { ...editingProject, ...formData } : p));
    setEditingProject(null);
    setFormData({ title: '', description: '', repo: '' });
  };

  const handleDeleteProject = (id) => {
    setProjects(prev => prev.filter(p => p.id !== id));
  };

  if (!isAuthenticated) {
    return (
      <div className='bg-black min-h-screen flex items-center justify-center text-slate-200'>
        <div className='w-full max-w-sm p-8 bg-slate-900/50 rounded-lg border border-slate-800'>
          <h1 className='text-2xl font-bold text-center mb-6'>edit projects yo</h1>
          <form onSubmit={handlePasswordSubmit}>
            <input type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder='enter password'
              className='w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500'
            />
            {error && <p className='text-red-500 text-sm mt-2'>{error}</p>}
            <button type='submit' className='w-full mt-4 bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-md transition-colors'>
              login
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className='bg-black min-h-screen p-8 text-slate-200 font-sans'>
      <div className='max-w-4xl mx-auto'>
        <h1 className='text-4xl font-bold mb-8'>edit projects</h1>

        <form
          onSubmit={editingProject ? handleUpdateProject : handleAddProject}
          className='mb-12 p-6 bg-slate-900/50 rounded-lg border border-slate-800'
        >
          <h2 className='text-2xl font-bold mb-4'>{editingProject ? 'edit proj' : 'add new proj'}</h2>
          <div className='space-y-4'>
            <input type='text' name='title' value={formData.title} onChange={handleInputChange} placeholder='proj title' className='w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500' />
            <textarea name='description' value={formData.description} onChange={handleInputChange} placeholder='proj desc' className='w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 h-24' />
            <input type='text' name='repo' value={formData.repo} onChange={handleInputChange} placeholder='proj repo' className='w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500' />
          </div>
          <div className='flex space-x-4 mt-4'>
            <button type='submit' className='bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-6 rounded-md transition-colors'>
              {editingProject ? 'update proj' : 'add proj'}
            </button>
            {editingProject && (
              <button type='button' onClick={() => { setEditingProject(null); setFormData({ title: '', description: '', repo: '' }); }} className='bg-slate-600 hover:bg-red-500 text-white font-bold py-2 px-6 rounded-md transition-colors'>
                cancel
              </button>
            )}
          </div>
        </form>

        <div>
          <h2 className='text-2xl font-bold mb-4'>
            current projs
          </h2>
          <div className='space-y-4'>
            {projects.map(project => (
              <div key={project.id} className='p-4 bg-slate-900 rounded-lg border border-slate-800 flex justify-between items-center'>
                <div>
                  <h3 className='text-xl font-bold text-white'>{project.title}</h3>
                  <p className='text-slate-400'>{project.description}</p>
                  <a href={project.repo} target='_blank' className='text-purple-400 hover:underline'>{project.repo}</a>
                </div>
                <div className='flex space-x-2'>
                  <button onClick={() => handleEditClick(project)} className='bg-blue-600 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded-md transition-colors'>edit</button>
                  <button onClick={() => handleDeleteProject(project.id)} className='bg-red-600 hover:bg-red-700 text-white font-bold py-1 px-3 rounded-md transition-colors'>delete</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
