import { FC, ImgHTMLAttributes } from "react";
import Image from "next/image";

// import { getCloudinaryThumbnail } from "../../helpers/cloudinary";
import { STRAPI_BLUR_PLACEHOLDER_IMAGE } from "../../constants";
import { fullUrl } from "../../utils/strapiUtils";

export const ImageBlog: FC<ImgHTMLAttributes<HTMLImageElement>>
= ({ alt, src, className, width, height, ...props}) => {
  return (
    <span className="unset-img relative">
      <Image
        alt={alt || "blog image"}
        // src={src as string}
        src={src?.startsWith("/upload") ? fullUrl(src) : src}
        fill
        className={`custom-img ${className}`}
        width={width === undefined ? undefined : Number(width)}
        height={height === undefined ? undefined : Number(width)}
        {...props}
        placeholder="blur"
        // blurDataURL={src?.startsWith("https://res.cloudinary.com")
        //   ? getCloudinaryThumbnail(src)
        //   // eslint-disable-next-line max-len
        //   : "https://res.cloudinary.com/dhwkzyl32/image/upload
        // /q_65/v1660283678/radanfolio/my_gray_blur_um9q82.webp"}
        blurDataURL={STRAPI_BLUR_PLACEHOLDER_IMAGE}
      />
    </span>
  );
};
