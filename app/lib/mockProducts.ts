/**
 * Mock product data for development.
 * Shape mirrors Shopify Storefront API so it can be swapped for real data
 * without changing the components that consume it.
 *
 * When the real Shopify store is ready, delete this file and use
 * the regular GraphQL queries that Hydrogen scaffolded.
 */

export type MockMoney = {
  amount: string;
  currencyCode: 'USD';
};

export type MockOption = {
  name: string;
  values: string[];
};

export type MockVariant = {
  id: string;
  title: string;
  availableForSale: boolean;
  selectedOptions: {name: string; value: string}[];
  price: MockMoney;
  compareAtPrice: MockMoney | null;
  image: {url: string; altText: string; width: number; height: number} | null;
};

export type MockProduct = {
  id: string;
  handle: string;
  title: string;
  subtitle: string;
  vendor: string;
  description: string;
  longDescription: string;
  featuredImage: {url: string; altText: string; width: number; height: number};
  images: {url: string; altText: string; width: number; height: number}[];
  options: MockOption[];
  variants: MockVariant[];
  priceRange: {minVariantPrice: MockMoney; maxVariantPrice: MockMoney};
  compareAtPriceRange: {minVariantPrice: MockMoney; maxVariantPrice: MockMoney};
  rating: number;
  reviewCount: number;
  badge?: string;
  tags: string[];
};

