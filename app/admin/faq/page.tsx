'use client';

import { useState, useEffect, useRef } from 'react';

export default function AdminFaqPage() {
  const [data, setData] = useState<any>(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('hero');
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetch('/api/faq')
      .then((res) => res.json())
      .then((json) => {
        setData(json);
        setLoading(false);
      })
      .catch(console.error);
  }, []);

  const handleSave = async () => {
    const res = await fetch('/api/faq', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (res.ok) setMessage('FAQ page updated successfully!');
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

  if (loading) return <div style={{ padding: 40 }}>Loading FAQ data…</div>;
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

  const tabs = ['hero', 'faqContent', 'resources', 'getInTouch', 'cta'];

  return (
    <div>
      <h1 style={{ fontFamily: 'Archivo, sans-serif', marginBottom: 24 }}>Edit FAQ Page</h1>
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

      {/* FAQ CONTENT */}
      {activeTab === 'faqContent' && (
        <div>
          <label style={labelStyle}>Subtitle</label>
          <input value={data.faqContent?.subtitle} onChange={(e) => updateField('faqContent', 'subtitle', e.target.value)} style={inputStyle} />
          <label style={labelStyle}>Title</label>
          <input value={data.faqContent?.title} onChange={(e) => updateField('faqContent', 'title', e.target.value)} style={inputStyle} />
          <label style={labelStyle}>Description</label>
          <textarea value={data.faqContent?.description} onChange={(e) => updateField('faqContent', 'description', e.target.value)} rows={3} style={inputStyle} />
          <h4>FAQ Items</h4>
          {data.faqContent?.items?.map((item: any, idx: number) => (
            <div key={idx} style={{ border: '1px solid #ccc', padding: 10, marginBottom: 10 }}>
              <input value={item.icon} onChange={(e) => handleArrayItemChange('faqContent', 'items', idx, 'icon', e.target.value)} placeholder="Icon class" style={inputStyle} />
              <input value={item.question} onChange={(e) => handleArrayItemChange('faqContent', 'items', idx, 'question', e.target.value)} placeholder="Question" style={inputStyle} />
              <textarea value={item.answer} onChange={(e) => handleArrayItemChange('faqContent', 'items', idx, 'answer', e.target.value)} placeholder="Answer (HTML allowed)" rows={4} style={inputStyle} />
              <button onClick={() => handleArrayRemove('faqContent', 'items', idx)}>Remove</button>
            </div>
          ))}
          <button onClick={() => handleArrayAdd('faqContent', 'items', { icon: '', question: '', answer: '' })}>+ Add FAQ</button>
        </div>
      )}

      {/* RESOURCES */}
      {activeTab === 'resources' && (
        <div>
          <label style={labelStyle}>Subtitle</label>
          <input value={data.resources?.subtitle} onChange={(e) => updateField('resources', 'subtitle', e.target.value)} style={inputStyle} />
          <label style={labelStyle}>Title</label>
          <input value={data.resources?.title} onChange={(e) => updateField('resources', 'title', e.target.value)} style={inputStyle} />
          <label style={labelStyle}>Description</label>
          <textarea value={data.resources?.description} onChange={(e) => updateField('resources', 'description', e.target.value)} rows={3} style={inputStyle} />
          <h4>Resource Items</h4>
          {data.resources?.items?.map((item: any, idx: number) => (
            <div key={idx} style={{ border: '1px solid #ccc', padding: 10, marginBottom: 10 }}>
              <input value={item.icon} onChange={(e) => handleArrayItemChange('resources', 'items', idx, 'icon', e.target.value)} placeholder="Icon class" style={inputStyle} />
              <input value={item.title} onChange={(e) => handleArrayItemChange('resources', 'items', idx, 'title', e.target.value)} placeholder="Title" style={inputStyle} />
              <input value={item.text} onChange={(e) => handleArrayItemChange('resources', 'items', idx, 'text', e.target.value)} placeholder="Description" style={inputStyle} />
              <input value={item.link} onChange={(e) => handleArrayItemChange('resources', 'items', idx, 'link', e.target.value)} placeholder="Link (e.g., /report)" style={inputStyle} />
              <button onClick={() => handleArrayRemove('resources', 'items', idx)}>Remove</button>
            </div>
          ))}
          <button onClick={() => handleArrayAdd('resources', 'items', { icon: '', title: '', text: '', link: '' })}>+ Add Resource</button>
        </div>
      )}

      {/* GET IN TOUCH */}
      {activeTab === 'getInTouch' && (
        <div>
          <label style={labelStyle}>Subtitle</label>
          <input value={data.getInTouch?.subtitle} onChange={(e) => updateField('getInTouch', 'subtitle', e.target.value)} style={inputStyle} />
          <label style={labelStyle}>Title</label>
          <input value={data.getInTouch?.title} onChange={(e) => updateField('getInTouch', 'title', e.target.value)} style={inputStyle} />
          <label style={labelStyle}>Description</label>
          <textarea value={data.getInTouch?.description} onChange={(e) => updateField('getInTouch', 'description', e.target.value)} rows={3} style={inputStyle} />
          <label style={labelStyle}>Email</label>
          <input value={data.getInTouch?.email} onChange={(e) => updateField('getInTouch', 'email', e.target.value)} style={inputStyle} />
          <label style={labelStyle}>Phones (one per line)</label>
          <textarea value={data.getInTouch?.phones?.join('\n')} onChange={(e) => updateField('getInTouch', 'phones', e.target.value.split('\n'))} rows={3} style={inputStyle} />
          <label style={labelStyle}>Address</label>
          <input value={data.getInTouch?.address} onChange={(e) => updateField('getInTouch', 'address', e.target.value)} style={inputStyle} />
          <label style={labelStyle}>Response Note</label>
          <input value={data.getInTouch?.responseNote} onChange={(e) => updateField('getInTouch', 'responseNote', e.target.value)} style={inputStyle} />
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
        Save FAQ Page
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