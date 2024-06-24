import axios from "axios";

export default function Test(): JSX.Element {
  const serviceKey =
    "XwiqW1NWk0Xl59Z18HVGJeIBaHPWk1KvQFMLwAHgQ9pJnoUPYl2wBDUEz0x%2BebLbCdwVxSBgVA2iF9DgLDx3kw%3D%3D";

  axios
    .get(
      `http://openapi.molit.go.kr/OpenAPI_ToolInstallPackage/service/rest/RTMSOBJSvc/getRTMSDataSvcAptTradeDev?LAWD_CD=11110&DEAL_YMD=201512&serviceKey=${serviceKey}`,
    )
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
      console.error("Error response data:", error.response.data); // 추가된 부분: 오류 응답 데이터 출력
    });

  return <div>about</div>;
}
