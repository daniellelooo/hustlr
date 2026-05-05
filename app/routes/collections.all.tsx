import {Link} from 'react-router';
import type {Route} from './+types/collections.all';
import {getMockProducts, type MockProduct} from '~/lib/mockProducts';

export const meta: Route.MetaFunction = () => [
  {title: 'Catálogo · HUSTLR'},
  {
    name: 'description',
    content: 'Drop 01 — tres modelos de anti-blue light eyewear.',
  },
];

export async function loader(_args: Route.LoaderArgs) {
  return {products: getMockProducts()};
}

export default function Catalog() {
  const products = getMockProducts();
  return (
    <>
      <section className="catalog-hero">
        <div className="wrap">
          <div className="catalog-hero-grid">
            <div>
              <span className="kicker" style={{marginBottom: 28, display: 'inline-flex'}}>
                // Catálogo / Drop 01
              </span>
              <h1 className="catalog-title">
                Three <em>tools</em>.
                <br />
                One mission.
              </h1>
            </div>
            <div className="catalog-meta">
              <div>
                <b>03</b> modelos
              </div>
              <div>
                <b>09</b> variantes
              </div>
              <div>
                <b>04.26.26</b>
              </div>
              <div>
                LOS ANGELES <b>·</b> CA
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="stripe-band stripe-band-light" aria-hidden="true" />

      <section className="catalog-list">
        <div className="wrap">
          <div className="catalog-grid">
            {products.map((p, i) => (
              <ProductCard product={p} index={i + 1} key={p.id} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function ProductCard({product, index}: {product: MockProduct; index: number}) {
  const price = product.priceRange.minVariantPrice.amount;
  const compareAt = product.compareAtPriceRange.minVariantPrice.amount;
  const onSale = compareAt !== price;
  return (
    <Link to={`/products/${product.handle}`} className="product-card">
      <div className="product-card-image">
        <span className="product-card-num">{String(index).padStart(2, '0')}</span>
        {product.badge && <span className="product-card-tag">{product.badge}</span>}
        <span className="placeholder">[ {product.title.toUpperCase()} ]</span>
      </div>
      <div className="product-card-body">
        <div className="product-card-info">
          <div className="product-card-sub">{product.subtitle}</div>
          <div className="product-card-title">{product.title}</div>
        </div>
        <div className="product-card-price">
          ${parseFloat(price).toFixed(0)}
          {onSale && <span className="was">${parseFloat(compareAt).toFixed(0)}</span>}
        </div>
      </div>
    </Link>
  );
}
