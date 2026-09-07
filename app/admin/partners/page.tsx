'use client';

import { useState, useEffect, useRef } from 'react';

export default function AdminPartnersPage() {
  const [data, setData] = useState<any>(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('hero');
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetch('/api/partners')
      .then((res) => res.json())
      .then((json) => {
        setData(json);
        setLoading(false);
      })
      .catch(console.error);
  }, []);

  const handleSave = async () => {
    const res = await fetch('/api/partners', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (res.ok) setMessage('Partners page updated successfully!');
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

  if (loading) return <div style={{ padding: 40 }}>Loading partners data…</div>;
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
    'hero', 'whyPartnerships', 'partnerLogos', 'partnershipOpportunities', 'whatWeOffer', 'cta',
  ];

  return (
    <div>
      <h1 style={{ fontFamily: 'Archivo, sans-serif', marginBottom: 24 }}>Edit Partners Page</h1>
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

      {/* WHY PARTNERSHIPS */}
      {activeTab === 'whyPartnerships' && (
        <div>
          <label style={labelStyle}>Subtitle</label>
          <input value={data.whyPartnerships?.subtitle} onChange={(e) => updateField('whyPartnerships', 'subtitle', e.target.value)} style={inputStyle} />
          <label style={labelStyle}>Title</label>
          <input value={data.whyPartnerships?.title} onChange={(e) => updateField('whyPartnerships', 'title', e.target.value)} style={inputStyle} />
          <label style={labelStyle}>Paragraph 1</label>
          <textarea value={data.whyPartnerships?.paragraph1} onChange={(e) => updateField('whyPartnerships', 'paragraph1', e.target.value)} rows={4} style={inputStyle} />
          <label style={labelStyle}>Paragraph 2</label>
          <textarea value={data.whyPartnerships?.paragraph2} onChange={(e) => updateField('whyPartnerships', 'paragraph2', e.target.value)} rows={4} style={inputStyle} />
        </div>
      )}

      {/* PARTNER LOGOS */}
      {activeTab === 'partnerLogos' && (
        <div>
          <label style={labelStyle}>Subtitle</label>
          <input value={data.partnerLogos?.subtitle} onChange={(e) => updateField('partnerLogos', 'subtitle', e.target.value)} style={inputStyle} />
          <label style={labelStyle}>Title</label>
          <input value={data.partnerLogos?.title} onChange={(e) => updateField('partnerLogos', 'title', e.target.value)} style={inputStyle} />
          <label style={labelStyle}>Description</label>
          <textarea value={data.partnerLogos?.description} onChange={(e) => updateField('partnerLogos', 'description', e.target.value)} rows={3} style={inputStyle} />
          <h4>Logos</h4>
          {data.partnerLogos?.logos?.map((logo: any, idx: number) => (
            <div key={idx} style={{ border: '1px solid #ccc', padding: 10, marginBottom: 10 }}>
              <input value={logo.src} onChange={(e) => handleArrayItemChange('partnerLogos', 'logos', idx, 'src', e.target.value)} placeholder="Image URL" style={{ ...inputStyle, flex: 1 }} />
              <input value={logo.alt} onChange={(e) => handleArrayItemChange('partnerLogos', 'logos', idx, 'alt', e.target.value)} placeholder="Alt text" style={inputStyle} />
              <button type="button" onClick={() => document.getElementById(`partner-logo-${idx}`)?.click()} className="btn btn-primary" style={{ marginBottom: 8 }}>Upload</button>
              <input type="file" id={`partner-logo-${idx}`} style={{ display: 'none' }} onChange={(e) => {
                const file = e.target.files?.[0];
                if (!file) return;
                const formData = new FormData();
                formData.append('file', file);
                fetch('/api/upload', { method: 'POST', body: formData })
                  .then(res => res.json())
                  .then(result => {
                    if (result.url) handleArrayItemChange('partnerLogos', 'logos', idx, 'src', result.url);
                    setMessage('Image uploaded!');
                  });
              }} />
              {logo.src && <img src={logo.src} style={{ maxWidth: 100, marginBottom: 8 }} />}
              <button onClick={() => handleArrayRemove('partnerLogos', 'logos', idx)}>Remove</button>
            </div>
          ))}
          <button onClick={() => handleArrayAdd('partnerLogos', 'logos', { src: '', alt: '' })}>+ Add Logo</button>
        </div>
      )}

      {/* PARTNERSHIP OPPORTUNITIES */}
      {activeTab === 'partnershipOpportunities' && (
        <div>
          <label style={labelStyle}>Title</label>
          <input value={data.partnershipOpportunities?.title} onChange={(e) => updateField('partnershipOpportunities', 'title', e.target.value)} style={inputStyle} />
          <label style={labelStyle}>Description</label>
          <textarea value={data.partnershipOpportunities?.description} onChange={(e) => updateField('partnershipOpportunities', 'description', e.target.value)} rows={3} style={inputStyle} />
          <h4>Items</h4>
          {data.partnershipOpportunities?.items?.map((item: any, idx: number) => (
            <div key={idx} style={{ border: '1px solid #ccc', padding: 10, marginBottom: 10 }}>
              <input value={item.icon} onChange={(e) => handleArrayItemChange('partnershipOpportunities', 'items', idx, 'icon', e.target.value)} placeholder="Icon class" style={inputStyle} />
              <input value={item.title} onChange={(e) => handleArrayItemChange('partnershipOpportunities', 'items', idx, 'title', e.target.value)} placeholder="Title" style={inputStyle} />
              <textarea value={item.text} onChange={(e) => handleArrayItemChange('partnershipOpportunities', 'items', idx, 'text', e.target.value)} placeholder="Text" rows={3} style={inputStyle} />
              <button onClick={() => handleArrayRemove('partnershipOpportunities', 'items', idx)}>Remove</button>
            </div>
          ))}
          <button onClick={() => handleArrayAdd('partnershipOpportunities', 'items', { icon: '', title: '', text: '' })}>+ Add Item</button>
        </div>
      )}

      {/* WHAT WE OFFER */}
      {activeTab === 'whatWeOffer' && (
        <div>
          <label style={labelStyle}>Title</label>
          <input value={data.whatWeOffer?.title} onChange={(e) => updateField('whatWeOffer', 'title', e.target.value)} style={inputStyle} />
          <label style={labelStyle}>Description</label>
          <textarea value={data.whatWeOffer?.description} onChange={(e) => updateField('whatWeOffer', 'description', e.target.value)} rows={3} style={inputStyle} />
          <h4>Points</h4>
          {data.whatWeOffer?.points?.map((point: any, idx: number) => (
            <div key={idx} style={{ border: '1px solid #ccc', padding: 10, marginBottom: 10 }}>
              <input value={point.icon} onChange={(e) => handleArrayItemChange('whatWeOffer', 'points', idx, 'icon', e.target.value)} placeholder="Icon class" style={inputStyle} />
              <input value={point.text} onChange={(e) => handleArrayItemChange('whatWeOffer', 'points', idx, 'text', e.target.value)} placeholder="Text" style={inputStyle} />
              <button onClick={() => handleArrayRemove('whatWeOffer', 'points', idx)}>Remove</button>
            </div>
          ))}
          <button onClick={() => handleArrayAdd('whatWeOffer', 'points', { icon: '', text: '' })}>+ Add Point</button>
          <h4>Additional points (one per line)</h4>
          <textarea
            value={data.whatWeOffer?.additional?.join('\n')}
            onChange={(e) => updateField('whatWeOffer', 'additional', e.target.value.split('\n'))}
            rows={3}
            style={inputStyle}
          />
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
        Save Partners Page
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