import { useState, useRef, useEffect } from "react";
import { NO_IMAGE } from "~/configs/images";

interface Props {
  title: string;
  alt: string;
  src: string;
  className?: string;
}

const ImageCus = (props: Props) => {
  const { title, alt, src = null, className } = props;

  const ImageRef = useRef<HTMLImageElement>(null);

  const [loading, setLoading] = useState<boolean>(true);

  function loadImage(src: string) {
    var image = new Image();
    image.src = src;

    image.onload = () => {
      if (ImageRef.current) {
        ImageRef.current.src = src;
      }
    };
    image.onerror = () => {
      if (ImageRef.current) {
        ImageRef.current.src = NO_IMAGE;
      }
    };

    setLoading(false);
  }

  useEffect(() => {
    loadImage(src as string);
  }, []);

  return (
    <img
      ref={ImageRef}
      alt={alt}
      title={title}
      className={`${loading ? "skelaton" : ""} ${className}`}
      width="auto" height="auto"
      loading="lazy"
    />
  );
};

export default ImageCus;
