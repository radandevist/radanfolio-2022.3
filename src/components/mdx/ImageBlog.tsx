import React, { FC, ImgHTMLAttributes } from "react";
import Image from "next/image";

import { getCloudinaryThumbnail } from "../../helpers/cloudinary";

export const ImageBlog: FC<ImgHTMLAttributes<HTMLImageElement>>
// eslint-disable-next-line arrow-body-style
= ({ alt, src, className, width, height, ...props}) => {
  return (
    <span className="unset-img relative">
      <Image
        alt={alt || "blog image"}
        src={src as string}
        layout="fill"
        className={`custom-img ${className}`}
        width={width === undefined ? undefined : Number(width)}
        height={height === undefined ? undefined: Number(width)}
        {...props}
        placeholder="blur"
        blurDataURL={src?.startsWith("https://res.cloudinary.com")
          ? getCloudinaryThumbnail(src)
          // eslint-disable-next-line max-len
          : "https://res.cloudinary.com/dhwkzyl32/image/upload/q_65/v1660283678/radanfolio/my_gray_blur_um9q82.webp"}
      />
    </span>
  );
};
