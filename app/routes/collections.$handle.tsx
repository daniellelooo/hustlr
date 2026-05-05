import type {Route} from './+types/collections.$handle';
import {redirect} from 'react-router';

export async function loader(_args: Route.LoaderArgs) {
  // Mientras hay un solo Drop, todas las colecciones renderizan el catálogo.
  return redirect('/collections/all');
}

export default function CollectionByHandle() {
  return null;
}
