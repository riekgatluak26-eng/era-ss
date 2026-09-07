'use client';

import { useState, useEffect, useRef } from 'react';

export default function AdminCoveragePage() {
  const [data, setData] = useState<any>(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('hero');
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetch('/api/coverage')
      .then((res) => res.json())
      .then((json) => {
        setData(json);
        setLoading(false);
      })
      .catch(console.error);
  }, []);

  const handleSave = async () => {
    const res = await fetch('/api/coverage', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (res.ok) setMessage('Coverage page updated successfully!');
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

  if (loading) return <div style={{ padding: 40 }}>Loading coverage data…</div>;
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

  const tabs = ['hero', 'coverageDetails', 'presence', 'howWeWork', 'programReach', 'cta'];

  return (
    <div>
      <h1 style={{ fontFamily: 'Archivo, sans-serif', marginBottom: 24 }}>Edit Coverage Page</h1>
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

      {/* COVERAGE DETAILS */}
      {activeTab === 'coverageDetails' && (
        <div>
          <label style={labelStyle}>Subtitle</label>
          <input value={data.coverageDetails?.subtitle} onChange={(e) => updateField('coverageDetails', 'subtitle', e.target.value)} style={inputStyle} />
          <label style={labelStyle}>Title</label>
          <input value={data.coverageDetails?.title} onChange={(e) => updateField('coverageDetails', 'title', e.target.value)} style={inputStyle} />
          <label style={labelStyle}>Paragraph 1</label>
          <textarea value={data.coverageDetails?.paragraph1} onChange={(e) => updateField('coverageDetails', 'paragraph1', e.target.value)} rows={4} style={inputStyle} />
          <label style={labelStyle}>Paragraph 2</label>
          <textarea value={data.coverageDetails?.paragraph2} onChange={(e) => updateField('coverageDetails', 'paragraph2', e.target.value)} rows={4} style={inputStyle} />
          <label style={labelStyle}>Image</label>
          <div style={{ display: 'flex', gap: 10, marginBottom: 16 }}>
            <input value={data.coverageDetails?.image} onChange={(e) => updateField('coverageDetails', 'image', e.target.value)} style={{ ...inputStyle, flex: 1, marginBottom: 0 }} />
            <input type="file" ref={fileInputRef} onChange={() => handleImageUpload((url) => updateField('coverageDetails', 'image', url))} style={{ display: 'none' }} />
            <button type="button" onClick={() => fileInputRef.current?.click()} className="btn btn-primary" style={{ whiteSpace: 'nowrap' }}>Upload</button>
          </div>
          {data.coverageDetails?.image && <img src={data.coverageDetails.image} style={{ maxWidth: 200, marginBottom: 16 }} />}
          <h4>Stats</h4>
          {data.coverageDetails?.stats?.map((stat: any, idx: number) => (
            <div key={idx} style={{ display: 'flex', gap: 10, marginBottom: 10 }}>
              <input value={stat.value} onChange={(e) => handleArrayItemChange('coverageDetails', 'stats', idx, 'value', e.target.value)} placeholder="Value" style={{ ...inputStyle, flex: 1 }} />
              <input value={stat.label} onChange={(e) => handleArrayItemChange('coverageDetails', 'stats', idx, 'label', e.target.value)} placeholder="Label" style={{ ...inputStyle, flex: 2 }} />
              <button onClick={() => handleArrayRemove('coverageDetails', 'stats', idx)}>✕</button>
            </div>
          ))}
          <button onClick={() => handleArrayAdd('coverageDetails', 'stats', { value: '', label: '' })}>+ Add Stat</button>
        </div>
      )}

      {/* PRESENCE */}
      {activeTab === 'presence' && (
        <div>
          <label style={labelStyle}>Subtitle</label>
          <input value={data.presence?.subtitle} onChange={(e) => updateField('presence', 'subtitle', e.target.value)} style={inputStyle} />
          <label style={labelStyle}>Title</label>
          <input value={data.presence?.title} onChange={(e) => updateField('presence', 'title', e.target.value)} style={inputStyle} />
          <label style={labelStyle}>Description</label>
          <textarea value={data.presence?.description} onChange={(e) => updateField('presence', 'description', e.target.value)} rows={3} style={inputStyle} />
          <h4>States</h4>
          {data.presence?.states?.map((state: any, idx: number) => (
            <div key={idx} style={{ border: '1px solid #ccc', padding: 10, marginBottom: 10 }}>
              <input value={state.name} onChange={(e) => handleArrayItemChange('presence', 'states', idx, 'name', e.target.value)} placeholder="State name" style={inputStyle} />
              <input value={state.focus} onChange={(e) => handleArrayItemChange('presence', 'states', idx, 'focus', e.target.value)} placeholder="Focus areas" style={inputStyle} />
              <button onClick={() => handleArrayRemove('presence', 'states', idx)}>Remove</button>
            </div>
          ))}
          <button onClick={() => handleArrayAdd('presence', 'states', { name: '', focus: '' })}>+ Add State</button>
        </div>
      )}

      {/* HOW WE WORK */}
      {activeTab === 'howWeWork' && (
        <div>
          <label style={labelStyle}>Subtitle</label>
          <input value={data.howWeWork?.subtitle} onChange={(e) => updateField('howWeWork', 'subtitle', e.target.value)} style={inputStyle} />
          <label style={labelStyle}>Title</label>
          <input value={data.howWeWork?.title} onChange={(e) => updateField('howWeWork', 'title', e.target.value)} style={inputStyle} />
          <label style={labelStyle}>Description</label>
          <textarea value={data.howWeWork?.description} onChange={(e) => updateField('howWeWork', 'description', e.target.value)} rows={3} style={inputStyle} />
          <h4>Items</h4>
          {data.howWeWork?.items?.map((item: any, idx: number) => (
            <div key={idx} style={{ border: '1px solid #ccc', padding: 10, marginBottom: 10 }}>
              <input value={item.icon} onChange={(e) => handleArrayItemChange('howWeWork', 'items', idx, 'icon', e.target.value)} placeholder="Icon class" style={inputStyle} />
              <input value={item.title} onChange={(e) => handleArrayItemChange('howWeWork', 'items', idx, 'title', e.target.value)} placeholder="Title" style={inputStyle} />
              <button onClick={() => handleArrayRemove('howWeWork', 'items', idx)}>Remove</button>
            </div>
          ))}
          <button onClick={() => handleArrayAdd('howWeWork', 'items', { icon: '', title: '' })}>+ Add Item</button>
        </div>
      )}

      {/* PROGRAM REACH */}
      {activeTab === 'programReach' && (
        <div>
          <label style={labelStyle}>Subtitle</label>
          <input value={data.programReach?.subtitle} onChange={(e) => updateField('programReach', 'subtitle', e.target.value)} style={inputStyle} />
          <label style={labelStyle}>Title</label>
          <input value={data.programReach?.title} onChange={(e) => updateField('programReach', 'title', e.target.value)} style={inputStyle} />
          <h4>Stats</h4>
          {data.programReach?.stats?.map((stat: any, idx: number) => (
            <div key={idx} style={{ display: 'flex', gap: 10, marginBottom: 10 }}>
              <input value={stat.value} onChange={(e) => handleArrayItemChange('programReach', 'stats', idx, 'value', e.target.value)} placeholder="Value" style={{ ...inputStyle, flex: 1 }} />
              <input value={stat.label} onChange={(e) => handleArrayItemChange('programReach', 'stats', idx, 'label', e.target.value)} placeholder="Label" style={{ ...inputStyle, flex: 2 }} />
              <button onClick={() => handleArrayRemove('programReach', 'stats', idx)}>✕</button>
            </div>
          ))}
          <button onClick={() => handleArrayAdd('programReach', 'stats', { value: '', label: '' })}>+ Add Stat</button>
          <label style={labelStyle}>Note</label>
          <input value={data.programReach?.note} onChange={(e) => updateField('programReach', 'note', e.target.value)} style={inputStyle} />
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
        Save Coverage Page
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