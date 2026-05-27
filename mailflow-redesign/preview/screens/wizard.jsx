// Campaign wizard — step 3 (sequence)
function WizardPage() {
  const steps = ['Audience', 'Sender pool', 'Sequence', 'Schedule', 'Review'];
  const current = 2;
  return (
    <div className="mf mf-shell">
      <Sidebar active="campaigns" />
      <div>
        <Topbar crumbs={['Campaigns', 'New', 'Q3 Outbound · Series A SaaS']}>
          <button className="mf-btn sm ghost">Save draft</button>
          <button className="mf-btn sm">Exit</button>
        </Topbar>
        <main className="mf-main" style={{ paddingTop: 20 }}>
          {/* Stepper */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 0, padding: '4px 0 28px' }}>
            {steps.map((s, i) => (
              <React.Fragment key={s}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ width: 26, height: 26, borderRadius: '50%', display: 'grid', placeItems: 'center', background: i < current ? 'var(--sage)' : i === current ? 'var(--ink)' : 'transparent', color: i <= current ? 'white' : 'var(--muted)', border: i === current ? 'none' : i > current ? '1.5px dashed var(--hairline-strong)' : 'none', fontSize: 11, fontFamily: 'var(--mono)' }}>{i < current ? I.check : i + 1}</span>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span className="mono muted" style={{ fontSize: 10, letterSpacing: '0.06em', textTransform: 'uppercase' }}>Step 0{i + 1}</span>
                    <span style={{ fontSize: 13.5, fontWeight: i === current ? 500 : 400, color: i <= current ? 'var(--ink)' : 'var(--muted)' }}>{s}</span>
                  </div>
                </div>
                {i < steps.length - 1 && <div style={{ flex: 1, height: 1, borderTop: `1px ${i < current ? 'solid var(--sage)' : 'dashed var(--hairline-strong)'}`, margin: '0 16px' }} />}
              </React.Fragment>
            ))}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: 24 }}>
            {/* Left: sequence editor */}
            <div>
              <h2 className="serif" style={{ fontSize: 32, letterSpacing: '-0.02em' }}>Build the sequence.</h2>
              <p className="muted" style={{ marginTop: 6, fontSize: 14 }}>Up to 6 follow-ups. Each step inherits the thread; replies stop the cadence automatically.</p>

              {/* Steps */}
              <div className="mt-4" style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                {[
                  { day: 0, label: 'Intro', tmpl: 'cold-intro-v3', subj: '{{first_name}}, a 15-min question about Q3 outbound', preview: 'Hi {{first_name}} — saw the post on {{company}}\'s attribution work. We help similar teams shave 18+ hrs/week on cold outreach. Worth a quick look?', active: false, sent: 1842, open: '51%', reply: '8.4%' },
                  { day: 3, label: 'Bump', tmpl: 'bump-soft-01', subj: 'Re: {{prev_subject}}', preview: 'Quick bump in case the first slipped past — happy to send a 3-min Loom instead of a meeting if that\'s easier.', active: true, sent: 1422, open: '38%', reply: '6.1%' },
                  { day: 7, label: 'Value drop', tmpl: 'case-study-northbeam', subj: '{{first_name}} — how Northbeam did this', preview: 'Sharing a one-pager on how Northbeam cut their reply-handling time by 62%. Even if Mailflow isn\'t for you, the playbook might be.', active: false, sent: 980, open: '44%', reply: '11.2%' },
                  { day: 12, label: 'Break-up', tmpl: 'breakup-honest', subj: 'Closing the loop, {{first_name}}', preview: 'Closing the loop so I\'m not noise. If timing\'s wrong, I\'ll archive — just hit reply with "later" and we\'ll skip ahead to {{quarter}}.', active: false, sent: 612, open: '58%', reply: '14.6%' },
                ].map((s, i, all) => (
                  <div key={i} style={{ display: 'grid', gridTemplateColumns: '60px 1fr', gap: 0, position: 'relative' }}>
                    {/* Timeline gutter */}
                    <div style={{ position: 'relative' }}>
                      <div style={{ position: 'absolute', left: 14, top: 0, bottom: i === all.length - 1 ? '50%' : 0, width: 1, background: 'var(--hairline-strong)', borderLeft: '1px dashed var(--hairline-strong)' }} />
                      <div style={{ position: 'absolute', left: 6, top: 18, width: 18, height: 18, borderRadius: '50%', background: 'var(--canvas)', border: '1.5px solid ' + (s.active ? 'var(--clay)' : 'var(--hairline-strong)'), display: 'grid', placeItems: 'center', fontSize: 10, fontFamily: 'var(--mono)' }}>{i + 1}</div>
                    </div>
                    {/* Card */}
                    <div className="mf-card" style={{ marginBottom: 14, borderColor: s.active ? 'var(--clay)' : 'var(--hairline)', boxShadow: s.active ? '0 0 0 3px rgba(182,90,62,0.08)' : 'none' }}>
                      <div className="mf-card-h" style={{ padding: '12px 18px' }}>
                        <span className="mono" style={{ fontSize: 11, color: 'var(--muted)' }}>DAY +{s.day}</span>
                        <h3 style={{ marginLeft: 8 }}>{s.label}</h3>
                        <span className="mf-badge" style={{ marginLeft: 6, fontSize: 10.5 }}>{s.tmpl}</span>
                        <div className="actions">
                          {s.sent ? (
                            <span className="mono muted" style={{ fontSize: 11 }}>{s.sent.toLocaleString()} sent · {s.open} open · {s.reply} reply</span>
                          ) : <span className="mf-badge ghost">Not sent yet</span>}
                          <button className="mf-icon-btn">{I.more}</button>
                        </div>
                      </div>
                      <div className="mf-card-b" style={{ padding: '14px 18px' }}>
                        <div className="mono muted" style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Subject</div>
                        <div style={{ fontSize: 14, marginTop: 4 }}>{s.subj}</div>
                        <div className="mono muted mt-2" style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Preview</div>
                        <div className="muted" style={{ fontSize: 13, marginTop: 4, lineHeight: 1.5 }}>{s.preview}</div>
                      </div>
                    </div>
                  </div>
                ))}
                <button className="mf-btn" style={{ alignSelf: 'flex-start', marginLeft: 60, borderStyle: 'dashed' }}>{I.plus} Add follow-up step</button>
              </div>
            </div>

            {/* Right: rules + preview */}
            <aside style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div className="mf-card">
                <div className="mf-card-h"><h3>Sequence rules</h3></div>
                <div className="mf-card-b" style={{ display: 'flex', flexDirection: 'column', gap: 14, fontSize: 13 }}>
                  {[
                    ['Stop on reply', true],
                    ['Stop on click', false],
                    ['Stop on meeting booked', true],
                    ['Skip OOO auto-replies', true],
                    ['Auto-pause on bounce rate >2%', true],
                  ].map(([l, v]) => (
                    <label key={l} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <span style={{ width: 32, height: 18, borderRadius: 10, background: v ? 'var(--clay)' : 'var(--hairline-strong)', position: 'relative', flex: '0 0 32px' }}>
                        <span style={{ position: 'absolute', top: 2, left: v ? 16 : 2, width: 14, height: 14, borderRadius: '50%', background: 'white' }} />
                      </span>
                      <span>{l}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="mf-card">
                <div className="mf-card-h"><h3>AI personalization</h3><span className="mf-badge clay" style={{ marginLeft: 6, fontSize: 10 }}>Beta</span></div>
                <div className="mf-card-b">
                  <div className="mono muted" style={{ fontSize: 10.5, letterSpacing: '0.06em', textTransform: 'uppercase' }}>Variables in use</div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 8 }}>
                    {['first_name', 'company', 'recent_post', 'quarter', 'prev_subject'].map(v => (
                      <span key={v} className="mf-tag">{`{{${v}}}`}</span>
                    ))}
                  </div>
                  <div className="mf-rule mt-3" />
                  <label style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginTop: 14, fontSize: 13 }}>
                    <span style={{ width: 16, height: 16, borderRadius: 4, border: '1.5px solid var(--clay)', background: 'var(--clay)', color: 'white', display: 'grid', placeItems: 'center', flex: '0 0 16px', marginTop: 1 }}>{I.check}</span>
                    <span>Rewrite opener per recipient using <span className="mono">recent_post</span></span>
                  </label>
                  <label style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginTop: 10, fontSize: 13 }}>
                    <span style={{ width: 16, height: 16, borderRadius: 4, border: '1.5px solid var(--hairline-strong)', flex: '0 0 16px', marginTop: 1 }} />
                    <span>Match tone to inferred seniority</span>
                  </label>
                </div>
              </div>

              <div className="mf-card">
                <div className="mf-card-h"><h3>Preview</h3><span className="meta">As Priya Shah · Northbeam</span></div>
                <div className="mf-card-b" style={{ background: 'var(--canvas)', borderRadius: 'inherit', padding: 16 }}>
                  <div className="mono muted" style={{ fontSize: 10.5 }}>SUBJECT</div>
                  <div style={{ fontSize: 13.5, marginTop: 4 }}>Priya, a 15-min question about Q3 outbound</div>
                  <div className="mono muted mt-2" style={{ fontSize: 10.5 }}>BODY</div>
                  <p style={{ fontSize: 13, lineHeight: 1.55, marginTop: 4, color: 'var(--ink-2)' }}>Hi Priya — saw your post on <u style={{ color: 'var(--clay)', textDecoration: 'none', borderBottom: '1px dashed var(--clay)' }}>Northbeam's Q1 attribution work</u>. We help similar teams shave 18+ hrs/week on cold outreach…</p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end', position: 'sticky', bottom: 24 }}>
                <button className="mf-btn">← Back</button>
                <button className="mf-btn primary">Continue {I.arrowR}</button>
              </div>
            </aside>
          </div>
        </main>
      </div>
    </div>
  );
}

Object.assign(window, { WizardPage });
