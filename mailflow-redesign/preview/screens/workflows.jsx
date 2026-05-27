// Workflows builder
function WorkflowsPage() {
  return (
    <div className="mf mf-shell">
      <Sidebar active="workflows" />
      <div>
        <Topbar crumbs={['Workflows', 'Hot-reply playbook']}>
          <button className="mf-btn sm">Run history</button>
          <button className="mf-btn sm clay">{I.check} Save & enable</button>
        </Topbar>
        <main className="mf-main">
          <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr 300px', gap: 16, minHeight: 'calc(100vh - 56px - 60px)' }}>
            {/* Workflows list */}
            <aside>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                <h2 className="serif" style={{ fontSize: 24 }}>Workflows</h2>
                <span className="mf-badge" style={{ marginLeft: 'auto' }}>5</span>
              </div>
              <button className="mf-btn clay sm" style={{ width: '100%', justifyContent: 'center' }}>{I.plus} New workflow</button>
              <div className="mt-3" style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {[
                  ['Hot-reply playbook', 'Reply → tag + Slack', 'sage', 'On', 412, true],
                  ['Maybe-later → ping Q3', 'Intent → schedule', 'sage', 'On', 184, false],
                  ['Unsub auto-tag + clean', 'Reply → suppress', 'sage', 'On', 91, false],
                  ['Bounce → suppress + alert', 'Bounce → notify', 'amber', 'On', 38, false],
                  ['Reward · pilot grant', 'Tag → webhook', '', 'Off', 0, false],
                ].map(([name, trig, tone, status, runs, active], i) => (
                  <div key={name} style={{ padding: 12, border: '1px solid', borderColor: active ? 'var(--clay)' : 'var(--hairline)', borderRadius: 8, background: active ? 'rgba(182,90,62,0.05)' : 'var(--surface)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <span style={{ fontSize: 13, fontWeight: 500 }}>{name}</span>
                      <span style={{ marginLeft: 'auto', width: 30, height: 16, borderRadius: 8, background: status === 'On' ? 'var(--sage)' : 'var(--hairline-strong)', position: 'relative' }}>
                        <span style={{ position: 'absolute', top: 2, left: status === 'On' ? 16 : 2, width: 12, height: 12, borderRadius: '50%', background: 'white' }} />
                      </span>
                    </div>
                    <div className="muted" style={{ fontSize: 12, marginTop: 3 }}>{trig}</div>
                    <div className="mono muted mt-2" style={{ fontSize: 10.5 }}>{runs} runs · 7d</div>
                  </div>
                ))}
              </div>
            </aside>

            {/* Canvas */}
            <div className="mf-card" style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
              <div className="mf-card-h">
                <h3 style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 15 }}>Hot-reply playbook <span className="mf-badge sage" style={{ fontSize: 10 }}><span className="dot" />On</span></h3>
                <span className="meta">412 runs · 100% success · last fired 2m ago</span>
                <div className="actions">
                  <button className="mf-btn sm">{I.sparkles} AI build</button>
                </div>
              </div>
              <div style={{ flex: 1, padding: '32px 32px 48px', background: `radial-gradient(circle at 1px 1px, var(--hairline) 1px, transparent 1px) 0 0/16px 16px`, overflow: 'auto' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 0, alignItems: 'center', minWidth: 460 }}>
                  {/* Trigger */}
                  <div style={{ width: 360, padding: 14, borderRadius: 10, background: 'var(--canvas)', border: '1.5px solid var(--clay)', boxShadow: '0 0 0 4px rgba(182,90,62,0.1)' }}>
                    <div className="mono" style={{ fontSize: 10, color: 'var(--clay)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Trigger · when</div>
                    <div style={{ marginTop: 6, fontSize: 14, fontWeight: 500, display: 'flex', alignItems: 'center', gap: 8 }}>{I.inbox} Reply received</div>
                    <div className="muted" style={{ marginTop: 6, fontSize: 12 }}>From any campaign · any sender pool</div>
                  </div>
                  <Connector />

                  {/* Condition */}
                  <div style={{ width: 360, padding: 14, borderRadius: 10, background: 'var(--surface)', border: '1px solid var(--hairline)' }}>
                    <div className="mono" style={{ fontSize: 10, color: 'var(--amber)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>If · condition</div>
                    <div style={{ marginTop: 6, fontSize: 14, fontWeight: 500 }}>AI intent <span className="mf-tag">is</span> <span className="mf-badge sage" style={{ fontSize: 10.5 }}>Interested</span> <span className="muted">AND</span></div>
                    <div style={{ marginTop: 6, fontSize: 14, fontWeight: 500 }}>Confidence <span className="mf-tag">≥</span> <span className="mono mf-tag">0.85</span></div>
                  </div>
                  <Connector />

                  {/* Branch */}
                  <div style={{ display: 'flex', gap: 24, alignItems: 'flex-start' }}>
                    {/* True branch (3 actions) */}
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0 }}>
                      <div className="mono" style={{ fontSize: 10, color: 'var(--sage)', letterSpacing: '0.08em', marginBottom: 6 }}>↓ TRUE</div>
                      {[
                        ['Tag contact', `Add tag pilot-Q3 + hot`, 'tag'],
                        ['Notify Slack', `Channel #sales · "{{contact_name}} replied"`, 'slack'],
                        ['Move to list', 'List: Pilot · Northbeam', 'list'],
                        ['Draft suggested reply', 'Model haiku-4.5 · queue for human review', 'ai'],
                      ].map(([t, d, ic], i, a) => (
                        <React.Fragment key={i}>
                          <div style={{ width: 280, padding: 12, borderRadius: 8, background: 'var(--surface)', border: '1px solid var(--hairline)' }}>
                            <div className="mono" style={{ fontSize: 9.5, color: 'var(--muted)', letterSpacing: '0.08em' }}>ACTION · 0{i + 1}</div>
                            <div style={{ marginTop: 4, fontSize: 13, fontWeight: 500, display: 'flex', alignItems: 'center', gap: 6 }}>
                              {ic === 'tag' ? '🏷️' : ic === 'slack' ? '#' : ic === 'list' ? '☰' : '✦'}
                              {t}
                            </div>
                            <div className="muted" style={{ fontSize: 12, marginTop: 4 }}>{d}</div>
                          </div>
                          {i < a.length - 1 && <Connector small />}
                        </React.Fragment>
                      ))}
                      <Connector small />
                      <div style={{ width: 60, height: 60, borderRadius: '50%', background: 'var(--sage-soft)', border: '1.5px solid var(--sage)', display: 'grid', placeItems: 'center', color: 'var(--sage)' }}>{I.check}</div>
                    </div>

                    {/* False branch */}
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      <div className="mono" style={{ fontSize: 10, color: 'var(--muted)', letterSpacing: '0.08em', marginBottom: 6 }}>↓ FALSE</div>
                      <div style={{ width: 220, padding: 12, borderRadius: 8, background: 'var(--surface)', border: '1px dashed var(--hairline-strong)', color: 'var(--muted)' }}>
                        <div className="mono" style={{ fontSize: 9.5, letterSpacing: '0.08em' }}>FALLBACK</div>
                        <div style={{ marginTop: 4, fontSize: 13 }}>Continue default sequence</div>
                      </div>
                      <Connector small />
                      <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'var(--surface)', border: '1.5px dashed var(--hairline-strong)', display: 'grid', placeItems: 'center', color: 'var(--muted)', fontSize: 18 }}>·</div>
                    </div>
                  </div>

                  <button className="mf-btn sm" style={{ marginTop: 24, borderStyle: 'dashed', color: 'var(--muted)' }}>{I.plus} Add branch</button>
                </div>
              </div>
            </div>

            {/* Right inspector */}
            <aside style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div className="mf-card">
                <div className="mf-card-h"><h3>Action · Tag contact</h3></div>
                <div className="mf-card-b" style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <div>
                    <div className="mf-label">Tags to add</div>
                    <div style={{ padding: 8, border: '1px solid var(--hairline)', borderRadius: 6, background: 'var(--canvas)', display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                      <span className="mf-tag" style={{ background: 'var(--clay-soft)', color: 'var(--clay-ink)' }}>pilot-Q3 ×</span>
                      <span className="mf-tag" style={{ background: 'var(--clay-soft)', color: 'var(--clay-ink)' }}>hot ×</span>
                      <span className="mf-tag" style={{ background: 'transparent', color: 'var(--muted)' }}>+ add</span>
                    </div>
                  </div>
                  <div>
                    <div className="mf-label">Also remove</div>
                    <div style={{ padding: 8, border: '1px solid var(--hairline)', borderRadius: 6, background: 'var(--canvas)' }}>
                      <span className="mf-tag">unresponsive ×</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mf-card">
                <div className="mf-card-h"><h3>Recent runs</h3></div>
                <div>
                  {[
                    ['Priya Shah', '2m ago', 'sage'],
                    ['M. Okafor', '14m ago', 'sage'],
                    ['R. Almeida', '6h ago', 'sage'],
                    ['Tom Hartwell', '11h ago', 'sage'],
                    ['Leah Brooks', '1d ago', 'sage'],
                  ].map(([n, t, tone], i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 16px', borderTop: i ? '1px dashed var(--hairline)' : 0, fontSize: 13 }}>
                      <span style={{ width: 6, height: 6, borderRadius: '50%', background: `var(--${tone})` }} />
                      <span>{n}</span>
                      <span className="mono muted" style={{ marginLeft: 'auto', fontSize: 11 }}>{t}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mf-card">
                <div className="mf-card-h"><h3>Tips</h3></div>
                <div className="mf-card-b">
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: 12.5, color: 'var(--ink-2)', lineHeight: 1.55 }}>
                    <span style={{ color: 'var(--clay)' }}>{I.sparkles}</span>
                    <span>Three of your last 412 runs would have benefited from a "Schedule meeting" action. <span style={{ color: 'var(--clay)' }}>Add Cal.com step?</span></span>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </main>
      </div>
    </div>
  );
}

function Connector({ small }) {
  return (
    <div style={{ width: small ? 1 : 2, height: small ? 14 : 22, background: 'var(--hairline-strong)', position: 'relative' }}>
      <div style={{ position: 'absolute', bottom: -1, left: '50%', transform: 'translateX(-50%)', width: 0, height: 0, borderLeft: '4px solid transparent', borderRight: '4px solid transparent', borderTop: `5px solid var(--hairline-strong)` }} />
    </div>
  );
}

Object.assign(window, { WorkflowsPage, Connector });
