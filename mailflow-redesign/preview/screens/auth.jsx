// Sign in
function AuthPage() {
  return (
    <div className="mf" style={{ minHeight: '100%', display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
      {/* Left: editorial side */}
      <div style={{ padding: '40px 48px', borderRight: '1px solid var(--hairline)', display: 'flex', flexDirection: 'column', background: 'var(--surface)' }}>
        <Brand small />
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', maxWidth: 520 }}>
          <div className="mono muted" style={{ fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Welcome back</div>
          <h1 className="serif" style={{ fontSize: 56, lineHeight: 1.05, marginTop: 14, letterSpacing: '-0.025em' }}>
            The follow-up<br />sent <span style={{ color: 'var(--clay)', fontStyle: 'italic' }}>itself.</span>
          </h1>
          <p style={{ marginTop: 18, fontSize: 15, color: 'var(--ink-2)', lineHeight: 1.5, maxWidth: 440 }}>
            72 replies came in while you were asleep. 14 were hot. 3 already have meetings on your calendar. Sign in to triage the rest.
          </p>

          {/* Mini activity preview */}
          <div style={{ marginTop: 36, border: '1px solid var(--hairline)', borderRadius: 12, background: 'var(--canvas)', overflow: 'hidden', maxWidth: 460 }}>
            <div style={{ padding: '10px 14px', borderBottom: '1px solid var(--hairline)', display: 'flex', alignItems: 'center', gap: 8 }}>
              <span className="mono" style={{ fontSize: 10, color: 'var(--muted)' }}>OVERNIGHT · 6h ago → now</span>
              <span style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 6, fontSize: 12 }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--sage)' }} /> live
              </span>
            </div>
            {[
              ['02:14', 'Priya Shah replied to “Q1 budget intro”', 'sage', 'Interested'],
              ['03:48', 'Workflow “Hot-reply playbook” fired', 'clay', 'Action'],
              ['05:02', 'M. Okafor asked about pricing', 'sage', 'Question'],
              ['06:31', '4 OOO auto-replies filed', '', 'Filed'],
              ['07:15', 'Sender pool acme-sales-04 paused', 'amber', 'Health'],
            ].map(([t, msg, tone, lbl], i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 14px', borderBottom: i < 4 ? '1px solid var(--hairline)' : 0 }}>
                <span className="mono muted" style={{ fontSize: 11, width: 38 }}>{t}</span>
                <span style={{ flex: 1, fontSize: 13 }}>{msg}</span>
                <span className={`mf-badge ${tone || 'ghost'}`} style={{ fontSize: 10 }}>{lbl}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="muted mono" style={{ fontSize: 11, letterSpacing: '0.06em' }}>
          “One dashboard. No per-seat math.”
        </div>
      </div>

      {/* Right: form */}
      <div style={{ padding: '40px 56px', display: 'flex', flexDirection: 'column', justifyContent: 'center', background: 'var(--canvas)' }}>
        <div style={{ alignSelf: 'flex-end', display: 'flex', alignItems: 'center', gap: 10, fontSize: 13, color: 'var(--muted)' }}>
          No account? <span style={{ color: 'var(--clay)', fontWeight: 500 }}>Create one →</span>
        </div>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', maxWidth: 380, margin: '0 auto', width: '100%' }}>
          <h2 className="serif" style={{ fontSize: 40, letterSpacing: '-0.02em', lineHeight: 1.1 }}>Sign in</h2>
          <p className="muted" style={{ marginTop: 8, fontSize: 14 }}>Pick up where you left off.</p>

          <button className="mf-btn lg" style={{ marginTop: 28, width: '100%', justifyContent: 'center', background: 'var(--surface)' }}>
            {I.google}<span>Continue with Google</span>
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '20px 0', color: 'var(--muted-2)', fontSize: 11, fontFamily: 'var(--mono)' }}>
            <div style={{ flex: 1, height: 1, background: 'var(--hairline)' }} /> OR EMAIL <div style={{ flex: 1, height: 1, background: 'var(--hairline)' }} />
          </div>

          <label className="mf-label">Work email</label>
          <input className="mf-input" defaultValue="rohit@dg-outreach.co" />

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginTop: 16 }}>
            <label className="mf-label" style={{ marginBottom: 6 }}>Password</label>
            <a style={{ fontSize: 12, color: 'var(--clay)' }}>Forgot?</a>
          </div>
          <input className="mf-input" type="password" defaultValue="••••••••••••" />

          <label style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 14, fontSize: 13, color: 'var(--ink-2)' }}>
            <span style={{ width: 16, height: 16, borderRadius: 4, border: '1.5px solid var(--clay)', background: 'var(--clay)', display: 'grid', placeItems: 'center', color: 'white' }}>{I.check}</span>
            Keep me signed in on this device
          </label>

          <button className="mf-btn primary lg" style={{ marginTop: 22, width: '100%', justifyContent: 'center' }}>Sign in {I.arrowR}</button>

          <div style={{ marginTop: 24, padding: 12, border: '1px dashed var(--hairline-strong)', borderRadius: 8, fontSize: 12, color: 'var(--muted)', display: 'flex', alignItems: 'flex-start', gap: 10 }}>
            <span style={{ color: 'var(--sage)', marginTop: 2 }}>{I.check}</span>
            <span>SSO via SAML available on Scale plan. <span style={{ color: 'var(--clay)' }}>Set up SSO →</span></span>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: 'var(--muted)', fontFamily: 'var(--mono)' }}>
          <span>SOC 2 · Type II</span>
          <span>support@mailflow.io</span>
          <span>v2.4.1</span>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { AuthPage });
