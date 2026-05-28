// ProductGraphics.jsx, Per-product hero graphics for Product Discovery
// One graphic per product, each a clean Netchex-brand UI mockup of the feature.
// All use the same aspect ratio + frame so they sit consistently in the hero.

// ─── Shared frame ───────────────────────────────────────────
function GraphicFrame({ children, bg = 'linear-gradient(135deg, #eff6ff 0%, #f0fdfa 100%)' }) {
  return (
    <div style={{
      position: 'relative', borderRadius: 14, overflow: 'hidden',
      boxShadow: '0 20px 40px -16px rgba(15, 23, 42, 0.35), 0 4px 12px -4px rgba(15, 23, 42, 0.12)',
      border: '1px solid rgba(255,255,255,0.6)',
      aspectRatio: '16 / 11', background: bg,
      padding: 24, display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      {/* subtle dot grid */}
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.4 }}>
        <defs>
          <pattern id="pg-dots" x="0" y="0" width="18" height="18" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="0.8" fill="#1e3a8a" opacity="0.12" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#pg-dots)" />
      </svg>
      <div style={{ position: 'relative', width: '100%', maxWidth: 420 }}>
        {children}
      </div>
    </div>
  );
}

const cardBase = {
  background: '#fff', borderRadius: 12,
  border: '1px solid #e5e7eb',
  boxShadow: '0 10px 24px -10px rgba(15, 23, 42, 0.18)',
  fontFamily: "'Inter', sans-serif",
};

