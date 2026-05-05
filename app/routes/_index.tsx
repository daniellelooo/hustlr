import {Link} from 'react-router';
import type {Route} from './+types/_index';
import {getMockProducts} from '~/lib/mockProducts';

export const meta: Route.MetaFunction = () => [
  {title: 'HUSTLR — Lock in. Grind on. | Anti-Blue Light Eyewear'},
  {
    name: 'description',
    content:
      'Lentes para el que no se rinde. Bloquea la luz azul, enfoca el grind. Envío gratis. Garantía de por vida.',
  },
  {name: 'theme-color', content: '#0a0a0a'},
];

export async function loader(_args: Route.LoaderArgs) {
  return {featured: getMockProducts()[0]};
}

export default function Homepage() {
  return (
    <>
      <Hero />
      <StripeBand />
      <TrustBar />
      <MarqueeStack />
      <Features />
      <QuoteBand />
      <Gallery />
      <Specs />
      <ShopCta />
      <Reviews />
      <Faq />
    </>
  );
}

/* ==================================================================== */
function Hero() {
  return (
    <header className="hero">
      <span className="hero-drop-number" aria-hidden="true">
        01
      </span>
      <div className="wrap">
        <div className="hero-grid">
          <div className="hero-copy">
            <span className="hero-eyebrow">Drop 01 — Obsidian</span>
            <h1 className="hero-title">
              <span className="row">
                <span className="word">Lock in.</span>
              </span>
              <span className="row">
                <span className="word">
                  <em>grind on</em>
                </span>
              </span>
            </h1>
            <p className="hero-sub">
              Lentes diseñadas para quien construye su imperio de{' '}
              <b>5am a 11pm</b>. Protección UV400, polarización TAC y un lente
              rojo que literalmente te saca del azul del doom-scroll.
            </p>
            <div className="hero-cta">
              <Link to="/products/obsidian" className="btn btn-primary">
                <span>Comprar — $89</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </Link>
              <a href="#features" className="btn btn-ghost">
                Ver tecnología
              </a>
            </div>

            <div className="hero-stats">
              <div className="hero-stat">
                <div className="num">
                  4.9<em>/</em>5
                </div>
                <div className="label">2,847 reviews</div>
              </div>
              <div className="hero-stat">
                <div className="num">22g</div>
                <div className="label">Marco TR90</div>
              </div>
              <div className="hero-stat">
                <div className="num">100%</div>
                <div className="label">UV / Blue light</div>
              </div>
            </div>
          </div>

          <div className="hero-visual">
            <div className="hero-stage">
              <span className="placeholder">[ HERO IMAGE — OBSIDIAN ]</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

/* ==================================================================== */
function StripeBand() {
  return <div className="stripe-band" aria-hidden="true" />;
}

/* ==================================================================== */
function TrustBar() {
  const items = [
    {icon: <TruckIcon />, label: <><b>Envío gratis</b> — 48h USA</>},
    {icon: <ShieldIcon />, label: <><b>Garantía</b> de por vida</>},
    {icon: <ChartIcon />, label: <><b>30 días</b> · Devolución sin preguntas</>},
    {icon: <CardIcon />, label: <><b>4 pagos</b> · Afterpay / Klarna</>},
  ];
  return (
    <div className="trust">
      <div className="wrap trust-grid">
        {items.map((it, i) => (
          <div className="trust-item" key={i}>
            {it.icon}
            <span>{it.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ==================================================================== */
function MarqueeStack() {
  const Star = () => <span className="star">✦</span>;
  return (
    <div className="marquee-stack">
      <div className="marquee">
        <div className="marquee-track">
          {Array.from({length: 6}).map((_, i) => (
            <span key={i} style={{display: 'inline-flex', alignItems: 'center', gap: 32}}>
              Lock in <Star /> grind <em>on</em> <Star /> ship daily <Star />
            </span>
          ))}
        </div>
      </div>
      <div className="marquee marquee-r" style={{marginTop: 8}}>
        <div className="marquee-track">
          {Array.from({length: 6}).map((_, i) => (
            <span key={i} style={{display: 'inline-flex', alignItems: 'center', gap: 32, color: 'var(--muted)'}}>
              Drop 01 <Star /> Obsidian <Star /> ED. 142 <Star /> 04.26.26 <Star />
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ==================================================================== */
function Features() {
  const features = [
    {
      icon: <SunIcon />,
      title: 'UV400 + Polarización',
      desc: 'Bloqueo total UVA/UVB. El reflejo del asfalto, del cemento y la pantalla se desvanece. Tu enfoque no.',
    },
    {
      icon: <HeartIcon />,
      title: 'TR90 Aeroespacial',
      desc: 'Ligerísimo (22g), flexible, irrompible. Aguanta el gym, el skate, la carretera y caídas de 6 pies.',
    },
    {
      icon: <BoltIcon />,
      title: 'Anti-Blue Light',
      desc: 'Filtra hasta 100% de la luz azul dañina. Mejor sueño, menos dolor de cabeza, visión más nítida.',
    },
    {
      icon: <GridIcon />,
      title: 'Bisagras JP Spring',
      desc: 'Acero inoxidable japonés con sistema spring-flex. 50,000 ciclos sin pérdida de ajuste.',
    },
    {
      icon: <EyeIcon />,
      title: 'Anti-Rayón 5 Capas',
      desc: 'Las tiras al asiento del carro, al bolsillo trasero, al suelo. No pasa nada.',
    },
    {
      icon: <BoxIcon />,
      title: 'Kit Numerado',
      desc: 'Estuche rígido premium, paño microfibra, tarjeta de autenticidad numerada y sticker pack.',
    },
  ];
  return (
    <section id="features">
      <div className="wrap">
        <div className="section-head">
          <div className="left">
            <span className="kicker">// Tecnología / 02</span>
            <span className="num">CHAPTER 02 — TECH SHEET</span>
          </div>
          <div>
            <h2>
              Más que un lente.
              <br />
              Una <em>armadura</em>.
            </h2>
            <p>
              Ingeniería de polarización TAC y marco TR90 aeroespacial. Las
              probamos en Venice, Vegas y Miami antes de que lleguen a tus
              manos.
            </p>
          </div>
        </div>
        <div className="features-grid">
          {features.map((f, i) => (
            <div className="feature" key={i}>
              <div className="feature-num">{String(i + 1).padStart(2, '0')}</div>
              <div className="feature-icon">{f.icon}</div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ==================================================================== */
function QuoteBand() {
  return (
    <section className="quote-band">
      <div className="wrap">
        <blockquote>
          Built for the <em>5am crew</em>. For the ones who bet on
          <em> themselves</em> before anyone else did.
        </blockquote>
        <span className="by">— Manifesto HUSTLR / 2026</span>
      </div>
    </section>
  );
}

/* ==================================================================== */
function Gallery() {
  const tiles = [
    {label: 'GRIND / VENICE', cls: 'tall'},
    {label: 'PRODUCT / DETAIL', cls: ''},
    {label: 'MIAMI / 5AM', cls: 'wide'},
    {label: 'OBSIDIAN / SIDE', cls: ''},
    {label: 'BACKSEAT / LA', cls: ''},
    {label: 'TRACK / NV', cls: 'wide'},
  ];
  return (
    <section className="gallery">
      <div className="wrap">
        <div className="section-head">
          <div className="left">
            <span className="kicker">// In the wild / 03</span>
            <span className="num">CHAPTER 03 — FIELD LOG</span>
          </div>
          <div>
            <h2>
              Vistos en el <em>grind</em>.
            </h2>
            <p>
              De la oficina a la calle. De los squats a los pitch decks. Las
              Hustlr no se quitan.
            </p>
          </div>
        </div>
        <div className="gallery-grid">
          {tiles.map((t, i) => (
            <div className={`gallery-item ${t.cls}`} key={i}>
              <span className="loc-tag">
                <span>{t.label}</span>
                <span>{String(i + 1).padStart(2, '0')}</span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ==================================================================== */
function Specs() {
  return (
    <section className="specs">
      <div className="wrap">
        <div className="section-head" style={{marginBottom: 80}}>
          <div className="left">
            <span className="kicker">// Spec sheet / 04</span>
            <span className="num">CHAPTER 04 — INGENIERÍA</span>
          </div>
          <div>
            <h2>
              Ingeniería que se <em>siente</em>.
            </h2>
          </div>
        </div>
        <div className="specs-grid">
          <div className="specs-visual">
            <span>[ OBSIDIAN — SIDE PROFILE ]</span>
          </div>
          <div>
            <ul className="specs-list">
              <li><span className="label">Modelo</span><span className="value">Obsidian Edition</span></li>
              <li><span className="label">Marco</span><span className="value">TR90 Aeroespacial · Matte Black</span></li>
              <li><span className="label">Lente</span><span className="value">Red Polarizado TAC 1.1mm</span></li>
              <li><span className="label">Protección</span><span className="value">UV400 · Anti-Blue Light</span></li>
              <li><span className="label">Peso</span><span className="value">22g</span></li>
              <li><span className="label">Bisagras</span><span className="value">Acero JP · Spring-flex</span></li>
              <li><span className="label">Ancho frontal</span><span className="value">142mm (M / L)</span></li>
              <li><span className="label">Hecho en</span><span className="value">Italia · Ensamblado USA</span></li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ==================================================================== */
function ShopCta() {
  return (
    <section id="shop" style={{paddingBlock: 'clamp(60px, 10vh, 110px)'}}>
      <div className="wrap" style={{textAlign: 'center'}}>
        <span className="kicker kicker-center" style={{justifyContent: 'center', display: 'inline-flex'}}>
          // Drop 01
        </span>
        <h2
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(48px, 7vw, 120px)',
            lineHeight: 0.96,
            letterSpacing: '-0.02em',
            textTransform: 'uppercase',
            margin: '24px 0 36px',
            paddingBottom: '0.1em',
          }}
        >
          Un par. Una <em style={{
            fontFamily: 'var(--font-editorial)',
            fontStyle: 'italic',
            color: 'var(--red)',
            textTransform: 'lowercase',
            letterSpacing: '-0.02em',
            fontWeight: 400,
            fontSize: '0.94em',
          }}>misión</em>.
        </h2>
        <p style={{color: 'var(--muted)', fontSize: 16, marginBottom: 36, maxWidth: 540, marginInline: 'auto'}}>
          Edición limitada. Cuando se acaba, se acaba.
        </p>
        <Link to="/collections/all" className="btn btn-primary">
          <span>Ver catálogo completo</span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </Link>
      </div>
    </section>
  );
}

/* ==================================================================== */
function Reviews() {
  const reviews = [
    {
      stars: 5,
      text: '"Las puse el primer día en la obra y pensé que las iba a rayar. 3 meses después siguen perfectas. El lente rojo es un statement."',
      name: 'Marco R.',
      loc: 'Miami, FL',
      initials: 'MR',
    },
    {
      stars: 5,
      text: '"Dormí mejor en una semana. No es magia: es el lente anti-blue light. Las uso en la oficina después de las 5pm y se nota."',
      name: 'Kayla S.',
      loc: 'Los Angeles, CA',
      initials: 'KS',
    },
    {
      stars: 5,
      text: '"Tenía unas Oakley de $200 que se partieron en 6 meses. Estas Hustlr llevan 8 meses aguantando todo. Ya pedí otras."',
      name: 'Jordan G.',
      loc: 'Austin, TX',
      initials: 'JG',
    },
  ];
  return (
    <section id="reviews">
      <div className="wrap">
        <div className="reviews-head">
          <h2>
            Lo que dice el <em>grind</em>.
          </h2>
          <div className="reviews-score">
            <div className="big">
              4<em>.</em>9
            </div>
            <div className="meta">
              ★★★★★
              <br />
              2,847 reviews
              <br />
              VERIFICADOS
            </div>
          </div>
        </div>
        <div className="reviews-grid">
          {reviews.map((r, i) => (
            <div className="review" key={i}>
              <div className="stars">{'★'.repeat(r.stars)}</div>
              <div className="verified">✓ COMPRA VERIFICADA</div>
              <p>{r.text}</p>
              <div className="review-by">
                <div className="review-avatar">{r.initials}</div>
                <div>
                  <div className="name">{r.name}</div>
                  <div className="loc">{r.loc}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ==================================================================== */
function Faq() {
  const items = [
    {q: '¿Cuánto tarda el envío?', a: 'Enviamos en 24h hábiles desde nuestro hub en LA. Entrega estándar USA: 2–4 días. Envío express en 1–2 días disponible al checkout.'},
    {q: '¿De verdad tienen garantía de por vida?', a: 'Sí. Si el marco se parte, si las bisagras ceden, si un rayón te molesta — nos las devuelves y te mandamos un par nuevo.'},
    {q: '¿Funcionan para manejar de noche?', a: 'El lente Obsidian rojo reduce glare nocturno significativamente. Para manejar de noche recomendamos la versión Clear que sale en Drop 02.'},
    {q: '¿Qué talla me queda?', a: 'La M es nuestra talla universal (142mm). Si usas cachuchas 7 1/2+ ve por L (148mm). S para rostros más delgados (136mm).'},
    {q: '¿Puedo devolverlas si no me quedan?', a: '30 días para devolución o cambio, sin preguntas. Te mandamos la etiqueta prepagada.'},
    {q: '¿Aceptan pagos a plazos?', a: '4 pagos quincenales sin intereses con Afterpay o Klarna. También aceptamos Apple Pay, Google Pay, tarjeta y PayPal.'},
  ];
  return (
    <section id="faq" style={{background: 'var(--ink-2)', borderBlock: '1px solid var(--line)'}}>
      <div className="wrap">
        <div className="section-head">
          <div className="left">
            <span className="kicker">// FAQ / 06</span>
            <span className="num">CHAPTER 06 — DUDAS</span>
          </div>
          <div>
            <h2>
              Preguntas
              <br />
              que <em>llegan</em>.
            </h2>
            <p>Lo que todos preguntan antes de apretar el botón.</p>
          </div>
        </div>
        <div className="faq-wrap">
          {items.map((item, i) => (
            <details className="faq-item" key={i}>
              <summary className="faq-q">
                <span className="faq-q-text">{item.q}</span>
                <span className="plus" aria-hidden="true" />
              </summary>
              <div className="faq-a">{item.a}</div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ==================================================================== */
/* Icons                                                                */
/* ==================================================================== */
function TruckIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M16 3h5v5" />
      <path d="M8 21H3v-5" />
      <path d="M21 3l-7 7" />
      <path d="M3 21l7-7" />
    </svg>
  );
}
function ShieldIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  );
}
function ChartIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M3 3v18h18" />
      <path d="m7 14 4-4 4 4 5-5" />
    </svg>
  );
}
function CardIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 10h18" />
    </svg>
  );
}
function SunIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="5" />
      <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
    </svg>
  );
}
function HeartIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M20.5 7.3a4 4 0 0 0-5.8 0L12 10l-2.7-2.7a4 4 0 0 0-5.6 5.7l1 1L12 21l7.5-7.5 1-1a4 4 0 0 0 0-5.7Z" />
    </svg>
  );
}
function BoltIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z" />
    </svg>
  );
}
function GridIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M3 3h18v18H3z" />
      <path d="M3 9h18M9 21V9" />
    </svg>
  );
}
function EyeIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}
function BoxIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <path d="M16 2v4M8 2v4M3 10h18" />
    </svg>
  );
}
