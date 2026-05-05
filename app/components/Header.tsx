import {Suspense} from 'react';
import {Await, NavLink, useAsyncValue} from 'react-router';
import {
  type CartViewPayload,
  useAnalytics,
  useOptimisticCart,
} from '@shopify/hydrogen';
import type {HeaderQuery, CartApiQueryFragment} from 'storefrontapi.generated';
import {useAside} from '~/components/Aside';

interface HeaderProps {
  header: HeaderQuery;
  cart: Promise<CartApiQueryFragment | null>;
  isLoggedIn: Promise<boolean>;
  publicStoreDomain: string;
}

type Viewport = 'desktop' | 'mobile';

const ANNOUNCEMENTS = [
  '🔥 Envío gratis a todo USA en pedidos $75+',
  '🛡️ Garantía de por vida contra rayones',
  '💳 4 pagos sin intereses con Afterpay',
  '⚡ Código GRIND15 — 15% off en tu primera orden',
];

export function Header({
  header,
  isLoggedIn,
  cart,
  publicStoreDomain,
}: HeaderProps) {
  const {menu} = header;
  return (
    <>
      <div className="announce">
        <div className="track">
          {[...ANNOUNCEMENTS, ...ANNOUNCEMENTS].map((msg, i) => (
            <span key={i}>{msg}</span>
          ))}
        </div>
      </div>
      <header className="header">
        <div className="header-inner">
          <NavLink prefetch="intent" to="/" end className="logo">
            <span className="logo-mark">
              <i />
              <i />
              <i />
            </span>
            HUSTLR
          </NavLink>
          <HeaderMenu
            menu={menu}
            viewport="desktop"
            primaryDomainUrl={header.shop.primaryDomain.url}
            publicStoreDomain={publicStoreDomain}
          />
          <HeaderCtas isLoggedIn={isLoggedIn} cart={cart} />
        </div>
      </header>
    </>
  );
}

export function HeaderMenu({
  menu,
  primaryDomainUrl,
  viewport,
  publicStoreDomain,
}: {
  menu: HeaderProps['header']['menu'];
  primaryDomainUrl: HeaderProps['header']['shop']['primaryDomain']['url'];
  viewport: Viewport;
  publicStoreDomain: HeaderProps['publicStoreDomain'];
}) {
  const className = viewport === 'desktop' ? 'header-menu' : 'header-menu-mobile';
  const {close} = useAside();

  return (
    <nav className={className} role="navigation">
      {viewport === 'mobile' && (
        <NavLink end onClick={close} prefetch="intent" to="/">
          Home
        </NavLink>
      )}
      {(menu || FALLBACK_HEADER_MENU).items.map((item) => {
        if (!item.url) return null;
        if (item.title.toLowerCase() !== 'collections') return null;
        const url =
          item.url.includes('myshopify.com') ||
          item.url.includes(publicStoreDomain) ||
          item.url.includes(primaryDomainUrl)
            ? new URL(item.url).pathname
            : item.url;
        return (
          <NavLink
            end
            key={item.id}
            onClick={close}
            prefetch="intent"
            to={url}
            className={({isActive}) => (isActive ? 'active' : '')}
          >
            {item.title}
          </NavLink>
        );
      })}
    </nav>
  );
}

function HeaderCtas({
  isLoggedIn,
  cart,
}: Pick<HeaderProps, 'isLoggedIn' | 'cart'>) {
  return (
    <nav className="header-ctas" role="navigation">
      <SearchToggle />
      <AccountLink isLoggedIn={isLoggedIn} />
      <CartToggle cart={cart} />
      <HeaderMenuMobileToggle />
    </nav>
  );
}

function AccountLink({isLoggedIn}: {isLoggedIn: HeaderProps['isLoggedIn']}) {
  return (
    <NavLink prefetch="intent" to="/account" className="icon-btn" aria-label="Cuenta">
      <Suspense fallback={<UserIcon />}>
        <Await resolve={isLoggedIn} errorElement={<UserIcon />}>
          {() => <UserIcon />}
        </Await>
      </Suspense>
    </NavLink>
  );
}

function HeaderMenuMobileToggle() {
  const {open} = useAside();
  return (
    <button
      className="icon-btn menu-toggle"
      onClick={() => open('mobile')}
      aria-label="Menú"
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M4 6h16M4 12h16M4 18h16" />
      </svg>
    </button>
  );
}

function SearchToggle() {
  const {open} = useAside();
  return (
    <button className="icon-btn" onClick={() => open('search')} aria-label="Buscar">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="11" cy="11" r="7" />
        <path d="m21 21-4.35-4.35" />
      </svg>
    </button>
  );
}

function CartBadge({count}: {count: number}) {
  const {open} = useAside();
  const {publish, shop, cart, prevCart} = useAnalytics();

  return (
    <button
      className="icon-btn cart-badge"
      data-count={count}
      aria-label={`Carrito (${count})`}
      onClick={() => {
        open('cart');
        publish('cart_viewed', {
          cart,
          prevCart,
          shop,
          url: typeof window !== 'undefined' ? window.location.href : '',
        } as CartViewPayload);
      }}
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
        <path d="M3 6h18" />
        <path d="M16 10a4 4 0 0 1-8 0" />
      </svg>
    </button>
  );
}

function CartToggle({cart}: Pick<HeaderProps, 'cart'>) {
  return (
    <Suspense fallback={<CartBadge count={0} />}>
      <Await resolve={cart}>
        <CartBanner />
      </Await>
    </Suspense>
  );
}

function CartBanner() {
  const originalCart = useAsyncValue() as CartApiQueryFragment | null;
  const cart = useOptimisticCart(originalCart);
  return <CartBadge count={cart?.totalQuantity ?? 0} />;
}

function UserIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M20 21a8 8 0 0 0-16 0" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

const FALLBACK_HEADER_MENU = {
  id: 'fallback-menu',
  items: [
    {id: 'shop', resourceId: null, tags: [], title: 'Shop', type: 'HTTP', url: '/collections/all', items: []},
    {id: 'tech', resourceId: null, tags: [], title: 'Tecnología', type: 'HTTP', url: '/#features', items: []},
    {id: 'reviews', resourceId: null, tags: [], title: 'Reviews', type: 'HTTP', url: '/#reviews', items: []},
    {id: 'faq', resourceId: null, tags: [], title: 'FAQ', type: 'HTTP', url: '/#faq', items: []},
  ],
};
