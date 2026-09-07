'use client';

import { useState, useEffect, useRef } from 'react';

export default function AdminTeamPage() {
  const [data, setData] = useState<any>(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('hero');
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetch('/api/team')
      .then((res) => res.json())
      .then((json) => {
        setData(json);
        setLoading(false);
      })
      .catch(console.error);
  }, []);

  const handleSave = async () => {
    const res = await fetch('/api/team', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (res.ok) setMessage('Team page updated successfully!');
    else setMessage('Save failed.');
  };

  const updateField = (section: string, field: string, value: any) => {
    setData((prev: any) => ({
      ...prev,
      [section]: { ...prev[section], [field]: value },
    }));
  };

  const handleArrayAdd = (section: string, field: string, newItem: any) => {
    setData((prev: any) => ({
      ...prev,
      [section]: { ...prev[section], [field]: [...(prev[section]?.[field] || []), newItem] },
    }));
  };

  const handleArrayRemove = (section: string, field: string, index: number) => {
    setData((prev: any) => {
      const arr = [...(prev[section]?.[field] || [])];
      arr.splice(index, 1);
      return { ...prev, [section]: { ...prev[section], [field]: arr } };
    });
  };

  const handleArrayItemChange = (section: string, field: string, index: number, key: string, value: any) => {
    setData((prev: any) => {
      const arr = [...(prev[section]?.[field] || [])];
      if (arr[index]) arr[index] = { ...arr[index], [key]: value };
      return { ...prev, [section]: { ...prev[section], [field]: arr } };
    });
  };

  const handleImageUpload = async (callback: (url: string) => void) => {
    const file = fileInputRef.current?.files?.[0];
    if (!file) return;
    const formData = new FormData();
    formData.append('file', file);
    try {
      const res = await fetch('/api/upload', { method: 'POST', body: formData });
      const result = await res.json();
      if (result.url) {
        callback(result.url);
        setMessage('Image uploaded!');
      } else {
        setMessage('Upload failed');
      }
    } catch {
      setMessage('Upload failed');
    }
  };

  if (loading) return <div style={{ padding: 40 }}>Loading team data…</div>;
  if (!data) return <div style={{ padding: 40 }}>Error loading data.</div>;

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '12px',
    marginBottom: '16px',
    borderRadius: '8px',
    border: '1.5px solid #e5e7eb',
    fontSize: '14px',
    fontFamily: 'inherit',
  };

  const tabStyle = (tab: string) => ({
    padding: '8px 16px',
    borderRadius: '8px',
    border: activeTab === tab ? '2px solid var(--era-primary)' : '1px solid #ccc',
    background: activeTab === tab ? 'var(--era-primary)' : 'white',
    color: activeTab === tab ? 'white' : 'var(--text-dark)',
    fontWeight: 600,
    cursor: 'pointer',
    marginRight: 8,
    marginBottom: 8,
  });

  const tabs = ['hero', 'intro', 'members', 'cta'];

  return (
    <div>
      <h1 style={{ fontFamily: 'Archivo, sans-serif', marginBottom: 24 }}>Edit Team Page</h1>
      {message && <p style={{ color: message.includes('success') || message.includes('uploaded') ? 'green' : 'red', marginBottom: 16 }}>{message}</p>}

      <div style={{ display: 'flex', flexWrap: 'wrap', marginBottom: 20 }}>
        {tabs.map((tab) => (
          <button key={tab} onClick={() => setActiveTab(tab)} style={tabStyle(tab)}>
            {tab.replace(/([A-Z])/g, ' $1').replace(/^./, (s: string) => s.toUpperCase())}
          </button>
        ))}
      </div>

      {/* HERO */}
      {activeTab === 'hero' && (
        <div>
          <label style={labelStyle}>Title</label>
          <input value={data.hero?.title} onChange={(e) => updateField('hero', 'title', e.target.value)} style={inputStyle} />
          <label style={labelStyle}>Subtitle</label>
          <textarea value={data.hero?.subtitle} onChange={(e) => updateField('hero', 'subtitle', e.target.value)} rows={3} style={inputStyle} />
          <label style={labelStyle}>Background Image</label>
          <div style={{ display: 'flex', gap: 10, marginBottom: 16 }}>
            <input value={data.hero?.backgroundImage} onChange={(e) => updateField('hero', 'backgroundImage', e.target.value)} style={{ ...inputStyle, flex: 1, marginBottom: 0 }} />
            <input type="file" ref={fileInputRef} onChange={() => handleImageUpload((url) => updateField('hero', 'backgroundImage', url))} style={{ display: 'none' }} />
            <button type="button" onClick={() => fileInputRef.current?.click()} className="btn btn-primary" style={{ whiteSpace: 'nowrap' }}>Upload</button>
          </div>
          {data.hero?.backgroundImage && <img src={data.hero.backgroundImage} style={{ maxWidth: 200, marginBottom: 16 }} />}
        </div>
      )}

      {/* INTRO */}
      {activeTab === 'intro' && (
        <div>
          <label style={labelStyle}>Subtitle</label>
          <input value={data.intro?.subtitle} onChange={(e) => updateField('intro', 'subtitle', e.target.value)} style={inputStyle} />
          <label style={labelStyle}>Title</label>
          <input value={data.intro?.title} onChange={(e) => updateField('intro', 'title', e.target.value)} style={inputStyle} />
          <label style={labelStyle}>Description</label>
          <textarea value={data.intro?.description} onChange={(e) => updateField('intro', 'description', e.target.value)} rows={4} style={inputStyle} />
        </div>
      )}

      {/* MEMBERS */}
      {activeTab === 'members' && (
        <div>
          <h4>Team Members</h4>
          {data.members?.map((member: any, idx: number) => (
            <div key={idx} style={{ border: '1px solid #ccc', padding: 10, marginBottom: 10 }}>
              <input value={member.initials} onChange={(e) => handleArrayItemChange('members', 'members', idx, 'initials', e.target.value)} placeholder="Initials" style={inputStyle} />
              <input value={member.name} onChange={(e) => handleArrayItemChange('members', 'members', idx, 'name', e.target.value)} placeholder="Name" style={inputStyle} />
              <input value={member.role} onChange={(e) => handleArrayItemChange('members', 'members', idx, 'role', e.target.value)} placeholder="Role" style={inputStyle} />
              <textarea value={member.bio} onChange={(e) => handleArrayItemChange('members', 'members', idx, 'bio', e.target.value)} placeholder="Bio" rows={3} style={inputStyle} />
              <label style={labelStyle}>Photo</label>
              <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 10 }}>
                <input value={member.photo || ''} onChange={(e) => handleArrayItemChange('members', 'members', idx, 'photo', e.target.value)} placeholder="Photo URL" style={{ ...inputStyle, flex: 1, marginBottom: 0 }} />
                <input type="file" id={`member-photo-${idx}`} style={{ display: 'none' }} onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;
                  const formData = new FormData();
                  formData.append('file', file);
                  fetch('/api/upload', { method: 'POST', body: formData })
                    .then(res => res.json())
                    .then(result => {
                      if (result.url) handleArrayItemChange('members', 'members', idx, 'photo', result.url);
                      setMessage('Photo uploaded!');
                    });
                }} />
                <button onClick={() => document.getElementById(`member-photo-${idx}`)?.click()} className="btn btn-primary" style={{ whiteSpace: 'nowrap' }}>Upload Photo</button>
              </div>
              {member.photo && <img src={member.photo} alt="Member" style={{ maxWidth: 100, marginBottom: 8, borderRadius: '50%' }} />}
              <button onClick={() => handleArrayRemove('members', 'members', idx)}>Remove</button>
            </div>
          ))}
          <button onClick={() => handleArrayAdd('members', 'members', { initials: '', name: '', role: '', bio: '', photo: '' })}>+ Add Member</button>
        </div>
      )}

      {/* CTA */}
      {activeTab === 'cta' && (
        <div>
          <label style={labelStyle}>Title</label>
          <input value={data.cta?.title} onChange={(e) => updateField('cta', 'title', e.target.value)} style={inputStyle} />
          <label style={labelStyle}>Text</label>
          <textarea value={data.cta?.text} onChange={(e) => updateField('cta', 'text', e.target.value)} rows={3} style={inputStyle} />
        </div>
      )}

      <button onClick={handleSave} className="btn btn-primary" style={{ marginTop: 20, width: '100%', padding: 14, fontSize: 15 }}>
        Save Team Page
      </button>
    </div>
  );
}

const labelStyle: React.CSSProperties = {
  display: 'block',
  marginBottom: 4,
  fontWeight: 600,
  fontSize: 14,
  color: '#1e1e1e',
};