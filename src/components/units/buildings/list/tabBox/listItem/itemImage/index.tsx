import Image from "next/image";
import BasicUnImage from "@/src/components/commons/unImages/basic";

import { DEFAULT_STRING_VALUE } from "@/src/commons/constants";
import * as S from "./styles";

import type { IFirestore } from "@/src/commons/types";
interface IItemImageProps {
  el: IFirestore;
}

export default function ItemImage(props: IItemImageProps): JSX.Element {
  const { el } = props;
  return (
    <S.Container>
      {el.imageUrls?.[0] !== undefined ? (
        <Image src={el.imageUrls?.[0] ?? ""} alt={el.address ?? DEFAULT_STRING_VALUE} fill unoptimized />
      ) : (
        <BasicUnImage width="180px" height="120px" fontSize="28px" />
      )}
    </S.Container>
  );
}
