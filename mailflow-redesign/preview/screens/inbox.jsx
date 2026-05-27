// Inbox 3-pane + AI panel
function InboxPage() {
  return (
    <div className="mf mf-shell">
      <Sidebar active="inbox" />
      <div style={{ display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <Topbar crumbs={['Inbox', 'All replies']}>
          <button className="mf-btn sm">{I.filter} Filter</button>
        </Topbar>

        <div style={{ display: 'grid', gridTemplateColumns: '220px 360px 1fr 320px', flex: 1, minHeight: 0 }}>
          {/* Account list */}
          <div style={{ borderRight: '1px solid var(--hairline)', overflow: 'hidden' }}>
            <div style={{ padding: '14px 16px', borderBottom: '1px solid var(--hairline)' }}>
              <div className="mono muted" style={{ fontSize: 10, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Mailboxes</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 8 }}>
                <span className="serif" style={{ fontSize: 22, fontStyle: 'italic' }}>All</span>
                <span className="mf-badge clay" style={{ marginLeft: 'auto' }}>12 unread</span>
              </div>
            </div>
            {[
              ['All inboxes', '12', true, ''],
              ['acme-sales-01', '4', false, 'sage'],
              ['acme-sales-02', '3', false, 'sage'],
              ['acme-sales-03', '2', false, 'amber'],
              ['acme-sales-04', '0', false, 'rose'],
              ['outbound-eu-01', '2', false, 'sage'],
              ['outbound-eu-02', '1', false, 'sage'],
              ['nz-cold-01', '0', false, 'sage'],
              ['nz-cold-02', '0', false, 'amber'],
            ].map(([n, b, active, tone], i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 16px', background: active ? 'var(--surface)' : 'transparent', borderLeft: active ? '2px solid var(--clay)' : '2px solid transparent' }}>
                {tone && <span style={{ width: 6, height: 6, borderRadius: '50%', background: `var(--${tone})` }} />}
                {!tone && <span style={{ width: 6 }} />}
                <span className="mono" style={{ fontSize: 12, color: active ? 'var(--ink)' : 'var(--ink-2)' }}>{n}</span>
                {b !== '0' && <span className="mf-badge" style={{ marginLeft: 'auto', fontSize: 10 }}>{b}</span>}
              </div>
            ))}
            <div className="mf-rule" style={{ margin: '12px 0' }} />
            <div className="mono muted" style={{ padding: '4px 16px 8px', fontSize: 10, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Saved views</div>
            {['🔥 Hot leads', 'Needs reply', 'Bounces', 'Unsubscribes', 'Auto-replied'].map((v, i) => (
              <div key={v} style={{ padding: '7px 16px', fontSize: 12.5, color: 'var(--ink-2)', display: 'flex', alignItems: 'center', gap: 6 }}>
                <span>{v}</span>
                <span className="mono muted" style={{ marginLeft: 'auto', fontSize: 10.5 }}>{[8, 12, 3, 5, 21][i]}</span>
              </div>
            ))}
          </div>

          {/* Thread list */}
          <div style={{ borderRight: '1px solid var(--hairline)', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            <div style={{ padding: '12px 16px', borderBottom: '1px solid var(--hairline)', display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ fontFamily: 'var(--serif)', fontSize: 18 }}>Replies</span>
              <span className="mono muted" style={{ fontSize: 11 }}>· 12 of 247</span>
              <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, color: 'var(--muted)' }}>
                <span className="mono">SORT</span> Newest <span>{I.chevD}</span>
              </div>
            </div>
            <div style={{ flex: 1, overflowY: 'auto' }}>
              {[
                ['PS','Priya Shah', 'Q1 budget intro', 'Yes — let’s find a time next week. Tuesday or Wednesday afternoon works…', 'sage', 'Interested', '2m', true, '0.94', '#5C6F8A'],
                ['MO','Maya Okafor', 'Re: pilot proposal', 'Can you send pricing for 20 seats? Also curious about SOC 2…', 'sage', 'Question', '14m', false, '0.91', '#7A6A5C'],
                ['DL','Dana Liu', 'Reaching out', 'Not the right time, but ping me in Q3 — budget refreshes then.', 'amber', 'Maybe later', '1h', false, '0.88', '#6F8A7C'],
                ['JK','Jonas K.', '5-min favor', 'Please remove me from this list. Don’t contact again.', 'rose', 'Unsubscribe', '3h', false, '0.99', '#8A6F7C'],
                ['SN','Sara N.', 'Coffee in SF?', 'Out of office until Aug 14. For urgent matters please contact…', '', 'Auto-reply', '5h', false, '—', '#8A8067'],
                ['RA','R. Almeida', 'Workshop ask', 'Love the angle. Would you do a 30-min workshop for our team?', 'sage', 'Interested', '6h', false, '0.86', '#5C8A7E'],
                ['—','mailer-daemon', 'Undeliverable', '550 5.1.1 The email account that you tried to reach does not exist.', 'rose', 'Bounce', '8h', false, '—', 'var(--muted-2)'],
                ['TH','Tom H.', 'Re: warm intro?', 'Sure — happy to help. Send the deck and I’ll forward Monday.', 'sage', 'Interested', '11h', false, '0.92', '#7C7A6A'],
              ].map(([initials, who, sub, snip, tone, lbl, t, active, conf, color], i) => (
                <div key={i} style={{ padding: '12px 16px', borderBottom: '1px solid var(--hairline)', background: active ? 'rgba(182,90,62,0.06)' : 'transparent', borderLeft: active ? '2px solid var(--clay)' : '2px solid transparent', cursor: 'pointer' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div className="mf-avatar" style={{ background: color, fontSize: 10 }}>{initials}</div>
                    <span style={{ fontWeight: 500, fontSize: 13.5 }}>{who}</span>
                    <span className="mono muted" style={{ marginLeft: 'auto', fontSize: 10.5 }}>{t}</span>
                  </div>
                  <div style={{ fontSize: 13, marginTop: 4 }}>{sub}</div>
                  <div className="muted" style={{ fontSize: 12, marginTop: 2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{snip}</div>
                  <div style={{ marginTop: 6, display: 'flex', alignItems: 'center', gap: 6 }}>
                    {tone ? <span className={`mf-badge ${tone}`} style={{ fontSize: 10 }}>{lbl}</span>
                          : <span className="mf-badge ghost" style={{ fontSize: 10 }}>{lbl}</span>}
                    {conf !== '—' && <span className="mono muted" style={{ fontSize: 10 }}>conf {conf}</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Conversation */}
          <div style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            <div style={{ padding: '16px 24px', borderBottom: '1px solid var(--hairline)' }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
                <span style={{ fontFamily: 'var(--serif)', fontSize: 26, letterSpacing: '-0.01em' }}>Q1 budget intro</span>
                <span className="mf-badge sage"><span className="dot" />Interested</span>
                <span className="mf-badge clay"><span className="dot" />Hot</span>
              </div>
              <div className="muted" style={{ fontSize: 12, marginTop: 6, display: 'flex', gap: 12, fontFamily: 'var(--mono)' }}>
                <span>3 MSGS</span><span>·</span><span>STARTED MON, JUN 3</span><span>·</span><span>POOL ACME-SALES-04</span><span>·</span><span>WORKFLOW HOT-REPLY-PLAYBOOK</span>
              </div>
              <div style={{ marginTop: 12, display: 'flex', gap: 6 }}>
                <button className="mf-btn sm">{I.reply} Reply</button>
                <button className="mf-btn sm">{I.check} Mark done</button>
                <button className="mf-btn sm">+ Tag</button>
                <button className="mf-btn sm ghost" style={{ marginLeft: 'auto' }}>{I.more}</button>
              </div>
            </div>
            <div style={{ flex: 1, overflow: 'auto', padding: '20px 24px' }}>
              {/* outgoing */}
              <div style={{ padding: 16, borderRadius: 10, border: '1px solid var(--hairline)', background: 'var(--surface)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12 }}>
                  <div className="mf-avatar" style={{ width: 22, height: 22, fontSize: 10 }}>RM</div>
                  <b>You</b> · acme-sales-04@dgoutreach.co<span className="muted">→ priya@northbeam.co</span>
                  <span className="mono muted" style={{ marginLeft: 'auto', fontSize: 11 }}>Mon, Jun 3 · 9:12</span>
                </div>
                <div className="muted" style={{ fontSize: 12, marginTop: 6 }}>Subject: Q1 budget intro · template <span className="mf-tag">cold-intro-v3</span></div>
                <p style={{ marginTop: 12, fontSize: 13.5, lineHeight: 1.55, color: 'var(--ink-2)' }}>Hi Priya — saw the post on Northbeam's Q1 attribution work. We've been helping similar teams shave 18+ hours/week on cold outreach with multi-mailbox rotation and an AI inbox. Worth a 15-min look?</p>
              </div>

              {/* OOO */}
              <div style={{ margin: '14px 0', display: 'flex', alignItems: 'center', gap: 8, fontSize: 11.5, color: 'var(--muted)' }}>
                <div style={{ flex: 1, height: 1, background: 'var(--hairline)' }} />
                <span className="mono">AUTO-FILED · OUT OF OFFICE</span>
                <div style={{ flex: 1, height: 1, background: 'var(--hairline)' }} />
              </div>

              {/* incoming */}
              <div style={{ padding: 16, borderRadius: 10, border: '1px solid var(--hairline)', background: 'var(--surface-2)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12 }}>
                  <div className="mf-avatar" style={{ width: 22, height: 22, fontSize: 10, background: '#5C6F8A' }}>PS</div>
                  <b>Priya Shah</b><span className="muted">· priya@northbeam.co</span>
                  <span className="mono muted" style={{ marginLeft: 'auto', fontSize: 11 }}>Today · 2m ago</span>
                </div>
                <p style={{ marginTop: 12, fontSize: 14, lineHeight: 1.55 }}>
                  Yes — let's find a time next week. Tuesday or Wednesday afternoon works on our end. Could you send a quick agenda + who'll be joining from your side? Also, do you have a one-pager I can forward to our CFO ahead of the call?
                </p>
                <p style={{ marginTop: 10, fontSize: 14, lineHeight: 1.55 }}>Thanks,<br />Priya</p>
              </div>

              {/* AI draft */}
              <div style={{ marginTop: 14, padding: 16, borderRadius: 10, border: '1px solid var(--clay-soft)', background: 'rgba(182,90,62,0.05)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: 'var(--clay-ink)' }}>{I.sparkles}<b>Suggested reply</b><span className="muted" style={{ marginLeft: 8 }}>matches your voice from 47 sent emails</span><span className="mono muted" style={{ marginLeft: 'auto', fontSize: 11 }}>haiku-4.5 · 0.4s</span></div>
                <textarea className="mf-input" rows={6} style={{ marginTop: 10, fontSize: 13.5, background: 'var(--surface)' }} defaultValue={`Hi Priya — Tuesday at 2pm PT works on our end. Sending a calendar invite now.\n\nFrom our side it'll be me and Maya (our Head of CS). Quick agenda:\n  1. What's slowing your outbound team down today\n  2. How we'd plug in (2-week pilot, no commitment)\n  3. Pricing for your headcount\n\nOne-pager attached — forward freely to the CFO.\n\nTalk soon,\nRohit`} />
                <div style={{ marginTop: 10, display: 'flex', alignItems: 'center', gap: 6 }}>
                  <button className="mf-btn sm clay">{I.send} Send</button>
                  <button className="mf-btn sm">Schedule</button>
                  <button className="mf-btn sm">{I.sparkles} Refine</button>
                  <span className="muted" style={{ marginLeft: 'auto', fontSize: 11, fontFamily: 'var(--mono)' }}>3 alt drafts available</span>
                </div>
              </div>
            </div>
          </div>

          {/* AI panel */}
          <div style={{ borderLeft: '1px solid var(--hairline)', background: 'var(--surface)', padding: '18px 18px', overflow: 'auto' }}>
            <div className="mono muted" style={{ fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Reply analysis</div>
            <div className="serif mt-2" style={{ fontSize: 22, lineHeight: 1.2, letterSpacing: '-0.01em' }}>
              Hot lead. Wants agenda + one-pager. Will forward to CFO.
            </div>
            <div style={{ marginTop: 14 }}>
              {[
                ['Intent', <span className="mf-badge sage">Interested</span>, '0.94'],
                ['Sentiment', 'Positive · forward-leaning', ''],
                ['Decision-maker', 'Forwards to CFO', ''],
                ['Asks for', 'Agenda · One-pager', ''],
                ['Suggested action', 'Send draft + invite', ''],
              ].map(([k, v, c], i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'baseline', padding: '8px 0', borderBottom: '1px solid var(--hairline)', gap: 8 }}>
                  <span className="muted mono" style={{ fontSize: 10.5, letterSpacing: '0.06em', textTransform: 'uppercase', width: 100 }}>{k}</span>
                  <span style={{ flex: 1, fontSize: 13 }}>{v}</span>
                  {c && <span className="mono muted" style={{ fontSize: 10.5 }}>{c}</span>}
                </div>
              ))}
            </div>

            <div className="mono muted mt-4" style={{ fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Workflow fired</div>
            <div className="mt-2" style={{ padding: 12, borderRadius: 8, border: '1px solid var(--hairline)', background: 'var(--canvas)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>{I.flow}<b style={{ fontSize: 13 }}>Hot-reply playbook</b><span className="mf-badge sage" style={{ marginLeft: 'auto', fontSize: 10 }}>2/3 done</span></div>
              <div style={{ marginTop: 10, display: 'grid', gap: 6, fontSize: 12 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><span style={{ color: 'var(--sage)' }}>{I.check}</span> Tag <span className="mf-tag">pilot-Q3</span></div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><span style={{ color: 'var(--sage)' }}>{I.check}</span> Notify Slack #sales</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><span style={{ width: 14, height: 14, borderRadius: 50, border: '1.5px dashed var(--muted-2)' }} /> Move to "Pilot" list</div>
              </div>
            </div>

            <div className="mono muted mt-4" style={{ fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Contact</div>
            <div className="mt-2" style={{ padding: 12, borderRadius: 8, border: '1px solid var(--hairline)', background: 'var(--canvas)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div className="mf-avatar lg" style={{ background: '#5C6F8A' }}>PS</div>
                <div>
                  <div style={{ fontSize: 13.5, fontWeight: 500 }}>Priya Shah</div>
                  <div className="muted mono" style={{ fontSize: 10.5 }}>VP, Growth · Northbeam</div>
                </div>
              </div>
              <div className="mt-3" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6, fontSize: 11.5 }}>
                <span className="muted">Emails sent</span><b style={{ textAlign: 'right' }}>3</b>
                <span className="muted">Opens</span><b style={{ textAlign: 'right' }}>9</b>
                <span className="muted">First touched</span><b style={{ textAlign: 'right' }}>Jun 3</b>
              </div>
              <button className="mf-btn sm" style={{ marginTop: 10, width: '100%', justifyContent: 'center' }}>Open contact →</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { InboxPage });
