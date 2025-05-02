export default function Layout({ children }) {
  return (
    <div style={{ padding: 20 }}>
      <header style={{ marginBottom: 20 }}>
        <h2>Clean Layout Header</h2>
      </header>
      <main>{children}</main>
      <footer style={{ marginTop: 20 }}>
        <p>Clean Layout Footer</p>
      </footer>
    </div>
  );
}