// ProductDiscovery.jsx, Netchex Product Discovery / What's New page (v3)
// Now product-driven: 16 products in tabs at top, each renders the same template.
// Hero block uses HeroGraphic (animated SVG) instead of a video.

// Shared catalog of badges every product can show. Edit labels here in one place.
const BADGE_CATALOG = {
  'available':    { label: 'Available Now',         kind: 'available' },
  'included':     { label: 'Included in your plan', kind: 'included' },
  'free-addon':   { label: 'Free Add-On',           kind: 'pill', text: 'Free Add-On',   tone: 'green' },
  'add-to-plan':  { label: 'Add to your plan',      kind: 'pill', text: 'Add to your plan' },
  'new':          { label: 'NEW',                   kind: 'pill', text: 'NEW',            star: true },
  'ai-powered':   { label: 'AI-Powered',            kind: 'pill', text: 'AI-Powered',     star: true },
  'early-access': { label: 'Early Access',          kind: 'pill', text: 'Early Access',   tone: 'amber' },
  'beta':         { label: 'BETA',                  kind: 'pill', text: 'BETA',           tone: 'green' },
};
const BADGE_KEYS = Object.keys(BADGE_CATALOG);

// Default-enabled badges per product. Empty = no badges showing by default.
const DEFAULT_BADGES = {
  'flexpay':       ['free-addon'],
  'askhr':         ['free-addon'],
  'recognition':   ['free-addon'],
  'conversations': ['free-addon'],
};

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "heroTheme": "aurora",
  "showStatsBar": true,
  "showCtaFooter": true,
  "enabledBadges": {
    "flexpay":       ["free-addon"],
    "askhr":         ["free-addon"],
    "recognition":   ["free-addon"],
    "conversations": ["free-addon"]
  }
}/*EDITMODE-END*/;

