// NavSidebar.jsx — Netchex Left Navigation Sidebar (accordion style, FA7 Pro icons)

const NAV_STRUCTURE = [
  { id: 'people', label: 'People', icon: 'fa-regular fa-users',
    sub: [
      { id: 'people-directory', label: 'Directory' },
      { id: 'people-profiles', label: 'Employee Profiles' },
    ]
  },
  { id: 'hire', label: 'Hire', icon: 'fa-regular fa-user-plus',
    sub: [
      { id: 'hire-recruit', label: 'Recruit' },
      { id: 'hire-add', label: 'Add Employee' },
      { id: 'hire-transfer', label: 'Copy/Transfer Employee' },
      { id: 'hire-onboarding', label: 'Onboarding' },
      { id: 'hire-everify', label: 'E-Verify' },
    ]
  },
  { id: 'tasks', label: 'Tasks & Workflows', icon: 'fa-regular fa-clipboard-list',
    sub: [
      { id: 'tasks-dashboard', label: 'Dashboard' },
      { id: 'tasks-open', label: 'Open Tasks' },
      { id: 'tasks-teams', label: 'Teams' },
      { id: 'tasks-my', label: 'My Tasks' },
      { id: 'tasks-templates', label: 'Templates' },
      { id: 'tasks-forms', label: 'Fillable Forms' },
      { id: 'tasks-settings', label: 'Settings' },
    ]
  },
  { id: 'time', label: 'Time & Attendance', icon: 'fa-regular fa-clock',
    sub: [
      { id: 'time-timecard', label: 'Timecard' },
      { id: 'time-pto', label: 'PTO Requests' },
      { id: 'time-settings', label: 'Settings',
        children: [
          { id: 'time-settings-web', label: 'Web Terminal Setup' },
          { id: 'time-settings-hardware', label: 'Hardware Terminal Setup' },
          { id: 'time-settings-geofence', label: 'Geofence Setup' },
          { id: 'time-settings-alerts', label: 'Alerts & Notifications' },
        ]
      },
      { id: 'time-timeoff', label: 'Time Off' },
      { id: 'time-accrual', label: 'Accrual Plans' },
    ]
  },
  { id: 'scheduler', label: 'Scheduler', icon: 'fa-regular fa-calendar-days',
    sub: [
      { id: 'scheduler-schedule', label: 'Schedule' },
      { id: 'scheduler-shifts', label: 'Open Shifts' },
    ]
  },
  { id: 'payroll', label: 'Payroll', icon: 'fa-regular fa-circle-dollar-to-slot',
    sub: [
      { id: 'payroll-process', label: 'Process Payroll' },
      { id: 'payroll-status', label: 'Payroll Status' },
      { id: 'payroll-void', label: 'Void Paychecks' },
    ]
  },
  { id: 'reports', label: 'Reports & Insights', icon: 'fa-regular fa-chart-bar',
    sub: [
      { id: 'reports-builder', label: 'Reports' },
      { id: 'reports-insights', label: 'Insights' },
    ]
  },
  { id: 'talent', label: 'Talent', icon: 'fa-regular fa-star',
    sub: [
      { id: 'talent-performance', label: 'Performance' },
      { id: 'talent-goals', label: 'Goals' },
    ]
  },
  { id: 'engagement', label: 'Engagement', icon: 'fa-regular fa-comment-dots',
    sub: [
      { id: 'engagement-workplace', label: 'Workplace Communication',
        children: [
          { id: 'engagement-workplace-main', label: 'Workplace Communication' },
          { id: 'engagement-announcements', label: 'Announcements' },
          { id: 'engagement-reported', label: 'Reported Comments' },
        ]
      },
      { id: 'engagement-send', label: 'Send an Announcement' },
      { id: 'engagement-manage', label: 'Manage Content' },
      { id: 'engagement-settings', label: 'Settings' },
    ]
  },
  { id: 'benefits', label: 'Benefits', icon: 'fa-regular fa-file-shield',
    sub: [
      { id: 'benefits-hub', label: 'Benefits Hub' },
      { id: 'benefits-plans', label: 'Plans' },
      { id: 'benefits-settings', label: 'Settings' },
      { id: 'benefits-reports', label: 'Reports' },
      { id: 'benefits-401k', label: '401k', badge: 'NEW' },
      { id: 'benefits-ewa', label: 'Earned Wage Access', badge: 'NEW' },
    ]
  },
  { id: 'hr', label: 'HR & Compliance', icon: 'fa-regular fa-scale-balanced',
    sub: [
      { id: 'hr-askhr', label: 'AskHR Settings' },
      { id: 'hr-docs', label: 'Documents' },
    ]
  },
];

