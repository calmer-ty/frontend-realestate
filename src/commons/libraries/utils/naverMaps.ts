interface IGetMapInitOptionsProps {
  center: any;
  zoom: number;
  zoomControl: boolean;
  zoomControlOptions: {
    position: any;
    style: any;
  };
}

export const getMapInitOptions: () => IGetMapInitOptionsProps = () => ({
  center: new window.naver.maps.LatLng(37.3595704, 127.105399),
  zoom: 10,
  zoomControl: true,
  zoomControlOptions: {
    position: window.naver.maps.Position.TOP_RIGHT,
    style: window.naver.maps.ZoomControlStyle.SMALL,
  },
});
