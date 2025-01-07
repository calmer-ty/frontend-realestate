import Image from "next/image";
import BasicUnImage from "@/src/components/commons/unImages/basic";

import { DEFAULT_STRING_VALUE } from "@/src/commons/constants";
import type { IItemImageProps } from "./types";
import * as S from "./styles";

export default function ItemImage(props: IItemImageProps): JSX.Element {
  const { el } = props;
  return (
    <S.Container>
      {el.imageUrls?.[0] !== undefined ? (
        <Image src={el.imageUrls?.[0] ?? ""} alt={el.address ?? DEFAULT_STRING_VALUE} width={200} height={120} unoptimized />
      ) : (
        <BasicUnImage width="200px" height="120px" fontSize="28px" />
      )}
    </S.Container>
  );
}
