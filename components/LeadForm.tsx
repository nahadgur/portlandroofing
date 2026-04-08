'use client'

import { useState } from 'react'
import { SITE } from '@/lib/config'

type Step = 1 | 2 | 3 | 4

interface FormData {
  zip: string; material: string; urgency: string
  name: string; phone: string; email: string
}

const materials = [
  { id:'asphalt', label:'Asphalt Shingle', sub:'Most common in PDX' },
  { id:'metal',   label:'Metal / Steel',   sub:'Best long-term ROI' },
  { id:'cedar',   label:'Cedar Shake',     sub:'Historic districts' },
  { id:'flat',    label:'Flat / TPO',      sub:'Commercial & modern' },
]

const urgencies = [
  { id:'leak',   label:'Leaking Now',     sub:'Emergency needed',  icon:'⚡' },
  { id:'soon',   label:'Next 1–2 Months', sub:'Planned replacement', icon:'📋' },
  { id:'summer', label:'Summer Project',  sub:'Planning ahead',    icon:'☀' },
  { id:'quote',  label:'Just Exploring',  sub:'Want a price guide', icon:'💬' },
]

const steps = [
  { n:1, label:'Location' },
  { n:2, label:'Material' },
  { n:3, label:'Timeline' },
  { n:4, label:'Contact' },
]

