import { Card, CardContent, CardHeader } from "@/components/ui/card";

interface Props {
  title: string;
  value: string;
  icon: React.ReactNode;
}
const StatCard = ({ title, value, icon }: Props) => {
  return (
    <Card className="@container/card bg-gradient-to-r from-purple-500 to-pink-500">
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <div className="flex items-center space-x-2">
          <h3 className="text-lg font-medium text-slate-500 dark:text-slate-400 capitalize">
            {title}
          </h3>
        </div>
        <button className="p-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
          {icon}
        </button>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="relative">
            <div className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
              {value}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatCard;
