'use client';

// TEMPORARY: prints the real client error on screen so it can be read on iOS
// Safari. Delete this file once the crash is fixed.
const GlobalError = ({ error }: { error: Error & { digest?: string } }) => (
  <html lang="en">
    <body
      style={{
        background: '#0a0a0a',
        color: '#fff',
        fontFamily: 'system-ui, sans-serif',
        padding: 24,
      }}
    >
      <h1 style={{ fontSize: 22 }}>This page couldn’t load</h1>
      <p style={{ wordBreak: 'break-word' }}>
        <strong>{error?.name}</strong>: {error?.message}
      </p>
      <pre
        style={{
          fontSize: 11,
          whiteSpace: 'pre-wrap',
          wordBreak: 'break-word',
          opacity: 0.8,
        }}
      >
        {String(error?.stack ?? '').slice(0, 1500)}
      </pre>
      <button type="button" onClick={() => window.location.reload()}>
        Reload
      </button>
    </body>
  </html>
);

export default GlobalError;
