'use client';

import { useState, useEffect, useRef } from 'react';

export default function AdminHomepagePage() {
  const [data, setData] = useState<any>(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('hero');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadingFor, setUploadingFor] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/homepage')
      .then((res) => res.json())
      .then((json) => {
        setData(json);
        setLoading(false);
      })
      .catch(console.error);
  }, []);

  const handleSave = async () => {
    const res = await fetch('/api/homepage', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (res.ok) setMessage('Homepage updated successfully!');
    else setMessage('Save failed.');
  };

  // Generic update functions
  const updateField = (section: string, field: string, value: any) => {
    setData((prev: any) => ({
      ...prev,
      [section]: { ...prev[section], [field]: value },
    }));
  };

  const updateNestedField = (section: string, parentField: string, childField: string, value: any) => {
    setData((prev: any) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [parentField]: { ...prev[section]?.[parentField], [childField]: value },
      },
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

  // Image upload helper
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

  if (loading) return <div style={{ padding: 40 }}>Loading homepage data…</div>;
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
    'hero', 'aboutCta', 'whyEra', 'background', 'visionMission', 'coreValues',
    'aimsObjectives', 'coverageCta', 'coverage', 'programs', 'approachCta',
    'approaches', 'partners', 'faq', 'support', 'contact',
  ];

  return (
    <div>
      <h1 style={{ fontFamily: 'Archivo, sans-serif', marginBottom: 24 }}>Edit ERA Homepage</h1>
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
          <label style={labelStyle}>Slides (images)</label>
          {data.hero?.slides?.map((slide: any, idx: number) => (
            <div key={idx} style={{ border: '1px solid #ccc', padding: 10, marginBottom: 10 }}>
              <input value={slide.image} onChange={(e) => handleArrayItemChange('hero', 'slides', idx, 'image', e.target.value)} placeholder="Image URL" style={{ ...inputStyle, flex: 1 }} />
              <input value={slide.alt} onChange={(e) => handleArrayItemChange('hero', 'slides', idx, 'alt', e.target.value)} placeholder="Alt text" style={inputStyle} />
              <button type="button" onClick={() => document.getElementById(`hero-image-${idx}`)?.click()} className="btn btn-primary" style={{ marginBottom: 8 }}>Upload Image</button>
              <input type="file" id={`hero-image-${idx}`} style={{ display: 'none' }} onChange={(e) => {
                const file = e.target.files?.[0];
                if (!file) return;
                const formData = new FormData();
                formData.append('file', file);
                fetch('/api/upload', { method: 'POST', body: formData })
                  .then(res => res.json())
                  .then(result => {
                    if (result.url) handleArrayItemChange('hero', 'slides', idx, 'image', result.url);
                    setMessage('Image uploaded!');
                  });
              }} />
              {slide.image && <img src={slide.image} style={{ maxWidth: 200, marginBottom: 8 }} />}
              <button onClick={() => handleArrayRemove('hero', 'slides', idx)} style={{ color: 'red', background: 'none', border: 'none', cursor: 'pointer' }}>Remove</button>
            </div>
          ))}
          <button onClick={() => handleArrayAdd('hero', 'slides', { image: '', alt: '' })} className="btn btn-outline" style={{ marginTop: 8 }}>+ Add Slide</button>
        </div>
      )}

      {/* ABOUT CTA */}
      {activeTab === 'aboutCta' && (
        <div>
          <label style={labelStyle}>Title</label>
          <input value={data.aboutCta?.title} onChange={(e) => updateField('aboutCta', 'title', e.target.value)} style={inputStyle} />
          <label style={labelStyle}>Text</label>
          <textarea value={data.aboutCta?.text} onChange={(e) => updateField('aboutCta', 'text', e.target.value)} rows={3} style={inputStyle} />
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

      {/* BACKGROUND */}
      {activeTab === 'background' && (
        <div>
          <label style={labelStyle}>Subtitle</label>
          <input value={data.background?.subtitle} onChange={(e) => updateField('background', 'subtitle', e.target.value)} style={inputStyle} />
          <label style={labelStyle}>Title</label>
          <input value={data.background?.title} onChange={(e) => updateField('background', 'title', e.target.value)} style={inputStyle} />
          <label style={labelStyle}>Paragraph 1</label>
          <textarea value={data.background?.paragraph1} onChange={(e) => updateField('background', 'paragraph1', e.target.value)} rows={4} style={inputStyle} />
          <label style={labelStyle}>Paragraph 2</label>
          <textarea value={data.background?.paragraph2} onChange={(e) => updateField('background', 'paragraph2', e.target.value)} rows={4} style={inputStyle} />
          <label style={labelStyle}>Image</label>
          <input value={data.background?.image} onChange={(e) => updateField('background', 'image', e.target.value)} style={inputStyle} />
          <button type="button" onClick={() => document.getElementById('background-image')?.click()} className="btn btn-primary">Upload</button>
          <input type="file" id="background-image" style={{ display: 'none' }} onChange={(e) => {
            const file = e.target.files?.[0];
            if (!file) return;
            const formData = new FormData();
            formData.append('file', file);
            fetch('/api/upload', { method: 'POST', body: formData })
              .then(res => res.json())
              .then(result => {
                if (result.url) updateField('background', 'image', result.url);
              });
          }} />
          {data.background?.image && <img src={data.background.image} style={{ maxWidth: 200, marginTop: 8 }} />}
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

      {/* AIMS & OBJECTIVES */}
      {activeTab === 'aimsObjectives' && (
        <div>
          <label style={labelStyle}>Subtitle</label>
          <input value={data.aimsObjectives?.subtitle} onChange={(e) => updateField('aimsObjectives', 'subtitle', e.target.value)} style={inputStyle} />
          <label style={labelStyle}>Title</label>
          <input value={data.aimsObjectives?.title} onChange={(e) => updateField('aimsObjectives', 'title', e.target.value)} style={inputStyle} />
          <label style={labelStyle}>Aims Title</label>
          <input value={data.aimsObjectives?.aimsTitle} onChange={(e) => updateField('aimsObjectives', 'aimsTitle', e.target.value)} style={inputStyle} />
          <label style={labelStyle}>Objectives Title</label>
          <input value={data.aimsObjectives?.objectivesTitle} onChange={(e) => updateField('aimsObjectives', 'objectivesTitle', e.target.value)} style={inputStyle} />
          <h4>Aims (one per line)</h4>
          <textarea
            value={data.aimsObjectives?.aims?.join('\n')}
            onChange={(e) => updateField('aimsObjectives', 'aims', e.target.value.split('\n'))}
            rows={6}
            style={inputStyle}
          />
          <h4>Objectives (one per line)</h4>
          <textarea
            value={data.aimsObjectives?.objectives?.join('\n')}
            onChange={(e) => updateField('aimsObjectives', 'objectives', e.target.value.split('\n'))}
            rows={6}
            style={inputStyle}
          />
        </div>
      )}

      {/* COVERAGE CTA */}
      {activeTab === 'coverageCta' && (
        <div>
          <label style={labelStyle}>Title</label>
          <input value={data.coverageCta?.title} onChange={(e) => updateField('coverageCta', 'title', e.target.value)} style={inputStyle} />
          <label style={labelStyle}>Text</label>
          <textarea value={data.coverageCta?.text} onChange={(e) => updateField('coverageCta', 'text', e.target.value)} rows={3} style={inputStyle} />
        </div>
      )}

      {/* COVERAGE */}
      {activeTab === 'coverage' && (
        <div>
          <label style={labelStyle}>Subtitle</label>
          <input value={data.coverage?.subtitle} onChange={(e) => updateField('coverage', 'subtitle', e.target.value)} style={inputStyle} />
          <label style={labelStyle}>Title</label>
          <input value={data.coverage?.title} onChange={(e) => updateField('coverage', 'title', e.target.value)} style={inputStyle} />
          <label style={labelStyle}>Paragraph 1</label>
          <textarea value={data.coverage?.paragraph1} onChange={(e) => updateField('coverage', 'paragraph1', e.target.value)} rows={3} style={inputStyle} />
          <label style={labelStyle}>Paragraph 2</label>
          <textarea value={data.coverage?.paragraph2} onChange={(e) => updateField('coverage', 'paragraph2', e.target.value)} rows={3} style={inputStyle} />
          <label style={labelStyle}>Image</label>
          <input value={data.coverage?.image} onChange={(e) => updateField('coverage', 'image', e.target.value)} style={inputStyle} />
          <button type="button" onClick={() => document.getElementById('coverage-image')?.click()} className="btn btn-primary">Upload</button>
          <input type="file" id="coverage-image" style={{ display: 'none' }} onChange={(e) => {
            const file = e.target.files?.[0];
            if (!file) return;
            const formData = new FormData();
            formData.append('file', file);
            fetch('/api/upload', { method: 'POST', body: formData })
              .then(res => res.json())
              .then(result => {
                if (result.url) updateField('coverage', 'image', result.url);
              });
          }} />
          {data.coverage?.image && <img src={data.coverage.image} style={{ maxWidth: 200, marginTop: 8 }} />}
          <h4>Stats</h4>
          {data.coverage?.stats?.map((stat: any, idx: number) => (
            <div key={idx} style={{ display: 'flex', gap: 10, marginBottom: 8 }}>
              <input value={stat.value} onChange={(e) => handleArrayItemChange('coverage', 'stats', idx, 'value', e.target.value)} placeholder="Value" style={{ ...inputStyle, flex: 1 }} />
              <input value={stat.label} onChange={(e) => handleArrayItemChange('coverage', 'stats', idx, 'label', e.target.value)} placeholder="Label" style={{ ...inputStyle, flex: 1 }} />
              <button onClick={() => handleArrayRemove('coverage', 'stats', idx)}>✕</button>
            </div>
          ))}
          <button onClick={() => handleArrayAdd('coverage', 'stats', { value: '', label: '' })}>+ Add Stat</button>
        </div>
      )}

      {/* PROGRAMS */}
      {activeTab === 'programs' && (
        <div>
          <label style={labelStyle}>Subtitle</label>
          <input value={data.programs?.subtitle} onChange={(e) => updateField('programs', 'subtitle', e.target.value)} style={inputStyle} />
          <label style={labelStyle}>Title</label>
          <input value={data.programs?.title} onChange={(e) => updateField('programs', 'title', e.target.value)} style={inputStyle} />
          <h4>Program Items</h4>
          {data.programs?.items?.map((item: any, idx: number) => (
            <div key={idx} style={{ border: '1px solid #ccc', padding: 10, marginBottom: 10 }}>
              <input value={item.icon} onChange={(e) => handleArrayItemChange('programs', 'items', idx, 'icon', e.target.value)} placeholder="Icon class" style={inputStyle} />
              <input value={item.title} onChange={(e) => handleArrayItemChange('programs', 'items', idx, 'title', e.target.value)} placeholder="Title" style={inputStyle} />
              <input value={item.text} onChange={(e) => handleArrayItemChange('programs', 'items', idx, 'text', e.target.value)} placeholder="Text" style={inputStyle} />
              <button onClick={() => handleArrayRemove('programs', 'items', idx)}>Remove</button>
            </div>
          ))}
          <button onClick={() => handleArrayAdd('programs', 'items', { icon: '', title: '', text: '' })}>+ Add Program</button>
        </div>
      )}

      {/* APPROACH CTA */}
      {activeTab === 'approachCta' && (
        <div>
          <label style={labelStyle}>Title</label>
          <input value={data.approachCta?.title} onChange={(e) => updateField('approachCta', 'title', e.target.value)} style={inputStyle} />
          <label style={labelStyle}>Text</label>
          <textarea value={data.approachCta?.text} onChange={(e) => updateField('approachCta', 'text', e.target.value)} rows={3} style={inputStyle} />
        </div>
      )}

      {/* APPROACHES */}
      {activeTab === 'approaches' && (
        <div>
          <label style={labelStyle}>Subtitle</label>
          <input value={data.approaches?.subtitle} onChange={(e) => updateField('approaches', 'subtitle', e.target.value)} style={inputStyle} />
          <label style={labelStyle}>Title</label>
          <input value={data.approaches?.title} onChange={(e) => updateField('approaches', 'title', e.target.value)} style={inputStyle} />
          <h4>Approach Items</h4>
          {data.approaches?.items?.map((item: any, idx: number) => (
            <div key={idx} style={{ border: '1px solid #ccc', padding: 10, marginBottom: 10 }}>
              <input value={item.icon} onChange={(e) => handleArrayItemChange('approaches', 'items', idx, 'icon', e.target.value)} placeholder="Icon class" style={inputStyle} />
              <input value={item.title} onChange={(e) => handleArrayItemChange('approaches', 'items', idx, 'title', e.target.value)} placeholder="Title" style={inputStyle} />
              <input value={item.text} onChange={(e) => handleArrayItemChange('approaches', 'items', idx, 'text', e.target.value)} placeholder="Text" style={inputStyle} />
              <button onClick={() => handleArrayRemove('approaches', 'items', idx)}>Remove</button>
            </div>
          ))}
          <button onClick={() => handleArrayAdd('approaches', 'items', { icon: '', title: '', text: '' })}>+ Add Approach</button>
        </div>
      )}

      {/* PARTNERS */}
      {activeTab === 'partners' && (
        <div>
          <label style={labelStyle}>Subtitle</label>
          <input value={data.partners?.subtitle} onChange={(e) => updateField('partners', 'subtitle', e.target.value)} style={inputStyle} />
          <label style={labelStyle}>Title</label>
          <input value={data.partners?.title} onChange={(e) => updateField('partners', 'title', e.target.value)} style={inputStyle} />
          <label style={labelStyle}>Description</label>
          <textarea value={data.partners?.description} onChange={(e) => updateField('partners', 'description', e.target.value)} rows={3} style={inputStyle} />
          <h4>Partner Logos</h4>
          {data.partners?.logos?.map((logo: any, idx: number) => (
            <div key={idx} style={{ border: '1px solid #ccc', padding: 10, marginBottom: 10 }}>
              <input value={logo.src} onChange={(e) => handleArrayItemChange('partners', 'logos', idx, 'src', e.target.value)} placeholder="Image URL" style={{ ...inputStyle, flex: 1 }} />
              <input value={logo.alt} onChange={(e) => handleArrayItemChange('partners', 'logos', idx, 'alt', e.target.value)} placeholder="Alt text" style={inputStyle} />
              <button type="button" onClick={() => document.getElementById(`partner-image-${idx}`)?.click()} className="btn btn-primary">Upload</button>
              <input type="file" id={`partner-image-${idx}`} style={{ display: 'none' }} onChange={(e) => {
                const file = e.target.files?.[0];
                if (!file) return;
                const formData = new FormData();
                formData.append('file', file);
                fetch('/api/upload', { method: 'POST', body: formData })
                  .then(res => res.json())
                  .then(result => {
                    if (result.url) handleArrayItemChange('partners', 'logos', idx, 'src', result.url);
                  });
              }} />
              {logo.src && <img src={logo.src} style={{ maxWidth: 100, marginTop: 8 }} />}
              <button onClick={() => handleArrayRemove('partners', 'logos', idx)}>Remove</button>
            </div>
          ))}
          <button onClick={() => handleArrayAdd('partners', 'logos', { src: '', alt: '' })}>+ Add Logo</button>
        </div>
      )}

      {/* FAQ */}
      {activeTab === 'faq' && (
        <div>
          <label style={labelStyle}>Title</label>
          <input value={data.faq?.title} onChange={(e) => updateField('faq', 'title', e.target.value)} style={inputStyle} />
          <h4>FAQ Items</h4>
          {data.faq?.items?.map((item: any, idx: number) => (
            <div key={idx} style={{ border: '1px solid #ccc', padding: 10, marginBottom: 10 }}>
              <input value={item.icon} onChange={(e) => handleArrayItemChange('faq', 'items', idx, 'icon', e.target.value)} placeholder="Icon class" style={inputStyle} />
              <input value={item.question} onChange={(e) => handleArrayItemChange('faq', 'items', idx, 'question', e.target.value)} placeholder="Question" style={inputStyle} />
              <textarea value={item.answer} onChange={(e) => handleArrayItemChange('faq', 'items', idx, 'answer', e.target.value)} placeholder="Answer" rows={3} style={inputStyle} />
              <button onClick={() => handleArrayRemove('faq', 'items', idx)}>Remove</button>
            </div>
          ))}
          <button onClick={() => handleArrayAdd('faq', 'items', { icon: '', question: '', answer: '' })}>+ Add FAQ</button>
        </div>
      )}

      {/* SUPPORT */}
      {activeTab === 'support' && (
        <div>
          <label style={labelStyle}>Title</label>
          <input value={data.support?.title} onChange={(e) => updateField('support', 'title', e.target.value)} style={inputStyle} />
          <label style={labelStyle}>Text</label>
          <textarea value={data.support?.text} onChange={(e) => updateField('support', 'text', e.target.value)} rows={3} style={inputStyle} />
          <h4>Support Actions</h4>
          {data.support?.actions?.map((action: any, idx: number) => (
            <div key={idx} style={{ border: '1px solid #ccc', padding: 10, marginBottom: 10 }}>
              <input value={action.icon} onChange={(e) => handleArrayItemChange('support', 'actions', idx, 'icon', e.target.value)} placeholder="Icon class" style={inputStyle} />
              <input value={action.label} onChange={(e) => handleArrayItemChange('support', 'actions', idx, 'label', e.target.value)} placeholder="Label" style={inputStyle} />
              <input value={action.href} onChange={(e) => handleArrayItemChange('support', 'actions', idx, 'href', e.target.value)} placeholder="Link" style={inputStyle} />
              <button onClick={() => handleArrayRemove('support', 'actions', idx)}>Remove</button>
            </div>
          ))}
          <button onClick={() => handleArrayAdd('support', 'actions', { icon: '', label: '', href: '' })}>+ Add Action</button>
        </div>
      )}

      {/* CONTACT */}
      {activeTab === 'contact' && (
        <div>
          <label style={labelStyle}>Subtitle</label>
          <input value={data.contact?.subtitle} onChange={(e) => updateField('contact', 'subtitle', e.target.value)} style={inputStyle} />
          <label style={labelStyle}>Title</label>
          <input value={data.contact?.title} onChange={(e) => updateField('contact', 'title', e.target.value)} style={inputStyle} />
          <label style={labelStyle}>Description</label>
          <textarea value={data.contact?.description} onChange={(e) => updateField('contact', 'description', e.target.value)} rows={3} style={inputStyle} />
          <h4>Info Items</h4>
          {data.contact?.infoItems?.map((item: any, idx: number) => (
            <div key={idx} style={{ border: '1px solid #ccc', padding: 10, marginBottom: 10 }}>
              <input value={item.icon} onChange={(e) => handleArrayItemChange('contact', 'infoItems', idx, 'icon', e.target.value)} placeholder="Icon class" style={inputStyle} />
              <input value={item.title} onChange={(e) => handleArrayItemChange('contact', 'infoItems', idx, 'title', e.target.value)} placeholder="Title" style={inputStyle} />
              <textarea value={item.lines?.join('\n')} onChange={(e) => handleArrayItemChange('contact', 'infoItems', idx, 'lines', e.target.value.split('\n'))} placeholder="Lines (one per line)" rows={3} style={inputStyle} />
              <button onClick={() => handleArrayRemove('contact', 'infoItems', idx)}>Remove</button>
            </div>
          ))}
          <button onClick={() => handleArrayAdd('contact', 'infoItems', { icon: '', title: '', lines: [] })}>+ Add Info Item</button>
          <h4>Social Links</h4>
          {data.contact?.socials?.map((social: any, idx: number) => (
            <div key={idx} style={{ border: '1px solid #ccc', padding: 10, marginBottom: 10 }}>
              <input value={social.platform} onChange={(e) => handleArrayItemChange('contact', 'socials', idx, 'platform', e.target.value)} placeholder="Platform (e.g., Facebook)" style={inputStyle} />
              <input value={social.url} onChange={(e) => handleArrayItemChange('contact', 'socials', idx, 'url', e.target.value)} placeholder="URL" style={inputStyle} />
              <button onClick={() => handleArrayRemove('contact', 'socials', idx)}>Remove</button>
            </div>
          ))}
          <button onClick={() => handleArrayAdd('contact', 'socials', { platform: '', url: '' })}>+ Add Social</button>
        </div>
      )}

      <button onClick={handleSave} className="btn btn-primary" style={{ marginTop: 20, width: '100%', padding: 14, fontSize: 15 }}>
        Save Homepage
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