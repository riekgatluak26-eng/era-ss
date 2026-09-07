'use client';

import { useState, useEffect, useRef } from 'react';

export default function AdminProgramsPage() {
  const [data, setData] = useState<any>(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('hero');
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetch('/api/programs')
      .then((res) => res.json())
      .then((json) => {
        setData(json);
        setLoading(false);
      })
      .catch(console.error);
  }, []);

  const handleSave = async () => {
    const res = await fetch('/api/programs', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (res.ok) setMessage('Programs page updated successfully!');
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

  if (loading) return <div style={{ padding: 40 }}>Loading programs data…</div>;
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

  const tabs = [
    'hero', 'intro', 'thematicAreas', 'programApproach', 'impact', 'crossCutting', 'partnerships', 'measuringSuccess', 'cta',
  ];

  return (
    <div>
      <h1 style={{ fontFamily: 'Archivo, sans-serif', marginBottom: 24 }}>Edit Programs Page</h1>
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

      {/* THEMATIC AREAS */}
      {activeTab === 'thematicAreas' && (
        <div>
          <label style={labelStyle}>Subtitle</label>
          <input value={data.thematicAreas?.subtitle} onChange={(e) => updateField('thematicAreas', 'subtitle', e.target.value)} style={inputStyle} />
          <label style={labelStyle}>Title</label>
          <input value={data.thematicAreas?.title} onChange={(e) => updateField('thematicAreas', 'title', e.target.value)} style={inputStyle} />
          <h4>Items</h4>
          {data.thematicAreas?.items?.map((item: any, idx: number) => (
            <div key={idx} style={{ border: '1px solid #ccc', padding: 10, marginBottom: 10 }}>
              <input value={item.icon} onChange={(e) => handleArrayItemChange('thematicAreas', 'items', idx, 'icon', e.target.value)} placeholder="Icon class" style={inputStyle} />
              <input value={item.title} onChange={(e) => handleArrayItemChange('thematicAreas', 'items', idx, 'title', e.target.value)} placeholder="Title" style={inputStyle} />
              <textarea value={item.text} onChange={(e) => handleArrayItemChange('thematicAreas', 'items', idx, 'text', e.target.value)} placeholder="Text" rows={3} style={inputStyle} />
              <button onClick={() => handleArrayRemove('thematicAreas', 'items', idx)}>Remove</button>
            </div>
          ))}
          <button onClick={() => handleArrayAdd('thematicAreas', 'items', { icon: '', title: '', text: '' })}>+ Add Item</button>
        </div>
      )}

      {/* PROGRAM APPROACH */}
      {activeTab === 'programApproach' && (
        <div>
          <label style={labelStyle}>Subtitle</label>
          <input value={data.programApproach?.subtitle} onChange={(e) => updateField('programApproach', 'subtitle', e.target.value)} style={inputStyle} />
          <label style={labelStyle}>Title</label>
          <input value={data.programApproach?.title} onChange={(e) => updateField('programApproach', 'title', e.target.value)} style={inputStyle} />
          <label style={labelStyle}>Description</label>
          <textarea value={data.programApproach?.description} onChange={(e) => updateField('programApproach', 'description', e.target.value)} rows={4} style={inputStyle} />
          <h4>Items</h4>
          {data.programApproach?.items?.map((item: any, idx: number) => (
            <div key={idx} style={{ border: '1px solid #ccc', padding: 10, marginBottom: 10 }}>
              <input value={item.icon} onChange={(e) => handleArrayItemChange('programApproach', 'items', idx, 'icon', e.target.value)} placeholder="Icon class" style={inputStyle} />
              <input value={item.title} onChange={(e) => handleArrayItemChange('programApproach', 'items', idx, 'title', e.target.value)} placeholder="Title" style={inputStyle} />
              <textarea value={item.text} onChange={(e) => handleArrayItemChange('programApproach', 'items', idx, 'text', e.target.value)} placeholder="Text" rows={3} style={inputStyle} />
              <button onClick={() => handleArrayRemove('programApproach', 'items', idx)}>Remove</button>
            </div>
          ))}
          <button onClick={() => handleArrayAdd('programApproach', 'items', { icon: '', title: '', text: '' })}>+ Add Item</button>
        </div>
      )}

      {/* IMPACT */}
      {activeTab === 'impact' && (
        <div>
          <label style={labelStyle}>Subtitle</label>
          <input value={data.impact?.subtitle} onChange={(e) => updateField('impact', 'subtitle', e.target.value)} style={inputStyle} />
          <label style={labelStyle}>Title</label>
          <input value={data.impact?.title} onChange={(e) => updateField('impact', 'title', e.target.value)} style={inputStyle} />
          <h4>Stats</h4>
          {data.impact?.stats?.map((stat: any, idx: number) => (
            <div key={idx} style={{ display: 'flex', gap: 10, marginBottom: 10 }}>
              <input value={stat.value} onChange={(e) => handleArrayItemChange('impact', 'stats', idx, 'value', e.target.value)} placeholder="Value" style={{ ...inputStyle, flex: 1 }} />
              <input value={stat.label} onChange={(e) => handleArrayItemChange('impact', 'stats', idx, 'label', e.target.value)} placeholder="Label" style={{ ...inputStyle, flex: 2 }} />
              <button onClick={() => handleArrayRemove('impact', 'stats', idx)}>✕</button>
            </div>
          ))}
          <button onClick={() => handleArrayAdd('impact', 'stats', { value: '', label: '' })}>+ Add Stat</button>
        </div>
      )}

      {/* CROSS-CUTTING */}
      {activeTab === 'crossCutting' && (
        <div>
          <label style={labelStyle}>Subtitle</label>
          <input value={data.crossCutting?.subtitle} onChange={(e) => updateField('crossCutting', 'subtitle', e.target.value)} style={inputStyle} />
          <label style={labelStyle}>Title</label>
          <input value={data.crossCutting?.title} onChange={(e) => updateField('crossCutting', 'title', e.target.value)} style={inputStyle} />
          <label style={labelStyle}>Description</label>
          <textarea value={data.crossCutting?.description} onChange={(e) => updateField('crossCutting', 'description', e.target.value)} rows={3} style={inputStyle} />
          <h4>Items</h4>
          {data.crossCutting?.items?.map((item: any, idx: number) => (
            <div key={idx} style={{ border: '1px solid #ccc', padding: 10, marginBottom: 10 }}>
              <input value={item.icon} onChange={(e) => handleArrayItemChange('crossCutting', 'items', idx, 'icon', e.target.value)} placeholder="Icon class" style={inputStyle} />
              <input value={item.title} onChange={(e) => handleArrayItemChange('crossCutting', 'items', idx, 'title', e.target.value)} placeholder="Title" style={inputStyle} />
              <button onClick={() => handleArrayRemove('crossCutting', 'items', idx)}>Remove</button>
            </div>
          ))}
          <button onClick={() => handleArrayAdd('crossCutting', 'items', { icon: '', title: '' })}>+ Add Item</button>
        </div>
      )}

      {/* PARTNERSHIPS */}
      {activeTab === 'partnerships' && (
        <div>
          <label style={labelStyle}>Subtitle</label>
          <input value={data.partnerships?.subtitle} onChange={(e) => updateField('partnerships', 'subtitle', e.target.value)} style={inputStyle} />
          <label style={labelStyle}>Title</label>
          <input value={data.partnerships?.title} onChange={(e) => updateField('partnerships', 'title', e.target.value)} style={inputStyle} />
          <label style={labelStyle}>Paragraph 1</label>
          <textarea value={data.partnerships?.paragraph1} onChange={(e) => updateField('partnerships', 'paragraph1', e.target.value)} rows={4} style={inputStyle} />
          <label style={labelStyle}>Paragraph 2</label>
          <textarea value={data.partnerships?.paragraph2} onChange={(e) => updateField('partnerships', 'paragraph2', e.target.value)} rows={3} style={inputStyle} />
          <label style={labelStyle}>Image</label>
          <div style={{ display: 'flex', gap: 10, marginBottom: 16 }}>
            <input value={data.partnerships?.image} onChange={(e) => updateField('partnerships', 'image', e.target.value)} style={{ ...inputStyle, flex: 1, marginBottom: 0 }} />
            <input type="file" ref={fileInputRef} onChange={() => handleImageUpload((url) => updateField('partnerships', 'image', url))} style={{ display: 'none' }} />
            <button type="button" onClick={() => fileInputRef.current?.click()} className="btn btn-primary" style={{ whiteSpace: 'nowrap' }}>Upload</button>
          </div>
          {data.partnerships?.image && <img src={data.partnerships.image} style={{ maxWidth: 200, marginBottom: 16 }} />}
        </div>
      )}

      {/* MEASURING SUCCESS */}
      {activeTab === 'measuringSuccess' && (
        <div>
          <label style={labelStyle}>Subtitle</label>
          <input value={data.measuringSuccess?.subtitle} onChange={(e) => updateField('measuringSuccess', 'subtitle', e.target.value)} style={inputStyle} />
          <label style={labelStyle}>Title</label>
          <input value={data.measuringSuccess?.title} onChange={(e) => updateField('measuringSuccess', 'title', e.target.value)} style={inputStyle} />
          <label style={labelStyle}>Description</label>
          <textarea value={data.measuringSuccess?.description} onChange={(e) => updateField('measuringSuccess', 'description', e.target.value)} rows={3} style={inputStyle} />
          <h4>Metrics</h4>
          {data.measuringSuccess?.metrics?.map((metric: any, idx: number) => (
            <div key={idx} style={{ border: '1px solid #ccc', padding: 10, marginBottom: 10 }}>
              <input value={metric.icon} onChange={(e) => handleArrayItemChange('measuringSuccess', 'metrics', idx, 'icon', e.target.value)} placeholder="Icon class" style={inputStyle} />
              <input value={metric.label} onChange={(e) => handleArrayItemChange('measuringSuccess', 'metrics', idx, 'label', e.target.value)} placeholder="Label" style={inputStyle} />
              <button onClick={() => handleArrayRemove('measuringSuccess', 'metrics', idx)}>Remove</button>
            </div>
          ))}
          <button onClick={() => handleArrayAdd('measuringSuccess', 'metrics', { icon: '', label: '' })}>+ Add Metric</button>
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
        Save Programs Page
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