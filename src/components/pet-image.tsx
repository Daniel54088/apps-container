"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import logo from "../../public/logo.svg";
import { cn } from "@/utils/cn";

type PetImageProps = {
  imageUrl: string;
  size: number;
};

export default function PetImage({ imageUrl, size }: PetImageProps) {
  const [imgSrc, setImgSrc] = useState(imageUrl);
  const fallbackSrc = logo;

  return (
    <Image
      src={imgSrc}
      alt="Pet images"
      width={size}
      height={size}
      className={cn(`rounded-full object-cover`)}
      style={{ width: size, height: size }}
      onError={() => setImgSrc(fallbackSrc)}
    />
  );
}
