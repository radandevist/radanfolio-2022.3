import React, { FC, ImgHTMLAttributes } from "react";
import Image from "next/image";
import { getCloudinaryThumbnail } from "../../helpers/cloudinary";

export const ImageBlog: FC<ImgHTMLAttributes<HTMLImageElement>>
= ({ alt, src, className, ...props}) => (
  <span className="unset-img relative">
    <Image
      alt={alt || "blog image"}
      src={src as string}
      // height="100%"
      // width="100%"
      layout="fill"
      className={`custom-img ${className}`}
      {...props}
      placeholder="blur"
      blurDataURL={src?.startsWith("https://res.cloudinary.com")
        ? getCloudinaryThumbnail(src)
        // eslint-disable-next-line max-len
        : "https://res.cloudinary.com/dhwkzyl32/image/upload/q_65/v1660283678/radanfolio/my_gray_blur_um9q82.webp"}
    />
  </span>
);
