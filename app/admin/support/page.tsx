'use client';

import { useState, useEffect, useRef } from 'react';

export default function AdminSupportPage() {
  const [data, setData] = useState<any>(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('hero');
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetch('/api/support')
      .then((res) => res.json())
      .then((json) => {
        setData(json);
        setLoading(false);
      })
      .catch(console.error);
  }, []);

  const handleSave = async () => {
    const res = await fetch('/api/support', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (res.ok) setMessage('Support page updated successfully!');
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

  if (loading) return <div style={{ padding: 40 }}>Loading support data…</div>;
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
    'hero', 'whySupport', 'waysToGive', 'donationDetails', 'impact', 'transparency', 'otherWays', 'cta',
  ];

  return (
    <div>
      <h1 style={{ fontFamily: 'Archivo, sans-serif', marginBottom: 24 }}>Edit Support Page</h1>
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

      {/* WHY SUPPORT */}
      {activeTab === 'whySupport' && (
        <div>
          <label style={labelStyle}>Subtitle</label>
          <input value={data.whySupport?.subtitle} onChange={(e) => updateField('whySupport', 'subtitle', e.target.value)} style={inputStyle} />
          <label style={labelStyle}>Title</label>
          <input value={data.whySupport?.title} onChange={(e) => updateField('whySupport', 'title', e.target.value)} style={inputStyle} />
          <label style={labelStyle}>Description</label>
          <textarea value={data.whySupport?.description} onChange={(e) => updateField('whySupport', 'description', e.target.value)} rows={4} style={inputStyle} />
          <label style={labelStyle}>Points (one per line)</label>
          <textarea value={data.whySupport?.points?.join('\n')} onChange={(e) => updateField('whySupport', 'points', e.target.value.split('\n'))} rows={6} style={inputStyle} />
        </div>
      )}

      {/* WAYS TO GIVE */}
      {activeTab === 'waysToGive' && (
        <div>
          <label style={labelStyle}>Subtitle</label>
          <input value={data.waysToGive?.subtitle} onChange={(e) => updateField('waysToGive', 'subtitle', e.target.value)} style={inputStyle} />
          <label style={labelStyle}>Title</label>
          <input value={data.waysToGive?.title} onChange={(e) => updateField('waysToGive', 'title', e.target.value)} style={inputStyle} />
          <label style={labelStyle}>Description</label>
          <textarea value={data.waysToGive?.description} onChange={(e) => updateField('waysToGive', 'description', e.target.value)} rows={3} style={inputStyle} />
          <h4>Cards</h4>
          {data.waysToGive?.cards?.map((card: any, idx: number) => (
            <div key={idx} style={{ border: '1px solid #ccc', padding: 10, marginBottom: 10 }}>
              <input value={card.icon} onChange={(e) => handleArrayItemChange('waysToGive', 'cards', idx, 'icon', e.target.value)} placeholder="Icon class" style={inputStyle} />
              <input value={card.title} onChange={(e) => handleArrayItemChange('waysToGive', 'cards', idx, 'title', e.target.value)} placeholder="Title" style={inputStyle} />
              <textarea value={card.text} onChange={(e) => handleArrayItemChange('waysToGive', 'cards', idx, 'text', e.target.value)} placeholder="Text" rows={3} style={inputStyle} />
              <input value={card.buttonLabel} onChange={(e) => handleArrayItemChange('waysToGive', 'cards', idx, 'buttonLabel', e.target.value)} placeholder="Button Label" style={inputStyle} />
              <input value={card.buttonLink} onChange={(e) => handleArrayItemChange('waysToGive', 'cards', idx, 'buttonLink', e.target.value)} placeholder="Button Link" style={inputStyle} />
              <input value={card.borderColor} onChange={(e) => handleArrayItemChange('waysToGive', 'cards', idx, 'borderColor', e.target.value)} placeholder="Border Color" style={inputStyle} />
              <button onClick={() => handleArrayRemove('waysToGive', 'cards', idx)}>Remove</button>
            </div>
          ))}
          <button onClick={() => handleArrayAdd('waysToGive', 'cards', { icon: '', title: '', text: '', buttonLabel: '', buttonLink: '', borderColor: '' })}>+ Add Card</button>
        </div>
      )}

      {/* DONATION DETAILS */}
      {activeTab === 'donationDetails' && (
        <div>
          <label style={labelStyle}>Subtitle</label>
          <input value={data.donationDetails?.subtitle} onChange={(e) => updateField('donationDetails', 'subtitle', e.target.value)} style={inputStyle} />
          <label style={labelStyle}>Title</label>
          <input value={data.donationDetails?.title} onChange={(e) => updateField('donationDetails', 'title', e.target.value)} style={inputStyle} />
          <label style={labelStyle}>Description</label>
          <textarea value={data.donationDetails?.description} onChange={(e) => updateField('donationDetails', 'description', e.target.value)} rows={3} style={inputStyle} />
          <h4>Bank Info</h4>
          <input value={data.donationDetails?.bankInfo?.bankName} onChange={(e) => updateField('donationDetails', 'bankInfo', { ...data.donationDetails.bankInfo, bankName: e.target.value })} placeholder="Bank Name" style={inputStyle} />
          <input value={data.donationDetails?.bankInfo?.accountName} onChange={(e) => updateField('donationDetails', 'bankInfo', { ...data.donationDetails.bankInfo, accountName: e.target.value })} placeholder="Account Name" style={inputStyle} />
          <input value={data.donationDetails?.bankInfo?.accountNumber} onChange={(e) => updateField('donationDetails', 'bankInfo', { ...data.donationDetails.bankInfo, accountNumber: e.target.value })} placeholder="Account Number" style={inputStyle} />
          <input value={data.donationDetails?.bankInfo?.swiftCode} onChange={(e) => updateField('donationDetails', 'bankInfo', { ...data.donationDetails.bankInfo, swiftCode: e.target.value })} placeholder="Swift Code" style={inputStyle} />
          <h4>Mobile Money (one per line, format: Provider: Number)</h4>
          <textarea value={data.donationDetails?.mobileMoney?.map((item: any) => `${item.provider}: ${item.number}`).join('\n')} onChange={(e) => {
            const lines = e.target.value.split('\n');
            const parsed = lines.map(line => {
              const [provider, ...rest] = line.split(':');
              return { provider: provider?.trim(), number: rest.join(':').trim() };
            });
            updateField('donationDetails', 'mobileMoney', parsed);
          }} rows={3} style={inputStyle} />
          <label style={labelStyle}>Image</label>
          <div style={{ display: 'flex', gap: 10, marginBottom: 16 }}>
            <input value={data.donationDetails?.image} onChange={(e) => updateField('donationDetails', 'image', e.target.value)} style={{ ...inputStyle, flex: 1, marginBottom: 0 }} />
            <input type="file" ref={fileInputRef} onChange={() => handleImageUpload((url) => updateField('donationDetails', 'image', url))} style={{ display: 'none' }} />
            <button type="button" onClick={() => fileInputRef.current?.click()} className="btn btn-primary" style={{ whiteSpace: 'nowrap' }}>Upload</button>
          </div>
          {data.donationDetails?.image && <img src={data.donationDetails.image} style={{ maxWidth: 200, marginBottom: 16 }} />}
          <label style={labelStyle}>Image Caption</label>
          <input value={data.donationDetails?.imageCaption} onChange={(e) => updateField('donationDetails', 'imageCaption', e.target.value)} style={inputStyle} />
        </div>
      )}

      {/* IMPACT */}
      {activeTab === 'impact' && (
        <div>
          <label style={labelStyle}>Subtitle</label>
          <input value={data.impact?.subtitle} onChange={(e) => updateField('impact', 'subtitle', e.target.value)} style={inputStyle} />
          <label style={labelStyle}>Title</label>
          <input value={data.impact?.title} onChange={(e) => updateField('impact', 'title', e.target.value)} style={inputStyle} />
          <h4>Items</h4>
          {data.impact?.items?.map((item: any, idx: number) => (
            <div key={idx} style={{ border: '1px solid #ccc', padding: 10, marginBottom: 10 }}>
              <input value={item.icon} onChange={(e) => handleArrayItemChange('impact', 'items', idx, 'icon', e.target.value)} placeholder="Icon class" style={inputStyle} />
              <input value={item.text} onChange={(e) => handleArrayItemChange('impact', 'items', idx, 'text', e.target.value)} placeholder="Text" style={inputStyle} />
              <button onClick={() => handleArrayRemove('impact', 'items', idx)}>Remove</button>
            </div>
          ))}
          <button onClick={() => handleArrayAdd('impact', 'items', { icon: '', text: '' })}>+ Add Item</button>
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
          <textarea value={data.transparency?.description} onChange={(e) => updateField('transparency', 'description', e.target.value)} rows={4} style={inputStyle} />
          <label style={labelStyle}>Points (one per line)</label>
          <textarea value={data.transparency?.points?.join('\n')} onChange={(e) => updateField('transparency', 'points', e.target.value.split('\n'))} rows={5} style={inputStyle} />
        </div>
      )}

      {/* OTHER WAYS */}
      {activeTab === 'otherWays' && (
        <div>
          <label style={labelStyle}>Subtitle</label>
          <input value={data.otherWays?.subtitle} onChange={(e) => updateField('otherWays', 'subtitle', e.target.value)} style={inputStyle} />
          <label style={labelStyle}>Title</label>
          <input value={data.otherWays?.title} onChange={(e) => updateField('otherWays', 'title', e.target.value)} style={inputStyle} />
          <label style={labelStyle}>Description</label>
          <textarea value={data.otherWays?.description} onChange={(e) => updateField('otherWays', 'description', e.target.value)} rows={3} style={inputStyle} />
          <h4>Items</h4>
          {data.otherWays?.items?.map((item: any, idx: number) => (
            <div key={idx} style={{ border: '1px solid #ccc', padding: 10, marginBottom: 10 }}>
              <input value={item.icon} onChange={(e) => handleArrayItemChange('otherWays', 'items', idx, 'icon', e.target.value)} placeholder="Icon class" style={inputStyle} />
              <input value={item.title} onChange={(e) => handleArrayItemChange('otherWays', 'items', idx, 'title', e.target.value)} placeholder="Title" style={inputStyle} />
              <textarea value={item.text} onChange={(e) => handleArrayItemChange('otherWays', 'items', idx, 'text', e.target.value)} placeholder="Text" rows={3} style={inputStyle} />
              <button onClick={() => handleArrayRemove('otherWays', 'items', idx)}>Remove</button>
            </div>
          ))}
          <button onClick={() => handleArrayAdd('otherWays', 'items', { icon: '', title: '', text: '' })}>+ Add Item</button>
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
        Save Support Page
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