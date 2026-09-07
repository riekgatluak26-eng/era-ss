'use client';

import { useState, useEffect, useRef } from 'react';

export default function AdminAboutPage() {
  const [data, setData] = useState<any>(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('hero');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadingFor, setUploadingFor] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/about')
      .then((res) => res.json())
      .then((json) => {
        setData(json);
        setLoading(false);
      })
      .catch(console.error);
  }, []);

  const handleSave = async () => {
    const res = await fetch('/api/about', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (res.ok) setMessage('About page updated successfully!');
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
    setUploadingFor('upload');
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
    setUploadingFor(null);
  };

  if (loading) return <div style={{ padding: 40 }}>Loading about data…</div>;
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
    'hero', 'history', 'visionMission', 'coreValues', 'genesis', 'whyEra', 'transparency', 'sdgs', 'cta',
  ];

  return (
    <div>
      <h1 style={{ fontFamily: 'Archivo, sans-serif', marginBottom: 24 }}>Edit About Page</h1>
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

      {/* HISTORY */}
      {activeTab === 'history' && (
        <div>
          <label style={labelStyle}>Subtitle</label>
          <input value={data.history?.subtitle} onChange={(e) => updateField('history', 'subtitle', e.target.value)} style={inputStyle} />
          <label style={labelStyle}>Title</label>
          <input value={data.history?.title} onChange={(e) => updateField('history', 'title', e.target.value)} style={inputStyle} />
          <label style={labelStyle}>Paragraph 1</label>
          <textarea value={data.history?.paragraph1} onChange={(e) => updateField('history', 'paragraph1', e.target.value)} rows={4} style={inputStyle} />
          <label style={labelStyle}>Paragraph 2</label>
          <textarea value={data.history?.paragraph2} onChange={(e) => updateField('history', 'paragraph2', e.target.value)} rows={4} style={inputStyle} />
          <label style={labelStyle}>Image</label>
          <div style={{ display: 'flex', gap: 10, marginBottom: 16 }}>
            <input value={data.history?.image} onChange={(e) => updateField('history', 'image', e.target.value)} style={{ ...inputStyle, flex: 1, marginBottom: 0 }} />
            <input type="file" ref={fileInputRef} onChange={() => handleImageUpload((url) => updateField('history', 'image', url))} style={{ display: 'none' }} />
            <button type="button" onClick={() => fileInputRef.current?.click()} className="btn btn-primary" style={{ whiteSpace: 'nowrap' }}>Upload</button>
          </div>
          {data.history?.image && <img src={data.history.image} style={{ maxWidth: 200, marginBottom: 16 }} />}
        </div>
      )}

      {/* VISION & MISSION */}
      {activeTab === 'visionMission' && (
        <div>
          <label style={labelStyle}>Vision Title</label>
          <input value={data.visionMission?.visionTitle} onChange={(e) => updateField('visionMission', 'visionTitle', e.target.value)} style={inputStyle} />
          <label style={labelStyle}>Vision Text</label>
          <textarea value={data.visionMission?.visionText} onChange={(e) => updateField('visionMission', 'visionText', e.target.value)} rows={3} style={inputStyle} />
          <label style={labelStyle}>Mission Title</label>
          <input value={data.visionMission?.missionTitle} onChange={(e) => updateField('visionMission', 'missionTitle', e.target.value)} style={inputStyle} />
          <label style={labelStyle}>Mission Text</label>
          <textarea value={data.visionMission?.missionText} onChange={(e) => updateField('visionMission', 'missionText', e.target.value)} rows={3} style={inputStyle} />
        </div>
      )}

      {/* CORE VALUES */}
      {activeTab === 'coreValues' && (
        <div>
          <label style={labelStyle}>Subtitle</label>
          <input value={data.coreValues?.subtitle} onChange={(e) => updateField('coreValues', 'subtitle', e.target.value)} style={inputStyle} />
          <label style={labelStyle}>Title</label>
          <input value={data.coreValues?.title} onChange={(e) => updateField('coreValues', 'title', e.target.value)} style={inputStyle} />
          <h4>Values</h4>
          {data.coreValues?.values?.map((item: any, idx: number) => (
            <div key={idx} style={{ border: '1px solid #ccc', padding: 10, marginBottom: 10 }}>
              <input value={item.icon} onChange={(e) => handleArrayItemChange('coreValues', 'values', idx, 'icon', e.target.value)} placeholder="Icon class" style={inputStyle} />
              <input value={item.title} onChange={(e) => handleArrayItemChange('coreValues', 'values', idx, 'title', e.target.value)} placeholder="Title" style={inputStyle} />
              <input value={item.text} onChange={(e) => handleArrayItemChange('coreValues', 'values', idx, 'text', e.target.value)} placeholder="Text" style={inputStyle} />
              <button onClick={() => handleArrayRemove('coreValues', 'values', idx)}>Remove</button>
            </div>
          ))}
          <button onClick={() => handleArrayAdd('coreValues', 'values', { icon: '', title: '', text: '' })}>+ Add Value</button>
        </div>
      )}

      {/* GENESIS */}
      {activeTab === 'genesis' && (
        <div>
          <label style={labelStyle}>Subtitle</label>
          <input value={data.genesis?.subtitle} onChange={(e) => updateField('genesis', 'subtitle', e.target.value)} style={inputStyle} />
          <label style={labelStyle}>Title</label>
          <input value={data.genesis?.title} onChange={(e) => updateField('genesis', 'title', e.target.value)} style={inputStyle} />
          <label style={labelStyle}>Description</label>
          <textarea value={data.genesis?.description} onChange={(e) => updateField('genesis', 'description', e.target.value)} rows={3} style={inputStyle} />
          <label style={labelStyle}>Aims Title</label>
          <input value={data.genesis?.aimsTitle} onChange={(e) => updateField('genesis', 'aimsTitle', e.target.value)} style={inputStyle} />
          <label style={labelStyle}>Objectives Title</label>
          <input value={data.genesis?.objectivesTitle} onChange={(e) => updateField('genesis', 'objectivesTitle', e.target.value)} style={inputStyle} />
          <h4>Aims (one per line)</h4>
          <textarea
            value={data.genesis?.aims?.join('\n')}
            onChange={(e) => updateField('genesis', 'aims', e.target.value.split('\n'))}
            rows={6}
            style={inputStyle}
          />
          <h4>Objectives (one per line)</h4>
          <textarea
            value={data.genesis?.objectives?.join('\n')}
            onChange={(e) => updateField('genesis', 'objectives', e.target.value.split('\n'))}
            rows={6}
            style={inputStyle}
          />
        </div>
      )}

      {/* WHY ERA */}
      {activeTab === 'whyEra' && (
        <div>
          <label style={labelStyle}>Subtitle</label>
          <input value={data.whyEra?.subtitle} onChange={(e) => updateField('whyEra', 'subtitle', e.target.value)} style={inputStyle} />
          <label style={labelStyle}>Title</label>
          <input value={data.whyEra?.title} onChange={(e) => updateField('whyEra', 'title', e.target.value)} style={inputStyle} />
          <label style={labelStyle}>Description</label>
          <textarea value={data.whyEra?.description} onChange={(e) => updateField('whyEra', 'description', e.target.value)} rows={4} style={inputStyle} />
          <h4>Challenges</h4>
          {data.whyEra?.challenges?.map((item: any, idx: number) => (
            <div key={idx} style={{ border: '1px solid #ccc', padding: 10, marginBottom: 10 }}>
              <input value={item.icon} onChange={(e) => handleArrayItemChange('whyEra', 'challenges', idx, 'icon', e.target.value)} placeholder="Icon class" style={inputStyle} />
              <input value={item.title} onChange={(e) => handleArrayItemChange('whyEra', 'challenges', idx, 'title', e.target.value)} placeholder="Title" style={inputStyle} />
              <textarea value={item.text} onChange={(e) => handleArrayItemChange('whyEra', 'challenges', idx, 'text', e.target.value)} placeholder="Text" rows={3} style={inputStyle} />
              <button onClick={() => handleArrayRemove('whyEra', 'challenges', idx)}>Remove</button>
            </div>
          ))}
          <button onClick={() => handleArrayAdd('whyEra', 'challenges', { icon: '', title: '', text: '' })}>+ Add Challenge</button>
        </div>
      )}

      {/* TRANSPARENCY */}
      {activeTab === 'transparency' && (
        <div>
          <label style={labelStyle}>Subtitle</label>
          <input value={data.transparency?.subtitle} onChange={(e) => updateField('transparency', 'subtitle', e.target.value)} style={inputStyle} />
          <label style={labelStyle}>Title</label>
          <input value={data.transparency?.title} onChange={(e) => updateField('transparency', 'title', e.target.value)} style={inputStyle} />
          <label style={labelStyle}>Description</label>
          <textarea value={data.transparency?.description} onChange={(e) => updateField('transparency', 'description', e.target.value)} rows={3} style={inputStyle} />
          <label style={labelStyle}>Text</label>
          <textarea value={data.transparency?.text} onChange={(e) => updateField('transparency', 'text', e.target.value)} rows={3} style={inputStyle} />
          <label style={labelStyle}>Commitments (one per line)</label>
          <textarea
            value={data.transparency?.commitments?.join('\n')}
            onChange={(e) => updateField('transparency', 'commitments', e.target.value.split('\n'))}
            rows={6}
            style={inputStyle}
          />
        </div>
      )}

      {/* SDGs */}
      {activeTab === 'sdgs' && (
        <div>
          <label style={labelStyle}>Subtitle</label>
          <input value={data.sdgs?.subtitle} onChange={(e) => updateField('sdgs', 'subtitle', e.target.value)} style={inputStyle} />
          <label style={labelStyle}>Title</label>
          <input value={data.sdgs?.title} onChange={(e) => updateField('sdgs', 'title', e.target.value)} style={inputStyle} />
          <label style={labelStyle}>Description</label>
          <textarea value={data.sdgs?.description} onChange={(e) => updateField('sdgs', 'description', e.target.value)} rows={3} style={inputStyle} />
          <h4>SDG Items</h4>
          {data.sdgs?.items?.map((item: any, idx: number) => (
            <div key={idx} style={{ border: '1px solid #ccc', padding: 10, marginBottom: 10 }}>
              <input value={item.title} onChange={(e) => handleArrayItemChange('sdgs', 'items', idx, 'title', e.target.value)} placeholder="Title" style={inputStyle} />
              <input value={item.text} onChange={(e) => handleArrayItemChange('sdgs', 'items', idx, 'text', e.target.value)} placeholder="Text" style={inputStyle} />
              <button onClick={() => handleArrayRemove('sdgs', 'items', idx)}>Remove</button>
            </div>
          ))}
          <button onClick={() => handleArrayAdd('sdgs', 'items', { title: '', text: '' })}>+ Add SDG</button>
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
        Save About Page
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