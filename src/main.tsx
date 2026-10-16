import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

function App() {
  return (
    <main className="shell">
      <aside className="activity-rail" aria-label="Primary navigation">
        <div className="brand-mark" aria-label="Coffe">C</div>
        <button className="rail-button rail-button-active" aria-label="Explorer">⌘</button>
        <button className="rail-button" aria-label="Agent">✦</button>
        <button className="rail-button" aria-label="Source control">⑂</button>
        <div className="rail-spacer" />
        <button className="rail-button" aria-label="Settings">⚙</button>
      </aside>

      <section className="workspace">
        <header className="title-bar">
          <div>
            <span className="eyebrow">COFFE</span>
            <span className="title">Your IDE Agentic Coding</span>
          </div>
          <span className="local-badge">LOCAL ONLY</span>
        </header>

        <div className="workspace-grid">
          <aside className="explorer panel">
            <div className="panel-heading"><span>Explorer</span><span className="muted">⌘P</span></div>
            <div className="project-heading"><span className="chevron">⌄</span><strong>COFFE WORKSPACE</strong></div>
            <div className="file-item selected"><span className="file-icon ts">TS</span>Getting Started</div>
            <div className="file-item"><span className="file-icon">◇</span>Agent Instructions</div>
            <div className="file-item"><span className="file-icon">◫</span>Local Projects</div>
            <div className="explorer-footer">No project opened yet</div>
          </aside>

          <section className="editor-area">
            <div className="tab-bar"><div className="tab active"><span className="file-icon ts">TS</span>Getting Started<span className="tab-close">×</span></div></div>
            <article className="welcome-card">
              <div className="welcome-kicker">WORKSPACE READY</div>
              <h1>Build with context.<br /><em>Ship with control.</em></h1>
              <p>Coffe keeps your code local and brings an inspectable agent into the same calm workspace.</p>
              <div className="quick-actions">
                <button className="primary-action">Open a project <span>→</span></button>
                <button className="secondary-action">Explore the workspace</button>
              </div>
              <div className="feature-row">
                <div><span className="feature-icon">⌘</span><strong>Local-first</strong><small>Your files stay on your device.</small></div>
                <div><span className="feature-icon">✦</span><strong>Agentic</strong><small>Plan before anything changes.</small></div>
                <div><span className="feature-icon">◈</span><strong>Inspectable</strong><small>Review every tool action.</small></div>
              </div>
            </article>
          </section>

          <aside className="agent-panel panel">
            <div className="panel-heading"><span>Agent</span><span className="status-dot">● Ready</span></div>
            <div className="agent-empty"><div className="agent-orbit">✦</div><h2>Start with a thought</h2><p>Ask Coffe to explain a project, draft a plan, or inspect a problem.</p></div>
            <div className="prompt-box"><span>What are you building?</span><button aria-label="Send prompt">↗</button></div>
            <div className="agent-footnote"><span>Local context only</span><span>⌘ ↵</span></div>
          </aside>
        </div>

        <footer className="status-bar"><span><span className="status-live" />Coffe is ready</span><span>UTF-8</span><span>Local profile</span><span>v0.1.0</span></footer>
      </section>
    </main>
  );
}

createRoot(document.getElementById("root")!).render(<StrictMode><App /></StrictMode>);
