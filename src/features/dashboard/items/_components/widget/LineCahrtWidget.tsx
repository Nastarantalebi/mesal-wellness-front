import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import type { TLineChart } from "../../_types/type";

type TProps = {
  data: TLineChart;
};

const LineCahrtWidget = ({ data }: TProps) => {
  if (!data) return null;
  const dataset = data.data.datasets[0];
  const chartData = data.data.labels.map((label, i) => ({
    label,
    [dataset.label]: dataset.data[i],
  }));
  return (
    <div className="col-span-12 xl:col-span-6">
      <div className="col-span-12 xl:col-span-6 bg-white rounded-xl p-4 shadow">
        <h3 className="mb-4 font-semibold text-gray-700 text-right">
          {data.title}
        </h3>

        <div className="w-full h-[300px]">
          <ResponsiveContainer>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="label" tick={{ fontSize: 12 }} />
              <YAxis allowDecimals={false} />
              <Tooltip formatter={(value) => [`${value}`, dataset.label]} />
              <Legend />

              <Line
                type="monotone"
                dataKey={dataset.label}
                stroke="#2563eb"
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default LineCahrtWidget;
