// TopBar.jsx — Netchex Top Navigation Bar (FA7 Pro icons)

function TopBar({ onToggleSidebar }) {
  const topBarStyles = {
    bar: {
      height: 52, background: '#fff', borderBottom: '1px solid #e5e7eb',
      display: 'flex', alignItems: 'center', padding: '0 16px', gap: 10, flexShrink: 0,
    },
    hamburger: {
      width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center',
      cursor: 'pointer', borderRadius: 4, color: '#647488', fontSize: 16,
      border: 'none', background: 'transparent', flexShrink: 0,
    },
    companyPill: {
      display: 'flex', alignItems: 'center', gap: 6,
      fontSize: 12, fontWeight: 500, color: '#374151',
      background: '#f3f4f6', padding: '5px 10px', borderRadius: 4,
      cursor: 'pointer', whiteSpace: 'nowrap',
    },
    rolePill: {
      fontSize: 12, color: '#6b7280', background: '#fff',
      border: '1px solid #e5e7eb', padding: '4px 10px', borderRadius: 4,
      cursor: 'pointer', whiteSpace: 'nowrap', display: 'flex', alignItems: 'center', gap: 5,
    },
    searchWrap: { position: 'relative', flex: 1, maxWidth: 320 },
    searchIcon: {
      position: 'absolute', left: 8, top: '50%', transform: 'translateY(-50%)',
      color: '#9ca3af', fontSize: 13, pointerEvents: 'none',
    },
    search: {
      flex: 1, maxWidth: 320, height: 32,
      border: '1px solid #e5e7eb', borderRadius: 4,
      padding: '0 10px 0 30px', fontSize: 13, color: '#9ca3af',
      background: '#f9fafb', outline: 'none', fontFamily: 'Inter, sans-serif', width: '100%',
    },
    spacer: { flex: 1 },
    iconBtn: {
      width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center',
      borderRadius: 4, cursor: 'pointer', color: '#647488', fontSize: 15,
      border: 'none', background: 'transparent', position: 'relative',
    },
    notifDot: {
      position: 'absolute', top: 4, right: 4,
      width: 7, height: 7, borderRadius: '50%',
      background: '#dc2626', border: '1.5px solid #fff',
    },
    avatar: {
      width: 32, height: 32, borderRadius: '50%', background: '#2563eb', color: '#fff',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: 12, fontWeight: 600, cursor: 'pointer', flexShrink: 0,
    },
    iconRow: { display: 'flex', alignItems: 'center', gap: 4 },
  };

  return (
    <div style={topBarStyles.bar}>
      <div style={topBarStyles.companyPill}>
        132 · DEMO COMPANY NAME HERE
        <i className="fa-regular fa-chevron-down" style={{ fontSize: 10, color: '#9ca3af' }}></i>
      </div>
      <div style={topBarStyles.rolePill}>
        Admin
        <i className="fa-regular fa-chevron-down" style={{ fontSize: 10, color: '#9ca3af' }}></i>
      </div>
      <div style={topBarStyles.searchWrap}>
        <i className="fa-regular fa-magnifying-glass" style={topBarStyles.searchIcon}></i>
        <input style={topBarStyles.search} placeholder="Search" readOnly />
      </div>
      <div style={topBarStyles.spacer}></div>
      <div style={topBarStyles.iconRow}>
        <button style={topBarStyles.iconBtn} title="Announcements">
          <i className="fa-regular fa-bullhorn"></i>
        </button>
        <button style={topBarStyles.iconBtn} title="Notifications" style={{ ...topBarStyles.iconBtn }}>
          <i className="fa-regular fa-bell"></i>
          <span style={topBarStyles.notifDot}></span>
        </button>
        <button style={topBarStyles.iconBtn} title="Chat">
          <i className="fa-regular fa-message"></i>
        </button>
        <button style={topBarStyles.iconBtn} title="Help">
          <i className="fa-regular fa-circle-question"></i>
        </button>
        <div style={topBarStyles.avatar}>JD</div>
      </div>
    </div>
  );
}

Object.assign(window, { TopBar });
