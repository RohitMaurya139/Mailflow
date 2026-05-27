// Main App composes all artboards into the design canvas
function App() {
  return (
    <DesignCanvas
      title="Mailflow · Premium Redesign"
      subtitle="Editorial-warm visual system · serif display + geometric sans · clay accent on cream canvas. Twelve screens across marketing, auth, and the full product surface."
    >
      <DCSection id="brand" title="Marketing & auth" subtitle="Public-facing surfaces — what someone sees before signing in.">
        <DCArtboard id="marketing" label="01 · Landing page" width={1440} height={2580}>
          <MarketingPage />
        </DCArtboard>
        <DCArtboard id="auth" label="02 · Sign in" width={1280} height={840}>
          <AuthPage />
        </DCArtboard>
      </DCSection>

      <DCSection id="shell" title="Dashboard core" subtitle="The operator's daily surface — sidebar + topbar shell, dashboard home, and the AI inbox.">
        <DCArtboard id="dashboard" label="03 · Dashboard home" width={1440} height={1040}>
          <DashboardPage />
        </DCArtboard>
        <DCArtboard id="inbox" label="04 · Inbox · 3-pane + AI" width={1600} height={920}>
          <InboxPage />
        </DCArtboard>
      </DCSection>

      <DCSection id="campaigns" title="Campaigns" subtitle="List view with embedded sparklines, plus the 5-step wizard's sequence builder.">
        <DCArtboard id="campaigns-list" label="05 · Campaigns list + funnel" width={1440} height={1020}>
          <CampaignsPage />
        </DCArtboard>
        <DCArtboard id="campaigns-wizard" label="06 · Campaign wizard · step 3" width={1440} height={1280}>
          <WizardPage />
        </DCArtboard>
      </DCSection>

      <DCSection id="data" title="Contacts & templates" subtitle="Data surfaces. Filterable table for contacts, edit/preview split for templates.">
        <DCArtboard id="contacts" label="07 · Contacts" width={1440} height={920}>
          <ContactsPage />
        </DCArtboard>
        <DCArtboard id="templates" label="08 · Templates · editor" width={1440} height={920}>
          <TemplatesPage />
        </DCArtboard>
      </DCSection>

      <DCSection id="automation" title="Automation & analytics" subtitle="Visual workflow builder, full analytics dashboard, and admin settings.">
        <DCArtboard id="workflows" label="09 · Workflows builder" width={1440} height={1040}>
          <WorkflowsPage />
        </DCArtboard>
        <DCArtboard id="analytics" label="10 · Analytics" width={1440} height={1180}>
          <AnalyticsPage />
        </DCArtboard>
        <DCArtboard id="settings" label="11 · Settings" width={1440} height={1280}>
          <SettingsPage />
        </DCArtboard>
      </DCSection>
    </DesignCanvas>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
