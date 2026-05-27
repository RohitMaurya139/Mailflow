// Shared shell: sidebar + topbar + icons for MailFlow
const I = {
  inbox: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M3 13l2.5-7a2 2 0 0 1 1.9-1.4h9.2A2 2 0 0 1 18.5 6L21 13"/><path d="M3 13v5a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-5"/><path d="M3 13h5l1.5 2h5L16 13h5"/></svg>,
  send: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M21 3 10.5 13.5"/><path d="M21 3l-6.5 18-4-8-8-4L21 3z"/></svg>,
  users: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><circle cx="9" cy="8" r="3.5"/><path d="M2.5 19c.5-3.3 3.4-5 6.5-5s6 1.7 6.5 5"/><circle cx="17" cy="9" r="2.5"/><path d="M21.5 17.5c-.3-2-1.8-3.2-3.7-3.5"/></svg>,
  doc: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M7 3h7l4 4v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z"/><path d="M14 3v4h4"/><path d="M9 13h7M9 17h5"/></svg>,
  flow: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><circle cx="6" cy="6" r="2.5"/><circle cx="18" cy="6" r="2.5"/><circle cx="12" cy="18" r="2.5"/><path d="M8 8l3 7M16 8l-3 7"/></svg>,
  gift: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><rect x="3" y="9" width="18" height="11" rx="1.5"/><path d="M3 13h18M12 9v11"/><path d="M8 9c-2 0-3-3 0-4s4 4 4 4-2 0-4 0zM16 9c2 0 3-3 0-4s-4 4-4 4 2 0 4 0z"/></svg>,
  mail: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/></svg>,
  chart: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M4 20V4M4 20h16"/><rect x="7" y="12" width="3" height="5"/><rect x="12" y="8" width="3" height="9"/><rect x="17" y="14" width="3" height="3"/></svg>,
  gear: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.6 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06A2 2 0 1 1 7.04 4.3l.06.06A1.65 1.65 0 0 0 9 4.6a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09A1.65 1.65 0 0 0 15 4.6a1.65 1.65 0 0 0 1.82-.33l.06-.06A2 2 0 1 1 19.7 7.04l-.06.06A1.65 1.65 0 0 0 19.4 9c.21.55.78.95 1.41.95H21a2 2 0 1 1 0 4h-.09A1.65 1.65 0 0 0 19.4 15z"/></svg>,
  search: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></svg>,
  bell: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M6 9a6 6 0 0 1 12 0c0 7 3 7 3 9H3c0-2 3-2 3-9z"/><path d="M10 21a2 2 0 0 0 4 0"/></svg>,
  plus: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M12 5v14M5 12h14"/></svg>,
  arrowR: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M5 12h14M13 6l6 6-6 6"/></svg>,
  chevD: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M6 9l6 6 6-6"/></svg>,
  chevR: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M9 6l6 6-6 6"/></svg>,
  star: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M12 3l2.6 5.5 6 .9-4.4 4.2 1.1 6L12 16.8 6.7 19.6l1.1-6L3.4 9.4l6-.9z"/></svg>,
  sparkles: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5z"/><path d="M19 14l.8 2.2L22 17l-2.2.8L19 20l-.8-2.2L16 17l2.2-.8z"/></svg>,
  filter: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M3 5h18l-7 9v6l-4-2v-4z"/></svg>,
  download: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M12 4v12M6 11l6 6 6-6M5 21h14"/></svg>,
  upload: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M12 20V8M6 13l6-6 6 6M5 4h14"/></svg>,
  reply: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M10 9V5L3 12l7 7v-4c5 0 9 2 11 6 0-7-4-12-11-12z"/></svg>,
  more: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="5" cy="12" r="1.5"/><circle cx="12" cy="12" r="1.5"/><circle cx="19" cy="12" r="1.5"/></svg>,
  check: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12l5 5L20 7"/></svg>,
  paperclip: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M21 11.5l-9 9a5 5 0 0 1-7-7l9-9a3.5 3.5 0 0 1 5 5l-9 9a2 2 0 0 1-3-3l8-8"/></svg>,
  google: <svg viewBox="0 0 24 24"><path fill="#4285F4" d="M21.6 12.2c0-.7-.1-1.4-.2-2H12v3.8h5.4c-.2 1.2-.9 2.3-2 3v2.5h3.2c1.9-1.7 3-4.3 3-7.3z"/><path fill="#34A853" d="M12 22c2.7 0 5-.9 6.6-2.4l-3.2-2.5c-.9.6-2 1-3.4 1-2.6 0-4.8-1.7-5.6-4.1H3.1v2.6A10 10 0 0 0 12 22z"/><path fill="#FBBC05" d="M6.4 14c-.2-.6-.3-1.3-.3-2s.1-1.4.3-2V7.4H3.1A10 10 0 0 0 2 12c0 1.6.4 3.2 1.1 4.6L6.4 14z"/><path fill="#EA4335" d="M12 5.9c1.5 0 2.8.5 3.8 1.5l2.8-2.8C16.9 3 14.7 2 12 2A10 10 0 0 0 3.1 7.4L6.4 10c.8-2.4 3-4.1 5.6-4.1z"/></svg>,
};
const ARROW_R = I.arrowR;

