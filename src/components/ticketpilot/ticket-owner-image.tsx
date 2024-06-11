"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import logo from "../../../public/logo.svg";
import { cn } from "@/utils/cn";

type TicketImageProps = {
  imageUrl: string;
  size: number;
};

export default function TicketImage({ imageUrl, size }: TicketImageProps) {
  const [imgSrc, setImgSrc] = useState(imageUrl);
  const fallbackSrc = logo;

  useEffect(() => {
    setImgSrc(imageUrl);
  }, [imageUrl]);

  return (
    <Image
      src={imgSrc}
      alt="ticket owner image"
      width={size}
      height={size}
      className={cn(`rounded-full object-cover`)}
      style={{ width: size, height: size }}
      onError={() => setImgSrc(fallbackSrc)}
    />
  );
}