const BOTTOM_ITEMS = [
  { id: 'settings-permissions', label: 'Settings & Permissions', icon: 'fa-regular fa-gear' },
  { id: 'support',              label: 'Support',                icon: 'fa-regular fa-headset' },
  { id: 'backoffice',           label: 'Back Office',            icon: 'fa-regular fa-screwdriver-wrench' },
];

function NavIcon({ cls, size = 15 }) {
  return React.createElement('i', { className: cls, style: { fontSize: size, width: 18, textAlign: 'center', flexShrink: 0 } });
}

function NavSidebar({ activeId, onNavigate, collapsed, onToggleCollapse }) {
  const [openAccordions, setOpenAccordions] = React.useState({ tasks: true });
  const [openChildren, setOpenChildren] = React.useState({});

  const toggleAccordion = (id) => setOpenAccordions(prev => ({ ...prev, [id]: !prev[id] }));
  const toggleChild = (id) => setOpenChildren(prev => ({ ...prev, [id]: !prev[id] }));
  const isActive = (id) => activeId === id;

  const S = {
    sidebar: {
      width: collapsed ? 52 : 232, minWidth: collapsed ? 52 : 232,
      height: '100%', background: '#fff', borderRight: '1px solid #e5e7eb',
      display: 'flex', flexDirection: 'column', overflow: 'hidden',
      transition: 'width 0.22s cubic-bezier(0.4,0,0.2,1)', userSelect: 'none', flexShrink: 0,
    },
    logoArea: {
      display: 'flex', alignItems: 'center',
      justifyContent: collapsed ? 'center' : 'space-between',
      padding: collapsed ? '10px 0' : '10px 12px 10px 14px',
      borderBottom: '1px solid #f3f4f6', flexShrink: 0, minHeight: 48,
    },
    logoWrap: { display: 'flex', alignItems: 'center', gap: 8 },
    collapseBtn: {
      width: 24, height: 24, borderRadius: 4, border: '1px solid #e5e7eb',
      background: '#fff', cursor: 'pointer',
      display: collapsed ? 'none' : 'flex',
      alignItems: 'center', justifyContent: 'center', color: '#9ca3af', fontSize: 11, flexShrink: 0,
    },
    scrollArea: { flex: 1, overflowY: 'auto', overflowX: 'hidden', paddingBottom: 4 },
    navItem: (active) => ({
      display: 'flex', alignItems: 'center', gap: collapsed ? 0 : 10,
      padding: collapsed ? '9px 0' : '9px 12px 9px 14px',
      justifyContent: collapsed ? 'center' : 'flex-start',
      cursor: 'pointer', color: active ? '#2563eb' : '#1f2937',
      fontSize: 13, fontWeight: active ? 600 : 400, fontFamily: 'Inter, sans-serif',
      background: active ? '#eff6ff' : 'transparent',
      borderLeft: `3px solid ${active ? '#2563eb' : 'transparent'}`,
      transition: 'background 0.12s',
    }),
    navIconStyle: (active) => ({
      fontSize: 15, width: 18, textAlign: 'center', flexShrink: 0,
      color: active ? '#2563eb' : '#647488',
    }),
    navLabel: { flex: 1, display: collapsed ? 'none' : 'block', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' },
    subItem: (active) => ({
      display: 'flex', alignItems: 'center', gap: 8,
      padding: '6px 12px 6px 44px', cursor: 'pointer',
      color: active ? '#2563eb' : '#475569',
      fontSize: 12.5, fontWeight: active ? 600 : 400, fontFamily: 'Inter, sans-serif',
      background: active ? '#eff6ff' : 'transparent',
      borderLeft: `3px solid ${active ? '#2563eb' : 'transparent'}`,
    }),
    childItem: (active) => ({
      display: 'flex', alignItems: 'center',
      padding: '5px 12px 5px 58px', cursor: 'pointer',
      color: active ? '#2563eb' : '#6b7280',
      fontSize: 12, fontWeight: active ? 500 : 400, fontFamily: 'Inter, sans-serif',
      background: active ? '#eff6ff' : 'transparent',
      borderLeft: `3px solid ${active ? '#2563eb' : 'transparent'}`,
    }),
    newBadge: {
      fontSize: 9, fontWeight: 700, padding: '1px 5px', borderRadius: 3,
      background: '#fef08a', color: '#713f12', border: '1px solid #fde047',
      letterSpacing: '0.04em', display: collapsed ? 'none' : 'inline',
      flexShrink: 0, flexGrow: 0,
    },
    sectionLabel: {
      fontSize: 9, fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase',
      letterSpacing: '0.07em', padding: collapsed ? '10px 16px 4px' : '10px 12px 4px',
      display: collapsed ? 'none' : 'block',
    },
    bottomSection: { borderTop: '1px solid #f3f4f6', paddingTop: 4, flexShrink: 0 },
  };

  return (
    <div style={S.sidebar}>
      <div style={S.logoArea}>
        <div style={S.logoWrap}>
        </div>
        <div style={S.collapseBtn} onClick={onToggleCollapse} title="Collapse sidebar">◂</div>
      </div>

      <div style={S.scrollArea}>
        {NAV_STRUCTURE.map(item => {
          const open = !!openAccordions[item.id];
          const anyChildActive = item.sub && item.sub.some(s =>
            isActive(s.id) || (s.children && s.children.some(c => isActive(c.id)))
          );
          const topActive = isActive(item.id) || anyChildActive;

          return (
            <div key={item.id}>
              <div
                style={S.navItem(topActive && !open)}
                onClick={() => { toggleAccordion(item.id); if (!item.sub) onNavigate(item.id); }}
                onMouseEnter={e => { if (!topActive) e.currentTarget.style.background = '#f3f4f6'; }}
                onMouseLeave={e => { if (!topActive) e.currentTarget.style.background = 'transparent'; }}
                title={collapsed ? item.label : ''}
              >
                <i className={item.icon} style={S.navIconStyle(topActive && !open)}></i>
                <span style={S.navLabel}>{item.label}</span>
              </div>

              {item.sub && open && !collapsed && (
                <div>
                  {item.sub.map(sub => {
                    const subActive = isActive(sub.id);
                    const hasChildren = sub.children && sub.children.length > 0;
                    const childOpen = !!openChildren[sub.id];
                    const anySubChildActive = hasChildren && sub.children.some(c => isActive(c.id));

                    return (
                      <div key={sub.id}>
                        <div
                          style={S.subItem(subActive || anySubChildActive)}
                          onClick={() => { if (hasChildren) toggleChild(sub.id); else onNavigate(sub.id); }}
                          onMouseEnter={e => { if (!subActive) e.currentTarget.style.background = '#f9fafb'; }}
                          onMouseLeave={e => { if (!subActive) e.currentTarget.style.background = (subActive || anySubChildActive) ? '#eff6ff' : 'transparent'; }}
                        >
                          <span style={{ flex: 1 }}>{sub.label}</span>
                          {sub.badge && <span style={S.newBadge}>{sub.badge}</span>}
                        </div>
                        {hasChildren && childOpen && sub.children.map(child => (
                          <div key={child.id} style={S.childItem(isActive(child.id))}
                            onClick={() => onNavigate(child.id)}
                            onMouseEnter={e => { if (!isActive(child.id)) e.currentTarget.style.background = '#f9fafb'; }}
                            onMouseLeave={e => { if (!isActive(child.id)) e.currentTarget.style.background = isActive(child.id) ? '#eff6ff' : 'transparent'; }}
                          >
                            {child.label}
                          </div>
                        ))}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div style={S.bottomSection}>
        {BOTTOM_ITEMS.map(item => (
          <div key={item.id} style={S.navItem(isActive(item.id))}
            onClick={() => onNavigate(item.id)}
            onMouseEnter={e => { if (!isActive(item.id)) e.currentTarget.style.background = '#f3f4f6'; }}
            onMouseLeave={e => { if (!isActive(item.id)) e.currentTarget.style.background = 'transparent'; }}
            title={collapsed ? item.label : ''}
          >
            <i className={item.icon} style={S.navIconStyle(isActive(item.id))}></i>
            <span style={S.navLabel}>{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

Object.assign(window, { NavSidebar });
