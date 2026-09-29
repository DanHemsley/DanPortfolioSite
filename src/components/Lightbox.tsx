import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from 'react';
import { images, type ImageSlug } from '../images';
import { ArrowIcon, CloseIcon } from './icons';

interface Item {
  slug: ImageSlug;
  alt: string;
}

type Open = (trigger: HTMLElement) => void;
const LightboxContext = createContext<Open>(() => {});
export const useLightbox = () => useContext(LightboxContext);

/**
 * Page-wide image viewer. Every <Figure> renders a trigger marked with
 * data-lightbox; the gallery is read from the DOM at open time so it always
 * follows the on-page order.
 */
export function LightboxProvider({ children }: { children: ReactNode }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);
  const [items, setItems] = useState<Item[]>([]);
  const [index, setIndex] = useState(-1);

  const open = useCallback<Open>((trigger) => {
    const triggers = Array.from(document.querySelectorAll<HTMLElement>('[data-lightbox]'));
    setItems(triggers.map((el) => ({ slug: el.dataset.slug as ImageSlug, alt: el.dataset.alt ?? '' })));
    setIndex(triggers.indexOf(trigger));
    triggerRef.current = trigger;
  }, []);

  const close = useCallback(() => dialogRef.current?.close(), []);
  const step = useCallback((delta: number) => setIndex((i) => (i + delta + items.length) % items.length), [items.length]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog || index < 0 || dialog.open) return;
    dialog.showModal();
    document.documentElement.classList.add('is-locked');
  }, [index]);

  const onClose = () => {
    document.documentElement.classList.remove('is-locked');
    setIndex(-1);
    triggerRef.current?.focus();
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') step(1);
    else if (e.key === 'ArrowLeft') step(-1);
  };

  const item = index >= 0 ? items[index] : undefined;
  const data = item && images[item.slug];

  return (
    <LightboxContext.Provider value={open}>
      {children}
      <dialog
        ref={dialogRef}
        className="lightbox"
        aria-label="Image viewer"
        onClose={onClose}
        onKeyDown={onKeyDown}
        // Clicking the backdrop (the dialog element itself) closes the viewer.
        onClick={(e) => e.target === e.currentTarget && close()}
      >
        {item && data && (
          <figure className="lightbox__figure" onClick={(e) => e.target === e.currentTarget && close()}>
            <img
              key={item.slug + index}
              className="lightbox__img"
              src={data.src}
              srcSet={data.srcSet}
              sizes="100vw"
              width={data.width}
              height={data.height}
              alt={item.alt}
            />
            <figcaption className="lightbox__caption">
              <span>{item.alt}</span>
              <span className="lightbox__count" aria-live="polite">
                {index + 1} / {items.length}
              </span>
            </figcaption>
          </figure>
        )}
        <button type="button" className="lightbox__btn lightbox__close" onClick={close} aria-label="Close image viewer" autoFocus>
          <CloseIcon />
        </button>
        {items.length > 1 && (
          <>
            <button type="button" className="lightbox__btn lightbox__prev" onClick={() => step(-1)} aria-label="Previous image">
              <ArrowIcon direction="left" />
            </button>
            <button type="button" className="lightbox__btn lightbox__next" onClick={() => step(1)} aria-label="Next image">
              <ArrowIcon direction="right" />
            </button>
          </>
        )}
      </dialog>
    </LightboxContext.Provider>
  );
}