const HERO_THEMES = {
  aurora:   { bg: 'linear-gradient(110deg, #3a3d7c 0%, #4d4575 30%, #6e5572 55%, #936779 80%, #b58a8a 100%)', text: '#fff', sub: 'rgba(255,255,255,0.86)', soft: 'rgba(255,255,255,0.18)', border: 'rgba(255,255,255,0.25)', ctaBg: '#fff', ctaFg: '#3a3d7c' },
  midnight: { bg: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',                                        text: '#fff', sub: 'rgba(255,255,255,0.78)', soft: 'rgba(255,255,255,0.10)', border: 'rgba(255,255,255,0.18)', ctaBg: '#2563eb', ctaFg: '#fff' },
  sand:     { bg: 'linear-gradient(135deg, #fef3c7 0%, #fef9c3 50%, #f0fdfa 100%)',                            text: '#0f172a', sub: '#475569', soft: 'rgba(15,23,42,0.06)', border: 'rgba(15,23,42,0.12)', ctaBg: '#2563eb', ctaFg: '#fff' },
};

const TINTS = {
  primary: { bg: '#eff6ff', fg: '#1d4ed8', accent: '#2563eb' },
  warning: { bg: '#fff7ed', fg: '#c2410c', accent: '#ea580c' },
  success: { bg: '#ecfdf5', fg: '#15803d', accent: '#16a34a' },
  teal:    { bg: '#f0fdfa', fg: '#0f766e', accent: '#0d9488' },
  indigo:  { bg: '#eef2ff', fg: '#4338ca', accent: '#6366f1' },
  orange:  { bg: '#fff7ed', fg: '#b45309', accent: '#f59e0b' },
};

// ─── Badge renderer (handles all 4 kinds) ───────────────────
function HeroBadge({ badge, theme }) {
  const base = {
    display: 'inline-flex', alignItems: 'center', gap: 6,
    background: theme.soft, backdropFilter: 'blur(6px)',
    color: theme.text, fontSize: 11, fontWeight: 600,
    padding: '5px 11px', borderRadius: 999, letterSpacing: '0.02em',
    border: `1px solid ${theme.border}`,
  };

  if (badge.kind === 'available') {
    return (
      <span style={base}>
        <i className="fa-solid fa-circle-check" style={{ color: theme.text === '#fff' ? '#86efac' : '#16a34a', fontSize: 12 }}></i>
        Available Now
      </span>
    );
  }
  if (badge.kind === 'included') {
    return (
      <span style={base}>
        <i className="fa-solid fa-bolt" style={{ color: theme.text === '#fff' ? '#fde68a' : '#d97706', fontSize: 11 }}></i>
        Included in your plan
      </span>
    );
  }
  // generic pill (text + optional star/tone)
  const toneColor = badge.tone === 'green' ? (theme.text === '#fff' ? '#86efac' : '#16a34a')
                   : badge.tone === 'amber' ? (theme.text === '#fff' ? '#fde68a' : '#d97706')
                   : null;
  return (
    <span style={base}>
      {badge.star && <i className="fa-solid fa-star" style={{ color: theme.text === '#fff' ? '#fde68a' : '#d97706', fontSize: 10 }}></i>}
      {toneColor && !badge.star && <span style={{ width: 7, height: 7, borderRadius: '50%', background: toneColor }}></span>}
      {badge.text}
    </span>
  );
}

// ─── Main Product Discovery page ─────────────────────────────────
function ProductDiscovery() {
  const [tabId, setTabId] = React.useState(PRODUCTS[0].id);
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  const theme = HERO_THEMES[t.heroTheme] || HERO_THEMES.aurora;
  const product = PRODUCTS.find(p => p.id === tabId) || PRODUCTS[0];

  // Which badge keys are enabled for the CURRENT product
  const enabledForProduct = (t.enabledBadges && t.enabledBadges[product.id]) || [];

  // Toggle one badge for the current product on/off
  const toggleBadge = (key) => {
    const current = enabledForProduct;
    const next = current.includes(key) ? current.filter(k => k !== key) : [...current, key];
    setTweak('enabledBadges', { ...(t.enabledBadges || {}), [product.id]: next });
  };

  return (
    <div style={{
      flex: 1, overflow: 'auto', background: '#f9fafb',
      fontFamily: "'Inter', sans-serif", color: '#111827',
    }}>
      <style>{`
        @keyframes lift { from { transform: translateY(8px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        .pd-btn-primary { background: #2563eb; color: #fff; }
        .pd-btn-primary:hover { background: #1d4ed8; box-shadow: 0 6px 16px -6px rgba(37, 99, 235, 0.45); }
        .pd-pill-row::-webkit-scrollbar { display: none; }
      `}</style>

      {/* TABS, Pill segmented control */}
      <div style={{ background: '#fff', borderBottom: '1px solid #e5e7eb', padding: '14px 28px' }}>
        <div className="pd-pill-row" style={{
          display: 'flex', gap: 4, padding: 4, background: '#f3f4f6', borderRadius: 8,
          overflowX: 'auto', scrollbarWidth: 'none',
        }}>
          {[...PRODUCTS].sort((a, b) => a.tabLabel.localeCompare(b.tabLabel)).map(p => {
            const active = tabId === p.id;
            return (
              <button key={p.id} onClick={() => setTabId(p.id)} style={{
                appearance: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit',
                padding: '8px 14px', borderRadius: 6,
                fontSize: 12.5, fontWeight: active ? 600 : 500,
                color: active ? '#111827' : '#4b5563',
                background: active ? '#fff' : 'transparent',
                boxShadow: active ? '0 1px 2px rgba(15,23,42,0.08)' : 'none',
                whiteSpace: 'nowrap', flexShrink: 0,
                transition: 'background 0.15s ease, color 0.15s ease',
              }}>
                {p.tabLabel}
              </button>
            );
          })}
        </div>
      </div>

      <div key={product.id} style={{ maxWidth: 1240, margin: '0 auto', padding: '28px 28px 56px', animation: 'lift 0.35s ease' }}>

        {/* HERO */}
        <div style={{
          position: 'relative', background: theme.bg,
          borderRadius: 16, padding: '36px 40px',
          color: theme.text, overflow: 'hidden',
          boxShadow: t.heroTheme === 'sand' ? '0 6px 20px -8px rgba(15,23,42,0.10)' : '0 20px 40px -20px rgba(37, 99, 235, 0.35)',
          border: t.heroTheme === 'sand' ? '1px solid #fde68a' : 'none',
        }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40, alignItems: 'center', position: 'relative' }}>
            {/* LEFT: copy */}
            <div>
              {/* eyebrow */}
              {product.eyebrow && (
                <div style={{
                  fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase',
                  color: theme.sub, marginBottom: 14,
                }}>
                  {product.eyebrow}
                </div>
              )}

              {/* badges, only those enabled via Tweaks for this product */}
              {enabledForProduct.length > 0 && (
                <div style={{ display: 'flex', gap: 8, marginBottom: 18, flexWrap: 'wrap' }}>
                  {enabledForProduct.map(key => (
                    <HeroBadge key={key} badge={BADGE_CATALOG[key]} theme={theme} />
                  ))}
                </div>
              )}

              <h1 style={{
                fontSize: 38, lineHeight: 1.1, fontWeight: 700, margin: '0 0 14px',
                letterSpacing: '-0.02em', textWrap: 'balance', color: theme.text,
              }}>
                {product.title}
              </h1>
              <p style={{
                fontSize: 15, lineHeight: 1.55, color: theme.sub,
                margin: '0 0 24px', maxWidth: 520, textWrap: 'pretty',
              }}>
                {product.tagline}
              </p>

              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                <button style={{
                  appearance: 'none', border: 'none', cursor: 'pointer',
                  padding: '11px 22px', borderRadius: 6, fontSize: 13, fontWeight: 600,
                  fontFamily: 'inherit', background: theme.ctaBg, color: theme.ctaFg,
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  boxShadow: '0 4px 14px -4px rgba(0,0,0,0.25)',
                }}>
                  <i className="fa-regular fa-calendar-check"></i>
                  Request Demo
                </button>
              </div>
            </div>

            {/* RIGHT: product-specific graphic */}
            <div style={{ animation: 'lift 0.5s ease' }}>
              <ProductGraphic productId={product.id} />
            </div>
          </div>
        </div>

        {/* WHAT'S INCLUDED */}
        <div style={{ marginTop: 40 }}>
          <div style={{ marginBottom: 16 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#6b7280', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 4 }}>What's Included</div>
            <h2 style={{ fontSize: 22, fontWeight: 700, margin: 0, color: '#111827', letterSpacing: '-0.01em', textWrap: 'balance' }}>
              {product.featuresTitle || `${product.features.length} capabilities, one unified experience`}
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
            {product.features.map((f, i) => {
              const tint = TINTS[f.tint] || TINTS.primary;
              return (
                <div
                  key={i}
                  style={{
                    background: '#fff', borderRadius: 12, padding: 20,
                    border: '1px solid #e5e7eb',
                    boxShadow: '0 1px 2px rgba(15, 23, 42, 0.04)',
                  }}
                >
                  <div style={{
                    width: 40, height: 40, borderRadius: 10, background: tint.bg,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: tint.fg, fontSize: 17, marginBottom: 14,
                  }}>
                    <i className={f.icon}></i>
                  </div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: '#111827', marginBottom: 6 }}>
                    {f.title}
                  </div>
                  <div style={{ fontSize: 13, color: '#4b5563', lineHeight: 1.5 }}>
                    {f.blurb}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* STATS BAR */}
        {t.showStatsBar && product.stats && (
          <div style={{
            marginTop: 40, background: '#fff', borderRadius: 12,
            border: '1px solid #e5e7eb', padding: '28px 32px',
            display: 'grid', gridTemplateColumns: '1.1fr 1px 1.6fr', gap: 32, alignItems: 'center',
          }}>
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, color: '#0d9488', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 6 }}>
                By the numbers
              </div>
              <h3 style={{ fontSize: 19, fontWeight: 700, margin: '0 0 6px', color: '#111827', letterSpacing: '-0.01em' }}>
                {product.statsTitle || `Teams using ${product.title}`}
              </h3>
              <p style={{ fontSize: 13, color: '#6b7280', margin: 0, lineHeight: 1.5 }}>
                Based on Netchex customer and industry-source data.
              </p>
            </div>

            <div style={{ width: 1, height: 80, background: '#e5e7eb', justifySelf: 'center' }}></div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
              {product.stats.map((s, i) => (
                <div key={i}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
                    <i className={s.icon} style={{ fontSize: 20, color: s.color }}></i>
                    <div style={{ fontSize: 26, fontWeight: 700, color: '#111827', lineHeight: 1, letterSpacing: '-0.01em', fontVariantNumeric: 'tabular-nums' }}>{s.v}</div>
                  </div>
                  <div style={{ fontSize: 12, color: '#6b7280' }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CTA FOOTER */}
        {t.showCtaFooter && (
          <div style={{
            marginTop: 24, background: '#fff', borderRadius: 12, border: '1px solid #e5e7eb',
            padding: '24px 32px',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24,
            flexWrap: 'wrap',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <div style={{
                width: 48, height: 48, borderRadius: 10,
                background: 'linear-gradient(135deg, #2563eb, #0d9488)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#fff', fontSize: 20, flexShrink: 0,
              }}>
                <i className="fa-regular fa-rocket"></i>
              </div>
              <div>
                <div style={{ fontSize: 16, fontWeight: 700, color: '#111827', marginBottom: 2 }}>
                  Ready to see {product.title} on your data?
                </div>
                <div style={{ fontSize: 13, color: '#6b7280' }}>
                  {product.ctaText}
                </div>
              </div>
            </div>
            <button className="pd-btn-primary" style={{
              appearance: 'none', border: 'none', cursor: 'pointer',
              padding: '10px 22px', borderRadius: 6, fontSize: 13, fontWeight: 600,
              fontFamily: 'inherit',
              display: 'inline-flex', alignItems: 'center', gap: 8,
            }}>
              <i className="fa-regular fa-calendar-check"></i>
              Request Demo
            </button>
          </div>
        )}
      </div>

      {/* TWEAKS PANEL */}
      <TweaksPanel title="Tweaks">
        <TweakSection title={`Badges \u00b7 ${product.tabLabel}`}>
          {BADGE_KEYS.map(key => (
            <TweakToggle
              key={key}
              label={BADGE_CATALOG[key].label}
              value={enabledForProduct.includes(key)}
              onChange={() => toggleBadge(key)}
            />
          ))}
        </TweakSection>

        <TweakSection title="Hero">
          <TweakRadio
            label="Theme"
            value={t.heroTheme}
            onChange={v => setTweak('heroTheme', v)}
            options={[
              { value: 'aurora',   label: 'Aurora' },
              { value: 'midnight', label: 'Midnight' },
              { value: 'sand',     label: 'Sand' },
            ]}
          />
        </TweakSection>

        <TweakSection title="Sections">
          <TweakToggle label='Show "By the numbers" stats bar' value={t.showStatsBar} onChange={v => setTweak('showStatsBar', v)} />
          <TweakToggle label='Show CTA footer' value={t.showCtaFooter} onChange={v => setTweak('showCtaFooter', v)} />
        </TweakSection>
      </TweaksPanel>
    </div>
  );
}

Object.assign(window, { ProductDiscovery });
