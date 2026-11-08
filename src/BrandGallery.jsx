import React from 'react';
import { modelImageId } from './brands';
import photoSources from '../public/images/brands/sources.json';

export default function BrandGallery({ selectedBrand }) {
  if (!selectedBrand) return null;
  const sources = selectedBrand.models.map(([model, page]) => ({
    model,
    source: photoSources[modelImageId(page)],
  }));

  return <section className="brand-section wrap" id="brands" aria-labelledby="brands-heading">
    <h2 id="brands-heading" tabIndex={-1}>{selectedBrand.name}</h2>
    <div className="brand-models" key={selectedBrand.name}>
      {sources.map(({ model, source }) => <figure key={model}>
        <div className="brand-model-photo"><img src={source.image} alt={`${selectedBrand.name} ${model}`} decoding="async"/></div>
        <figcaption>{model}</figcaption>
      </figure>)}
    </div>
    <details className="brand-photo-credits"><summary>Photography credits</summary><ul>
      {sources.map(({ model, source }) => <li key={model}><a href={source.source} target="_blank" rel="noreferrer">{selectedBrand.name} {model}</a> — {source.author || 'Wikimedia Commons contributor'} · <a href={source.licenseUrl} target="_blank" rel="noreferrer">{source.license}</a></li>)}
    </ul></details>
  </section>;
}
