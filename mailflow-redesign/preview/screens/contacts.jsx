// Contacts
function ContactsPage() {
  return (
    <div className="mf mf-shell">
      <Sidebar active="contacts" />
      <div>
        <Topbar crumbs={['Contacts', 'All lists']} />
        <main className="mf-main">
          <div className="mf-page-h">
            <div className="titles">
              <h1>Contacts</h1>
              <p className="sub">4,212 contacts across 3 lists · 218 in active campaigns · 47 unsubscribed this month.</p>
            </div>
            <button className="mf-btn sm">{I.download} Export</button>
            <button className="mf-btn sm" style={{ marginLeft: 6 }}>{I.upload} Import CSV</button>
            <button className="mf-btn clay" style={{ marginLeft: 6 }}>{I.plus} Add contact</button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: 16 }}>
            {/* Lists sidebar */}
            <aside style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <div className="mono muted" style={{ fontSize: 10, letterSpacing: '0.08em', textTransform: 'uppercase', padding: '4px 8px' }}>Lists</div>
              {[
                ['All contacts', '4,212', true],
                ['Series A SaaS', '1,840', false],
                ['Founders newsletter', '2,012', false],
                ['Pilot · Northbeam', '218', false],
                ['Event · SaaStr 2026', '142', false],
              ].map(([n, c, a]) => (
                <div key={n} className={`mf-nav-item ${a ? 'is-active' : ''}`} style={{ paddingLeft: 12 }}>
                  <span>{n}</span><span className="mf-nav-badge">{c}</span>
                </div>
              ))}
              <div className="mf-rule mt-3" />
              <div className="mono muted" style={{ fontSize: 10, letterSpacing: '0.08em', textTransform: 'uppercase', padding: '12px 8px 4px' }}>Tags</div>
              {[['vip', 14], ['pilot-Q3', 28], ['decision-maker', 412], ['unresponsive', 1240], ['hot', 32]].map(([t, n]) => (
                <div key={t} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 12px', fontSize: 13 }}>
                  <span className="mf-tag">{t}</span>
                  <span className="mono muted" style={{ marginLeft: 'auto', fontSize: 11 }}>{n}</span>
                </div>
              ))}
            </aside>

            {/* Table */}
            <div>
              {/* Filter bar */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
                <div className="mf-search" style={{ minWidth: 280, flex: 1 }}>
                  {I.search}<span>Search name or email…</span>
                  <span className="kbd">⌘F</span>
                </div>
                <button className="mf-btn sm">All lists {I.chevD}</button>
                <button className="mf-btn sm">All statuses {I.chevD}</button>
                <button className="mf-btn sm">Tags {I.chevD}</button>
                <span className="mf-badge clay" style={{ marginLeft: 4 }}>4 filters</span>
              </div>

              <div className="mf-card" style={{ overflow: 'hidden' }}>
                <table className="mf-table">
                  <thead>
                    <tr>
                      <th style={{ width: 32, paddingLeft: 18 }}><span style={{ width: 14, height: 14, border: '1.5px solid var(--hairline-strong)', borderRadius: 3, display: 'inline-block' }} /></th>
                      <th>Contact</th>
                      <th>Company</th>
                      <th>Status</th>
                      <th>Last touched</th>
                      <th>Engagement</th>
                      <th>Tags</th>
                      <th style={{ width: 40 }}></th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ['PS','Priya Shah', 'priya@northbeam.co', 'Northbeam · VP Growth', 'Replied', 'sage', '2m', 95, ['vip','pilot-Q3','hot']],
                      ['MO','Maya Okafor', 'maya@brightline.io', 'Brightline · Head of CS', 'Replied', 'sage', '14m', 88, ['decision-maker','hot']],
                      ['DL','Dana Liu', 'dana@octave.com', 'Octave · COO', 'Maybe later', 'amber', '1h', 62, ['decision-maker']],
                      ['JK','Jonas K.', 'jonas@keelboat.app', 'Keelboat · Founder', 'Unsubscribed', 'rose', '3h', 0, ['unresponsive']],
                      ['RA','R. Almeida', 'almeida@harbor.co', 'Harbor & Co · GM', 'Interested', 'sage', '6h', 78, ['vip','pilot-Q3']],
                      ['TH','Tom Hartwell', 'tom@nimbus.so', 'Nimbus · CEO', 'Engaged', 'sage', '11h', 82, ['decision-maker','hot']],
                      ['SN','Sara Nguyen', 'sara@octave.com', 'Octave · Head of Sales', 'Out of office', '', '1d', 45, []],
                      ['AS','A. Sundaram', 'arvind@spire.dev', 'Spire · Founder', 'Cold', '', '2d', 12, ['unresponsive']],
                      ['JB','J. Baker', 'jamie@modal.app', 'Modal · GTM Lead', 'Cold', '', '3d', 8, []],
                      ['LB','Leah Brooks', 'leah@bevel.co', 'Bevel · COO', 'Engaged', 'sage', '4d', 71, ['decision-maker']],
                    ].map(([init, name, email, co, status, tone, last, eng, tags], i) => (
                      <tr key={i}>
                        <td style={{ paddingLeft: 18 }}><span style={{ width: 14, height: 14, border: '1.5px solid var(--hairline-strong)', borderRadius: 3, display: 'inline-block' }} /></td>
                        <td>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                            <div className="mf-avatar" style={{ background: ['#5C6F8A', '#7A6A5C', '#6F8A7C', '#8A6F7C', '#5C8A7E', '#7C7A6A', '#8A8067', '#9A7C5C', '#7C9A8A', '#6A5C8A'][i] }}>{init}</div>
                            <div>
                              <div style={{ fontSize: 13.5, fontWeight: 500 }}>{name}</div>
                              <div className="mono muted" style={{ fontSize: 11 }}>{email}</div>
                            </div>
                          </div>
                        </td>
                        <td><span style={{ fontSize: 13 }}>{co}</span></td>
                        <td>{tone ? <span className={`mf-badge ${tone}`}><span className="dot" />{status}</span> : <span className="mf-badge ghost">{status}</span>}</td>
                        <td className="mono muted" style={{ fontSize: 12 }}>{last}</td>
                        <td>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <div style={{ width: 80, height: 5, borderRadius: 3, background: 'var(--surface-2)', overflow: 'hidden' }}>
                              <div style={{ height: '100%', width: `${eng}%`, background: eng > 70 ? 'var(--sage)' : eng > 40 ? 'var(--amber)' : 'var(--muted-2)' }} />
                            </div>
                            <span className="mono" style={{ fontSize: 11.5, color: 'var(--muted)' }}>{eng}</span>
                          </div>
                        </td>
                        <td>
                          <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                            {tags.slice(0, 2).map(t => <span key={t} className="mf-tag">{t}</span>)}
                            {tags.length > 2 && <span className="mf-tag">+{tags.length - 2}</span>}
                          </div>
                        </td>
                        <td><button className="mf-icon-btn">{I.more}</button></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 14 }}>
                <span className="mono muted" style={{ fontSize: 12 }}>1–10 of 4,212</span>
                <div style={{ marginLeft: 'auto', display: 'flex', gap: 6 }}>
                  <button className="mf-btn sm" disabled style={{ opacity: 0.5 }}>← Previous</button>
                  <button className="mf-btn sm">Next →</button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

Object.assign(window, { ContactsPage });
