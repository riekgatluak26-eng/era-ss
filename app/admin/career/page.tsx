'use client';

import { useState, useEffect, useRef } from 'react';

export default function AdminCareerPage() {
  const [data, setData] = useState<any>(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('hero');
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetch('/api/career')
      .then((res) => res.json())
      .then((json) => {
        setData(json);
        setLoading(false);
      })
      .catch(console.error);
  }, []);

  const handleSave = async () => {
    const res = await fetch('/api/career', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (res.ok) setMessage('Career page updated successfully!');
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

  if (loading) return <div style={{ padding: 40 }}>Loading career data…</div>;
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

  const tabs = ['hero', 'openings', 'whyJoin', 'recruitment', 'volunteer', 'equalOpportunity', 'cta'];

  return (
    <div>
      <h1 style={{ fontFamily: 'Archivo, sans-serif', marginBottom: 24 }}>Edit Career Page</h1>
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

      {/* OPENINGS */}
      {activeTab === 'openings' && (
        <div>
          <label style={labelStyle}>Subtitle</label>
          <input value={data.openings?.subtitle} onChange={(e) => updateField('openings', 'subtitle', e.target.value)} style={inputStyle} />
          <label style={labelStyle}>Title</label>
          <input value={data.openings?.title} onChange={(e) => updateField('openings', 'title', e.target.value)} style={inputStyle} />
          <label style={labelStyle}>Description</label>
          <textarea value={data.openings?.description} onChange={(e) => updateField('openings', 'description', e.target.value)} rows={3} style={inputStyle} />
          <h4>Jobs</h4>
          {data.openings?.jobs?.map((job: any, idx: number) => (
            <div key={idx} style={{ border: '1px solid #ccc', padding: 10, marginBottom: 10 }}>
              <input value={job.title} onChange={(e) => handleArrayItemChange('openings', 'jobs', idx, 'title', e.target.value)} placeholder="Job title" style={inputStyle} />
              <input value={job.location} onChange={(e) => handleArrayItemChange('openings', 'jobs', idx, 'location', e.target.value)} placeholder="Location" style={inputStyle} />
              <input value={job.type} onChange={(e) => handleArrayItemChange('openings', 'jobs', idx, 'type', e.target.value)} placeholder="Type" style={inputStyle} />
              <textarea value={job.description} onChange={(e) => handleArrayItemChange('openings', 'jobs', idx, 'description', e.target.value)} placeholder="Description" rows={3} style={inputStyle} />
              <button onClick={() => handleArrayRemove('openings', 'jobs', idx)}>Remove</button>
            </div>
          ))}
          <button onClick={() => handleArrayAdd('openings', 'jobs', { title: '', location: '', type: '', description: '' })}>+ Add Job</button>
          <label style={labelStyle}>Note (text below jobs)</label>
          <input value={data.openings?.note} onChange={(e) => updateField('openings', 'note', e.target.value)} style={inputStyle} />
        </div>
      )}

      {/* WHY JOIN */}
      {activeTab === 'whyJoin' && (
        <div>
          <label style={labelStyle}>Subtitle</label>
          <input value={data.whyJoin?.subtitle} onChange={(e) => updateField('whyJoin', 'subtitle', e.target.value)} style={inputStyle} />
          <label style={labelStyle}>Title</label>
          <input value={data.whyJoin?.title} onChange={(e) => updateField('whyJoin', 'title', e.target.value)} style={inputStyle} />
          <label style={labelStyle}>Description</label>
          <textarea value={data.whyJoin?.description} onChange={(e) => updateField('whyJoin', 'description', e.target.value)} rows={4} style={inputStyle} />
          <h4>Items</h4>
          {data.whyJoin?.items?.map((item: any, idx: number) => (
            <div key={idx} style={{ border: '1px solid #ccc', padding: 10, marginBottom: 10 }}>
              <input value={item.icon} onChange={(e) => handleArrayItemChange('whyJoin', 'items', idx, 'icon', e.target.value)} placeholder="Icon class" style={inputStyle} />
              <input value={item.title} onChange={(e) => handleArrayItemChange('whyJoin', 'items', idx, 'title', e.target.value)} placeholder="Title" style={inputStyle} />
              <input value={item.text} onChange={(e) => handleArrayItemChange('whyJoin', 'items', idx, 'text', e.target.value)} placeholder="Text" style={inputStyle} />
              <button onClick={() => handleArrayRemove('whyJoin', 'items', idx)}>Remove</button>
            </div>
          ))}
          <button onClick={() => handleArrayAdd('whyJoin', 'items', { icon: '', title: '', text: '' })}>+ Add Item</button>
        </div>
      )}

      {/* RECRUITMENT */}
      {activeTab === 'recruitment' && (
        <div>
          <label style={labelStyle}>Subtitle</label>
          <input value={data.recruitment?.subtitle} onChange={(e) => updateField('recruitment', 'subtitle', e.target.value)} style={inputStyle} />
          <label style={labelStyle}>Title</label>
          <input value={data.recruitment?.title} onChange={(e) => updateField('recruitment', 'title', e.target.value)} style={inputStyle} />
          <label style={labelStyle}>Description</label>
          <textarea value={data.recruitment?.description} onChange={(e) => updateField('recruitment', 'description', e.target.value)} rows={3} style={inputStyle} />
          <h4>Steps</h4>
          {data.recruitment?.steps?.map((step: any, idx: number) => (
            <div key={idx} style={{ border: '1px solid #ccc', padding: 10, marginBottom: 10 }}>
              <input value={step.title} onChange={(e) => handleArrayItemChange('recruitment', 'steps', idx, 'title', e.target.value)} placeholder="Title" style={inputStyle} />
              <textarea value={step.text} onChange={(e) => handleArrayItemChange('recruitment', 'steps', idx, 'text', e.target.value)} placeholder="Text" rows={3} style={inputStyle} />
              <button onClick={() => handleArrayRemove('recruitment', 'steps', idx)}>Remove</button>
            </div>
          ))}
          <button onClick={() => handleArrayAdd('recruitment', 'steps', { title: '', text: '' })}>+ Add Step</button>
        </div>
      )}

      {/* VOLUNTEER */}
      {activeTab === 'volunteer' && (
        <div>
          <label style={labelStyle}>Subtitle</label>
          <input value={data.volunteer?.subtitle} onChange={(e) => updateField('volunteer', 'subtitle', e.target.value)} style={inputStyle} />
          <label style={labelStyle}>Title</label>
          <input value={data.volunteer?.title} onChange={(e) => updateField('volunteer', 'title', e.target.value)} style={inputStyle} />
          <label style={labelStyle}>Description</label>
          <textarea value={data.volunteer?.description} onChange={(e) => updateField('volunteer', 'description', e.target.value)} rows={3} style={inputStyle} />
          <label style={labelStyle}>Opportunities</label>
          <textarea value={data.volunteer?.opportunities} onChange={(e) => updateField('volunteer', 'opportunities', e.target.value)} rows={3} style={inputStyle} />
          <label style={labelStyle}>Reasons Title</label>
          <input value={data.volunteer?.reasonsTitle} onChange={(e) => updateField('volunteer', 'reasonsTitle', e.target.value)} style={inputStyle} />
          <label style={labelStyle}>Reasons (one per line)</label>
          <textarea value={data.volunteer?.reasons?.join('\n')} onChange={(e) => updateField('volunteer', 'reasons', e.target.value.split('\n'))} rows={3} style={inputStyle} />
          <label style={labelStyle}>Image</label>
          <div style={{ display: 'flex', gap: 10, marginBottom: 16 }}>
            <input value={data.volunteer?.image} onChange={(e) => updateField('volunteer', 'image', e.target.value)} style={{ ...inputStyle, flex: 1, marginBottom: 0 }} />
            <input type="file" ref={fileInputRef} onChange={() => handleImageUpload((url) => updateField('volunteer', 'image', url))} style={{ display: 'none' }} />
            <button type="button" onClick={() => fileInputRef.current?.click()} className="btn btn-primary" style={{ whiteSpace: 'nowrap' }}>Upload</button>
          </div>
          {data.volunteer?.image && <img src={data.volunteer.image} style={{ maxWidth: 200, marginBottom: 16 }} />}
        </div>
      )}

      {/* EQUAL OPPORTUNITY */}
      {activeTab === 'equalOpportunity' && (
        <div>
          <label style={labelStyle}>Subtitle</label>
          <input value={data.equalOpportunity?.subtitle} onChange={(e) => updateField('equalOpportunity', 'subtitle', e.target.value)} style={inputStyle} />
          <label style={labelStyle}>Title</label>
          <input value={data.equalOpportunity?.title} onChange={(e) => updateField('equalOpportunity', 'title', e.target.value)} style={inputStyle} />
          <label style={labelStyle}>Paragraph 1</label>
          <textarea value={data.equalOpportunity?.paragraph1} onChange={(e) => updateField('equalOpportunity', 'paragraph1', e.target.value)} rows={3} style={inputStyle} />
          <label style={labelStyle}>Paragraph 2</label>
          <textarea value={data.equalOpportunity?.paragraph2} onChange={(e) => updateField('equalOpportunity', 'paragraph2', e.target.value)} rows={3} style={inputStyle} />
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
        Save Career Page
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