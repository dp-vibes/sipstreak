"use client";

const leftImages = ['/images/vineyard-1.jpg', '/images/bottles-2.jpg', '/images/glass-1.jpg'];
const rightImages = ['/images/glass-2.jpg', '/images/vineyard-2.jpg', '/images/bottles-1.jpg'];

function PhotoPanel({ images, side }) {
  return (
    <div style={{
      position: 'fixed', top: 0, [side]: 0, bottom: 0,
      width: 'calc((100vw - 520px) / 2)',
      minWidth: 0,
      display: 'flex', flexDirection: 'column',
      zIndex: 0,
    }}>
      {images.map((src, i) => (
        <div key={i} style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0, backgroundImage: `url(${src})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(250, 250, 248, 0.62)' }} />
        </div>
      ))}
    </div>
  );
}

export default function AppShell({ children }) {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-primary)', position: 'relative' }}>
      {/* Side panels — hidden on mobile via min-width:0 + calc */}
      <PhotoPanel images={leftImages} side="left" />
      <PhotoPanel images={rightImages} side="right" />

      {/* Center content */}
      <div style={{
        position: 'relative',
        zIndex: 10,
        maxWidth: '520px',
        margin: '0 auto',
        minHeight: '100vh',
        background: 'var(--bg-primary)',
      }}>
        {/* Wine line separators — only show when panels visible */}
        <div className="wine-border-left" style={{
          position: 'fixed', top: 0, bottom: 0, width: '1px', background: '#7B2D3B',
          left: 'calc((100vw - 520px) / 2)',
          zIndex: 11,
        }} />
        <div className="wine-border-right" style={{
          position: 'fixed', top: 0, bottom: 0, width: '1px', background: '#7B2D3B',
          right: 'calc((100vw - 520px) / 2)',
          zIndex: 11,
        }} />

        {children}
      </div>

      <style jsx global>{`
        @media (max-width: 620px) {
          .wine-border-left, .wine-border-right { display: none !important; }
        }
      `}</style>
    </div>
  );
}