const NAV = [
  { id: 'inbox', label: 'Inbox', icon: I.inbox, badge: '12' },
  { id: 'campaigns', label: 'Campaigns', icon: I.send, badge: '4' },
  { id: 'contacts', label: 'Contacts', icon: I.users },
  { id: 'templates', label: 'Templates', icon: I.doc },
  { id: 'workflows', label: 'Workflows', icon: I.flow },
  { id: 'rewards', label: 'Rewards', icon: I.gift },
  { id: 'accounts', label: 'Accounts', icon: I.mail, badge: '8' },
  { id: 'analytics', label: 'Analytics', icon: I.chart },
  { id: 'settings', label: 'Settings', icon: I.gear },
];

function Brand({ small }) {
  return (
    <div className="mf-brand" style={small ? { padding: 0 } : {}}>
      <div className="mf-brand-mark"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 3 10.5 13.5"/><path d="M21 3l-6.5 18-4-8-8-4L21 3z"/></svg></div>
      <span className="mf-brand-name">Mail<em>flow</em></span>
    </div>
  );
}

function Sidebar({ active = 'inbox' }) {
  return (
    <aside className="mf-sidebar">
      <Brand />
      <button className="mf-btn sm" style={{ justifyContent: 'flex-start', marginBottom: 6, background: 'transparent', borderStyle: 'dashed', color: 'var(--muted)' }}>
        {I.search}<span>Quick find</span><span className="kbd mono" style={{ marginLeft: 'auto', fontSize: 10, padding: '1px 5px', border: '1px solid var(--hairline)', borderRadius: 4 }}>⌘K</span>
      </button>
      <div className="mf-nav-group">Workspace</div>
      {NAV.slice(0, 6).map(n => (
        <a key={n.id} className={`mf-nav-item ${active === n.id ? 'is-active' : ''}`}>
          {n.icon}<span>{n.label}</span>
          {n.badge && <span className={`mf-nav-badge ${n.id === 'inbox' && active !== 'inbox' ? 'is-clay' : ''}`}>{n.badge}</span>}
        </a>
      ))}
      <div className="mf-nav-group">Configure</div>
      {NAV.slice(6).map(n => (
        <a key={n.id} className={`mf-nav-item ${active === n.id ? 'is-active' : ''}`}>
          {n.icon}<span>{n.label}</span>
          {n.badge && <span className="mf-nav-badge">{n.badge}</span>}
        </a>
      ))}
      <div className="mf-sidebar-foot">
        <div className="mf-avatar">RM</div>
        <div className="mf-user-meta">
          <div className="name">Rohit M.</div>
          <div className="org mono">DG Outreach · Admin</div>
        </div>
      </div>
    </aside>
  );
}

function Topbar({ crumbs = [], children }) {
  return (
    <header className="mf-topbar">
      <div className="mf-crumbs">
        {crumbs.map((c, i) => (
          <React.Fragment key={i}>
            {i > 0 && <span className="sep">/</span>}
            <span className={i === crumbs.length - 1 ? 'here' : ''}>{c}</span>
          </React.Fragment>
        ))}
      </div>
      <div className="mf-search">
        {I.search}<span>Search threads, contacts, campaigns…</span>
        <span className="kbd">⌘K</span>
      </div>
      <div className="mf-topbar-spacer" />
      {children}
      <div className="mf-topbar-actions">
        <button className="mf-icon-btn">{I.bell}</button>
        <button className="mf-icon-btn">{I.sparkles}</button>
        <div className="mf-avatar" style={{ marginLeft: 4 }}>RM</div>
      </div>
    </header>
  );
}

// Sparkline as inline SVG path generator
function Spark({ data, color = 'var(--clay)', w = 60, h = 20, fill }) {
  const max = Math.max(...data), min = Math.min(...data);
  const pts = data.map((v, i) => {
    const x = (i / (data.length - 1)) * w;
    const y = h - ((v - min) / (max - min || 1)) * (h - 2) - 1;
    return [x, y];
  });
  const d = pts.map((p, i) => `${i ? 'L' : 'M'}${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join(' ');
  return (
    <svg width={w} height={h} className="mf-spark">
      {fill && <path d={`${d} L${w} ${h} L0 ${h} Z`} fill={fill} opacity="0.3" />}
      <path d={d} fill="none" stroke={color} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

Object.assign(window, { I, NAV, Brand, Sidebar, Topbar, Spark });
