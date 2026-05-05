import {Link} from 'react-router';

interface FooterProps {
  footer?: unknown;
  header?: unknown;
  publicStoreDomain?: string;
}

export function Footer(_props: FooterProps) {
  return (
    <>
      <Newsletter />
      <footer className="footer">
        <div className="wrap">
          <div className="footer-grid">
            <div className="footer-brand">
              <Link to="/" className="logo">
                <span className="logo-mark">
                  <i />
                  <i />
                  <i />
                </span>
                HUSTLR
              </Link>
              <p>
                Gear para los que no apagan la luz cuando todos se van a dormir.
                Lock in. Grind on.
              </p>
            </div>

            <div className="footer-col">
              <h4>Tienda</h4>
              <Link to="/collections/all">Shades</Link>
              <Link to="/collections/accesorios">Accesorios</Link>
              <Link to="/products/gift-card">Gift Cards</Link>
              <Link to="/collections/drops">Drops Pasados</Link>
            </div>

            <div className="footer-col">
              <h4>Soporte</h4>
              <Link to="/policies/shipping-policy">Envíos</Link>
              <Link to="/policies/refund-policy">Devoluciones</Link>
              <Link to="/pages/garantia">Garantía</Link>
              <Link to="/pages/contacto">Contacto</Link>
            </div>

            <div className="footer-col">
              <h4>Brand</h4>
              <Link to="/pages/manifesto">Manifesto</Link>
              <Link to="/pages/embajadores">Embajadores</Link>
              <Link to="/pages/prensa">Prensa</Link>
              <Link to="/pages/afiliados">Afiliados</Link>
            </div>
          </div>

          <div className="footer-bottom">
            <div>© {new Date().getFullYear()} HUSTLR · LOCK IN. GRIND ON.</div>
            <div className="socials">
              <a href="#" aria-label="Instagram">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="2" width="20" height="20" rx="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37zM17.5 6.5h.01" />
                </svg>
              </a>
              <a href="#" aria-label="TikTok">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
                </svg>
              </a>
              <a href="#" aria-label="YouTube">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22.54 6.42A2.78 2.78 0 0 0 20.6 4.5C18.88 4 12 4 12 4s-6.88 0-8.6.5A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.5 8.6.5 8.6.5s6.88 0 8.6-.5a2.78 2.78 0 0 0 1.94-1.92 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z" />
                  <path d="m9.75 15.02 5.75-3.27-5.75-3.27z" fill="currentColor" />
                </svg>
              </a>
              <a href="#" aria-label="X">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
            </div>
            <div>Hecho con 🔥 en LA</div>
          </div>
        </div>
      </footer>
    </>
  );
}

function Newsletter() {
  return (
    <section className="newsletter">
      <div className="wrap">
        <h2>
          Únete al <em>Grind Club</em>
        </h2>
        <p>
          Early access a drops, 10% off en tu primera orden y emails que valen la
          pena abrir.
        </p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const form = e.currentTarget;
            const input = form.querySelector('input');
            const button = form.querySelector('button');
            if (input) input.value = '';
            if (button) button.textContent = '¡Welcome to the grind ✓';
          }}
        >
          <input type="email" placeholder="tu@email.com" required />
          <button type="submit">Unirme</button>
        </form>
      </div>
    </section>
  );
}
