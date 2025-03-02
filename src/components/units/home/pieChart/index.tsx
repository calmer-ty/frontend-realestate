import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

import * as S from "./styles";

const data = [
  { name: "아파트", value: 10 },
  { name: "오피스텔", value: 6 },
  { name: "빌라", value: 3 },
];

const COLORS = ["#ff6b6b", "#4ecdc4", "#1a535c"];

export default function PieChartComponent(): JSX.Element {
  return (
    <S.Container>
      <h2>최근 한달간 거래량</h2>
      <PieChart width={320} height={300}>
        <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={120} fill="#8884d8" label>
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </S.Container>
  );
}
