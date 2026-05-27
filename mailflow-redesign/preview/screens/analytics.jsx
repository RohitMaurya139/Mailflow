// Analytics
function AnalyticsPage() {
  return (
    <div className="mf mf-shell">
      <Sidebar active="analytics" />
      <div>
        <Topbar crumbs={['Analytics', 'Overview']}>
          <button className="mf-btn sm">Last 30 days {I.chevD}</button>
          <button className="mf-btn sm" style={{ marginLeft: 6 }}>{I.download} Export PDF</button>
        </Topbar>
        <main className="mf-main">
          <div className="mf-page-h">
            <div className="titles">
              <h1>Analytics</h1>
              <p className="sub">Engagement funnel, AI intent breakdown, and sender health — last 30 days.</p>
            </div>
            <button className="mf-btn sm">All campaigns {I.chevD}</button>
            <button className="mf-btn sm" style={{ marginLeft: 6 }}>All sender pools {I.chevD}</button>
          </div>

          {/* KPI strip */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
            {[
              ['Sent', '48,212', '+18.2%', false, [12000, 13000, 14000, 16000, 17500, 19000, 22000, 24800], 'var(--clay)'],
              ['Open rate', '47.8%', '+2.4pt', false, [42, 43, 44, 45, 46, 47, 47.5, 47.8], 'var(--clay)'],
              ['Reply rate', '8.6%', '+1.2pt', false, [6.0, 6.6, 7.0, 7.4, 7.8, 8.1, 8.3, 8.6], 'var(--sage)'],
              ['Booked meetings', '142', '+38', false, [12, 16, 18, 20, 22, 24, 26, 30], 'var(--sage)'],
            ].map(([l, v, d, bad, sp, c]) => (
              <div key={l} className="mf-stat">
                <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                  <div className="mf-stat-label">{l}</div>
                  <div style={{ marginLeft: 'auto' }}><Spark data={sp} color={c} fill={c} /></div>
                </div>
                <div className="mf-stat-value">{v}</div>
                <span className="mf-stat-delta">{d} <span className="muted">30d</span></span>
              </div>
            ))}
          </div>

          {/* Big chart + intent */}
          <div className="mt-6" style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: 16 }}>
            <div className="mf-card">
              <div className="mf-card-h">
                <h3>Engagement funnel</h3>
                <span className="meta">All campaigns · daily</span>
                <div className="actions">
                  <div style={{ display: 'flex', gap: 12, fontSize: 11.5, color: 'var(--muted)' }}>
                    {[['Sent', 'var(--ink-2)'], ['Opened', 'var(--clay)'], ['Replied', 'var(--sage)']].map(([l, c]) => (
                      <span key={l} style={{ display: 'flex', alignItems: 'center', gap: 4 }}><span style={{ width: 8, height: 2, background: c }} />{l}</span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="mf-card-b">
                <BigChart />
              </div>
            </div>

            <div className="mf-card">
              <div className="mf-card-h"><h3>AI intent breakdown</h3><span className="meta">2,184 replies</span></div>
              <div className="mf-card-b">
                <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
                  <div style={{ width: 160, height: 160, position: 'relative' }}>
                    <svg viewBox="0 0 42 42" width="160" height="160">
                      {(() => {
                        const segs = [['var(--sage)', 44], ['var(--clay)', 28], ['var(--amber)', 18], ['var(--rose)', 7], ['var(--muted-2)', 3]];
                        let off = 25;
                        return segs.map(([c, p], i) => {
                          const el = <circle key={i} r="15.9" cx="21" cy="21" fill="transparent" stroke={c} strokeWidth="6" strokeDasharray={`${p} ${100 - p}`} strokeDashoffset={off} />;
                          off = ((off - p) % 100 + 100) % 100;
                          return el;
                        });
                      })()}
                    </svg>
                    <div style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center', textAlign: 'center' }}>
                      <div>
                        <div className="serif" style={{ fontSize: 28 }}>2.1k</div>
                        <div className="mono muted" style={{ fontSize: 10 }}>REPLIES</div>
                      </div>
                    </div>
                  </div>
                  <div style={{ flex: 1 }}>
                    {[
                      ['Interested', 962, 'sage', '+12%'],
                      ['Question', 611, 'clay', '+8%'],
                      ['Maybe later', 393, 'amber', '+4%'],
                      ['Unsubscribe', 153, 'rose', '-2%'],
                      ['Out / auto', 65, '', ''],
                    ].map(([l, n, t, d]) => (
                      <div key={l} style={{ padding: '5px 0', display: 'flex', alignItems: 'center', gap: 8 }}>
                        <span style={{ width: 8, height: 8, borderRadius: 2, background: t ? `var(--${t})` : 'var(--muted-2)' }} />
                        <span style={{ fontSize: 13 }}>{l}</span>
                        <span className="mono muted" style={{ marginLeft: 'auto', fontSize: 12 }}>{n}</span>
                        {d && <span className="mono" style={{ fontSize: 11, color: d.startsWith('-') ? 'var(--rose)' : 'var(--sage)', width: 42, textAlign: 'right' }}>{d}</span>}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Best times + sender health */}
          <div className="mt-6" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div className="mf-card">
              <div className="mf-card-h"><h3>Best send times (reply rate)</h3><span className="meta">Heatmap · UTC</span></div>
              <div className="mf-card-b">
                <Heatmap />
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 10, fontSize: 11, color: 'var(--muted)' }}>
                  <span>Low</span>
                  <div style={{ flex: 1, height: 6, borderRadius: 3, background: 'linear-gradient(to right, var(--surface-2), var(--clay))' }} />
                  <span>High (12.4%)</span>
                </div>
              </div>
            </div>

            <div className="mf-card">
              <div className="mf-card-h"><h3>Sender health</h3><span className="meta">8 mailboxes</span></div>
              <table className="mf-table">
                <thead>
                  <tr>
                    <th style={{ paddingLeft: 18 }}>Mailbox</th>
                    <th>Status</th>
                    <th style={{ textAlign: 'right' }}>Today</th>
                    <th style={{ textAlign: 'right' }}>Cap</th>
                    <th style={{ textAlign: 'right' }}>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['acme-sales-01@dgoutreach.co', 'sage', 'Healthy', 47, 250, 12480],
                    ['acme-sales-02@dgoutreach.co', 'sage', 'Healthy', 211, 250, 11990],
                    ['acme-sales-03@dgoutreach.co', 'amber', 'Throttling', 248, 250, 9842],
                    ['acme-sales-04@dgoutreach.co', 'rose', 'Paused', 12, 250, 6204],
                    ['outbound-eu-01@dgoutreach.co', 'sage', 'Warming', 90, 200, 2100],
                    ['outbound-eu-02@dgoutreach.co', 'sage', 'Healthy', 184, 250, 5660],
                  ].map(([m, tone, status, today, cap, total], i) => (
                    <tr key={i}>
                      <td style={{ paddingLeft: 18 }} className="mono">{m}</td>
                      <td><span className={`mf-badge ${tone}`}><span className="dot" />{status}</span></td>
                      <td className="mono" style={{ textAlign: 'right' }}>{today}</td>
                      <td className="mono muted" style={{ textAlign: 'right' }}>{cap}</td>
                      <td className="mono" style={{ textAlign: 'right' }}>{total.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

function BigChart() {
  // 30 day data
  const days = 30, w = 720, h = 220, pad = 28;
  const seed = (n, b, v) => Array.from({ length: days }, (_, i) => b + Math.sin(i * 0.3 + n) * v + Math.random() * v * 0.4);
  const sent = seed(0.5, 1500, 400).map(v => v + (Math.sin(Math.random()) * 100));
  const opens = sent.map(v => v * (0.45 + Math.sin(v / 400) * 0.06));
  const reps = sent.map(v => v * (0.08 + Math.sin(v / 300) * 0.015));
  const max = Math.max(...sent);
  const path = (arr) => arr.map((v, i) => {
    const x = pad + (i / (days - 1)) * (w - pad * 2);
    const y = h - pad - (v / max) * (h - pad * 2);
    return `${i ? 'L' : 'M'}${x.toFixed(1)} ${y.toFixed(1)}`;
  }).join(' ');
  const area = (arr) => `${path(arr)} L${w - pad} ${h - pad} L${pad} ${h - pad} Z`;
  return (
    <svg viewBox={`0 0 ${w} ${h}`} width="100%" height={h} style={{ overflow: 'visible' }}>
      <defs>
        <linearGradient id="g-sent" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="var(--ink-2)" stopOpacity="0.12" />
          <stop offset="100%" stopColor="var(--ink-2)" stopOpacity="0" />
        </linearGradient>
      </defs>
      {/* gridlines */}
      {[0, 0.25, 0.5, 0.75, 1].map(p => (
        <g key={p}>
          <line x1={pad} x2={w - pad} y1={h - pad - p * (h - pad * 2)} y2={h - pad - p * (h - pad * 2)} stroke="var(--hairline)" strokeDasharray="2 4" />
          <text x={4} y={h - pad - p * (h - pad * 2) + 4} fontSize="9" fill="var(--muted)" fontFamily="var(--mono)">{Math.round(max * p / 1000)}k</text>
        </g>
      ))}
      <path d={area(sent)} fill="url(#g-sent)" />
      <path d={path(sent)} fill="none" stroke="var(--ink-2)" strokeWidth="1.5" />
      <path d={path(opens)} fill="none" stroke="var(--clay)" strokeWidth="1.5" />
      <path d={path(reps)} fill="none" stroke="var(--sage)" strokeWidth="1.5" />
      {/* x labels */}
      {[0, 7, 14, 21, 29].map(i => (
        <text key={i} x={pad + (i / (days - 1)) * (w - pad * 2)} y={h - 6} fontSize="9" fill="var(--muted)" textAnchor="middle" fontFamily="var(--mono)">{`Day ${i + 1}`}</text>
      ))}
      {/* Hover marker */}
      {(() => {
        const i = 22;
        const x = pad + (i / (days - 1)) * (w - pad * 2);
        return (
          <g>
            <line x1={x} x2={x} y1={pad} y2={h - pad} stroke="var(--ink)" strokeWidth="1" />
            <circle cx={x} cy={h - pad - (sent[i] / max) * (h - pad * 2)} r="3" fill="var(--ink)" />
            <circle cx={x} cy={h - pad - (opens[i] / max) * (h - pad * 2)} r="3" fill="var(--clay)" />
            <circle cx={x} cy={h - pad - (reps[i] / max) * (h - pad * 2)} r="3" fill="var(--sage)" />
            <rect x={x + 8} y={20} width="100" height="56" rx="6" fill="var(--ink)" />
            <text x={x + 16} y={36} fontSize="10" fill="white" fontFamily="var(--mono)">DAY 23</text>
            <text x={x + 16} y={50} fontSize="11" fill="white">Sent {Math.round(sent[i]).toLocaleString()}</text>
            <text x={x + 16} y={64} fontSize="11" fill="var(--clay-soft)">Open {Math.round(opens[i]).toLocaleString()}</text>
          </g>
        );
      })()}
    </svg>
  );
}

function Heatmap() {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const hours = [6, 8, 10, 12, 14, 16, 18, 20];
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '40px repeat(8, 1fr)', gap: 4 }}>
      <div />
      {hours.map(h => <div key={h} className="mono muted" style={{ fontSize: 10, textAlign: 'center' }}>{String(h).padStart(2, '0')}</div>)}
      {days.map((d, di) => (
        <React.Fragment key={d}>
          <div className="mono" style={{ fontSize: 10, color: 'var(--muted)', display: 'grid', placeItems: 'center' }}>{d}</div>
          {hours.map((h, hi) => {
            // create a pattern: best on tue/wed 10-14
            const dayBoost = di === 1 || di === 2 ? 1 : di === 0 || di === 3 ? 0.7 : di === 4 ? 0.5 : 0.15;
            const hourBoost = hi === 2 || hi === 3 ? 1 : hi === 1 || hi === 4 ? 0.7 : hi === 5 ? 0.5 : 0.25;
            const v = dayBoost * hourBoost;
            const val = (v * 12.4).toFixed(1);
            return (
              <div key={`${d}-${h}`} style={{ height: 28, borderRadius: 4, background: `color-mix(in oklab, var(--clay) ${v * 100}%, var(--surface-2))`, display: 'grid', placeItems: 'center' }}>
                <span className="mono" style={{ fontSize: 9.5, color: v > 0.5 ? 'white' : 'var(--muted)' }}>{val}</span>
              </div>
            );
          })}
        </React.Fragment>
      ))}
    </div>
  );
}

Object.assign(window, { AnalyticsPage, BigChart, Heatmap });
