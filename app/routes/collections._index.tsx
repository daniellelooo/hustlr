import type {Route} from './+types/collections._index';
import {redirect} from 'react-router';

export const meta: Route.MetaFunction = () => [
  {title: 'Colecciones · HUSTLR'},
];

export async function loader(_args: Route.LoaderArgs) {
  // Por ahora solo hay una colección (Drop 01) — redirigimos al catálogo.
  return redirect('/collections/all');
}

export default function CollectionsIndex() {
  return null;
}
