interface IGetMapInitOptionsProps {
  center: any;
  zoom: number;
  zoomControl: boolean;
  zoomControlOptions: {
    position: any;
    style: any;
  };
}

export const loadScript = (src: string, onLoad: () => void): void => {
  const script = document.createElement("script");
  script.type = "text/javascript";
  script.src = src;
  script.async = true;
  script.onload = onLoad;
  document.head.appendChild(script);
};

export const getMapInitOptions: () => IGetMapInitOptionsProps = () => ({
  center: new window.naver.maps.LatLng(37.3595704, 127.105399),
  // center: new window.naver.maps.LatLng(36.4922117, 127.2582279),
  zoom: 14,
  zoomControl: true,
  zoomControlOptions: {
    position: window.naver.maps.Position.TOP_RIGHT,
    style: window.naver.maps.ZoomControlStyle.SMALL,
  },
});
