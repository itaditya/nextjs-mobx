import { useStaticRendering } from 'mobx-react-lite';
import 'mobx-react-lite/batchingForReactDom';

import { ProviderRoot } from '../storeRoot';

import '../css/tailwind.css';

const isServer = typeof window === 'undefined';
// eslint-disable-next-line react-hooks/rules-of-hooks
useStaticRendering(isServer);

export default function MyApp({ Component, pageProps }) {
  const { initialData } = pageProps;
  return (
    <ProviderRoot value={initialData}>
      <Component {...pageProps} />
    </ProviderRoot>
  );
}
