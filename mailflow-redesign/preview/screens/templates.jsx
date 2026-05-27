// Templates - editor with edit/preview tabs
function TemplatesPage() {
  return (
    <div className="mf mf-shell">
      <Sidebar active="templates" />
      <div>
        <Topbar crumbs={['Templates', 'cold-intro-v3']}>
          <button className="mf-btn sm">{I.sparkles} AI variants</button>
        </Topbar>
        <main className="mf-main">
          <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr 320px', gap: 16, height: 'calc(100vh - 56px - 64px)' }}>
            {/* Template list */}
            <aside style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
                <h2 className="serif" style={{ fontSize: 24, letterSpacing: '-0.02em' }}>Templates</h2>
                <span className="mf-badge" style={{ marginLeft: 'auto' }}>7</span>
              </div>
              <button className="mf-btn clay sm" style={{ width: '100%', justifyContent: 'center' }}>{I.plus} New template</button>
              <div className="mt-3" style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 6 }}>
                {[
                  ['cold-intro-v3', 'Cold outreach · 4-line opener', 'sage', 'Active', '8.4%', true],
                  ['bump-soft-01', 'Follow-up · "in case it slipped"', 'sage', 'Active', '6.1%', false],
                  ['case-study-northbeam', 'Value drop · Northbeam case', 'sage', 'Active', '11.2%', false],
                  ['breakup-honest', 'Break-up · "closing the loop"', 'amber', 'A/B', '14.6%', false],
                  ['founder-newsletter-v2', 'Newsletter reactivation', 'sage', 'Active', '12.1%', false],
                  ['event-followup-saastr', 'Event follow-up · SaaStr', '', 'Draft', '—', false],
                  ['hot-lead-warm-handoff', 'Manual reply · hot handoff', '', 'Snippet', '—', false],
                ].map(([slug, desc, tone, status, reply, active], i) => (
                  <div key={slug} style={{ padding: 12, border: '1px solid', borderColor: active ? 'var(--clay)' : 'var(--hairline)', borderRadius: 8, background: active ? 'rgba(182,90,62,0.05)' : 'var(--surface)', cursor: 'pointer' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <span className="mono" style={{ fontSize: 12, fontWeight: 500 }}>{slug}</span>
                      {tone && <span style={{ width: 6, height: 6, borderRadius: '50%', background: `var(--${tone})`, marginLeft: 'auto' }} />}
                    </div>
                    <div className="muted" style={{ fontSize: 12, marginTop: 4 }}>{desc}</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 8 }}>
                      <span className={`mf-badge ${tone || 'ghost'}`} style={{ fontSize: 10 }}>{status}</span>
                      <span className="mono muted" style={{ marginLeft: 'auto', fontSize: 10.5 }}>{reply} reply</span>
                    </div>
                  </div>
                ))}
              </div>
            </aside>

            {/* Editor */}
            <div className="mf-card" style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
              <div className="mf-card-h" style={{ padding: '12px 18px' }}>
                <h3 style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 15 }}>
                  <span className="mono">cold-intro-v3</span>
                  <span className="mf-badge sage" style={{ fontSize: 10 }}><span className="dot" />Active</span>
                </h3>
                <div style={{ marginLeft: 16, display: 'flex', gap: 0, background: 'var(--surface-2)', borderRadius: 6, padding: 3 }}>
                  {['Edit', 'Preview', 'Variants', 'History'].map((t, i) => (
                    <button key={t} className="mf-btn sm" style={{ background: i === 0 ? 'var(--surface)' : 'transparent', border: 'none', boxShadow: i === 0 ? 'var(--shadow-card)' : 'none', height: 24, padding: '2px 10px', fontSize: 12 }}>{t}</button>
                  ))}
                </div>
                <div className="actions">
                  <button className="mf-btn sm">Save draft</button>
                  <button className="mf-btn sm clay">Publish</button>
                </div>
              </div>

              {/* Editor area */}
              <div style={{ flex: 1, overflow: 'auto', padding: '20px 24px' }}>
                <div>
                  <div className="mf-label">Subject</div>
                  <input className="mf-input" defaultValue="{{first_name}}, a 15-min question about Q3 outbound" />
                </div>

                {/* Toolbar */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 18, padding: '6px 10px', border: '1px solid var(--hairline)', borderRadius: 6, background: 'var(--canvas)' }}>
                  {['B', 'I', 'U', 'S'].map(c => <button key={c} className="mf-btn sm" style={{ width: 28, padding: 0, justifyContent: 'center', fontWeight: c === 'B' ? 700 : c === 'I' ? 400 : 500, fontStyle: c === 'I' ? 'italic' : 'normal', textDecoration: c === 'U' ? 'underline' : c === 'S' ? 'line-through' : 'none' }}>{c}</button>)}
                  <div style={{ width: 1, height: 18, background: 'var(--hairline)', margin: '0 4px' }} />
                  <button className="mf-btn sm">{I.paperclip} Attach</button>
                  <button className="mf-btn sm">{I.doc} Variable</button>
                  <button className="mf-btn sm">{I.sparkles} AI rewrite</button>
                  <span className="mono muted" style={{ marginLeft: 'auto', fontSize: 11 }}>HTML · 142 words · 0.9 spam score</span>
                </div>

                {/* Body */}
                <div style={{ marginTop: 12, padding: '22px 26px', border: '1px solid var(--hairline)', borderRadius: 6, background: 'var(--surface)', minHeight: 320, fontSize: 14, lineHeight: 1.6 }}>
                  <p>Hi <span className="mf-tag" style={{ background: 'var(--clay-soft)', color: 'var(--clay-ink)' }}>{`{{first_name}}`}</span>,</p>
                  <p className="mt-3">Saw the post on <span className="mf-tag" style={{ background: 'var(--clay-soft)', color: 'var(--clay-ink)' }}>{`{{company}}`}</span>'s Q1 attribution work — and the <span style={{ borderBottom: '1px dashed var(--clay)' }}>follow-up thread on dashboards</span> got passed around our team.</p>
                  <p className="mt-3">We've been helping similar teams ({`{{`}peer_companies{`}}`}) shave 18+ hours/week on cold outreach with multi-mailbox rotation and an AI inbox. <i>Worth a 15-min look?</i></p>
                  <p className="mt-3">If timing's off, no worries — happy to send a Loom instead.</p>
                  <p className="mt-3">— Rohit</p>
                  <p className="mt-3 muted" style={{ fontSize: 12 }}>p.s. <span className="mf-tag" style={{ background: 'var(--clay-soft)', color: 'var(--clay-ink)' }}>{`{{recent_post_hook}}`}</span></p>
                </div>

                {/* AI hints */}
                <div className="mt-4" style={{ padding: '14px 16px', border: '1px solid var(--clay-soft)', background: 'rgba(182,90,62,0.05)', borderRadius: 8, display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                  <span style={{ color: 'var(--clay)' }}>{I.sparkles}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, fontWeight: 500 }}>Two suggestions from the AI</div>
                    <ul style={{ margin: '8px 0 0', paddingLeft: 16, fontSize: 13, lineHeight: 1.55, color: 'var(--ink-2)' }}>
                      <li>Shorten line 2 by ~7 words — currently 31, top quartile is 18-24.</li>
                      <li>Replace "Worth a 15-min look?" with a specific time — replies improve 14% with concrete asks.</li>
                    </ul>
                  </div>
                  <button className="mf-btn sm clay">Apply both</button>
                </div>
              </div>
            </div>

            {/* Right: meta + performance */}
            <aside style={{ display: 'flex', flexDirection: 'column', gap: 14, overflow: 'auto' }}>
              <div className="mf-card">
                <div className="mf-card-h"><h3>Performance</h3><span className="meta">14d · 1,842 sent</span></div>
                <div className="mf-card-b">
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                    <div><div className="mono muted" style={{ fontSize: 10 }}>OPEN</div><div className="serif" style={{ fontSize: 24 }}>51%</div></div>
                    <div><div className="mono muted" style={{ fontSize: 10 }}>REPLY</div><div className="serif" style={{ fontSize: 24, color: 'var(--clay)' }}>8.4%</div></div>
                    <div><div className="mono muted" style={{ fontSize: 10 }}>BOUNCE</div><div className="serif" style={{ fontSize: 24 }}>1.4%</div></div>
                    <div><div className="mono muted" style={{ fontSize: 10 }}>UNSUB</div><div className="serif" style={{ fontSize: 24 }}>0.6%</div></div>
                  </div>
                  <div className="mf-rule mt-3" />
                  <div className="mt-3">
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, fontFamily: 'var(--mono)', color: 'var(--muted)' }}><span>REPLY RATE · 14D</span><span>↗ +0.7pt</span></div>
                    <div className="mt-2"><Spark data={[6, 7, 6.5, 7.2, 7.8, 8, 7.9, 8.1, 8.3, 8.0, 8.4, 8.6, 8.4, 8.4]} w={236} h={42} color="var(--clay)" fill="var(--clay)" /></div>
                  </div>
                </div>
              </div>

              <div className="mf-card">
                <div className="mf-card-h"><h3>Variables</h3></div>
                <div className="mf-card-b" style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {[['first_name', 'string', '99% coverage'], ['company', 'string', '94%'], ['recent_post_hook', 'AI', '78%'], ['peer_companies', 'AI', '82%']].map(([n, t, c]) => (
                    <div key={n} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12 }}>
                      <span className="mf-tag" style={{ background: 'var(--clay-soft)', color: 'var(--clay-ink)' }}>{n}</span>
                      <span className="muted">{t}</span>
                      <span className="mono muted" style={{ marginLeft: 'auto', fontSize: 11 }}>{c}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mf-card">
                <div className="mf-card-h"><h3>A/B variant</h3><span className="meta">vs. cold-intro-v3-b</span></div>
                <div className="mf-card-b">
                  <div style={{ fontSize: 13, lineHeight: 1.5 }}>This variant is winning on reply rate by <b style={{ color: 'var(--sage)' }}>+1.2pt</b> across 1,842 sends. Confidence <span className="mono">94%</span>.</div>
                  <button className="mf-btn sm clay" style={{ marginTop: 12, width: '100%', justifyContent: 'center' }}>Promote to default {I.arrowR}</button>
                </div>
              </div>
            </aside>
          </div>
        </main>
      </div>
    </div>
  );
}

Object.assign(window, { TemplatesPage });