// ─── 01 · 401(k), Retirement balance + contribution ───────
function G_401k() {
  return (
    <GraphicFrame bg="linear-gradient(135deg, #eff6ff 0%, #f0fdfa 100%)">
      <div style={{ ...cardBase, padding: 22 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
          <div style={{ width: 36, height: 36, borderRadius: 8, background: '#eff6ff', color: '#2563eb', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>
            <i className="fa-solid fa-piggy-bank"></i>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 11, color: '#6b7280', fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase' }}>Retirement Balance</div>
            <div style={{ fontSize: 11, color: '#9ca3af' }}>Netchex 401(k)</div>
          </div>
          <span style={{ fontSize: 10, fontWeight: 700, color: '#15803d', background: '#dcfce7', padding: '3px 8px', borderRadius: 999 }}>SYNCED</span>
        </div>
        <div style={{ fontSize: 32, fontWeight: 700, color: '#111827', letterSpacing: '-0.02em', fontVariantNumeric: 'tabular-nums' }}>$48,210<span style={{ fontSize: 18, color: '#6b7280', fontWeight: 500 }}>.55</span></div>
        <div style={{ fontSize: 11, color: '#15803d', fontWeight: 600, marginBottom: 16 }}>
          <i className="fa-solid fa-arrow-trend-up" style={{ marginRight: 5 }}></i>
          +$842 this pay period
        </div>

        <div style={{ borderTop: '1px solid #f3f4f6', paddingTop: 12 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
            <span style={{ fontSize: 11, color: '#6b7280' }}>Employer match · 100% up to 4%</span>
            <span style={{ fontSize: 11, color: '#0d9488', fontWeight: 700 }}>4 of 4%</span>
          </div>
          <div style={{ height: 6, background: '#f0fdfa', borderRadius: 999, overflow: 'hidden' }}>
            <div style={{ width: '100%', height: '100%', background: 'linear-gradient(90deg, #0d9488, #14b8a6)', borderRadius: 999 }}></div>
          </div>
        </div>
      </div>

      {/* floating contribution pill */}
      <div style={{
        position: 'absolute', top: -8, right: -10,
        ...cardBase, padding: '8px 12px', display: 'flex', alignItems: 'center', gap: 7,
      }}>
        <i className="fa-solid fa-arrows-rotate" style={{ color: '#2563eb', fontSize: 11 }}></i>
        <div>
          <div style={{ fontSize: 9, color: '#9ca3af', fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase' }}>Payroll → Provider</div>
          <div style={{ fontSize: 12, fontWeight: 700, color: '#111827' }}>$210 · Auto-synced</div>
        </div>
      </div>
    </GraphicFrame>
  );
}

// ─── 02 · Benefits Administration ──────────────────────────
function G_Benefits() {
  const plans = [
    { name: 'Medical · BCBS PPO',      cost: '$184/pay', sel: true },
    { name: 'Dental · MetLife',         cost: '$22/pay',  sel: true },
    { name: 'Vision · VSP Choice',      cost: '$8/pay',   sel: true },
    { name: 'HSA · $1,200 employer',    cost: '$50/pay',  sel: false },
  ];
  return (
    <GraphicFrame bg="linear-gradient(135deg, #f0fdfa 0%, #eff6ff 100%)">
      <div style={{ ...cardBase, padding: 20 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
          <div>
            <div style={{ fontSize: 11, color: '#9ca3af', fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase' }}>Open Enrollment</div>
            <div style={{ fontSize: 16, fontWeight: 700, color: '#111827' }}>2026 Benefits</div>
          </div>
          <span style={{ fontSize: 10, fontWeight: 700, color: '#1d4ed8', background: '#eff6ff', padding: '4px 9px', borderRadius: 999 }}>STEP 2 of 4</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {plans.map((p, i) => (
            <div key={i} style={{
              display: 'flex', alignItems: 'center', gap: 10,
              padding: '10px 12px', borderRadius: 8,
              border: `1.5px solid ${p.sel ? '#0d9488' : '#e5e7eb'}`,
              background: p.sel ? '#f0fdfa' : '#fff',
            }}>
              <div style={{
                width: 18, height: 18, borderRadius: '50%',
                background: p.sel ? '#0d9488' : '#fff',
                border: `2px solid ${p.sel ? '#0d9488' : '#d1d5db'}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                {p.sel && <i className="fa-solid fa-check" style={{ color: '#fff', fontSize: 9 }}></i>}
              </div>
              <span style={{ flex: 1, fontSize: 12, fontWeight: p.sel ? 600 : 500, color: p.sel ? '#0f766e' : '#374151' }}>{p.name}</span>
              <span style={{ fontSize: 11, color: p.sel ? '#0f766e' : '#9ca3af', fontWeight: 600, fontVariantNumeric: 'tabular-nums' }}>{p.cost}</span>
            </div>
          ))}
        </div>

        <div style={{ borderTop: '1px solid #f3f4f6', marginTop: 12, paddingTop: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: 11, color: '#6b7280' }}>Paycheck impact</span>
          <span style={{ fontSize: 14, fontWeight: 700, color: '#111827', fontVariantNumeric: 'tabular-nums' }}>−$214/pay</span>
        </div>
      </div>
    </GraphicFrame>
  );
}

// ─── 03 · Recruit ───────────────────────────────────────────
function G_Recruit() {
  return (
    <GraphicFrame bg="linear-gradient(135deg, #eff6ff 0%, #ecfdf5 100%)">
      <div style={{ ...cardBase, padding: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
          <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'linear-gradient(135deg, #2563eb, #0d9488)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 14, fontWeight: 700 }}>JR</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: '#111827' }}>Jordan Reyes</div>
            <div style={{ fontSize: 11, color: '#6b7280' }}>Line Cook · 2.3 miles · Available immediately</div>
          </div>
          <div style={{
            padding: '8px 12px', borderRadius: 8,
            background: 'linear-gradient(135deg, #16a34a, #0d9488)',
            color: '#fff', textAlign: 'center', minWidth: 56,
          }}>
            <div style={{ fontSize: 18, fontWeight: 800, lineHeight: 1, fontVariantNumeric: 'tabular-nums' }}>94</div>
            <div style={{ fontSize: 8, fontWeight: 700, letterSpacing: '0.08em' }}>SCORE</div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 6, marginBottom: 14, flexWrap: 'wrap' }}>
          {['3 yrs experience', 'Open weekends', 'Reliable transport'].map(t => (
            <span key={t} style={{ fontSize: 10, fontWeight: 600, color: '#15803d', background: '#dcfce7', padding: '3px 7px', borderRadius: 4 }}>
              <i className="fa-solid fa-check" style={{ fontSize: 8, marginRight: 4 }}></i>{t}
            </span>
          ))}
        </div>

        <div style={{ background: '#f8fafc', borderRadius: 8, padding: 10, display: 'flex', alignItems: 'center', gap: 10, border: '1px solid #f1f5f9' }}>
          <div style={{ width: 26, height: 26, borderRadius: 6, background: '#dbeafe', color: '#1d4ed8', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12 }}>
            <i className="fa-solid fa-robot"></i>
          </div>
          <div style={{ flex: 1, fontSize: 11, color: '#374151' }}>
            <strong>NextMatch AI:</strong> Strong fit · interview completed
          </div>
          <i className="fa-solid fa-play" style={{ color: '#2563eb', fontSize: 11 }}></i>
        </div>
      </div>

      <div style={{
        position: 'absolute', top: -10, right: -8,
        ...cardBase, padding: '6px 10px', display: 'flex', alignItems: 'center', gap: 6,
      }}>
        <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#16a34a' }}></span>
        <span style={{ fontSize: 11, fontWeight: 600, color: '#111827' }}>12 new candidates today</span>
      </div>
    </GraphicFrame>
  );
}

// ─── 04 · Onboarding ────────────────────────────────────────
function G_Onboarding() {
  const tasks = [
    { label: 'I-9 Verification',         done: true },
    { label: 'W-4 Tax Form',             done: true },
    { label: 'Direct Deposit Setup',     done: true },
    { label: 'Benefits Election',        done: false, active: true },
    { label: 'Employee Handbook',        done: false },
  ];
  return (
    <GraphicFrame bg="linear-gradient(135deg, #fff7ed 0%, #eff6ff 100%)">
      <div style={{ ...cardBase, padding: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
          <div style={{ width: 36, height: 36, borderRadius: 8, background: '#eff6ff', color: '#2563eb', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 15 }}>
            <i className="fa-solid fa-clipboard-check"></i>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#111827' }}>Welcome, Maria</div>
            <div style={{ fontSize: 11, color: '#6b7280' }}>Onboarding · Day 1 of 1</div>
          </div>
          <div style={{ fontSize: 12, fontWeight: 700, color: '#0d9488', fontVariantNumeric: 'tabular-nums' }}>3/5</div>
        </div>

        <div style={{ height: 6, background: '#f3f4f6', borderRadius: 999, overflow: 'hidden', marginBottom: 16 }}>
          <div style={{ width: '60%', height: '100%', background: 'linear-gradient(90deg, #2563eb, #0d9488)', borderRadius: 999 }}></div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
          {tasks.map((t, i) => (
            <div key={i} style={{
              display: 'flex', alignItems: 'center', gap: 10,
              padding: '7px 10px', borderRadius: 6,
              background: t.active ? '#eff6ff' : 'transparent',
              border: t.active ? '1px solid #bfdbfe' : '1px solid transparent',
            }}>
              <div style={{
                width: 18, height: 18, borderRadius: '50%',
                background: t.done ? '#0d9488' : t.active ? '#fff' : '#fff',
                border: t.done ? 'none' : `2px solid ${t.active ? '#2563eb' : '#d1d5db'}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
              }}>
                {t.done && <i className="fa-solid fa-check" style={{ color: '#fff', fontSize: 9 }}></i>}
              </div>
              <span style={{ fontSize: 12, color: t.done ? '#6b7280' : '#111827', fontWeight: t.active ? 600 : 500, textDecoration: t.done ? 'line-through' : 'none' }}>{t.label}</span>
              {t.active && <span style={{ marginLeft: 'auto', fontSize: 9, fontWeight: 700, color: '#1d4ed8', background: '#dbeafe', padding: '2px 6px', borderRadius: 4 }}>NOW</span>}
            </div>
          ))}
        </div>
      </div>
    </GraphicFrame>
  );
}

// ─── 05 · Flex Pay ──────────────────────────────────────────
function G_FlexPay() {
  return (
    <GraphicFrame bg="linear-gradient(135deg, #ecfdf5 0%, #eff6ff 100%)">
      <div style={{ ...cardBase, padding: 22, background: 'linear-gradient(135deg, #ffffff 0%, #f0fdfa 100%)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
          <i className="fa-solid fa-bolt" style={{ color: '#f59e0b', fontSize: 12 }}></i>
          <div style={{ fontSize: 11, fontWeight: 700, color: '#0f766e', letterSpacing: '0.04em', textTransform: 'uppercase' }}>Available to access</div>
        </div>
        <div style={{ fontSize: 38, fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em', fontVariantNumeric: 'tabular-nums', lineHeight: 1 }}>
          $428<span style={{ fontSize: 20, color: '#0f766e', fontWeight: 600 }}>.50</span>
        </div>
        <div style={{ fontSize: 11, color: '#6b7280', marginTop: 4, marginBottom: 18 }}>
          Earned through Mar 18 · Next payday Mar 22
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
          <button style={{
            padding: '11px 12px', borderRadius: 8, border: 'none',
            background: '#0d9488', color: '#fff',
            fontFamily: 'inherit', fontSize: 12, fontWeight: 700,
            display: 'flex', flexDirection: 'column', gap: 2, alignItems: 'flex-start',
          }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
              <i className="fa-solid fa-bolt"></i> Instant
            </span>
            <span style={{ fontSize: 10, fontWeight: 500, opacity: 0.85 }}>$4.99 · Minutes</span>
          </button>
          <button style={{
            padding: '11px 12px', borderRadius: 8, border: '1px solid #d1d5db',
            background: '#fff', color: '#374151',
            fontFamily: 'inherit', fontSize: 12, fontWeight: 700,
            display: 'flex', flexDirection: 'column', gap: 2, alignItems: 'flex-start',
          }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
              <i className="fa-solid fa-building-columns"></i> Standard
            </span>
            <span style={{ fontSize: 10, fontWeight: 500, color: '#16a34a' }}>FREE · 1-2 days</span>
          </button>
        </div>
      </div>

      <div style={{
        position: 'absolute', bottom: -10, left: 8,
        ...cardBase, padding: '6px 12px', display: 'flex', alignItems: 'center', gap: 7,
      }}>
        <span style={{ fontSize: 9, fontWeight: 800, color: '#15803d', background: '#dcfce7', padding: '2px 6px', borderRadius: 3 }}>$0</span>
        <span style={{ fontSize: 11, fontWeight: 600, color: '#374151' }}>Cost to employer</span>
      </div>
    </GraphicFrame>
  );
}

// ─── 06 · Hardware Clocks ───────────────────────────────────
function G_Clocks() {
  return (
    <GraphicFrame bg="linear-gradient(135deg, #f1f5f9 0%, #eff6ff 100%)">
      <div style={{
        ...cardBase, padding: 0, background: '#0f172a', color: '#fff', overflow: 'hidden',
      }}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid rgba(255,255,255,0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 28, height: 28, borderRadius: 6, background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12 }}>
              <i className="fa-solid fa-clock"></i>
            </div>
            <div style={{ fontSize: 12, fontWeight: 600 }}>Terminal · Kitchen</div>
          </div>
          <span style={{ fontSize: 10, fontWeight: 700, color: '#86efac', background: 'rgba(34,197,94,0.15)', padding: '3px 8px', borderRadius: 999, display: 'flex', alignItems: 'center', gap: 5 }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#22c55e' }}></span>
            ONLINE
          </span>
        </div>

        <div style={{ padding: '22px 20px', textAlign: 'center' }}>
          <div style={{ fontSize: 36, fontWeight: 700, fontVariantNumeric: 'tabular-nums', lineHeight: 1, letterSpacing: '-0.02em' }}>
            7:42<span style={{ fontSize: 20, opacity: 0.7 }}>:18 AM</span>
          </div>
          <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.6)', marginTop: 4 }}>Wednesday · Mar 19, 2026</div>
        </div>

        <div style={{ padding: '0 20px 20px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 64, height: 64, borderRadius: '50%',
            background: 'linear-gradient(135deg, #2563eb, #0d9488)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 28, boxShadow: '0 0 0 6px rgba(37,99,235,0.18)',
          }}>
            <i className="fa-solid fa-fingerprint"></i>
          </div>
          <div style={{ fontSize: 11, fontWeight: 600, color: '#bfdbfe' }}>Place finger to clock in</div>
        </div>
      </div>

      <div style={{
        position: 'absolute', top: -8, right: -10,
        ...cardBase, padding: '6px 10px', display: 'flex', alignItems: 'center', gap: 6,
      }}>
        <i className="fa-solid fa-check-circle" style={{ color: '#16a34a', fontSize: 11 }}></i>
        <span style={{ fontSize: 11, fontWeight: 600, color: '#111827' }}>Maria Chen · 7:38 AM</span>
      </div>
    </GraphicFrame>
  );
}

// ─── 07 · AskHR ─────────────────────────────────────────────
function G_AskHR() {
  return (
    <GraphicFrame bg="linear-gradient(135deg, #eef2ff 0%, #f0fdfa 100%)">
      <div style={{ ...cardBase, padding: 18 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14, paddingBottom: 12, borderBottom: '1px solid #f3f4f6' }}>
          <div style={{ width: 32, height: 32, borderRadius: 8, background: 'linear-gradient(135deg, #6366f1, #2563eb)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13 }}>
            <i className="fa-solid fa-sparkles"></i>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#111827' }}>AskHR</div>
            <div style={{ fontSize: 10, color: '#6b7280', display: 'flex', alignItems: 'center', gap: 5 }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#16a34a' }}></span>
              Online · grounded in your company docs
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {/* user msg */}
          <div style={{ alignSelf: 'flex-end', maxWidth: '78%', background: '#2563eb', color: '#fff', padding: '9px 13px', borderRadius: '14px 14px 4px 14px', fontSize: 12, lineHeight: 1.4 }}>
            How much PTO do I have left for 2026?
          </div>
          {/* ai msg */}
          <div style={{ alignSelf: 'flex-start', maxWidth: '85%', background: '#f3f4f6', color: '#111827', padding: '10px 13px', borderRadius: '14px 14px 14px 4px', fontSize: 12, lineHeight: 1.45 }}>
            You have <strong>62.5 hours</strong> of PTO remaining for 2026, that's about 7.8 days. Your next accrual posts on April 1.
            <div style={{ marginTop: 8, display: 'flex', gap: 6 }}>
              <button style={{ fontSize: 10, fontWeight: 600, color: '#1d4ed8', background: '#dbeafe', padding: '4px 8px', borderRadius: 4, border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}>Request time off</button>
              <button style={{ fontSize: 10, fontWeight: 600, color: '#374151', background: '#fff', padding: '4px 8px', borderRadius: 4, border: '1px solid #d1d5db', cursor: 'pointer', fontFamily: 'inherit' }}>View accruals</button>
            </div>
          </div>
        </div>

        <div style={{ marginTop: 12, padding: '8px 12px', background: '#f9fafb', borderRadius: 8, fontSize: 11, color: '#9ca3af', display: 'flex', alignItems: 'center', gap: 8 }}>
          <i className="fa-solid fa-keyboard" style={{ fontSize: 11 }}></i>
          Ask anything…
        </div>
      </div>
    </GraphicFrame>
  );
}

// ─── 08 · Scheduler ─────────────────────────────────────────
function G_Scheduler() {
  const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
  const rows = [
    { name: 'A. Chen',   color: '#2563eb', shifts: [1, 1, 0, 1, 1, 0, 0] },
    { name: 'J. Reyes',  color: '#0d9488', shifts: [0, 1, 1, 1, 0, 1, 1] },
    { name: 'M. Singh',  color: '#f59e0b', shifts: [1, 0, 1, 0, 1, 1, 0] },
    { name: 'P. Khoury', color: '#6366f1', shifts: [1, 1, 1, 0, 0, 0, 1] },
  ];
  return (
    <GraphicFrame bg="linear-gradient(135deg, #fef3c7 0%, #eff6ff 100%)">
      <div style={{ ...cardBase, padding: 18 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <div>
            <div style={{ fontSize: 11, color: '#9ca3af', fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase' }}>Week of</div>
            <div style={{ fontSize: 14, fontWeight: 700, color: '#111827' }}>Mar 16 – Mar 22</div>
          </div>
          <span style={{ fontSize: 10, fontWeight: 700, color: '#1d4ed8', background: '#dbeafe', padding: '3px 8px', borderRadius: 999 }}>PUBLISHED</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '70px repeat(7, 1fr)', gap: 4, marginBottom: 6 }}>
          <div></div>
          {days.map((d, i) => <div key={i} style={{ fontSize: 10, fontWeight: 600, color: '#6b7280', textAlign: 'center' }}>{d}</div>)}
        </div>

        {rows.map((row, ri) => (
          <div key={ri} style={{ display: 'grid', gridTemplateColumns: '70px repeat(7, 1fr)', gap: 4, marginBottom: 4 }}>
            <div style={{ fontSize: 11, color: '#374151', fontWeight: 500, paddingTop: 2 }}>{row.name}</div>
            {row.shifts.map((s, i) => (
              <div key={i} style={{
                height: 22, borderRadius: 4,
                background: s ? row.color : '#f3f4f6',
                opacity: s ? 0.92 : 1,
              }}></div>
            ))}
          </div>
        ))}

        <div style={{ borderTop: '1px solid #f3f4f6', marginTop: 10, paddingTop: 10, display: 'flex', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontSize: 10, color: '#9ca3af' }}>Projected labor</div>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#111827', fontVariantNumeric: 'tabular-nums' }}>$4,240</div>
          </div>
          <div>
            <div style={{ fontSize: 10, color: '#9ca3af' }}>vs budget</div>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#15803d', fontVariantNumeric: 'tabular-nums' }}>−$180</div>
          </div>
          <div>
            <div style={{ fontSize: 10, color: '#9ca3af' }}>Open shifts</div>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#ea580c', fontVariantNumeric: 'tabular-nums' }}>2</div>
          </div>
        </div>
      </div>
    </GraphicFrame>
  );
}

// ─── 09 · ACA Reporting ─────────────────────────────────────
function G_ACA() {
  return (
    <GraphicFrame bg="linear-gradient(135deg, #f0fdfa 0%, #fef3c7 100%)">
      <div style={{ ...cardBase, padding: 0, overflow: 'hidden' }}>
        <div style={{ background: '#0f172a', color: '#fff', padding: '12px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <i className="fa-solid fa-file-invoice" style={{ fontSize: 13 }}></i>
            <span style={{ fontSize: 12, fontWeight: 700 }}>Form 1095-C</span>
          </div>
          <span style={{ fontSize: 9, color: 'rgba(255,255,255,0.7)' }}>Tax Year 2025</span>
        </div>

        <div style={{ padding: 18 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 14 }}>
            <div>
              <div style={{ fontSize: 9, color: '#9ca3af', fontWeight: 700, letterSpacing: '0.04em', textTransform: 'uppercase' }}>Employee</div>
              <div style={{ fontSize: 12, fontWeight: 600, color: '#111827' }}>Maria S. Chen</div>
            </div>
            <div>
              <div style={{ fontSize: 9, color: '#9ca3af', fontWeight: 700, letterSpacing: '0.04em', textTransform: 'uppercase' }}>SSN</div>
              <div style={{ fontSize: 12, fontWeight: 600, color: '#111827', fontVariantNumeric: 'tabular-nums' }}>•••-••-4218</div>
            </div>
          </div>

          <div style={{ background: '#f9fafb', borderRadius: 8, padding: 10, marginBottom: 12 }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 4 }}>
              {['J', 'F', 'M', 'A', 'M', 'J'].map((m, i) => (
                <div key={i} style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: 8, color: '#9ca3af', marginBottom: 2 }}>{m}</div>
                  <div style={{ height: 20, background: '#dcfce7', borderRadius: 3, color: '#15803d', fontSize: 9, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>1A</div>
                </div>
              ))}
            </div>
          </div>

          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '10px 12px', borderRadius: 8,
            background: '#ecfdf5', border: '1px solid #bbf7d0',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <i className="fa-solid fa-check-circle" style={{ color: '#16a34a', fontSize: 16 }}></i>
              <div>
                <div style={{ fontSize: 12, fontWeight: 700, color: '#15803d' }}>E-filed with IRS</div>
                <div style={{ fontSize: 10, color: '#15803d', opacity: 0.8 }}>Confirmation #AC-22041893</div>
              </div>
            </div>
            <span style={{ fontSize: 10, fontWeight: 600, color: '#15803d' }}>Jan 28</span>
          </div>
        </div>
      </div>
    </GraphicFrame>
  );
}

// ─── 10 · Employee Navigator ────────────────────────────────
function G_Navigator() {
  return (
    <GraphicFrame bg="linear-gradient(135deg, #eff6ff 0%, #f0fdfa 100%)">
      <div style={{ display: 'flex', alignItems: 'center', gap: 0, position: 'relative' }}>
        {/* Left card */}
        <div style={{ ...cardBase, padding: 14, flex: 1, zIndex: 2 }}>
          <div style={{ fontSize: 10, color: '#6b7280', fontWeight: 700, letterSpacing: '0.04em', textTransform: 'uppercase', marginBottom: 8 }}>Employee Navigator</div>
          <div style={{ fontSize: 13, fontWeight: 700, color: '#111827', marginBottom: 10 }}>Enrollment Elections</div>
          {[
            { l: 'Medical', v: 'BCBS PPO',   d: '$184.00' },
            { l: 'Dental',  v: 'MetLife',    d: '$22.00' },
            { l: 'Vision',  v: 'VSP Choice', d: '$8.00' },
          ].map((r, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '6px 0', borderBottom: i < 2 ? '1px solid #f3f4f6' : 'none' }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 10, color: '#9ca3af' }}>{r.l}</div>
                <div style={{ fontSize: 11, fontWeight: 600, color: '#111827' }}>{r.v}</div>
              </div>
              <div style={{ fontSize: 11, fontWeight: 700, color: '#374151', fontVariantNumeric: 'tabular-nums' }}>{r.d}</div>
            </div>
          ))}
        </div>

        {/* Connector */}
        <div style={{
          width: 56, position: 'relative', display: 'flex', flexDirection: 'column',
          alignItems: 'center', gap: 4, zIndex: 1,
        }}>
          <div style={{ position: 'absolute', left: 0, right: 0, top: '50%', height: 2, background: 'repeating-linear-gradient(90deg, #2563eb 0, #2563eb 4px, transparent 4px, transparent 8px)' }}></div>
          <div style={{
            width: 32, height: 32, borderRadius: '50%',
            background: 'linear-gradient(135deg, #2563eb, #0d9488)',
            color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 13, boxShadow: '0 4px 12px -2px rgba(37,99,235,0.4)', position: 'relative', zIndex: 2,
          }}>
            <i className="fa-solid fa-arrows-rotate"></i>
          </div>
        </div>

        {/* Right card */}
        <div style={{ ...cardBase, padding: 14, flex: 1, zIndex: 2 }}>
          <div style={{ fontSize: 10, color: '#6b7280', fontWeight: 700, letterSpacing: '0.04em', textTransform: 'uppercase', marginBottom: 8 }}>Netchex Payroll</div>
          <div style={{ fontSize: 13, fontWeight: 700, color: '#111827', marginBottom: 10 }}>Deductions Updated</div>
          {[
            { l: 'Medical pre-tax',  d: '$184.00', sync: true },
            { l: 'Dental pre-tax',   d: '$22.00',  sync: true },
            { l: 'Vision pre-tax',   d: '$8.00',   sync: true },
          ].map((r, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '6px 0', borderBottom: i < 2 ? '1px solid #f3f4f6' : 'none' }}>
              <i className="fa-solid fa-check-circle" style={{ color: '#16a34a', fontSize: 11 }}></i>
              <div style={{ flex: 1, fontSize: 11, color: '#111827', fontWeight: 500 }}>{r.l}</div>
              <div style={{ fontSize: 11, fontWeight: 700, color: '#0f766e', fontVariantNumeric: 'tabular-nums' }}>{r.d}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{
        position: 'absolute', bottom: -8, left: '50%', transform: 'translateX(-50%)',
        ...cardBase, padding: '5px 12px', display: 'flex', alignItems: 'center', gap: 6,
      }}>
        <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#16a34a' }}></span>
        <span style={{ fontSize: 11, fontWeight: 600, color: '#374151' }}>Synced 12 seconds ago</span>
      </div>
    </GraphicFrame>
  );
}

// ─── 11 · Conversations ─────────────────────────────────────
function G_Conversations() {
  return (
    <GraphicFrame bg="linear-gradient(135deg, #eff6ff 0%, #eef2ff 100%)">
      <div style={{ ...cardBase, padding: 0, overflow: 'hidden' }}>
        <div style={{ padding: '12px 16px', borderBottom: '1px solid #f3f4f6', display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 32, height: 32, borderRadius: 8, background: '#eff6ff', color: '#2563eb', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13 }}>
            <i className="fa-solid fa-hashtag"></i>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#111827' }}>day-shift-loc-3</div>
            <div style={{ fontSize: 10, color: '#6b7280' }}>14 members · auto-managed</div>
          </div>
          <span style={{ fontSize: 9, fontWeight: 700, color: '#0f766e', background: '#ccfbf1', padding: '3px 7px', borderRadius: 999 }}>RULE-BASED</span>
        </div>

        <div style={{ padding: 14, display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{ display: 'flex', gap: 8 }}>
            <div style={{ width: 28, height: 28, borderRadius: '50%', background: '#fb923c', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, flexShrink: 0 }}>AC</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 11, fontWeight: 600, color: '#111827' }}>Alex Chen <span style={{ color: '#9ca3af', fontWeight: 400, marginLeft: 4 }}>7:42 AM</span></div>
              <div style={{ fontSize: 12, color: '#374151', marginTop: 2 }}>Schedule for next week is up, please confirm by EOD Friday 👍</div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: 8 }}>
            <div style={{ width: 28, height: 28, borderRadius: '50%', background: '#0d9488', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, flexShrink: 0 }}>JR</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 11, fontWeight: 600, color: '#111827' }}>Jordan Reyes <span style={{ color: '#9ca3af', fontWeight: 400, marginLeft: 4 }}>7:45 AM</span></div>
              <div style={{ fontSize: 12, color: '#374151', marginTop: 2 }}>Confirmed ✓ Can I swap Sat with Maria?</div>
            </div>
          </div>

          <div style={{ background: '#eff6ff', borderRadius: 8, padding: '8px 12px', display: 'flex', alignItems: 'center', gap: 8 }}>
            <i className="fa-solid fa-bullhorn" style={{ color: '#2563eb', fontSize: 11 }}></i>
            <div style={{ flex: 1, fontSize: 11, color: '#1d4ed8', fontWeight: 600 }}>14 of 14 members read this</div>
          </div>
        </div>
      </div>
    </GraphicFrame>
  );
}

// ─── 12 · Surveys ───────────────────────────────────────────
function G_Surveys() {
  return (
    <GraphicFrame bg="linear-gradient(135deg, #fef3c7 0%, #f0fdfa 100%)">
      <div style={{ ...cardBase, padding: 18 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
          <div>
            <div style={{ fontSize: 11, color: '#9ca3af', fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase' }}>Pulse Survey</div>
            <div style={{ fontSize: 14, fontWeight: 700, color: '#111827' }}>Q1 Engagement Check</div>
          </div>
          <span style={{ fontSize: 10, fontWeight: 700, color: '#15803d', background: '#dcfce7', padding: '3px 8px', borderRadius: 999 }}>87% RESPONSE</span>
        </div>

        <div style={{ marginBottom: 14 }}>
          <div style={{ fontSize: 12, color: '#374151', marginBottom: 10, fontWeight: 500 }}>How supported do you feel by your manager?</div>
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: 6 }}>
            {[
              { emoji: '😞', v: 8,  c: '#fee2e2' },
              { emoji: '😐', v: 14, c: '#fef3c7' },
              { emoji: '🙂', v: 32, c: '#fef9c3' },
              { emoji: '😊', v: 58, c: '#dcfce7' },
              { emoji: '😍', v: 42, c: '#ccfbf1', sel: true },
            ].map((b, i) => (
              <div key={i} style={{ flex: 1, textAlign: 'center' }}>
                <div style={{
                  height: `${30 + b.v}px`, background: b.c, borderRadius: '6px 6px 0 0',
                  border: b.sel ? '2px solid #0d9488' : '1px solid transparent',
                  display: 'flex', alignItems: 'flex-start', justifyContent: 'center', paddingTop: 4,
                  fontSize: 11, fontWeight: 700, color: '#374151',
                }}>{b.v}</div>
                <div style={{ fontSize: 14, marginTop: 4 }}>{b.emoji}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{
          background: '#fef2f2', borderRadius: 8, padding: '10px 12px',
          display: 'flex', alignItems: 'center', gap: 10, border: '1px solid #fecaca',
        }}>
          <div style={{ width: 28, height: 28, borderRadius: 6, background: '#fca5a5', color: '#7f1d1d', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13 }}>
            <i className="fa-solid fa-triangle-exclamation"></i>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#991b1b' }}>AI Flight Risk Alert</div>
            <div style={{ fontSize: 10, color: '#b91c1c' }}>3 high performers showing disengagement patterns</div>
          </div>
        </div>
      </div>
    </GraphicFrame>
  );
}

// ─── 13 · Mineral ───────────────────────────────────────────
function G_Mineral() {
  return (
    <GraphicFrame bg="linear-gradient(135deg, #eef2ff 0%, #eff6ff 100%)">
      <div style={{ ...cardBase, padding: 18 }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 10,
          padding: '10px 14px', background: '#f9fafb', borderRadius: 999, border: '1px solid #e5e7eb', marginBottom: 14,
        }}>
          <i className="fa-solid fa-magnifying-glass" style={{ color: '#9ca3af', fontSize: 12 }}></i>
          <span style={{ flex: 1, fontSize: 12, color: '#374151' }}>What's California's PSL requirement in 2026?</span>
          <i className="fa-solid fa-sparkles" style={{ color: '#6366f1', fontSize: 11 }}></i>
        </div>

        <div style={{ background: '#eef2ff', borderRadius: 8, padding: 12, marginBottom: 10, border: '1px solid #c7d2fe' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
            <div style={{ width: 22, height: 22, borderRadius: 5, background: 'linear-gradient(135deg, #6366f1, #4338ca)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10 }}>
              <i className="fa-solid fa-robot"></i>
            </div>
            <span style={{ fontSize: 11, fontWeight: 700, color: '#4338ca' }}>AI HR Advisor</span>
          </div>
          <div style={{ fontSize: 12, color: '#1e1b4b', lineHeight: 1.5 }}>
            California requires <strong>5 days or 40 hours</strong> of paid sick leave per year as of Jan 1, 2024 (SB 616). Accrual at 1 hr per 30 hrs worked.
          </div>
        </div>

        <div style={{ display: 'flex', gap: 6 }}>
          {[
            { ic: 'fa-book',   t: '142 sources' },
            { ic: 'fa-scale-balanced', t: 'CA Labor Code' },
            { ic: 'fa-shield-check', t: 'Verified Mar 2026' },
          ].map((tag, i) => (
            <span key={i} style={{ fontSize: 9, fontWeight: 600, color: '#475569', background: '#f1f5f9', padding: '4px 8px', borderRadius: 4, display: 'inline-flex', alignItems: 'center', gap: 5 }}>
              <i className={`fa-solid ${tag.ic}`} style={{ fontSize: 9 }}></i>
              {tag.t}
            </span>
          ))}
        </div>
      </div>

      <div style={{
        position: 'absolute', top: -8, right: -10,
        ...cardBase, padding: '6px 10px', display: 'flex', alignItems: 'center', gap: 6,
      }}>
        <i className="fa-solid fa-headset" style={{ color: '#6366f1', fontSize: 11 }}></i>
        <span style={{ fontSize: 11, fontWeight: 600, color: '#111827' }}>Expert hotline available</span>
      </div>
    </GraphicFrame>
  );
}

// ─── 14 · Rewards & Recognition ─────────────────────────────
function G_Recognition() {
  return (
    <GraphicFrame bg="linear-gradient(135deg, #fff7ed 0%, #fef3c7 100%)">
      <div style={{ ...cardBase, padding: 0, overflow: 'hidden' }}>
        <div style={{ background: 'linear-gradient(135deg, #f59e0b 0%, #ea580c 100%)', padding: '14px 18px', color: '#fff', position: 'relative' }}>
          {/* mini confetti */}
          {[
            { x: 12, y: 14, c: '#fef3c7' }, { x: 35, y: 8, c: '#fff' },
            { x: 88, y: 16, c: '#fde68a' }, { x: 60, y: 6, c: '#fff' },
            { x: 78, y: 32, c: '#fbbf24' },
          ].map((d, i) => (
            <span key={i} style={{ position: 'absolute', left: `${d.x}%`, top: d.y, width: 5, height: 5, borderRadius: '50%', background: d.c, opacity: 0.7 }}></span>
          ))}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, position: 'relative' }}>
            <i className="fa-solid fa-trophy" style={{ fontSize: 14 }}></i>
            <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.04em', textTransform: 'uppercase' }}>Kudos posted to #team-east</div>
          </div>
        </div>

        <div style={{ padding: 18 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
            <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'linear-gradient(135deg, #fb923c, #ea580c)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 700 }}>MC</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#111827' }}>Maria Chen</div>
              <div style={{ fontSize: 11, color: '#6b7280' }}>30-day attendance streak 🔥</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: 16, fontWeight: 800, color: '#ea580c', lineHeight: 1, fontVariantNumeric: 'tabular-nums' }}>+250</div>
              <div style={{ fontSize: 9, fontWeight: 700, color: '#9ca3af', letterSpacing: '0.06em' }}>POINTS</div>
            </div>
          </div>

          <div style={{ borderTop: '1px dashed #e5e7eb', paddingTop: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', gap: -6 }}>
              {['☕', '🎁', '🛒'].map((e, i) => (
                <div key={i} style={{
                  width: 32, height: 32, borderRadius: 8, background: '#fff',
                  border: '1px solid #fed7aa',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14,
                  marginLeft: i === 0 ? 0 : -8, boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
                }}>{e}</div>
              ))}
            </div>
            <button style={{
              padding: '8px 14px', borderRadius: 6, border: 'none',
              background: '#ea580c', color: '#fff',
              fontFamily: 'inherit', fontSize: 11, fontWeight: 700,
              display: 'inline-flex', alignItems: 'center', gap: 6, cursor: 'pointer',
            }}>
              <i className="fa-solid fa-gift" style={{ fontSize: 10 }}></i>
              Redeem rewards
            </button>
          </div>
        </div>
      </div>
    </GraphicFrame>
  );
}

// ─── 15 · Learning ──────────────────────────────────────────
function G_Learning() {
  const courses = [
    { title: 'Workplace Safety',   prog: 100, hrs: '0.5 hr', color: '#0d9488', icon: 'fa-shield-halved' },
    { title: 'Harassment Prevention', prog: 65, hrs: '1.0 hr', color: '#2563eb', icon: 'fa-scale-balanced' },
    { title: 'Manager Essentials', prog: 25, hrs: '2.5 hr', color: '#f59e0b', icon: 'fa-user-tie' },
  ];
  return (
    <GraphicFrame bg="linear-gradient(135deg, #eff6ff 0%, #f0fdfa 100%)">
      <div style={{ ...cardBase, padding: 18 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <div>
            <div style={{ fontSize: 11, color: '#9ca3af', fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase' }}>My Learning</div>
            <div style={{ fontSize: 14, fontWeight: 700, color: '#111827' }}>3 courses assigned</div>
          </div>
          <span style={{ fontSize: 10, fontWeight: 700, color: '#1d4ed8', background: '#dbeafe', padding: '3px 8px', borderRadius: 999 }}>DUE APR 15</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {courses.map((c, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: 10, borderRadius: 8, border: '1px solid #f3f4f6' }}>
              <div style={{
                width: 36, height: 36, borderRadius: 8,
                background: `${c.color}15`, color: c.color,
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, flexShrink: 0,
              }}>
                <i className={`fa-solid ${c.icon}`}></i>
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: '#111827', marginBottom: 4 }}>{c.title}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{ flex: 1, height: 4, background: '#f3f4f6', borderRadius: 999, overflow: 'hidden' }}>
                    <div style={{ width: `${c.prog}%`, height: '100%', background: c.color, borderRadius: 999 }}></div>
                  </div>
                  <span style={{ fontSize: 10, fontWeight: 700, color: c.color, fontVariantNumeric: 'tabular-nums', minWidth: 30, textAlign: 'right' }}>{c.prog}%</span>
                </div>
              </div>
              {c.prog === 100 && <i className="fa-solid fa-check-circle" style={{ color: '#16a34a', fontSize: 14 }}></i>}
            </div>
          ))}
        </div>
      </div>

      <div style={{
        position: 'absolute', bottom: -8, right: -10,
        ...cardBase, padding: '6px 10px', display: 'flex', alignItems: 'center', gap: 6,
      }}>
        <i className="fa-solid fa-graduation-cap" style={{ color: '#2563eb', fontSize: 11 }}></i>
        <span style={{ fontSize: 11, fontWeight: 600, color: '#111827' }}>2,000+ courses</span>
      </div>
    </GraphicFrame>
  );
}

// ─── 16 · Perform ───────────────────────────────────────────
function G_Perform() {
  return (
    <GraphicFrame bg="linear-gradient(135deg, #eef2ff 0%, #f0fdfa 100%)">
      <div style={{ ...cardBase, padding: 18 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
          <div>
            <div style={{ fontSize: 11, color: '#9ca3af', fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase' }}>Q1 Goals · A. Chen</div>
            <div style={{ fontSize: 14, fontWeight: 700, color: '#111827' }}>On track</div>
          </div>
          <div style={{
            padding: '6px 10px', borderRadius: 999,
            background: 'linear-gradient(135deg, #6366f1, #2563eb)', color: '#fff',
            fontSize: 11, fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: 6,
          }}>
            <i className="fa-solid fa-sparkles" style={{ fontSize: 10 }}></i>
            Maven AI
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 12 }}>
          {[
            { t: 'Reduce ticket response time', v: 0.78, c: '#0d9488' },
            { t: 'Mentor 2 new team members',   v: 0.50, c: '#2563eb' },
            { t: 'Ship customer feedback loop', v: 0.92, c: '#16a34a' },
          ].map((g, i) => (
            <div key={i}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                <span style={{ fontSize: 11, color: '#374151', fontWeight: 500 }}>{g.t}</span>
                <span style={{ fontSize: 11, fontWeight: 700, color: g.c, fontVariantNumeric: 'tabular-nums' }}>{Math.round(g.v * 100)}%</span>
              </div>
              <div style={{ height: 5, background: '#f3f4f6', borderRadius: 999, overflow: 'hidden' }}>
                <div style={{ width: `${g.v * 100}%`, height: '100%', background: g.c, borderRadius: 999 }}></div>
              </div>
            </div>
          ))}
        </div>

        <div style={{
          background: '#eef2ff', borderRadius: 8, padding: '10px 12px',
          display: 'flex', alignItems: 'flex-start', gap: 10, border: '1px solid #c7d2fe',
        }}>
          <div style={{ width: 24, height: 24, borderRadius: 6, background: 'linear-gradient(135deg, #6366f1, #4338ca)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, flexShrink: 0 }}>
            <i className="fa-solid fa-lightbulb"></i>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#4338ca', marginBottom: 2 }}>Suggested 1:1 talking point</div>
            <div style={{ fontSize: 11, color: '#1e1b4b', lineHeight: 1.4 }}>Mentorship goal is behind, pair with Jordan on next sprint.</div>
          </div>
        </div>
      </div>
    </GraphicFrame>
  );
}

// ─── Router ─────────────────────────────────────────────────
const PRODUCT_GRAPHICS = {
  '401k':          G_401k,
  'benefits':      G_Benefits,
  'recruit':       G_Recruit,
  'onboarding':    G_Onboarding,
  'flexpay':       G_FlexPay,
  'clocks':        G_Clocks,
  'askhr':         G_AskHR,
  'scheduler':     G_Scheduler,
  'aca':           G_ACA,
  'navigator':     G_Navigator,
  'conversations': G_Conversations,
  'surveys':       G_Surveys,
  'mineral':       G_Mineral,
  'recognition':   G_Recognition,
  'learning':      G_Learning,
  'perform':       G_Perform,
};

function ProductGraphic({ productId }) {
  const Comp = PRODUCT_GRAPHICS[productId] || G_401k;
  return <Comp />;
}

Object.assign(window, { ProductGraphic, PRODUCT_GRAPHICS });