export default function LeadForm() {
  const [step,       setStep]       = useState<Step>(1)
  const [data,       setData]       = useState<FormData>({ zip:'', material:'', urgency:'', name:'', phone:'', email:'' })
  const [submitting, setSubmitting] = useState(false)
  const [submitted,  setSubmitted]  = useState(false)
  const [error,      setError]      = useState('')

  const set = (f: keyof FormData, v: string) => setData(p => ({ ...p, [f]: v }))

  async function submit() {
    setSubmitting(true); setError('')
    try {
      if (SITE.gasWebhook) {
        await fetch(SITE.gasWebhook, {
          method:'POST', mode:'no-cors',
          headers:{ 'Content-Type':'application/json' },
          body: JSON.stringify({ ...data, source:SITE.domain, timestamp:new Date().toISOString() }),
        })
      }
      setSubmitted(true)
    } catch {
      setError('Something went wrong. Call us at ' + SITE.phone)
    } finally {
      setSubmitting(false)
    }
  }

  /* Submitted */
  if (submitted) {
    return (
      <div style={{ padding:'3rem 2rem', background:'var(--bg)', textAlign:'center', borderTop:'3px solid var(--green)' }}>
        <div style={{ fontSize:'2.5rem', marginBottom:'0.5rem' }}>✓</div>
        <div style={{ fontFamily:'var(--font-bebas)', fontSize:'2rem', color:'var(--green)', marginBottom:'0.5rem' }}>YOU'RE IN THE QUEUE</div>
        <p style={{ fontFamily:'var(--font-barlow)', fontSize:'0.95rem', color:'var(--muted)', lineHeight:1.65, maxWidth:'320px', margin:'0 auto 1.5rem' }}>
          Matched contractors for <strong style={{ color:'var(--amber)' }}>{data.zip}</strong> will reach out within <strong style={{ color:'var(--text)' }}>48 hours</strong>.
        </p>
        <div style={{ padding:'1rem', background:'var(--bg2)', border:'1px solid var(--bdr)', display:'inline-block', textAlign:'left', minWidth:'240px' }}>
          <div style={{ fontFamily:'var(--font-space-mono)', fontSize:'0.6rem', color:'var(--muted)', marginBottom:'0.6rem', letterSpacing:'0.08em' }}>YOUR SUBMISSION</div>
          {[{k:'Zip',v:data.zip},{k:'Material',v:data.material},{k:'Timeline',v:data.urgency}].map(({k,v})=>(
            <div key={k} style={{ display:'flex', justifyContent:'space-between', gap:'1rem', padding:'0.3rem 0', borderBottom:'1px solid var(--bdr)' }}>
              <span style={{ fontFamily:'var(--font-space-mono)', fontSize:'0.65rem', color:'var(--muted)' }}>{k}</span>
              <span style={{ fontFamily:'var(--font-barlow-cond)', fontSize:'0.82rem', color:'var(--text)', fontWeight:600 }}>{v}</span>
            </div>
          ))}
        </div>
      </div>
    )
  }

  /* Input styles — light theme */
  const inputStyle: React.CSSProperties = {
    width:'100%', padding:'1rem 1.1rem',
    background:'var(--bg)',
    border:'2px solid var(--bdr)',
    color:'var(--text)',
    fontFamily:'var(--font-barlow)', fontSize:'1.05rem',
    outline:'none', transition:'border-color 0.2s',
  }
  const optionBase: React.CSSProperties = {
    padding:'0.85rem 0.9rem',
    background:'var(--bg)',
    border:'2px solid var(--bdr)',
    color:'var(--muted)',
    fontFamily:'var(--font-barlow-cond)', fontSize:'0.88rem',
    letterSpacing:'0.04em', cursor:'pointer',
    textAlign:'left' as const, transition:'all 0.15s',
  }
  const optionSel: React.CSSProperties = {
    ...optionBase,
    border:'2px solid var(--amber)',
    background:'rgba(196,125,10,0.06)',
    color:'var(--amber)',
  }
  const nextBtn = (enabled: boolean): React.CSSProperties => ({
    width:'100%', padding:'1.1rem', border:'none',
    background: enabled ? 'var(--amber-btn)' : 'var(--bg3)',
    color: enabled ? '#000' : 'var(--muted)',
    fontFamily:'var(--font-barlow-cond)', fontWeight:700,
    fontSize:'1.05rem', letterSpacing:'0.12em',
    textTransform:'uppercase' as const,
    cursor: enabled ? 'pointer' : 'not-allowed',
    transition:'background 0.2s, color 0.2s', marginTop:'1.2rem',
  })
  const backBtn: React.CSSProperties = {
    padding:'1.1rem 1.4rem', background:'transparent',
    border:'2px solid var(--bdr)', color:'var(--muted)',
    fontFamily:'var(--font-barlow-cond)', fontSize:'0.9rem',
    cursor:'pointer', letterSpacing:'0.06em', flexShrink:0,
  }

  return (
    <div style={{ background:'var(--bg2)', display:'flex', flexDirection:'column' }}>

      {/* Top accent + header */}
      <div style={{ borderTop:'3px solid var(--amber-btn)' }}>
        <div style={{ padding:'1.8rem 2rem 0' }}>

          {/* Live signal */}
          <div style={{ display:'flex', alignItems:'center', gap:'0.5rem', marginBottom:'1rem' }}>
            <span style={{ display:'inline-block', width:8, height:8, borderRadius:'50%', background:'var(--green)', animation:'blink 1.4s ease-in-out infinite' }}/>
            <span style={{ fontFamily:'var(--font-space-mono)', fontSize:'0.62rem', color:'var(--green)', letterSpacing:'0.1em', textTransform:'uppercase' }}>
              Free · No Obligation · 48h Response
            </span>
          </div>

          <h2 style={{ fontFamily:'var(--font-bebas)', fontSize:'clamp(1.8rem,3vw,2.4rem)', color:'var(--text)', lineHeight:0.95, marginBottom:'0.5rem' }}>
            GET YOUR<br/><span style={{ color:'var(--amber-btn)' }}>FREE QUOTES</span>
          </h2>
          <p style={{ fontFamily:'var(--font-barlow)', fontSize:'0.9rem', color:'var(--muted)', marginBottom:'1.5rem', fontWeight:300 }}>
            3 questions. Matched with vetted Portland contractors in your zip code.
          </p>

          {/* Step tabs */}
          <div style={{ display:'flex', gap:0, marginBottom:'1.8rem', borderBottom:'1px solid var(--bdr)' }}>
            {steps.map(({ n, label }) => (
              <div key={n} style={{ flex:1, paddingBottom:'0.7rem', borderBottom:`2px solid ${step===n?'var(--amber-btn)':step>n?'var(--green)':'transparent'}`, marginBottom:'-1px' }}>
                <div style={{ fontFamily:'var(--font-space-mono)', fontSize:'0.58rem', color:step>n?'var(--green)':step===n?'var(--amber)':'var(--bdr)', letterSpacing:'0.08em', textTransform:'uppercase' }}>
                  {step>n?'✓':`0${n}`}
                </div>
                <div style={{ fontFamily:'var(--font-barlow-cond)', fontSize:'0.72rem', color:step===n?'var(--text)':step>n?'var(--green)':'var(--muted)', letterSpacing:'0.06em', marginTop:'0.1rem' }}>
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Step content */}
      <div style={{ padding:'0 2rem 2rem' }}>

        {step===1&&(
          <div>
            <label style={{ display:'block', fontFamily:'var(--font-space-mono)', fontSize:'0.68rem', color:'var(--amber)', letterSpacing:'0.12em', textTransform:'uppercase', marginBottom:'0.7rem' }}>
              What's your zip code?
            </label>
            <input
              type="text" inputMode="numeric" placeholder="e.g. 97201" maxLength={5}
              value={data.zip} onChange={e => set('zip', e.target.value.replace(/\D/g,''))}
              style={inputStyle} autoFocus
              onFocus={e=>e.currentTarget.style.borderColor='var(--amber-btn)'}
              onBlur={e=>e.currentTarget.style.borderColor=data.zip.length>=5?'var(--amber-btn)':'var(--bdr)'}
            />
            <p style={{ fontFamily:'var(--font-barlow)', fontSize:'0.78rem', color:'var(--muted)', marginTop:'0.6rem' }}>
              We'll match you with contractors who actively serve your area.
            </p>
            <button onClick={()=>data.zip.length>=5&&setStep(2)} disabled={data.zip.length<5} style={nextBtn(data.zip.length>=5)}>
              NEXT: CHOOSE MATERIAL →
            </button>
          </div>
        )}

        {step===2&&(
          <div>
            <label style={{ display:'block', fontFamily:'var(--font-space-mono)', fontSize:'0.68rem', color:'var(--amber)', letterSpacing:'0.12em', textTransform:'uppercase', marginBottom:'0.7rem' }}>
              What's your roof material?
            </label>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'0.6rem' }}>
              {materials.map(mat=>(
                <button key={mat.id} onClick={()=>set('material',mat.label)} style={data.material===mat.label?optionSel:optionBase}>
                  <div style={{ fontWeight:700, marginBottom:'0.15rem' }}>{mat.label}</div>
                  <div style={{ fontSize:'0.7rem', color:data.material===mat.label?'rgba(196,125,10,0.7)':'var(--muted)', fontFamily:'var(--font-barlow)' }}>{mat.sub}</div>
                </button>
              ))}
            </div>
            <div style={{ display:'flex', gap:'0.6rem' }}>
              <button onClick={()=>setStep(1)} style={{ ...backBtn, marginTop:'1.2rem' }}>← Back</button>
              <button onClick={()=>data.material&&setStep(3)} disabled={!data.material} style={{ ...nextBtn(!!data.material), flex:1 }}>NEXT: SET TIMELINE →</button>
            </div>
          </div>
        )}

        {step===3&&(
          <div>
            <label style={{ display:'block', fontFamily:'var(--font-space-mono)', fontSize:'0.68rem', color:'var(--amber)', letterSpacing:'0.12em', textTransform:'uppercase', marginBottom:'0.7rem' }}>
              How soon do you need it?
            </label>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'0.6rem' }}>
              {urgencies.map(u=>(
                <button key={u.id} onClick={()=>set('urgency',u.label)} style={data.urgency===u.label?optionSel:optionBase}>
                  <div style={{ fontSize:'1.1rem', marginBottom:'0.3rem' }}>{u.icon}</div>
                  <div style={{ fontWeight:700, marginBottom:'0.1rem' }}>{u.label}</div>
                  <div style={{ fontSize:'0.68rem', color:data.urgency===u.label?'rgba(196,125,10,0.7)':'var(--muted)', fontFamily:'var(--font-barlow)' }}>{u.sub}</div>
                </button>
              ))}
            </div>
            <div style={{ display:'flex', gap:'0.6rem' }}>
              <button onClick={()=>setStep(2)} style={{ ...backBtn, marginTop:'1.2rem' }}>← Back</button>
              <button onClick={()=>data.urgency&&setStep(4)} disabled={!data.urgency} style={{ ...nextBtn(!!data.urgency), flex:1 }}>LAST STEP →</button>
            </div>
          </div>
        )}

        {step===4&&(
          <div>
            <label style={{ display:'block', fontFamily:'var(--font-space-mono)', fontSize:'0.68rem', color:'var(--amber)', letterSpacing:'0.12em', textTransform:'uppercase', marginBottom:'0.7rem' }}>
              Where do we send your quotes?
            </label>
            <div style={{ display:'flex', flexDirection:'column', gap:'0.6rem', marginBottom:'0.2rem' }}>
              {(['name','phone','email'] as const).map(field=>(
                <input key={field}
                  type={field==='email'?'email':field==='phone'?'tel':'text'}
                  placeholder={field==='name'?'Full name':field==='phone'?'Phone number':'Email address (optional)'}
                  value={data[field]} onChange={e=>set(field,e.target.value)}
                  style={inputStyle}
                  onFocus={e=>e.currentTarget.style.borderColor='var(--amber-btn)'}
                  onBlur={e=>e.currentTarget.style.borderColor='var(--bdr)'}
                />
              ))}
            </div>
            {error&&<p style={{ fontFamily:'var(--font-barlow)', fontSize:'0.82rem', color:'var(--red)', margin:'0.5rem 0' }}>{error}</p>}
            <div style={{ display:'flex', gap:'0.6rem' }}>
              <button onClick={()=>setStep(3)} style={{ ...backBtn, marginTop:'1.2rem' }}>← Back</button>
              <button onClick={submit} disabled={submitting||!data.name||!data.phone} style={{ ...nextBtn(!submitting&&!!(data.name&&data.phone)), flex:1 }}>
                {submitting?'SENDING...':'GET MY FREE QUOTES →'}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Trust footer */}
      <div style={{ borderTop:'1px solid var(--bdr)', padding:'1rem 2rem', display:'flex', gap:'1.2rem', flexWrap:'wrap', background:'var(--bg3)' }}>
        {[{icon:'🔒',text:'256-bit secure'},{icon:'🚫',text:'No spam, ever'},{icon:'✓',text:'CCB-verified contractors'}].map(({icon,text})=>(
          <div key={text} style={{ display:'flex', alignItems:'center', gap:'0.35rem' }}>
            <span style={{ fontSize:'0.8rem' }}>{icon}</span>
            <span style={{ fontFamily:'var(--font-barlow)', fontSize:'0.72rem', color:'var(--muted)' }}>{text}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
