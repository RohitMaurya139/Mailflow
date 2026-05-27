// Campaigns list + detail
function CampaignsPage() {
  return (
    <div className="mf mf-shell">
      <Sidebar active="campaigns" />
      <div>
        <Topbar crumbs={['Campaigns', 'All']} />
        <main className="mf-main">
          <div className="mf-page-h">
            <div className="titles">
              <h1>Campaigns</h1>
              <p className="sub">Send, sequence, and track outreach. 4 active · 2 paused · 1 draft.</p>
            </div>
            <button className="mf-btn sm">{I.filter} Filter</button>
            <button className="mf-btn sm" style={{ marginLeft: 6 }}>{I.download} Export</button>
            <button className="mf-btn clay" style={{ marginLeft: 6 }}>{I.plus} New campaign</button>
          </div>

          {/* Table */}
          <div className="mf-card" style={{ overflow: 'hidden' }}>
            <table className="mf-table">
              <thead>
                <tr>
                  <th style={{ width: 28, paddingLeft: 18 }}></th>
                  <th>Campaign</th>
                  <th>Status</th>
                  <th style={{ textAlign: 'right' }}>Sent</th>
                  <th style={{ textAlign: 'right' }}>Open</th>
                  <th style={{ textAlign: 'right' }}>Reply</th>
                  <th>Pace</th>
                  <th>Sender pool</th>
                  <th style={{ textAlign: 'right' }}>Last send</th>
                  <th style={{ width: 40 }}></th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Q3 Outbound · Series A SaaS', 'Active', 'sage', 1842, 2400, '52%', '8.4%', [3,5,4,7,6,8,9,10], 'acme-sales · 4 boxes', '14s ago'],
                  ['Founders newsletter — warm reactivation', 'Active', 'sage', 612, 850, '64%', '12.1%', [5,4,6,7,6,8,9,11], 'outbound-eu · 2 boxes', '2m ago'],
                  ['Pilot · NorthBeam target list', 'Active', 'sage', 138, 220, '71%', '18.4%', [2,3,3,5,7,8,9,10], 'acme-sales-04', '8m ago'],
                  ['Event follow-up · SaaStr 2026', 'Paused', 'amber', 487, 1200, '38%', '4.2%', [4,6,5,4,3,3,2,2], 'nz-cold · 2 boxes', '3h ago'],
                  ['Re-engage Q1 cold list', 'Throttled', 'amber', 78, 800, '—', '—', [1,2,1,2,1,1,1,1], 'acme-sales-03', '6h ago'],
                  ['Black Friday teaser (DRAFT)', 'Draft', '', 0, 1500, '—', '—', [0,0,0,0,0,0,0,0], '—', '—'],
                ].map(([name, status, tone, sent, total, open, reply, spark, pool, last], i) => (
                  <tr key={i}>
                    <td style={{ paddingLeft: 18 }}><span style={{ width: 6, height: 6, borderRadius: '50%', background: tone ? `var(--${tone})` : 'var(--muted-2)', display: 'inline-block' }} /></td>
                    <td>
                      <div style={{ fontWeight: 500, fontSize: 13.5 }}>{name}</div>
                      <div className="muted mono" style={{ fontSize: 10.5, marginTop: 2 }}>{['CMP-2841', 'CMP-2820', 'CMP-2799', 'CMP-2756', 'CMP-2702', 'CMP-2891'][i]} · sequence · 4 steps</div>
                    </td>
                    <td>{status === 'Draft' ? <span className="mf-badge ghost">{status}</span> : <span className={`mf-badge ${tone}`}><span className="dot" />{status}</span>}</td>
                    <td style={{ textAlign: 'right' }}>
                      <div className="mono">{sent.toLocaleString()}<span className="muted"> / {total.toLocaleString()}</span></div>
                      <div style={{ marginTop: 4, height: 3, borderRadius: 2, background: 'var(--surface-2)', overflow: 'hidden' }}>
                        <div style={{ height: '100%', width: `${(sent / total) * 100}%`, background: tone ? `var(--${tone})` : 'var(--muted-2)' }} />
                      </div>
                    </td>
                    <td className="mono" style={{ textAlign: 'right' }}>{open}</td>
                    <td className="mono" style={{ textAlign: 'right', color: reply !== '—' && parseFloat(reply) > 10 ? 'var(--clay)' : 'inherit' }}>{reply}</td>
                    <td><Spark data={spark} color={tone === 'sage' ? 'var(--sage)' : tone === 'amber' ? 'var(--amber)' : 'var(--muted-2)'} w={70} h={20} fill={tone === 'sage' ? 'var(--sage)' : null} /></td>
                    <td><span className="mono" style={{ fontSize: 12 }}>{pool}</span></td>
                    <td className="mono muted" style={{ textAlign: 'right', fontSize: 11.5 }}>{last}</td>
                    <td><button className="mf-icon-btn">{I.more}</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Funnel + recipients */}
          <div className="mt-6" style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 16 }}>
            <div className="mf-card">
              <div className="mf-card-h">
                <h3>Q3 Outbound · Series A SaaS</h3>
                <span className="meta">Funnel · last 14 days</span>
                <div className="actions">
                  <span className="mf-badge sage"><span className="dot" />Active</span>
                  <button className="mf-btn sm">Open campaign →</button>
                </div>
              </div>
              <div className="mf-card-b">
                {[
                  ['Sent',      1842, 100,  'var(--ink-2)'],
                  ['Delivered', 1814,  98.5,'var(--ink-2)'],
                  ['Opened',     944,  51.3,'var(--clay)'],
                  ['Clicked',    188,  10.2,'var(--clay)'],
                  ['Replied',    154,   8.4,'var(--sage)'],
                  ['Booked',      28,   1.5,'var(--sage)'],
                  ['Bounced',     28,   1.5,'var(--rose)'],
                ].map(([l, n, pct, c]) => (
                  <div key={l} style={{ padding: '10px 0', borderBottom: '1px dashed var(--hairline)' }}>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: 12 }}>
                      <span style={{ width: 90, fontSize: 13 }}>{l}</span>
                      <div style={{ flex: 1, height: 16, borderRadius: 3, background: 'var(--surface-2)', overflow: 'hidden', position: 'relative' }}>
                        <div style={{ position: 'absolute', inset: 0, width: `${pct}%`, background: c, opacity: 0.18 }} />
                        <div style={{ position: 'absolute', inset: 0, width: `${Math.min(pct * 4, 100)}%`, background: c, opacity: 0.7 }} />
                      </div>
                      <span className="mono" style={{ width: 56, textAlign: 'right' }}>{n.toLocaleString()}</span>
                      <span className="mono muted" style={{ width: 50, textAlign: 'right', fontSize: 12 }}>{pct}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mf-card">
              <div className="mf-card-h">
                <h3>AI intent breakdown</h3>
                <span className="meta">From 154 replies</span>
              </div>
              <div className="mf-card-b" style={{ display: 'flex', gap: 24 }}>
                {/* Donut */}
                <div style={{ position: 'relative', width: 160, height: 160, flex: '0 0 160px' }}>
                  <svg viewBox="0 0 42 42" width="160" height="160">
                    {(() => {
                      const segs = [['var(--sage)', 42], ['var(--clay)', 28], ['var(--amber)', 18], ['var(--rose)', 8], ['var(--muted-2)', 4]];
                      let off = 25;
                      return segs.map(([c, pct], i) => {
                        const el = <circle key={i} r="15.9" cx="21" cy="21" fill="transparent" stroke={c} strokeWidth="6" strokeDasharray={`${pct} ${100 - pct}`} strokeDashoffset={off} />;
                        off = ((off - pct) % 100 + 100) % 100;
                        return el;
                      });
                    })()}
                  </svg>
                  <div style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center', textAlign: 'center' }}>
                    <div>
                      <div className="serif" style={{ fontSize: 30, lineHeight: 1 }}>154</div>
                      <div className="mono muted" style={{ fontSize: 10, marginTop: 2 }}>REPLIES</div>
                    </div>
                  </div>
                </div>
                <div style={{ flex: 1, alignSelf: 'center' }}>
                  {[
                    ['Interested', 65, 'sage'],
                    ['Question', 43, 'clay'],
                    ['Maybe later', 28, 'amber'],
                    ['Unsubscribe', 12, 'rose'],
                    ['Out / auto', 6, ''],
                  ].map(([l, n, t]) => (
                    <div key={l} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '5px 0' }}>
                      <span style={{ width: 8, height: 8, borderRadius: 2, background: t ? `var(--${t})` : 'var(--muted-2)' }} />
                      <span style={{ fontSize: 13 }}>{l}</span>
                      <span className="mono muted" style={{ marginLeft: 'auto', fontSize: 12 }}>{n}</span>
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

Object.assign(window, { CampaignsPage });
