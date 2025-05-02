import { useBarChartData } from '@/api/hooks/logs-stat/use-bar-chart-data';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { useDashboardQueryParams } from '@/hooks/query-params/use-dashboard-query-params';
import { useLogSource } from '@/hooks/use-log-source';
import { IBarChart } from '@/interface';
import { AnimatePresence, motion } from 'framer-motion';
import { BarChart2, Calendar, Download } from 'lucide-react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from 'recharts';

const chartConfig = {
  count: {
    label: 'Total Events',
    color: 'oklch(0.627 0.257 302.8)',
  },
} satisfies ChartConfig;

const StatBarChart = () => {
  const source = useLogSource();

  const { dateOption, setDateOption } = useDashboardQueryParams();

  const { isPending, data, isError } = useBarChartData({
    date_option: dateOption,
    source,
  });

  const downloadCSV = () => {
    if (!data || data.length === 0) {
      return;
    }

    const headers = ['date', 'count'];
    const csvContent = [
      headers.join(','),
      ...data.map((item: IBarChart) => `${item.date},${item.count}`),
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute(
      'download',
      `event_stats_${
        dateOption === 'day' ? 'daily' : `${dateOption}ly`
      }_data.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Card className='@container/card max-w-full'>
      <CardHeader className='relative'>
        <div className='flex items-center justify-between '>
          <div>
            <CardTitle className='flex items-center gap-2'>
              <BarChart2 className='h-5 w-5' />
              Event Statistics
            </CardTitle>
            <CardDescription className='capitalize mt-1'>
              {dateOption === 'day'
                ? 'Daily'
                : `${dateOption === 'month' ? 'Monthly' : 'Yearly'}`}{' '}
              event distribution
            </CardDescription>
          </div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  className='cursor-pointer'
                  variant='outline'
                  size='icon'
                  onClick={downloadCSV}
                  disabled={isPending || !data || data.length === 0}
                >
                  <Download className='h-4 w-4' />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Download CSV</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        <div className='flex gap-2 justify-start items-center mt-4 '>
          <Button
            variant={dateOption === 'day' ? 'default' : 'outline'}
            size='sm'
            onClick={() => setDateOption('day')}
            className='w-24 cursor-pointer'
          >
            <Calendar className='h-4 w-4 mr-2' />
            Day
          </Button>
          <Button
            variant={dateOption === 'month' ? 'default' : 'outline'}
            size='sm'
            onClick={() => setDateOption('month')}
            className='w-24 cursor-pointer'
          >
            <Calendar className='h-4 w-4 mr-2' />
            Month
          </Button>
          <Button
            variant={dateOption === 'year' ? 'default' : 'outline'}
            size='sm'
            onClick={() => setDateOption('year')}
            className='w-24'
          >
            <Calendar className='h-4 w-4 mr-2 cursor-pointer' />
            Year
          </Button>
        </div>
      </CardHeader>
      <CardContent className='w-full overflow-x-auto'>
        <div className='min-w-[600px]'>
          <AnimatePresence mode='wait'>
            {isPending ? (
              <motion.div
                key='loading'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className='flex flex-col items-center justify-center h-[400px] space-y-4'
              >
                <Skeleton className='h-[300px] w-full' />
                <div className='text-sm text-muted-foreground'>
                  Loading chart data...
                </div>
              </motion.div>
            ) : isError ? (
              <motion.div>{'No records found'}</motion.div>
            ) : !data || data.length === 0 ? (
              <motion.div
                key='empty'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className='flex flex-col items-center justify-center h-[400px] space-y-4'
              >
                <BarChart2 className='h-16 w-16 text-muted-foreground' />
                <div className='text-xl font-medium'>No data available</div>
                <div className='text-sm text-muted-foreground'>
                  Try selecting a different time period
                </div>
              </motion.div>
            ) : (
              <motion.div
                key='chart'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <ChartContainer config={chartConfig} className='h-[400px]'>
                  <ResponsiveContainer width='100%' height='100%'>
                    <BarChart
                      defaultShowTooltip
                      accessibilityLayer
                      data={data}
                      margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
                    >
                      <CartesianGrid strokeDasharray='3 3' vertical={false} />
                      <XAxis
                        dataKey='date'
                        tickLine={false}
                        tickMargin={10}
                        axisLine={false}
                      />
                      <YAxis
                        tickLine={false}
                        tickMargin={10}
                        axisLine={false}
                      />
                      <ChartTooltip
                        cursor={{ fill: 'rgba(0, 0, 0, 0.05)' }}
                        content={<ChartTooltipContent />}
                      />
                      <Bar
                        dataKey='count'
                        fill='var(--color-count)'
                        radius={[4, 4, 0, 0]}
                        animationDuration={1000}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatBarChart;
