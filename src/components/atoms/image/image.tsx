import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { ImageIcon, AlertCircle, Loader2, X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";

// Hook for text direction detection
function useTextDirection(dir?: "ltr" | "rtl" | "auto") {
  const [textDirection, setTextDirection] = React.useState<"ltr" | "rtl">(
    "ltr"
  );

  React.useEffect(() => {
    if (dir === "auto") {
      const htmlDir = document.documentElement.dir as "ltr" | "rtl";
      const bodyDir = document.body.dir as "ltr" | "rtl";
      const detectedDir = htmlDir || bodyDir || "ltr";
      setTextDirection(detectedDir);
    } else if (dir) {
      setTextDirection(dir);
    } else {
      const htmlDir = document.documentElement.dir as "ltr" | "rtl";
      const bodyDir = document.body.dir as "ltr" | "rtl";
      setTextDirection(htmlDir || bodyDir || "ltr");
    }
  }, [dir]);

  return textDirection;
}

// Image variants using class-variance-authority
const imageVariants = cva(
  "relative overflow-hidden transition-all duration-300 ease-in-out",
  {
    variants: {
      variant: {
        default: "rounded-md",
        rounded: "rounded-full",
        square: "rounded-none",
        card: "rounded-lg shadow-sm",
        hero: "rounded-xl shadow-lg",
        thumbnail: "rounded-sm",
      },
      size: {
        xs: "w-8 h-8",
        sm: "w-12 h-12",
        md: "w-16 h-16",
        lg: "w-24 h-24",
        xl: "w-32 h-32",
        "2xl": "w-48 h-48",
        full: "w-full h-full",
        auto: "w-auto h-auto",
      },
      fit: {
        cover: "object-cover",
        contain: "object-contain",
        fill: "object-fill",
        none: "object-none",
        "scale-down": "object-scale-down",
      },
      loading: {
        lazy: "",
        eager: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
      fit: "cover",
      loading: "lazy",
    },
  }
);

export interface ImageProps
  extends Omit<
      React.ImgHTMLAttributes<HTMLImageElement>,
      "src" | "alt" | "onError"
    >,
    VariantProps<typeof imageVariants> {
  src?: string;
  alt: string;
  fallbackSrc?: string;
  placeholder?: React.ReactNode;
  errorPlaceholder?: React.ReactNode;
  loading?: "lazy" | "eager";
  onLoad?: () => void;
  onError?: (error: Error) => void;
  onLoadStart?: () => void;
  onLoadEnd?: () => void;
  dir?: "ltr" | "rtl" | "auto";
  showLoadingSpinner?: boolean;
  showErrorIcon?: boolean;
  blurDataURL?: string;
  priority?: boolean;
  sizes?: string;
  placeholderClassName?: string;
  errorClassName?: string;
  loadingClassName?: string;
  // Gallery/Preview props
  showPreview?: boolean;
  gallery?: string[];
  previewTitle?: string;
  previewDescription?: string;
}

const Image = React.forwardRef<HTMLImageElement, ImageProps>(
  (
    {
      className,
      variant = "default",
      size = "md",
      fit = "cover",
      loading = "lazy",
      src,
      alt,
      fallbackSrc,
      placeholder,
      errorPlaceholder,
      onLoad,
      onError,
      onLoadStart,
      onLoadEnd,
      dir,
      showLoadingSpinner = true,
      showErrorIcon = true,
      blurDataURL,
      priority = false,
      sizes,
      placeholderClassName,
      errorClassName,
      loadingClassName,
      showPreview = false,
      gallery = [],
      previewTitle,
      previewDescription,
      ...props
    },
    ref
  ) => {
    const textDirection = useTextDirection(dir);
    const [imageState, setImageState] = React.useState<
      "loading" | "loaded" | "error"
    >(src ? "loading" : "error");
    const [currentSrc, setCurrentSrc] = React.useState<string | undefined>(src);
    const [retryCount, setRetryCount] = React.useState(0);
    const maxRetries = 2;
    
    // Gallery preview state
    const [isPreviewOpen, setIsPreviewOpen] = React.useState(false);
    const [currentImageIndex, setCurrentImageIndex] = React.useState(0);
    const [isZoomed, setIsZoomed] = React.useState(false);

    // Reset state when src changes
    React.useEffect(() => {
      if (src) {
        setImageState("loading");
        setCurrentSrc(src);
        setRetryCount(0);
        
        // Fallback: if image doesn't load within 5 seconds, assume it's loaded
        const fallbackTimer = setTimeout(() => {
          setImageState("loaded");
        }, 5000);
        
        return () => clearTimeout(fallbackTimer);
      } else {
        setImageState("error");
        setCurrentSrc(undefined);
        setRetryCount(0);
      }
    }, [src]);

    const handleLoad = React.useCallback((e: React.SyntheticEvent<HTMLImageElement>) => {
      setImageState("loaded");
      onLoad?.();
      onLoadEnd?.();
    }, [onLoad, onLoadEnd, currentSrc]);

    const handleError = React.useCallback(() => {
      // Only create error event if onError callback is provided
      if (onError) {
        const errorEvent = new Error(`Failed to load image: ${currentSrc}`);
        onError(errorEvent);
      }

      if (
        retryCount < maxRetries &&
        fallbackSrc &&
        currentSrc !== fallbackSrc
      ) {
        // Try fallback image
        setCurrentSrc(fallbackSrc);
        setRetryCount((prev) => prev + 1);
        return;
      }

      setImageState("error");
      onLoadEnd?.();
    }, [currentSrc, fallbackSrc, retryCount, maxRetries, onError, onLoadEnd]);

    const handleLoadStart = React.useCallback(() => {
      onLoadStart?.();
    }, [onLoadStart]);

    const handleRetry = React.useCallback(() => {
      setImageState("loading");
      setRetryCount(0);
      setCurrentSrc(src);
    }, [src]);

    // Gallery handlers
    const handlePreviewClick = React.useCallback(() => {
      if (showPreview && (gallery.length > 0 || src)) {
        const images = gallery.length > 0 ? gallery : [src!];
        const index = images.findIndex(img => img === src);
        setCurrentImageIndex(index >= 0 ? index : 0);
        setIsPreviewOpen(true);
        setIsZoomed(false);
      }
    }, [showPreview, gallery, src]);

    const handleClosePreview = React.useCallback(() => {
      setIsPreviewOpen(false);
      setIsZoomed(false);
    }, []);

    const handleNextImage = React.useCallback(() => {
      const images = gallery.length > 0 ? gallery : [src!];
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
      setIsZoomed(false);
    }, [gallery, src]);

    const handlePrevImage = React.useCallback(() => {
      const images = gallery.length > 0 ? gallery : [src!];
      setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
      setIsZoomed(false);
    }, [gallery, src]);

    const handleToggleZoom = React.useCallback(() => {
      setIsZoomed((prev) => !prev);
    }, []);

    // Keyboard navigation
    React.useEffect(() => {
      if (!isPreviewOpen) return;

      const handleKeyDown = (e: KeyboardEvent) => {
        switch (e.key) {
          case "Escape":
            handleClosePreview();
            break;
          case "ArrowRight":
            handleNextImage();
            break;
          case "ArrowLeft":
            handlePrevImage();
            break;
          case " ":
            e.preventDefault();
            handleToggleZoom();
            break;
        }
      };

      document.addEventListener("keydown", handleKeyDown);
      return () => document.removeEventListener("keydown", handleKeyDown);
    }, [isPreviewOpen, handleClosePreview, handleNextImage, handlePrevImage, handleToggleZoom]);

    // Default placeholders
    const defaultPlaceholder = (
      <div
        className={cn(
          "absolute inset-0 flex items-center justify-center bg-muted",
          placeholderClassName
        )}
      >
        {showLoadingSpinner ? (
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        ) : (
          <ImageIcon className="h-6 w-6 text-muted-foreground" />
        )}
      </div>
    );

    const defaultErrorPlaceholder = (
      <div
        className={cn(
          "absolute inset-0 flex flex-col items-center justify-center bg-muted text-muted-foreground",
          errorClassName
        )}
      >
        {showErrorIcon && <AlertCircle className="h-6 w-6 mb-2" />}
        <span className="text-xs text-center px-2">Failed to load image</span>
        {retryCount < maxRetries && (
          <button
            onClick={handleRetry}
            className="mt-2 text-xs underline hover:no-underline"
            type="button"
          >
            Retry
          </button>
        )}
      </div>
    );



    const images = gallery.length > 0 ? gallery : [src!];
    const currentPreviewImage = images[currentImageIndex];
    
    // Debug logging
    
    return (
      <>
        <div
          dir={textDirection}
          className={cn(
            "relative inline-block",
            imageVariants({ variant, size, fit, loading }),
            showPreview && "cursor-pointer hover:opacity-90 transition-opacity"
          )}
          onClick={handlePreviewClick}
        >
        {/* Loading placeholder */}
        {imageState === "loading" && (
          <>
            {placeholder || defaultPlaceholder}
            {blurDataURL && (
              <img
                src={blurDataURL}
                alt=""
                className="absolute inset-0 w-full h-full object-cover filter blur-sm"
                aria-hidden="true"
              />
            )}
          </>
        )}

        {/* Error placeholder */}
        {imageState === "error" &&
          (errorPlaceholder || defaultErrorPlaceholder)}

        {/* Main image */}
        {currentSrc && (
          <img
            ref={ref}
            src={currentSrc}
            alt={alt}
            loading={priority ? "eager" : loading}
            onLoad={handleLoad}
            onError={handleError}
            onLoadStart={handleLoadStart}
            onLoadCapture={() => {
              setImageState("loaded");
            }}
            className={cn(
              "w-full h-full transition-opacity duration-300",
              fit === "cover" && "object-cover",
              fit === "contain" && "object-contain", 
              fit === "fill" && "object-fill",
              fit === "none" && "object-none",
              fit === "scale-down" && "object-scale-down",
              imageState === "loaded" ? "opacity-100" : "opacity-0",
              className
            )}
            sizes={sizes}
            {...props}
          />
        )}

        {/* Loading overlay for better UX */}
        {imageState === "loading" && showLoadingSpinner && (
          <div
            className={cn(
              "absolute inset-0 flex items-center justify-center bg-background/50",
              loadingClassName
                      )}
        >
          <Loader2 className="h-4 w-4 animate-spin text-primary" />
        </div>
      )}

      {/* Preview overlay icon */}
      {showPreview && imageState === "loaded" && (
        <div className="absolute top-2 right-2 bg-black/50 text-white p-1 rounded-full opacity-0 hover:opacity-100 transition-opacity">
          <ZoomIn className="h-4 w-4" />
        </div>
      )}
    </div>

    {/* Gallery Preview Modal */}
    {isPreviewOpen && (
      <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center">
        <div className="relative w-full h-full flex items-center justify-center p-4">
          {/* Close button */}
          <button
            onClick={handleClosePreview}
            className="absolute top-4 right-4 z-10 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
            aria-label="Close preview"
          >
            <X className="h-6 w-6" />
          </button>

          {/* Navigation buttons */}
          {images.length > 1 && (
            <>
              <button
                onClick={handlePrevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
                aria-label="Previous image"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button
                onClick={handleNextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
                aria-label="Next image"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </>
          )}

          {/* Zoom button */}
          <button
            onClick={handleToggleZoom}
            className="absolute top-4 left-4 z-10 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
            aria-label={isZoomed ? "Zoom out" : "Zoom in"}
          >
            <ZoomIn className="h-6 w-6" />
          </button>

          {/* Image container */}
          <div className="relative max-w-full max-h-full">
            <img
              src={currentPreviewImage}
              alt={previewTitle || alt}
              className={cn(
                "max-w-full max-h-full object-contain transition-transform duration-300",
                isZoomed ? "scale-150 cursor-zoom-out" : "cursor-zoom-in"
              )}
              onClick={handleToggleZoom}
            />
          </div>

          {/* Image info */}
          {(previewTitle || previewDescription) && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white p-4 rounded-lg max-w-md text-center">
              {previewTitle && (
                <h3 className="text-lg font-semibold mb-2">{previewTitle}</h3>
              )}
              {previewDescription && (
                <p className="text-sm opacity-90">{previewDescription}</p>
              )}
            </div>
          )}

          {/* Image counter */}
          {images.length > 1 && (
            <div className="absolute bottom-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
              {currentImageIndex + 1} / {images.length}
            </div>
          )}

          {/* Thumbnail strip */}
          {images.length > 1 && (
            <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex gap-2 max-w-full overflow-x-auto">
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={cn(
                    "flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all",
                    index === currentImageIndex
                      ? "border-white"
                      : "border-transparent hover:border-white/50"
                  )}
                >
                  <img
                    src={image}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    )}
  </>
  );
  }
);
Image.displayName = "Image";

// Lazy Image component with Intersection Observer
export const LazyImage = React.forwardRef<HTMLImageElement, ImageProps>(
  ({ ...props }, ref) => {
    const [isInView, setIsInView] = React.useState(false);
    const imgRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.disconnect();
          }
        },
        { threshold: 0.1 }
      );

      if (imgRef.current) {
        observer.observe(imgRef.current);
      }

      return () => observer.disconnect();
    }, []);

  return (
      <div ref={imgRef}>
        {isInView ? (
          <Image ref={ref} loading="eager" {...props} />
        ) : (
          <div
            className={cn(
              "bg-muted animate-pulse",
              imageVariants({
                variant: props.variant || "default",
                size: props.size || "md",
              })
            )}
          >
            <div className="flex items-center justify-center h-full">
              <ImageIcon className="h-6 w-6 text-muted-foreground" />
            </div>
          </div>
        )}
      </div>
    );
  }
);
LazyImage.displayName = "LazyImage";

