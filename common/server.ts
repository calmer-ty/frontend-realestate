const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const PORT = 3000; // 원하는 포트 번호로 설정

// CORS 설정
app.use(cors());

// 프록시 엔드포인트 설정
app.get("/api/apt-trades", async (req: Request, res: Response) => {
  try {
    const serviceKey =
      "XwiqW1NWk0Xl59Z18HVGJeIBaHPWk1KvQFMLwAHgQ9pJnoUPYl2wBDUEz0x%2BebLbCdwVxSBgVA2iF9DgLDx3kw%3D%3D";
    const url = `http://openapi.molit.go.kr/OpenAPI_ToolInstallPackage/service/rest/RTMSOBJSvc/getRTMSDataSvcAptTradeDev?LAWD_CD=11110&DEAL_YMD=201512&serviceKey=${serviceKey}`;

    const response = await axios.get(url);
    res.json(response.data);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Failed to fetch data from external API" });
  }
});

// 서버 시작
app.listen(PORT, () => {
  console.log(`Proxy server is running on http://localhost:${PORT}`);
});
