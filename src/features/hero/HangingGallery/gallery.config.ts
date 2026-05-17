export const GALLERY_PHOTOS = [
  { id: 1, src: "/images/gallery/photo-01.avif", x: "10%", y: "10%", z: 4, drift: { duration: 6, delay: 0 }, size: "w-40 h-56", label: "Perspective" },
  { id: 2, src: "/images/gallery/photo-02.avif", x: "80%", y: "15%", z: 2, drift: { duration: 8, delay: 1 }, size: "w-48 h-64", label: "Symmetry" },
  { id: 3, src: "/images/gallery/photo-03.avif", x: "45%", y: "20%", z: 3, drift: { duration: 5, delay: 0.5 }, size: "w-32 h-44", label: "Depth" },
  { id: 4, src: "/images/gallery/photo-04.avif", x: "75%", y: "60%", z: 5, drift: { duration: 7, delay: 2 }, size: "w-44 h-56", label: "Contrast" },
  { id: 5, src: "/images/gallery/photo-05.avif", x: "15%", y: "65%", z: 3, drift: { duration: 6, delay: 0.2 }, size: "w-36 h-48", label: "Balance" },
  { id: 6, src: "/images/gallery/photo-06.avif", x: "50%", y: "75%", z: 1, drift: { duration: 9, delay: 1.5 }, size: "w-40 h-60", label: "Detail" },
  { id: 7, src: "/images/gallery/photo-07.avif", x: "85%", y: "80%", z: 2, drift: { duration: 5.5, delay: 0.8 }, size: "w-32 h-40", label: "Light" },
  { id: 8, src: "/images/gallery/photo-08.avif", x: "5%", y: "40%", z: 4, drift: { duration: 6.2, delay: 0.1 }, size: "w-48 h-64", label: "Focus" },
] as const;

export type GalleryPhoto = typeof GALLERY_PHOTOS[number];

export const PARALLAX_DEPTH = { 1: 0.02, 2: 0.05, 3: 0.09, 4: 0.14, 5: 0.2 };