// Avatar Image component
export const AvatarImage = React.forwardRef<
  HTMLImageElement,
  Omit<ImageProps, "variant" | "size"> & {
    size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "full" | "auto";
    variant?: "default" | "rounded" | "square" | "card" | "hero" | "thumbnail";
  }
>(({ size = "md", variant = "rounded", ...props }, ref) => (
  <Image ref={ref} variant={variant} size={size} fit="cover" {...props} />
));
AvatarImage.displayName = "AvatarImage";

// Hero Image component
export const HeroImage = React.forwardRef<
  HTMLImageElement,
  Omit<ImageProps, "variant" | "size"> & {
    size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "full" | "auto";
    variant?: "default" | "rounded" | "square" | "card" | "hero" | "thumbnail";
  }
>(({ size = "full", variant = "hero", ...props }, ref) => (
  <Image
    ref={ref}
    variant={variant}
    size={size}
    fit="cover"
    priority={true}
    {...props}
  />
));
HeroImage.displayName = "HeroImage";

// Thumbnail Image component
export const ThumbnailImage = React.forwardRef<
  HTMLImageElement,
  Omit<ImageProps, "variant" | "size"> & {
    size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "full" | "auto";
    variant?: "default" | "rounded" | "square" | "card" | "hero" | "thumbnail";
  }
>(({ size = "sm", variant = "thumbnail", ...props }, ref) => (
  <Image ref={ref} variant={variant} size={size} fit="cover" {...props} />
));
ThumbnailImage.displayName = "ThumbnailImage";

// Gallery Image component
export const GalleryImage = React.forwardRef<
  HTMLImageElement,
  Omit<ImageProps, "showPreview"> & {
    gallery: string[];
    previewTitle?: string;
    previewDescription?: string;
  }
>(({ gallery, previewTitle, previewDescription, ...props }, ref) => (
  <Image
    ref={ref}
    showPreview={true}
    gallery={gallery}
    previewTitle={previewTitle}
    previewDescription={previewDescription}
    {...props}
  />
));
GalleryImage.displayName = "GalleryImage";

export { Image };
export default Image;
