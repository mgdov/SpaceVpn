"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Line, LineChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"
import { AdminFinanceChartData } from "@/lib/api"

interface FinanceChartProps {
    data: AdminFinanceChartData
    period: '7days' | '30days' | '12months'
}

export function FinanceChart({ data, period }: FinanceChartProps) {
    const chartData = data.labels.map((label, index) => ({
        label,
        revenue: parseFloat(data.values[index] || '0'),
    }))

    const formatMoney = (value: number) => {
        return new Intl.NumberFormat('ru-RU', {
            style: 'currency',
            currency: 'RUB',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(value)
    }

    const periodTitle = {
        '7days': 'Последние 7 дней',
        '30days': 'Последние 30 дней',
        '12months': 'Последние 12 месяцев',
    }[period]

    const chartConfig = {
        revenue: {
            label: 'Доход',
            color: 'hsl(var(--chart-1))',
        },
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>График доходов</CardTitle>
                <CardDescription>{periodTitle}</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig} className="h-75">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={chartData}>
                            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                            <XAxis
                                dataKey="label"
                                className="text-xs"
                                tick={{ fill: 'hsl(var(--muted-foreground))' }}
                            />
                            <YAxis
                                className="text-xs"
                                tick={{ fill: 'hsl(var(--muted-foreground))' }}
                                tickFormatter={formatMoney}
                            />
                            <ChartTooltip
                                content={<ChartTooltipContent />}
                                formatter={(value) => formatMoney(Number(value))}
                            />
                            <Line
                                type="monotone"
                                dataKey="revenue"
                                stroke="var(--color-revenue)"
                                strokeWidth={2}
                                dot={{ r: 4 }}
                                activeDot={{ r: 6 }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}
