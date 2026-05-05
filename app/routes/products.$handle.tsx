import {useState} from 'react';
import {Link, useLoaderData, data} from 'react-router';
import type {Route} from './+types/products.$handle';
import {AddToCartButton} from '~/components/AddToCartButton';
import {useAside} from '~/components/Aside';
import {getMockProduct, type MockProduct, type MockVariant} from '~/lib/mockProducts';

export const meta: Route.MetaFunction = ({data}) => {
  const product = data?.product;
  if (!product) return [{title: 'Producto · HUSTLR'}];
  return [
    {title: `${product.title} · HUSTLR`},
    {name: 'description', content: product.description},
  ];
};

export async function loader({params}: Route.LoaderArgs) {
  const {handle} = params;
  if (!handle) throw new Response('No handle', {status: 404});
  const product = getMockProduct(handle);
  if (!product) throw new Response('Producto no encontrado', {status: 404});
  return data({product});
}

export default function ProductPage() {
  const {product} = useLoaderData<typeof loader>();
  return (
    <section className="product">
      <div className="wrap">
        <div className="product-breadcrumb">
          <Link to="/">Home</Link>
          <span style={{margin: '0 10px'}}>/</span>
          <Link to="/collections/all">Catálogo</Link>
          <span style={{margin: '0 10px'}}>/</span>
          <span className="current">{product.title}</span>
        </div>
        <ProductDetail product={product} />
      </div>
      <ProductLongDescription product={product} />
    </section>
  );
}

function ProductDetail({product}: {product: MockProduct}) {
  const [activeImage, setActiveImage] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState<MockVariant>(
    product.variants.find((v) => v.availableForSale) ?? product.variants[0],
  );
  const {open} = useAside();

  const price = parseFloat(selectedVariant.price.amount);
  const compareAt = selectedVariant.compareAtPrice
    ? parseFloat(selectedVariant.compareAtPrice.amount)
    : null;
  const onSale = compareAt !== null && compareAt > price;
  const savePct =
    onSale && compareAt
      ? Math.round(((compareAt - price) / compareAt) * 100)
      : 0;

  return (
    <div className="product-grid">
      <div className="product-gallery">
        <div className="product-gallery-main">
          <span>
            [ {product.images[activeImage]?.altText.toUpperCase() ?? product.title.toUpperCase()} ]
          </span>
        </div>
        <div className="product-gallery-thumbs">
          {product.images.map((img, i) => (
            <button
              key={i}
              className={`product-thumb${i === activeImage ? ' active' : ''}`}
              onClick={() => setActiveImage(i)}
              aria-label={img.altText}
            >
              {String(i + 1).padStart(2, '0')}
            </button>
          ))}
        </div>
      </div>

      <div>
        <div className="product-info-eyebrow">{product.subtitle}</div>
        <h1 className="product-title">{product.title}</h1>
        <div className="product-rating">
          <span className="stars">{'★'.repeat(Math.round(product.rating))}</span>
          <span>
            {product.rating} · {product.reviewCount.toLocaleString()} reviews
          </span>
        </div>
        <div className="product-price">
          <span className="now">${price.toFixed(0)}</span>
          {onSale && compareAt && (
            <>
              <span className="was">${compareAt.toFixed(0)}</span>
              <span className="save">Save {savePct}%</span>
            </>
          )}
        </div>
        <p className="product-desc">{product.description}</p>

        <div className="product-options">
          {product.options.map((opt) => (
            <div className="option-row" key={opt.name}>
              <span className="option-label">{opt.name}</span>
              <div className="option-pills">
                {opt.values.map((value) => {
                  const variant = product.variants.find(
                    (v) =>
                      v.selectedOptions.find((o) => o.name === opt.name)?.value === value,
                  );
                  const isActive = selectedVariant.id === variant?.id;
                  const isAvailable = variant?.availableForSale ?? false;
                  return (
                    <button
                      key={value}
                      className={`option-pill${isActive ? ' active' : ''}`}
                      disabled={!isAvailable}
                      onClick={() => variant && setSelectedVariant(variant)}
                    >
                      {value}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="product-actions">
          <AddToCartButton
            className="btn-buy"
            disabled={!selectedVariant.availableForSale}
            onClick={() => open('cart')}
            lines={[
              {
                merchandiseId: selectedVariant.id,
                quantity: 1,
                selectedVariant: selectedVariant as any,
              } as any,
            ]}
          >
            {selectedVariant.availableForSale
              ? `Agregar al carrito — $${price.toFixed(0)}`
              : 'Agotado'}
          </AddToCartButton>
          <button className="btn-wish" aria-label="Wishlist">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78Z" />
            </svg>
          </button>
        </div>

        <div className="product-guarantees">
          <div><CheckIcon /> Envío gratis</div>
          <div><CheckIcon /> Devolución 30 días</div>
          <div><CheckIcon /> Garantía de por vida</div>
        </div>

        <div className="mock-tag">
          ⚠ MOCK DATA — se reemplaza al conectar Shopify
        </div>
      </div>
    </div>
  );
}

function ProductLongDescription({product}: {product: MockProduct}) {
  return (
    <div className="specs" style={{marginTop: 80}}>
      <div className="wrap">
        <div className="specs-grid">
          <div>
            <span className="kicker" style={{marginBottom: 24, display: 'inline-flex'}}>
              // Detalles
            </span>
            <h2>
              ¿Por qué la <em>{product.title.split(' ')[0]}</em>?
            </h2>
            <p
              style={{
                color: '#cdcbc6',
                fontSize: 16,
                lineHeight: 1.7,
                marginBottom: 28,
                maxWidth: 540,
              }}
            >
              {product.longDescription}
            </p>
            {product.tags.length > 0 && (
              <div style={{display: 'flex', gap: 8, flexWrap: 'wrap'}}>
                {product.tags.map((t) => (
                  <span
                    key={t}
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: 10,
                      letterSpacing: '0.22em',
                      textTransform: 'uppercase',
                      padding: '6px 12px',
                      border: '1px solid var(--line)',
                      color: 'var(--muted)',
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            )}
          </div>
          <div className="specs-visual">
            <span>[ {product.title.toUpperCase()} ]</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function CheckIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}
