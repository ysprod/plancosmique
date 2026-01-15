'use client';

import { memo } from 'react';

interface RootHeadMetaProps {
  fontVariable: string;
}

/**
 * Métadonnées additionnelles dans le head
 */
const RootHeadMeta = memo<RootHeadMetaProps>(({ fontVariable }) => {
  return (
    <>
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="application-name" content="Mon Étoile" />
      <meta name="format-detection" content="telephone=no, date=no, email=no, address=no" />
    </>
  );
});

RootHeadMeta.displayName = 'RootHeadMeta';

export default RootHeadMeta;
