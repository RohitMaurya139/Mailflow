// Marketing landing page
function MarketingPage() {
  return (
    <div className="mf" style={{ minHeight: '100%', background: 'var(--canvas)', position: 'relative', overflow: 'hidden' }}>
      {/* Soft radial wash behind hero */}
      <div style={{
        position: 'absolute', inset: '-200px 0 auto 0', height: 900,
        background: 'radial-gradient(60% 60% at 50% 20%, rgba(182,90,62,0.10) 0%, rgba(182,90,62,0) 70%)',
        pointerEvents: 'none',
      }} />
      {/* Nav */}
      <nav style={{ display: 'flex', alignItems: 'center', padding: '22px 56px', position: 'relative', zIndex: 2 }}>
        <Brand small />
        <div style={{ display: 'flex', gap: 28, marginLeft: 56, fontSize: 13.5, color: 'var(--ink-2)' }}>
          <span>Product <span style={{ color: 'var(--muted-2)' }}>▾</span></span>
          <span>Workflows</span>
          <span>Deliverability</span>
          <span>Pricing</span>
          <span>Changelog <span className="mf-badge sage" style={{ marginLeft: 4, fontSize: 10 }}>v2.4</span></span>
        </div>
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ fontSize: 13.5, color: 'var(--ink-2)' }}>Sign in</span>
          <button className="mf-btn primary">Start free trial {I.arrowR}</button>
        </div>
      </nav>

      {/* Hero */}
      <section style={{ padding: '80px 56px 0', position: 'relative', zIndex: 2 }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '5px 12px 5px 5px', border: '1px solid var(--hairline)', borderRadius: 999, background: 'var(--surface)', fontSize: 12.5, color: 'var(--ink-2)' }}>
          <span className="mf-badge sage" style={{ fontSize: 10.5 }}><span className="dot" />NEW</span>
          <span>Intent classifier v3 — now catching “maybe later” replies</span>
          <span style={{ color: 'var(--clay)' }}>Read post →</span>
        </div>
        <h1 className="serif" style={{ fontSize: 96, lineHeight: 0.95, letterSpacing: '-0.035em', marginTop: 26, maxWidth: 1100, fontWeight: 400 }}>
          Cold email,<br />
          <span style={{ color: 'var(--clay)', fontStyle: 'italic' }}>warm enough</span> to reply to.
        </h1>
        <p style={{ marginTop: 28, maxWidth: 560, fontSize: 17, lineHeight: 1.45, color: 'var(--ink-2)' }}>
          Mailflow rotates your fleet of Gmail and SMTP mailboxes, classifies every reply with AI,
          and runs the follow-ups for you. One dashboard. Zero per-seat math.
        </p>
        <div style={{ marginTop: 28, display: 'flex', alignItems: 'center', gap: 12 }}>
          <button className="mf-btn primary lg">Start free — no card {I.arrowR}</button>
          <button className="mf-btn lg" style={{ background: 'transparent', borderColor: 'var(--hairline-strong)' }}>Book a 15-min demo</button>
          <div style={{ marginLeft: 16, fontSize: 12.5, color: 'var(--muted)', display: 'flex', gap: 10 }}>
            <span className="mono">SOC 2 · Type II</span><span>·</span><span>GDPR-ready</span>
          </div>
        </div>

        {/* Product preview slab */}
        <div style={{ marginTop: 64, borderRadius: 14, border: '1px solid var(--hairline)', background: 'var(--surface)', boxShadow: '0 20px 60px -20px rgba(27,24,20,0.18), 0 2px 0 rgba(27,24,20,0.04)', overflow: 'hidden' }}>
          {/* Window chrome */}
          <div style={{ height: 32, borderBottom: '1px solid var(--hairline)', display: 'flex', alignItems: 'center', padding: '0 14px', gap: 6, background: 'var(--canvas)' }}>
            <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#E5C2B9' }} />
            <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#E9D9B4' }} />
            <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#C9D9C8' }} />
            <span className="mono" style={{ margin: '0 auto', fontSize: 11, color: 'var(--muted)' }}>app.mailflow.io / inbox</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '220px 320px 1fr 280px', height: 480 }}>
            {/* Mini sidebar */}
            <div style={{ padding: '14px 12px', borderRight: '1px solid var(--hairline)', display: 'flex', flexDirection: 'column', gap: 3 }}>
              <Brand small />
              <div className="mf-nav-group" style={{ padding: '12px 8px 4px' }}>Workspace</div>
              {[['Inbox', true, '12'], ['Campaigns', false, '4'], ['Contacts', false], ['Templates', false], ['Workflows', false], ['Accounts', false, '8']].map(([n, a, b], i) => (
                <div key={i} className={`mf-nav-item ${a ? 'is-active' : ''}`}>
                  {[I.inbox, I.send, I.users, I.doc, I.flow, I.mail][i]}<span>{n}</span>
                  {b && <span className="mf-nav-badge">{b}</span>}
                </div>
              ))}
            </div>
            {/* Thread list */}
            <div style={{ borderRight: '1px solid var(--hairline)', overflow: 'hidden' }}>
              <div style={{ padding: '12px 14px', borderBottom: '1px solid var(--hairline)', display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontFamily: 'var(--serif)', fontSize: 17 }}>Replies</span>
                <span className="mf-badge clay" style={{ fontSize: 10 }}>12</span>
                <span style={{ marginLeft: 'auto', color: 'var(--muted)' }}>{I.filter}</span>
              </div>
              {[
                ['Priya Shah', 'Q1 budget intro', 'Yes — let’s find a time next week.', 'sage', 'Interested', '2m'],
                ['M. Okafor', 'Re: pilot proposal', 'Can you send pricing for 20 seats?', 'sage', 'Question', '14m'],
                ['Dana Liu', 'Reaching out', 'Not the right time, ping in Q3.', 'amber', 'Maybe later', '1h'],
                ['Jonas K.', '5-min favor', 'Please remove me from this list.', 'rose', 'Unsubscribe', '3h'],
                ['Sara N.', 'Coffee?', 'Out of office until Aug 14…', '', 'Auto-reply', '5h'],
              ].map(([who, sub, snippet, tone, intent, t], i) => (
                <div key={i} style={{ padding: '12px 14px', borderBottom: '1px solid var(--hairline)', background: i === 0 ? 'rgba(182,90,62,0.04)' : 'transparent', borderLeft: i === 0 ? '2px solid var(--clay)' : '2px solid transparent' }}>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
                    <span style={{ fontWeight: 500, fontSize: 13 }}>{who}</span>
                    <span className="mono muted" style={{ marginLeft: 'auto', fontSize: 11 }}>{t}</span>
                  </div>
                  <div style={{ fontSize: 12.5, marginTop: 2 }}>{sub}</div>
                  <div className="muted" style={{ fontSize: 12, marginTop: 2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{snippet}</div>
                  <div style={{ marginTop: 6 }}>
                    {tone ? <span className={`mf-badge ${tone}`} style={{ fontSize: 10 }}>{intent}</span>
                          : <span className="mf-badge ghost" style={{ fontSize: 10 }}>{intent}</span>}
                  </div>
                </div>
              ))}
            </div>
            {/* Conversation */}
            <div style={{ padding: '18px 24px', overflow: 'hidden' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ fontFamily: 'var(--serif)', fontSize: 22 }}>Q1 budget intro</span>
                <span className="mf-badge sage"><span className="dot" />Interested</span>
                <span className="mf-badge">Pilot · Round 2</span>
              </div>
              <div className="muted mono" style={{ fontSize: 11, marginTop: 4 }}>3 messages · started Mon, Jun 3 · sender pool · acme-sales-04</div>
              <div style={{ marginTop: 18, padding: 14, borderRadius: 8, border: '1px solid var(--hairline)', background: 'var(--surface-2)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12 }}><div className="mf-avatar" style={{ width: 22, height: 22, fontSize: 10, background: '#5C6F8A' }}>PS</div><b>Priya Shah</b> · priya@northbeam.co <span className="mono muted" style={{ marginLeft: 'auto', fontSize: 11 }}>2m ago</span></div>
                <p style={{ marginTop: 10, fontSize: 13.5, lineHeight: 1.55 }}>Yes — let's find a time next week. Tuesday or Wednesday afternoon works on our end. Could you send a quick agenda + who'll be joining from your side? Also, do you have a one-pager I can forward to our CFO ahead of the call?</p>
              </div>
              <div style={{ marginTop: 14, padding: 14, borderRadius: 8, border: '1px solid var(--clay-soft)', background: 'rgba(182,90,62,0.05)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: 'var(--clay-ink)' }}>{I.sparkles}<b>Suggested reply</b><span className="mono" style={{ marginLeft: 'auto', fontSize: 11 }}>haiku-4.5 · 0.4s</span></div>
                <p style={{ marginTop: 8, fontSize: 13.5, lineHeight: 1.55, color: 'var(--ink-2)' }}>Tuesday at 2pm PT works — sending a calendar invite. Attaching the one-pager and a short agenda below. From our side it'll be me and Maya (CS)…</p>
                <div style={{ marginTop: 10, display: 'flex', gap: 6 }}>
                  <button className="mf-btn sm clay">Use draft</button>
                  <button className="mf-btn sm">Refine</button>
                  <button className="mf-btn sm ghost">Discard</button>
                </div>
              </div>
            </div>
            {/* AI panel */}
            <div style={{ padding: '18px 18px', borderLeft: '1px solid var(--hairline)', background: 'var(--surface-2)', overflow: 'hidden' }}>
              <div className="mono" style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--muted)' }}>AI Analysis</div>
              <div style={{ marginTop: 10, fontFamily: 'var(--serif)', fontSize: 18, lineHeight: 1.2 }}>Hot lead. Asks for agenda + one-pager. Forwarding to CFO.</div>
              <div className="mf-rule mt-3" />
              <div style={{ marginTop: 14 }}>
                {[['Intent', 'Interested'], ['Confidence', '0.94'], ['Next step', 'Book meeting'], ['Sentiment', 'Positive'], ['Decision-maker', 'Forwards to CFO']].map(([k, v]) => (
                  <div key={k} style={{ display: 'flex', fontSize: 12.5, padding: '6px 0', borderBottom: '1px solid var(--hairline)' }}>
                    <span className="muted">{k}</span><span style={{ marginLeft: 'auto' }}>{v}</span>
                  </div>
                ))}
              </div>
              <div className="mono" style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--muted)', marginTop: 18 }}>Workflow triggered</div>
              <div style={{ marginTop: 8, padding: 10, borderRadius: 6, background: 'var(--surface)', border: '1px solid var(--hairline)', fontSize: 12 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>{I.flow}<b>Hot-reply playbook</b></div>
                <div className="muted" style={{ marginTop: 4 }}>+ Tag <span className="mf-tag">pilot-Q3</span> · Notify Slack #sales</div>
              </div>
            </div>
          </div>
        </div>

        {/* logo bar */}
        <div style={{ marginTop: 56, display: 'flex', alignItems: 'center', gap: 48, color: 'var(--muted)', fontSize: 12 }}>
          <span className="mono">Sending from teams at</span>
          {['NORTHBEAM', 'ACME · SALES', 'BRIGHTLINE', 'OCTAVE', 'KEELBOAT', 'HARBOR & CO'].map(l => (
            <span key={l} className="serif" style={{ fontSize: 18, opacity: 0.6, letterSpacing: '0.03em' }}>{l}</span>
          ))}
        </div>
      </section>

      {/* Features */}
      <section style={{ padding: '120px 56px 0', position: 'relative' }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 40 }}>
          <div>
            <div className="mono muted" style={{ fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase' }}>How it works</div>
            <h2 className="serif" style={{ fontSize: 56, lineHeight: 1, marginTop: 12, letterSpacing: '-0.025em' }}>
              Four pieces.<br /><span style={{ color: 'var(--clay)', fontStyle: 'italic' }}>One pipeline.</span>
            </h2>
          </div>
          <p style={{ maxWidth: 380, color: 'var(--ink-2)', fontSize: 15, lineHeight: 1.5 }}>
            Built for operators running 20+ mailboxes a day. The boring parts (rotation, warmup, classification, follow-ups) — automated. The judgment parts — surfaced.
          </p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 1, background: 'var(--hairline)', border: '1px solid var(--hairline)', borderRadius: 14, overflow: 'hidden' }}>
          {[
            ['Multi-account sending', 'Rotate across unlimited Gmail + SMTP boxes with per-account rate limits, warmup, and reputation scoring.', I.mail, '01'],
            ['Unified inbox', 'Every reply, every mailbox, one Gmail-like view. Triage with keyboard shortcuts.', I.inbox, '02'],
            ['AI reply analysis', 'Intent, sentiment, decision-maker signals. One-click suggested replies in your voice.', I.sparkles, '03'],
            ['Workflow automation', 'Trigger follow-ups, list moves, tags, Slack pings, and rewards from reply signals.', I.flow, '04'],
          ].map(([t, d, ic, n]) => (
            <div key={t} style={{ padding: '28px 24px 32px', background: 'var(--surface)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ width: 36, height: 36, borderRadius: 8, background: 'var(--canvas)', border: '1px solid var(--hairline)', display: 'grid', placeItems: 'center', color: 'var(--clay)' }}>{ic}</div>
                <span className="mono muted" style={{ fontSize: 11 }}>{n}</span>
              </div>
              <h3 className="serif" style={{ fontSize: 22, marginTop: 20, letterSpacing: '-0.01em' }}>{t}</h3>
              <p style={{ marginTop: 10, fontSize: 13.5, color: 'var(--muted)', lineHeight: 1.55 }}>{d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Workflow strip */}
      <section style={{ padding: '120px 56px 0' }}>
        <div className="mono muted" style={{ fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Workflow</div>
        <h2 className="serif" style={{ fontSize: 48, lineHeight: 1.05, marginTop: 10, letterSpacing: '-0.025em', maxWidth: 800 }}>
          Reply lands → AI classifies → workflow runs. While you sleep.
        </h2>
        <div style={{ marginTop: 40, display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 16, alignItems: 'stretch' }}>
          {[
            ['Send', 'Rotated across 8 mailboxes, 47 sent today'],
            ['Detect reply', 'Bounce, OOO, real reply — sorted instantly'],
            ['Classify', 'Interested · Question · Maybe later · Out'],
            ['Decide', 'Route to human, draft reply, or auto-respond'],
            ['Reward', 'Hot leads get a perk; cold ones get follow-ups'],
          ].map(([t, d], i, a) => (
            <div key={t} style={{ position: 'relative', padding: '20px 18px 22px', background: i === 2 ? 'rgba(182,90,62,0.06)' : 'var(--surface)', border: '1px solid var(--hairline)', borderRadius: 10 }}>
              <div className="mono" style={{ fontSize: 10, color: i === 2 ? 'var(--clay)' : 'var(--muted)', letterSpacing: '0.06em' }}>STEP {String(i + 1).padStart(2, '0')}</div>
              <div className="serif" style={{ fontSize: 22, marginTop: 6 }}>{t}</div>
              <div className="muted" style={{ fontSize: 12.5, marginTop: 8 }}>{d}</div>
              {i < a.length - 1 && (
                <div style={{ position: 'absolute', top: '50%', right: -12, width: 16, height: 16, transform: 'translateY(-50%)', color: 'var(--muted-2)', zIndex: 2, background: 'var(--canvas)' }}>{I.chevR}</div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Metrics + testimonial */}
      <section style={{ padding: '120px 56px 0', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64 }}>
        <div>
          <div className="mono muted" style={{ fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Results</div>
          <h2 className="serif" style={{ fontSize: 48, lineHeight: 1.05, marginTop: 10 }}>The numbers we keep getting back.</h2>
          <div style={{ marginTop: 32, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
            {[
              ['3.4×', 'reply rate vs. blast tools', 'Northbeam pilot, 14 days'],
              ['62%', 'fewer hours/wk in inbox', 'across 240 operators'],
              ['9 min', 'from signup → first send', 'median, free tier'],
              ['0.4%', 'spam complaint rate', '12-month rolling'],
            ].map(([n, l, s]) => (
              <div key={n}>
                <div className="serif" style={{ fontSize: 64, lineHeight: 1, letterSpacing: '-0.03em' }}>{n}</div>
                <div style={{ marginTop: 6, fontSize: 14 }}>{l}</div>
                <div className="muted mono" style={{ fontSize: 11, marginTop: 4 }}>{s}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ background: 'var(--ink)', color: 'var(--canvas)', borderRadius: 14, padding: '40px 36px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div style={{ fontSize: 14, fontFamily: 'var(--mono)', color: 'var(--muted-2)', letterSpacing: '0.08em' }}>FROM AN OPERATOR</div>
          <p className="serif" style={{ fontSize: 30, lineHeight: 1.25, letterSpacing: '-0.01em' }}>
            “We were running fourteen Gmail tabs and a spreadsheet. Mailflow ate all of it. The AI replies are scary good — I had to triple-check one wasn’t mine.”
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div className="mf-avatar lg" style={{ background: 'var(--clay)' }}>MO</div>
            <div>
              <div style={{ fontSize: 14 }}>Maya Okafor</div>
              <div className="muted mono" style={{ fontSize: 11 }}>Head of Outbound · Brightline</div>
            </div>
            <div style={{ marginLeft: 'auto', display: 'flex', gap: 2, color: 'var(--clay)' }}>
              {[0,1,2,3,4].map(i => <span key={i}>{I.star}</span>)}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '120px 56px 80px' }}>
        <div style={{ border: '1px solid var(--hairline)', borderRadius: 14, padding: '64px 56px', background: 'var(--surface)', display: 'flex', alignItems: 'center', gap: 48 }}>
          <div style={{ flex: 1 }}>
            <h2 className="serif" style={{ fontSize: 56, lineHeight: 1, letterSpacing: '-0.025em' }}>
              Send the first one<br /><span style={{ color: 'var(--clay)', fontStyle: 'italic' }}>this afternoon.</span>
            </h2>
            <p className="muted" style={{ marginTop: 16, fontSize: 15, maxWidth: 480 }}>
              Free tier ships with 2 mailboxes, 500 sends/mo, and the full AI inbox. Upgrade only when you actually need to.
            </p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, minWidth: 280 }}>
            <button className="mf-btn primary lg">Start free trial {I.arrowR}</button>
            <button className="mf-btn lg" style={{ background: 'transparent' }}>{I.google} Continue with Google</button>
            <span className="muted mono" style={{ fontSize: 11, textAlign: 'center', marginTop: 8 }}>NO CARD · 2 MIN SETUP</span>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ padding: '32px 56px 48px', borderTop: '1px solid var(--hairline)', display: 'flex', alignItems: 'center', gap: 24 }}>
        <Brand small />
        <span className="muted" style={{ fontSize: 12 }}>© 2026 Mailflow Labs. Built on Next.js, BullMQ, MongoDB, OpenRouter.</span>
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 22, fontSize: 12.5, color: 'var(--muted)' }}>
          {['Status', 'Docs', 'API', 'Security', 'Privacy', 'Terms'].map(l => <span key={l}>{l}</span>)}
        </div>
      </footer>
    </div>
  );
}

Object.assign(window, { MarketingPage });
