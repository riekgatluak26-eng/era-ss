'use client';

import { useState, useEffect, useRef } from 'react';

export default function AdminReportsPage() {
  const [data, setData] = useState<any>(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('hero');
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetch('/api/reports')
      .then((res) => res.json())
      .then((json) => {
        setData(json);
        setLoading(false);
      })
      .catch(console.error);
  }, []);

  const handleSave = async () => {
    const res = await fetch('/api/reports', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (res.ok) setMessage('Reports page updated successfully!');
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
        setMessage('File uploaded!');
      } else {
        setMessage('Upload failed');
      }
    } catch {
      setMessage('Upload failed');
    }
  };

  const handleCategoryItemFileUpload = (category: string, index: number) => {
    // We need a dynamic file input per item
    const input = document.getElementById(`file-upload-${category}-${index}`) as HTMLInputElement;
    input?.click();
    input.onchange = async (e: any) => {
      const file = e.target.files?.[0];
      if (!file) return;
      const formData = new FormData();
      formData.append('file', file);
      try {
        const res = await fetch('/api/upload', { method: 'POST', body: formData });
        const result = await res.json();
        if (result.url) {
          handleArrayItemChange('categories', `${category}.items`, index, 'file', result.url);
          setMessage('File uploaded!');
        }
      } catch {
        setMessage('Upload failed');
      }
    };
  };

  if (loading) return <div style={{ padding: 40 }}>Loading reports data…</div>;
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

  const tabs = ['hero', 'whyPublish', 'categories', 'learning', 'request', 'cta'];

  return (
    <div>
      <h1 style={{ fontFamily: 'Archivo, sans-serif', marginBottom: 24 }}>Edit Reports Page</h1>
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

      {/* WHY PUBLISH */}
      {activeTab === 'whyPublish' && (
        <div>
          <label style={labelStyle}>Subtitle</label>
          <input value={data.whyPublish?.subtitle} onChange={(e) => updateField('whyPublish', 'subtitle', e.target.value)} style={inputStyle} />
          <label style={labelStyle}>Title</label>
          <input value={data.whyPublish?.title} onChange={(e) => updateField('whyPublish', 'title', e.target.value)} style={inputStyle} />
          <label style={labelStyle}>Description</label>
          <textarea value={data.whyPublish?.description} onChange={(e) => updateField('whyPublish', 'description', e.target.value)} rows={4} style={inputStyle} />
          <label style={labelStyle}>Points (one per line)</label>
          <textarea value={data.whyPublish?.points?.join('\n')} onChange={(e) => updateField('whyPublish', 'points', e.target.value.split('\n'))} rows={5} style={inputStyle} />
        </div>
      )}

      {/* CATEGORIES */}
      {activeTab === 'categories' && (
        <div>
          <label style={labelStyle}>Subtitle</label>
          <input value={data.categories?.subtitle} onChange={(e) => updateField('categories', 'subtitle', e.target.value)} style={inputStyle} />
          <label style={labelStyle}>Title</label>
          <input value={data.categories?.title} onChange={(e) => updateField('categories', 'title', e.target.value)} style={inputStyle} />
          <label style={labelStyle}>Description</label>
          <textarea value={data.categories?.description} onChange={(e) => updateField('categories', 'description', e.target.value)} rows={3} style={inputStyle} />
          <label style={labelStyle}>Note</label>
          <input value={data.categories?.note} onChange={(e) => updateField('categories', 'note', e.target.value)} style={inputStyle} />

          {/* Annual Reports */}
          <h4>Annual Reports</h4>
          <input value={data.categories?.annualReports?.title} onChange={(e) => updateField('categories', 'annualReports.title', e.target.value)} style={inputStyle} />
          <textarea value={data.categories?.annualReports?.description} onChange={(e) => updateField('categories', 'annualReports.description', e.target.value)} rows={2} style={inputStyle} />
          {data.categories?.annualReports?.items?.map((item: any, idx: number) => (
            <div key={idx} style={{ border: '1px solid #ccc', padding: 10, marginBottom: 10 }}>
              <input value={item.title} onChange={(e) => handleArrayItemChange('categories', 'annualReports.items', idx, 'title', e.target.value)} placeholder="Title" style={inputStyle} />
              <textarea value={item.description} onChange={(e) => handleArrayItemChange('categories', 'annualReports.items', idx, 'description', e.target.value)} placeholder="Description" rows={3} style={inputStyle} />
              <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                <input value={item.file} onChange={(e) => handleArrayItemChange('categories', 'annualReports.items', idx, 'file', e.target.value)} placeholder="File URL" style={{ ...inputStyle, flex: 1 }} />
                <input type="file" id={`file-upload-annualReports-${idx}`} style={{ display: 'none' }} />
                <button onClick={() => handleCategoryItemFileUpload('annualReports', idx)} className="btn btn-primary" style={{ whiteSpace: 'nowrap' }}>Upload</button>
              </div>
              {item.file && <a href={item.file} target="_blank" style={{ display: 'block', marginTop: 8 }}>View file</a>}
              <button onClick={() => handleArrayRemove('categories', 'annualReports.items', idx)}>Remove</button>
            </div>
          ))}
          <button onClick={() => handleArrayAdd('categories', 'annualReports.items', { title: '', description: '', file: '' })}>+ Add Report</button>

          {/* Similar blocks for programReports, researchAssessments, policies */}
          {/* Program Reports */}
          <h4>Program Reports</h4>
          <input value={data.categories?.programReports?.title} onChange={(e) => updateField('categories', 'programReports.title', e.target.value)} style={inputStyle} />
          <textarea value={data.categories?.programReports?.description} onChange={(e) => updateField('categories', 'programReports.description', e.target.value)} rows={2} style={inputStyle} />
          {data.categories?.programReports?.items?.map((item: any, idx: number) => (
            <div key={idx} style={{ border: '1px solid #ccc', padding: 10, marginBottom: 10 }}>
              <input value={item.title} onChange={(e) => handleArrayItemChange('categories', 'programReports.items', idx, 'title', e.target.value)} placeholder="Title" style={inputStyle} />
              <textarea value={item.description} onChange={(e) => handleArrayItemChange('categories', 'programReports.items', idx, 'description', e.target.value)} placeholder="Description" rows={3} style={inputStyle} />
              <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                <input value={item.file} onChange={(e) => handleArrayItemChange('categories', 'programReports.items', idx, 'file', e.target.value)} placeholder="File URL" style={{ ...inputStyle, flex: 1 }} />
                <input type="file" id={`file-upload-programReports-${idx}`} style={{ display: 'none' }} />
                <button onClick={() => handleCategoryItemFileUpload('programReports', idx)} className="btn btn-primary" style={{ whiteSpace: 'nowrap' }}>Upload</button>
              </div>
              {item.file && <a href={item.file} target="_blank" style={{ display: 'block', marginTop: 8 }}>View file</a>}
              <button onClick={() => handleArrayRemove('categories', 'programReports.items', idx)}>Remove</button>
            </div>
          ))}
          <button onClick={() => handleArrayAdd('categories', 'programReports.items', { title: '', description: '', file: '' })}>+ Add Report</button>

          {/* Research & Assessments */}
          <h4>Research & Assessments</h4>
          <input value={data.categories?.researchAssessments?.title} onChange={(e) => updateField('categories', 'researchAssessments.title', e.target.value)} style={inputStyle} />
          <textarea value={data.categories?.researchAssessments?.description} onChange={(e) => updateField('categories', 'researchAssessments.description', e.target.value)} rows={2} style={inputStyle} />
          {data.categories?.researchAssessments?.items?.map((item: any, idx: number) => (
            <div key={idx} style={{ border: '1px solid #ccc', padding: 10, marginBottom: 10 }}>
              <input value={item.title} onChange={(e) => handleArrayItemChange('categories', 'researchAssessments.items', idx, 'title', e.target.value)} placeholder="Title" style={inputStyle} />
              <textarea value={item.description} onChange={(e) => handleArrayItemChange('categories', 'researchAssessments.items', idx, 'description', e.target.value)} placeholder="Description" rows={3} style={inputStyle} />
              <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                <input value={item.file} onChange={(e) => handleArrayItemChange('categories', 'researchAssessments.items', idx, 'file', e.target.value)} placeholder="File URL" style={{ ...inputStyle, flex: 1 }} />
                <input type="file" id={`file-upload-researchAssessments-${idx}`} style={{ display: 'none' }} />
                <button onClick={() => handleCategoryItemFileUpload('researchAssessments', idx)} className="btn btn-primary" style={{ whiteSpace: 'nowrap' }}>Upload</button>
              </div>
              {item.file && <a href={item.file} target="_blank" style={{ display: 'block', marginTop: 8 }}>View file</a>}
              <button onClick={() => handleArrayRemove('categories', 'researchAssessments.items', idx)}>Remove</button>
            </div>
          ))}
          <button onClick={() => handleArrayAdd('categories', 'researchAssessments.items', { title: '', description: '', file: '' })}>+ Add Report</button>

          {/* Policies */}
          <h4>Policies & Strategic Documents</h4>
          <input value={data.categories?.policies?.title} onChange={(e) => updateField('categories', 'policies.title', e.target.value)} style={inputStyle} />
          <textarea value={data.categories?.policies?.description} onChange={(e) => updateField('categories', 'policies.description', e.target.value)} rows={2} style={inputStyle} />
          {data.categories?.policies?.items?.map((item: any, idx: number) => (
            <div key={idx} style={{ border: '1px solid #ccc', padding: 10, marginBottom: 10 }}>
              <input value={item.title} onChange={(e) => handleArrayItemChange('categories', 'policies.items', idx, 'title', e.target.value)} placeholder="Title" style={inputStyle} />
              <textarea value={item.description} onChange={(e) => handleArrayItemChange('categories', 'policies.items', idx, 'description', e.target.value)} placeholder="Description" rows={3} style={inputStyle} />
              <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                <input value={item.file} onChange={(e) => handleArrayItemChange('categories', 'policies.items', idx, 'file', e.target.value)} placeholder="File URL" style={{ ...inputStyle, flex: 1 }} />
                <input type="file" id={`file-upload-policies-${idx}`} style={{ display: 'none' }} />
                <button onClick={() => handleCategoryItemFileUpload('policies', idx)} className="btn btn-primary" style={{ whiteSpace: 'nowrap' }}>Upload</button>
              </div>
              {item.file && <a href={item.file} target="_blank" style={{ display: 'block', marginTop: 8 }}>View file</a>}
              <button onClick={() => handleArrayRemove('categories', 'policies.items', idx)}>Remove</button>
            </div>
          ))}
          <button onClick={() => handleArrayAdd('categories', 'policies.items', { title: '', description: '', file: '' })}>+ Add Report</button>
        </div>
      )}

      {/* LEARNING */}
      {activeTab === 'learning' && (
        <div>
          <label style={labelStyle}>Subtitle</label>
          <input value={data.learning?.subtitle} onChange={(e) => updateField('learning', 'subtitle', e.target.value)} style={inputStyle} />
          <label style={labelStyle}>Title</label>
          <input value={data.learning?.title} onChange={(e) => updateField('learning', 'title', e.target.value)} style={inputStyle} />
          <label style={labelStyle}>Description</label>
          <textarea value={data.learning?.description} onChange={(e) => updateField('learning', 'description', e.target.value)} rows={4} style={inputStyle} />
          <label style={labelStyle}>Items (one per line)</label>
          <textarea value={data.learning?.items?.join('\n')} onChange={(e) => updateField('learning', 'items', e.target.value.split('\n'))} rows={5} style={inputStyle} />
        </div>
      )}

      {/* REQUEST */}
      {activeTab === 'request' && (
        <div>
          <label style={labelStyle}>Title</label>
          <input value={data.request?.title} onChange={(e) => updateField('request', 'title', e.target.value)} style={inputStyle} />
          <label style={labelStyle}>Description</label>
          <textarea value={data.request?.description} onChange={(e) => updateField('request', 'description', e.target.value)} rows={3} style={inputStyle} />
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
        Save Reports Page
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