// Settings
function SettingsPage() {
  return (
    <div className="mf mf-shell">
      <Sidebar active="settings" />
      <div>
        <Topbar crumbs={['Settings', 'Workspace']} />
        <main className="mf-main">
          <div className="mf-page-h">
            <div className="titles">
              <h1>Settings</h1>
              <p className="sub">Workspace, API access, queue health, and activity.</p>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr', gap: 32 }}>
            {/* Section nav */}
            <nav style={{ position: 'sticky', top: 24, alignSelf: 'flex-start', display: 'flex', flexDirection: 'column', gap: 2 }}>
              {[
                ['Workspace', true],
                ['Members', false],
                ['Billing & plan', false],
                ['API keys', false],
                ['Webhooks', false],
                ['Queue health', false],
                ['Audit log', false],
                ['Compliance', false],
                ['Danger zone', false],
              ].map(([n, a]) => (
                <a key={n} className={`mf-nav-item ${a ? 'is-active' : ''}`} style={{ padding: '6px 10px' }}>{n}</a>
              ))}
            </nav>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 760 }}>
              {/* Workspace */}
              <div className="mf-card">
                <div className="mf-card-h"><h3>Workspace</h3><span className="meta">Your organization and account.</span></div>
                <div className="mf-card-b" style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
                  <div style={{ width: 64, height: 64, borderRadius: 12, background: 'var(--clay)', color: 'white', display: 'grid', placeItems: 'center', fontFamily: 'var(--serif)', fontSize: 28 }}>D</div>
                  <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                    <div>
                      <div className="mf-label">Name</div>
                      <input className="mf-input" defaultValue="DG Outreach" />
                    </div>
                    <div>
                      <div className="mf-label">Slug</div>
                      <input className="mf-input mono" defaultValue="dg-outreach" />
                    </div>
                    <div>
                      <div className="mf-label">Plan</div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 12px', border: '1px solid var(--hairline)', borderRadius: 6 }}>
                        <span className="mf-badge clay">Scale</span>
                        <span className="muted" style={{ fontSize: 12 }}>$249/mo · 25 mailboxes</span>
                        <span style={{ marginLeft: 'auto', color: 'var(--clay)', fontSize: 12 }}>Upgrade →</span>
                      </div>
                    </div>
                    <div>
                      <div className="mf-label">Your role</div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 12px', border: '1px solid var(--hairline)', borderRadius: 6 }}>
                        <span className="mf-badge sage" style={{ fontSize: 10.5 }}>Admin</span>
                        <span className="muted" style={{ fontSize: 12 }}>rohit@dg-outreach.co</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* API keys */}
              <div className="mf-card">
                <div className="mf-card-h">
                  <h3>API keys</h3>
                  <span className="meta">Authenticate the public /api/v1 API.</span>
                  <div className="actions"><button className="mf-btn sm clay">{I.plus} New key</button></div>
                </div>
                <table className="mf-table">
                  <thead>
                    <tr>
                      <th style={{ paddingLeft: 18 }}>Label</th>
                      <th>Key</th>
                      <th>Scopes</th>
                      <th>Last used</th>
                      <th style={{ width: 40 }}></th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ['Production · zapier', 'mf_live_••••8214', 'read·write', '4m ago'],
                      ['Internal CRM sync', 'mf_live_••••a91f', 'read·write', '21m ago'],
                      ['Notion dashboard', 'mf_live_••••7c20', 'read', '6h ago'],
                    ].map(([l, k, s, t], i) => (
                      <tr key={i}>
                        <td style={{ paddingLeft: 18 }}>{l}</td>
                        <td className="mono">{k}</td>
                        <td><span className="mf-tag">{s}</span></td>
                        <td className="mono muted" style={{ fontSize: 12 }}>{t}</td>
                        <td><button className="mf-icon-btn">{I.more}</button></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Queue health */}
              <div className="mf-card">
                <div className="mf-card-h"><h3>Queue health</h3><span className="meta">BullMQ job counts across the worker fleet.</span><div className="actions"><span className="mono muted" style={{ fontSize: 11 }}>Refreshed 4s ago</span></div></div>
                <div className="mf-card-b" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
                  {[
                    ['send-email', 24, 102, 0, 'sage'],
                    ['campaign-fanout', 1, 4, 1, 'amber'],
                    ['inbound-fetch', 0, 0, 0, 'sage'],
                    ['inbound-process', 8, 14, 0, 'sage'],
                    ['ai-analyze', 12, 38, 0, 'sage'],
                    ['workflow-run', 0, 2, 0, 'sage'],
                    ['reward-grant', 0, 0, 0, 'sage'],
                    ['account-health', 0, 1, 0, 'sage'],
                    ['dead-letter', 0, 0, 0, 'sage'],
                  ].map(([n, a, p, f, tone]) => (
                    <div key={n} style={{ padding: 12, border: '1px solid var(--hairline)', borderRadius: 8, background: 'var(--canvas)' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <span style={{ width: 6, height: 6, borderRadius: '50%', background: `var(--${tone})` }} />
                        <span className="mono" style={{ fontSize: 12, fontWeight: 500 }}>{n}</span>
                      </div>
                      <div style={{ display: 'flex', gap: 12, marginTop: 8, fontSize: 11 }}>
                        <div><div className="mono muted" style={{ fontSize: 9.5 }}>ACT</div><div className="mono">{a}</div></div>
                        <div><div className="mono muted" style={{ fontSize: 9.5 }}>PEND</div><div className="mono">{p}</div></div>
                        <div><div className="mono muted" style={{ fontSize: 9.5 }}>FAIL</div><div className="mono" style={{ color: f ? 'var(--rose)' : 'inherit' }}>{f}</div></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Audit */}
              <div className="mf-card">
                <div className="mf-card-h"><h3>Audit log</h3><span className="meta">Recent privileged actions in this workspace.</span><div className="actions"><button className="mf-btn sm ghost">View all →</button></div></div>
                <div>
                  {[
                    ['Rohit M.', 'enabled workflow', 'Hot-reply playbook', '2m ago'],
                    ['Maya Okafor', 'published template', 'cold-intro-v3', '14m ago'],
                    ['system', 'paused sender', 'acme-sales-04@…', '3h ago'],
                    ['Rohit M.', 'created API key', 'Production · zapier', '5h ago'],
                    ['Rohit M.', 'imported CSV', '218 contacts → Pilot · Northbeam', '1d ago'],
                  ].map(([who, action, obj, t], i) => (
                    <div key={i} style={{ display: 'grid', gridTemplateColumns: '140px 110px 1fr 80px', alignItems: 'center', gap: 12, padding: '11px 18px', borderTop: i ? '1px dashed var(--hairline)' : 0, fontSize: 13 }}>
                      <span>{who === 'system' ? <span className="mf-tag">system</span> : who}</span>
                      <span className="muted">{action}</span>
                      <span className="mono">{obj}</span>
                      <span className="mono muted" style={{ fontSize: 11, textAlign: 'right' }}>{t}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

Object.assign(window, { SettingsPage });
