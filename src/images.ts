import generated from './generated/images.json';

export type ImageSlug = keyof typeof generated;
export interface ImageData {
  width: number;
  height: number;
  src: string;
  srcSet: string;
}

export const images: Record<ImageSlug, ImageData> = generated;