const PLACEHOLDER = (label: string) =>
  `data:image/svg+xml;utf8,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400"><rect width="400" height="400" fill="#161616"/><text x="50%" y="50%" font-family="monospace" font-size="14" fill="#444" text-anchor="middle" dominant-baseline="middle">[ ${label} ]</text></svg>`,
  )}`;

const usd = (amount: string): MockMoney => ({amount, currencyCode: 'USD'});

const sizes = ['S', 'M', 'L'];

const buildVariants = (
  productId: string,
  basePrice: string,
  compareAt: string | null,
  imgLabel: string,
): MockVariant[] =>
  sizes.map((size, i) => ({
    id: `${productId}-variant-${size}`,
    title: size,
    availableForSale: !(i === 2 && productId === 'gid://mock/Product/3'),
    selectedOptions: [{name: 'Tamaño', value: size}],
    price: usd(basePrice),
    compareAtPrice: compareAt ? usd(compareAt) : null,
    image: {
      url: PLACEHOLDER(imgLabel),
      altText: `${imgLabel} - ${size}`,
      width: 800,
      height: 800,
    },
  }));

export const MOCK_PRODUCTS: MockProduct[] = [
  {
    id: 'gid://mock/Product/1',
    handle: 'obsidian',
    title: 'Obsidian Edition',
    subtitle: 'Drop 01 · Anti-Blue Light',
    vendor: 'HUSTLR',
    description:
      'Lentes diseñadas para quien construye su imperio de 5am a 11pm. Bloqueo total UV400, lente rojo polarizado TAC y marco TR90 aeroespacial.',
    longDescription:
      'La Obsidian es el modelo insignia de Hustlr. Marco TR90 matte black de 22g, lente rojo polarizado de 1.1mm que filtra el 100% de luz azul dañina. Bisagras spring-flex japonesas. Anti-rayón de 5 capas. Ensamblada en LA.',
    featuredImage: {
      url: PLACEHOLDER('OBSIDIAN'),
      altText: 'Obsidian Edition',
      width: 1200,
      height: 1200,
    },
    images: [
      {url: PLACEHOLDER('OBSIDIAN · FRONT'), altText: 'Front', width: 1200, height: 1200},
      {url: PLACEHOLDER('OBSIDIAN · 3-4'), altText: '3/4', width: 1200, height: 1200},
      {url: PLACEHOLDER('OBSIDIAN · SIDE'), altText: 'Side', width: 1200, height: 1200},
      {url: PLACEHOLDER('OBSIDIAN · LIFE'), altText: 'Lifestyle', width: 1200, height: 1200},
    ],
    options: [{name: 'Tamaño', values: sizes}],
    variants: buildVariants('gid://mock/Product/1', '89.00', '149.00', 'OBSIDIAN'),
    priceRange: {minVariantPrice: usd('89.00'), maxVariantPrice: usd('89.00')},
    compareAtPriceRange: {
      minVariantPrice: usd('149.00'),
      maxVariantPrice: usd('149.00'),
    },
    rating: 4.9,
    reviewCount: 2847,
    badge: 'NEW DROP',
    tags: ['anti-blue-light', 'polarizado', 'best-seller'],
  },
  {
    id: 'gid://mock/Product/2',
    handle: 'carbon',
    title: 'Carbon Edition',
    subtitle: 'Drop 01 · Office Mode',
    vendor: 'HUSTLR',
    description:
      'Lente ámbar para horas largas frente al monitor. Filtrado de luz azul + reducción de glare para sesiones de trabajo profundo.',
    longDescription:
      'La Carbon es la versión "office" del lineup. Marco TR90 charcoal con lente ámbar que filtra 87% de luz azul sin distorsionar colores. Pensada para devs, traders y editores que pasan 10+ horas frente a pantallas.',
    featuredImage: {
      url: PLACEHOLDER('CARBON'),
      altText: 'Carbon Edition',
      width: 1200,
      height: 1200,
    },
    images: [
      {url: PLACEHOLDER('CARBON · FRONT'), altText: 'Front', width: 1200, height: 1200},
      {url: PLACEHOLDER('CARBON · 3-4'), altText: '3/4', width: 1200, height: 1200},
      {url: PLACEHOLDER('CARBON · SIDE'), altText: 'Side', width: 1200, height: 1200},
    ],
    options: [{name: 'Tamaño', values: sizes}],
    variants: buildVariants('gid://mock/Product/2', '79.00', '119.00', 'CARBON'),
    priceRange: {minVariantPrice: usd('79.00'), maxVariantPrice: usd('79.00')},
    compareAtPriceRange: {
      minVariantPrice: usd('119.00'),
      maxVariantPrice: usd('119.00'),
    },
    rating: 4.8,
    reviewCount: 1213,
    tags: ['anti-blue-light', 'office', 'amber'],
  },
  {
    id: 'gid://mock/Product/3',
    handle: 'bone',
    title: 'Bone Edition',
    subtitle: 'Drop 01 · Daylight',
    vendor: 'HUSTLR',
    description:
      'Marco bone con lente clear anti-fatiga. Para los que codean de día y no quieren oscurecer su mundo.',
    longDescription:
      'La Bone es el modelo más versátil. Marco off-white con lente clear que reduce fatiga visual sin teñir colores. Misma protección anti-luz azul (40%) sin la estética dark de las otras dos.',
    featuredImage: {
      url: PLACEHOLDER('BONE'),
      altText: 'Bone Edition',
      width: 1200,
      height: 1200,
    },
    images: [
      {url: PLACEHOLDER('BONE · FRONT'), altText: 'Front', width: 1200, height: 1200},
      {url: PLACEHOLDER('BONE · 3-4'), altText: '3/4', width: 1200, height: 1200},
      {url: PLACEHOLDER('BONE · SIDE'), altText: 'Side', width: 1200, height: 1200},
    ],
    options: [{name: 'Tamaño', values: sizes}],
    variants: buildVariants('gid://mock/Product/3', '69.00', null, 'BONE'),
    priceRange: {minVariantPrice: usd('69.00'), maxVariantPrice: usd('69.00')},
    compareAtPriceRange: {
      minVariantPrice: usd('69.00'),
      maxVariantPrice: usd('69.00'),
    },
    rating: 4.7,
    reviewCount: 524,
    badge: 'LOW STOCK',
    tags: ['anti-blue-light', 'daylight', 'clear'],
  },
];

export function getMockProduct(handle: string): MockProduct | undefined {
  return MOCK_PRODUCTS.find((p) => p.handle === handle);
}

export function getMockProducts(): MockProduct[] {
  return MOCK_PRODUCTS;
}
