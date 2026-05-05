import {
  createHydrogenContext,
  createRequestHandler,
  storefrontRedirect,
  InMemoryCache,
} from '@shopify/hydrogen';
import {createCookieSessionStorage, type Session, type SessionStorage} from 'react-router';
import {CART_QUERY_FRAGMENT} from '../app/lib/fragments';
import * as serverBuild from '../build/server/index.js';

class AppSession {
  public isPending = false;
  #sessionStorage: SessionStorage;
  #session: Session;

  constructor(sessionStorage: SessionStorage, session: Session) {
    this.#sessionStorage = sessionStorage;
    this.#session = session;
  }

  static async init(request: Request, secrets: string[]) {
    const storage = createCookieSessionStorage({
      cookie: {
        name: 'session',
        httpOnly: true,
        path: '/',
        sameSite: 'lax',
        secrets,
      },
    });
    const session = await storage
      .getSession(request.headers.get('Cookie'))
      .catch(() => storage.getSession());
    return new this(storage, session);
  }

  get has() { return this.#session.has; }
  get get() { return this.#session.get; }
  get flash() { return this.#session.flash; }
  get unset() { this.isPending = true; return this.#session.unset; }
  get set() { this.isPending = true; return this.#session.set; }
  destroy() { return this.#sessionStorage.destroySession(this.#session); }
  commit() { this.isPending = false; return this.#sessionStorage.commitSession(this.#session); }
}

async function createHydrogenRouterContext(
  request: Request,
  env: Record<string, string | undefined>,
) {
  if (!env?.SESSION_SECRET) {
    throw new Error('SESSION_SECRET environment variable is not set');
  }

  const session = await AppSession.init(request, [env.SESSION_SECRET]);

  return createHydrogenContext(
    {
      env: env as unknown as Env,
      request,
      cache: new InMemoryCache(),
      waitUntil: (p: Promise<unknown>) => p.catch(console.error),
      session,
      i18n: {language: 'EN', country: 'US'},
      cart: {queryFragment: CART_QUERY_FRAGMENT},
    },
    {},
  );
}

export default async function handler(request: Request): Promise<Response> {
  try {
    const hydrogenContext = await createHydrogenRouterContext(
      request,
      process.env,
    );

    const handleRequest = createRequestHandler({
      build: serverBuild as never,
      mode: process.env.NODE_ENV,
      getLoadContext: () => hydrogenContext,
    });

    const response = await handleRequest(request);

    if (hydrogenContext.session.isPending) {
      response.headers.set(
        'Set-Cookie',
        await hydrogenContext.session.commit(),
      );
    }

    if (response.status === 404) {
      return storefrontRedirect({
        request,
        response,
        storefront: hydrogenContext.storefront,
      });
    }

    return response;
  } catch (error) {
    console.error(error);
    return new Response('An unexpected error occurred', {status: 500});
  }
}
