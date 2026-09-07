'use client';

import { useState, useEffect, useRef } from 'react';

export default function AdminApproachPage() {
  const [data, setData] = useState<any>(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('hero');
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetch('/api/approach')
      .then((res) => res.json())
      .then((json) => {
        setData(json);
        setLoading(false);
      })
      .catch(console.error);
  }, []);

  const handleSave = async () => {
    const res = await fetch('/api/approach', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (res.ok) setMessage('Approach page updated successfully!');
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

  if (loading) return <div style={{ padding: 40 }}>Loading approach data…</div>;
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

  const tabs = ['hero', 'intro', 'methodologies', 'implementationProcess', 'principles', 'whyItWorks', 'cta'];

  return (
    <div>
      <h1 style={{ fontFamily: 'Archivo, sans-serif', marginBottom: 24 }}>Edit Approach Page</h1>
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

      {/* METHODOLOGIES */}
      {activeTab === 'methodologies' && (
        <div>
          <label style={labelStyle}>Subtitle</label>
          <input value={data.methodologies?.subtitle} onChange={(e) => updateField('methodologies', 'subtitle', e.target.value)} style={inputStyle} />
          <label style={labelStyle}>Title</label>
          <input value={data.methodologies?.title} onChange={(e) => updateField('methodologies', 'title', e.target.value)} style={inputStyle} />
          <h4>Items</h4>
          {data.methodologies?.items?.map((item: any, idx: number) => (
            <div key={idx} style={{ border: '1px solid #ccc', padding: 10, marginBottom: 10 }}>
              <input value={item.icon} onChange={(e) => handleArrayItemChange('methodologies', 'items', idx, 'icon', e.target.value)} placeholder="Icon class" style={inputStyle} />
              <input value={item.title} onChange={(e) => handleArrayItemChange('methodologies', 'items', idx, 'title', e.target.value)} placeholder="Title" style={inputStyle} />
              <textarea value={item.text} onChange={(e) => handleArrayItemChange('methodologies', 'items', idx, 'text', e.target.value)} placeholder="Text" rows={3} style={inputStyle} />
              <button onClick={() => handleArrayRemove('methodologies', 'items', idx)}>Remove</button>
            </div>
          ))}
          <button onClick={() => handleArrayAdd('methodologies', 'items', { icon: '', title: '', text: '' })}>+ Add Item</button>
        </div>
      )}

      {/* IMPLEMENTATION PROCESS */}
      {activeTab === 'implementationProcess' && (
        <div>
          <label style={labelStyle}>Subtitle</label>
          <input value={data.implementationProcess?.subtitle} onChange={(e) => updateField('implementationProcess', 'subtitle', e.target.value)} style={inputStyle} />
          <label style={labelStyle}>Title</label>
          <input value={data.implementationProcess?.title} onChange={(e) => updateField('implementationProcess', 'title', e.target.value)} style={inputStyle} />
          <label style={labelStyle}>Description</label>
          <textarea value={data.implementationProcess?.description} onChange={(e) => updateField('implementationProcess', 'description', e.target.value)} rows={3} style={inputStyle} />
          <h4>Steps</h4>
          {data.implementationProcess?.steps?.map((step: any, idx: number) => (
            <div key={idx} style={{ border: '1px solid #ccc', padding: 10, marginBottom: 10 }}>
              <input value={step.title} onChange={(e) => handleArrayItemChange('implementationProcess', 'steps', idx, 'title', e.target.value)} placeholder="Title" style={inputStyle} />
              <textarea value={step.text} onChange={(e) => handleArrayItemChange('implementationProcess', 'steps', idx, 'text', e.target.value)} placeholder="Text" rows={3} style={inputStyle} />
              <button onClick={() => handleArrayRemove('implementationProcess', 'steps', idx)}>Remove</button>
            </div>
          ))}
          <button onClick={() => handleArrayAdd('implementationProcess', 'steps', { title: '', text: '' })}>+ Add Step</button>
        </div>
      )}

      {/* PRINCIPLES */}
      {activeTab === 'principles' && (
        <div>
          <label style={labelStyle}>Subtitle</label>
          <input value={data.principles?.subtitle} onChange={(e) => updateField('principles', 'subtitle', e.target.value)} style={inputStyle} />
          <label style={labelStyle}>Title</label>
          <input value={data.principles?.title} onChange={(e) => updateField('principles', 'title', e.target.value)} style={inputStyle} />
          <label style={labelStyle}>Description</label>
          <textarea value={data.principles?.description} onChange={(e) => updateField('principles', 'description', e.target.value)} rows={3} style={inputStyle} />
          <h4>Items</h4>
          {data.principles?.items?.map((item: any, idx: number) => (
            <div key={idx} style={{ border: '1px solid #ccc', padding: 10, marginBottom: 10 }}>
              <input value={item.icon} onChange={(e) => handleArrayItemChange('principles', 'items', idx, 'icon', e.target.value)} placeholder="Icon class" style={inputStyle} />
              <input value={item.title} onChange={(e) => handleArrayItemChange('principles', 'items', idx, 'title', e.target.value)} placeholder="Title" style={inputStyle} />
              <textarea value={item.text} onChange={(e) => handleArrayItemChange('principles', 'items', idx, 'text', e.target.value)} placeholder="Text" rows={3} style={inputStyle} />
              <button onClick={() => handleArrayRemove('principles', 'items', idx)}>Remove</button>
            </div>
          ))}
          <button onClick={() => handleArrayAdd('principles', 'items', { icon: '', title: '', text: '' })}>+ Add Item</button>
        </div>
      )}

      {/* WHY IT WORKS */}
      {activeTab === 'whyItWorks' && (
        <div>
          <label style={labelStyle}>Subtitle</label>
          <input value={data.whyItWorks?.subtitle} onChange={(e) => updateField('whyItWorks', 'subtitle', e.target.value)} style={inputStyle} />
          <label style={labelStyle}>Title</label>
          <input value={data.whyItWorks?.title} onChange={(e) => updateField('whyItWorks', 'title', e.target.value)} style={inputStyle} />
          <label style={labelStyle}>Description</label>
          <textarea value={data.whyItWorks?.description} onChange={(e) => updateField('whyItWorks', 'description', e.target.value)} rows={3} style={inputStyle} />
          <h4>Items</h4>
          {data.whyItWorks?.items?.map((item: any, idx: number) => (
            <div key={idx} style={{ border: '1px solid #ccc', padding: 10, marginBottom: 10 }}>
              <input value={item.icon} onChange={(e) => handleArrayItemChange('whyItWorks', 'items', idx, 'icon', e.target.value)} placeholder="Icon class" style={inputStyle} />
              <input value={item.text} onChange={(e) => handleArrayItemChange('whyItWorks', 'items', idx, 'text', e.target.value)} placeholder="Text" style={inputStyle} />
              <button onClick={() => handleArrayRemove('whyItWorks', 'items', idx)}>Remove</button>
            </div>
          ))}
          <button onClick={() => handleArrayAdd('whyItWorks', 'items', { icon: '', text: '' })}>+ Add Item</button>
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
        Save Approach Page
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