import type { ReactNode } from 'react';
import type { Pic } from '../content';
import { images } from '../images';
import { useLightbox } from './Lightbox';

interface Props {
  pic: Pic;
  /** Rendered width hint for srcset selection. */
  sizes: string;
  className?: string;
  /** "cover" fills a sized container (collage tiles, cropped panels); default keeps natural ratio. */
  fit?: 'natural' | 'cover';
  position?: string;
  priority?: boolean;
  caption?: ReactNode;
  framed?: boolean;
}

export function Figure({ pic, sizes, className = '', fit = 'natural', position, priority, caption, framed = true }: Props) {
  const open = useLightbox();
  const data = images[pic.slug];
  return (
    <figure className={`figure ${framed ? 'figure--framed' : ''} figure--${fit} ${className}`}>
      <button
        type="button"
        className="figure__trigger"
        data-lightbox=""
        data-slug={pic.slug}
        data-alt={pic.alt}
        aria-label={`Enlarge image: ${pic.alt}`}
        onClick={(e) => open(e.currentTarget)}
      >
        <img
          src={data.src}
          srcSet={data.srcSet}
          sizes={sizes}
          width={data.width}
          height={data.height}
          alt={pic.alt}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          // React 18 doesn't know fetchPriority yet; pass the lowercase DOM attribute.
          {...{ fetchpriority: priority ? 'high' : 'auto' }}
          style={position ? { objectPosition: position } : undefined}
        />
      </button>
      {caption && <figcaption className="figure__caption">{caption}</figcaption>}
    </figure>
  );
}
