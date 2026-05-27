// Dashboard home — welcome + onboarding + at-a-glance
function DashboardPage() {
  return (
    <div className="mf mf-shell">
      <Sidebar active="" />
      <div>
        <Topbar crumbs={['Workspace', 'Overview']} />
        <main className="mf-main">
          <div className="mf-page-h">
            <div className="titles">
              <h1>Good afternoon, <em>Rohit.</em></h1>
              <p className="sub">Wednesday, Aug 14 · 8 mailboxes sending · 2,847 in flight today.</p>
            </div>
            <button className="mf-btn sm" style={{ marginRight: 6 }}>{I.download} Export weekly</button>
            <button className="mf-btn clay">{I.plus} New campaign</button>
          </div>

          {/* KPI row */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
            {[
              ['Sent · 24h', '2,847', '+12.4%', false, [12, 18, 14, 22, 24, 30, 28, 35], 'var(--clay)'],
              ['Open rate', '47.2%', '+2.1pt', false, [40, 42, 41, 45, 44, 46, 47, 47], 'var(--clay)'],
              ['Reply rate', '8.1%', '+0.7pt', false, [6, 7, 6.5, 7.2, 7.8, 8, 7.9, 8.1], 'var(--sage)'],
              ['Bounce rate', '1.4%', '-0.3pt', true, [2.1, 2, 1.8, 1.7, 1.6, 1.5, 1.4, 1.4], 'var(--sage)'],
            ].map(([label, value, delta, isGood, spark, color]) => (
              <div key={label} className="mf-stat">
                <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                  <div className="mf-stat-label">{label}</div>
                  <div style={{ marginLeft: 'auto' }}><Spark data={spark} color={color} w={60} h={22} /></div>
                </div>
                <div className="mf-stat-value">{value}</div>
                <span className={`mf-stat-delta ${(!isGood && delta.startsWith('-')) || (isGood && delta.startsWith('-')) ? 'down' : ''}`} style={isGood && delta.startsWith('-') ? { background: 'var(--sage-soft)', color: 'var(--sage)' } : {}}>
                  {delta} <span className="muted">7d</span>
                </span>
              </div>
            ))}
          </div>

          {/* Onboarding */}
          <div className="mt-6" style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 16 }}>
            <div className="mf-card">
              <div className="mf-card-h">
                <h3>Get your outreach running</h3>
                <span className="meta">3 of 5 done</span>
                <div className="actions"><span className="mf-badge sage">Almost there</span></div>
              </div>
              <div style={{ padding: '4px 6px' }}>
                {[
                  ['Connect a mailbox', 'Gmail OAuth or SMTP. 8 connected.', true, '8/∞'],
                  ['Import contacts', '4,212 contacts in 3 lists.', true, '4,212'],
                  ['Pick a template', 'You have 7 templates, 2 active.', true, '7'],
                  ['Launch a campaign', 'Choose list, sender pool, and template.', false, ''],
                  ['Build a workflow', 'Auto-route hot replies; tag and reward.', false, ''],
                ].map(([t, s, done, n], i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 16px', borderBottom: i < 4 ? '1px solid var(--hairline)' : 0 }}>
                    <span style={{ width: 24, height: 24, borderRadius: '50%', border: done ? 'none' : '1.5px dashed var(--hairline-strong)', background: done ? 'var(--sage)' : 'transparent', color: 'white', display: 'grid', placeItems: 'center' }}>
                      {done ? I.check : <span className="mono" style={{ fontSize: 11, color: 'var(--muted)' }}>{i + 1}</span>}
                    </span>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 500, fontSize: 14 }}>{t}</div>
                      <div className="muted" style={{ fontSize: 12.5, marginTop: 2 }}>{s}</div>
                    </div>
                    {n && <span className="mono muted" style={{ fontSize: 11 }}>{n}</span>}
                    {done
                      ? <span className="mf-badge sage" style={{ fontSize: 10 }}><span className="dot" />Done</span>
                      : <button className="mf-btn sm">Start {I.arrowR}</button>}
                  </div>
                ))}
              </div>
            </div>

            {/* Sender health */}
            <div className="mf-card">
              <div className="mf-card-h">
                <h3>Sender pool health</h3>
                <span className="meta">8 mailboxes</span>
                <div className="actions"><span style={{ fontSize: 12, color: 'var(--clay)' }}>Manage →</span></div>
              </div>
              <div style={{ padding: 16 }}>
                {[
                  ['acme-sales-01@…', 'sage', 47, 250, 'Healthy'],
                  ['acme-sales-02@…', 'sage', 211, 250, 'Healthy'],
                  ['acme-sales-03@…', 'amber', 248, 250, 'Throttling'],
                  ['acme-sales-04@…', 'rose', 12, 250, 'Paused'],
                  ['outbound-eu-01@…', 'sage', 90, 200, 'Warming'],
                ].map(([who, tone, n, cap, status]) => (
                  <div key={who} style={{ padding: '10px 0', borderBottom: '1px dashed var(--hairline)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ width: 6, height: 6, borderRadius: '50%', background: `var(--${tone})` }} />
                      <span className="mono" style={{ fontSize: 12 }}>{who}</span>
                      <span className="muted" style={{ marginLeft: 'auto', fontSize: 11 }}>{status}</span>
                    </div>
                    <div style={{ marginTop: 6, height: 4, borderRadius: 2, background: 'var(--surface-2)', overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: `${(n / cap) * 100}%`, background: `var(--${tone})` }} />
                    </div>
                    <div className="mono muted" style={{ fontSize: 10.5, marginTop: 4 }}>{n} / {cap} today</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Activity + tasks */}
          <div className="mt-6" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div className="mf-card">
              <div className="mf-card-h">
                <h3>Replies needing you</h3>
                <span className="meta">12 unread · 3 hot</span>
                <div className="actions"><span style={{ fontSize: 12, color: 'var(--clay)' }}>Open inbox →</span></div>
              </div>
              <div>
                {[
                  ['Priya Shah', 'Yes — let’s find a time next week.', 'Interested', 'sage', '2m'],
                  ['M. Okafor', 'Can you send pricing for 20 seats?', 'Question', 'sage', '14m'],
                  ['Dana Liu', 'Not the right time, ping in Q3.', 'Maybe later', 'amber', '1h'],
                  ['Jonas K.', 'Please remove me from this list.', 'Unsubscribe', 'rose', '3h'],
                ].map(([who, snip, lbl, tone, t], i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 18px', borderBottom: i < 3 ? '1px solid var(--hairline)' : 0 }}>
                    <div className="mf-avatar" style={{ background: ['#5C6F8A', '#7A6A5C', '#6F8A7C', '#8A6F7C'][i] }}>{who.split(' ').map(s => s[0]).join('')}</div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
                        <span style={{ fontWeight: 500, fontSize: 13.5 }}>{who}</span>
                        <span className={`mf-badge ${tone}`} style={{ fontSize: 10 }}>{lbl}</span>
                        <span className="mono muted" style={{ marginLeft: 'auto', fontSize: 11 }}>{t}</span>
                      </div>
                      <div className="muted" style={{ fontSize: 12.5, marginTop: 2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{snip}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mf-card">
              <div className="mf-card-h">
                <h3>Today’s schedule</h3>
                <span className="meta">Cron · per-account caps</span>
              </div>
              <div className="mf-card-b">
                <div style={{ position: 'relative', height: 200, background: `repeating-linear-gradient(to right, transparent 0 12.5%, var(--hairline) 12.5%, var(--hairline) calc(12.5% + 1px), transparent calc(12.5% + 1px) 25%)`, borderRadius: 8, padding: '8px 0' }}>
                  {[
                    ['acme-sales-01', 0.05, 0.4, 'sage'],
                    ['acme-sales-02', 0.1, 0.55, 'sage'],
                    ['acme-sales-03', 0.3, 0.7, 'amber'],
                    ['acme-sales-04', 0.0, 0.05, 'rose'],
                    ['outbound-eu-01', 0.45, 0.85, 'sage'],
                    ['outbound-eu-02', 0.5, 0.9, 'sage'],
                    ['nz-cold-01', 0.6, 0.95, 'sage'],
                    ['nz-cold-02', 0.65, 1.0, 'amber'],
                  ].map(([name, a, b, tone], i) => (
                    <div key={i} style={{ height: 16, marginBottom: 5, position: 'relative' }}>
                      <span className="mono muted" style={{ position: 'absolute', left: 4, top: 1, fontSize: 9.5, zIndex: 2 }}>{name}</span>
                      <div style={{ position: 'absolute', left: `${a * 100}%`, width: `${(b - a) * 100}%`, top: 2, height: 12, background: `var(--${tone}-soft)`, borderLeft: `2px solid var(--${tone})`, borderRadius: 2 }} />
                    </div>
                  ))}
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8, fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--muted)' }}>
                  {['08:00','10:00','12:00','14:00','16:00','18:00','20:00','22:00','—'].map(t => <span key={t}>{t}</span>)}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

Object.assign(window, { DashboardPage });
