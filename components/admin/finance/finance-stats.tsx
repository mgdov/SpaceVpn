"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AdminFinanceStats } from "@/lib/api"
import { TrendingUp, TrendingDown, DollarSign, CreditCard, CheckCircle, XCircle, Users } from "lucide-react"

interface FinanceStatsProps {
    stats: AdminFinanceStats
}

export function FinanceStats({ stats }: FinanceStatsProps) {
    const formatMoney = (amount: string) => {
        const num = parseFloat(amount)
        return new Intl.NumberFormat('ru-RU', {
            style: 'currency',
            currency: 'RUB',
        }).format(num)
    }

    const calculateChange = (current: string, previous: string) => {
        const curr = parseFloat(current)
        const prev = parseFloat(previous)
        if (prev === 0) return 0
        return ((curr - prev) / prev) * 100
    }

    const todayVsYesterday = calculateChange(stats.revenue_today, stats.revenue_yesterday)
    const thisMonthVsLast = calculateChange(stats.revenue_this_month, stats.revenue_last_month)

    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Общий доход</CardTitle>
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{formatMoney(stats.total_revenue)}</div>
                    <p className="text-xs text-muted-foreground">
                        За все время
                    </p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Доход сегодня</CardTitle>
                    {todayVsYesterday >= 0 ? (
                        <TrendingUp className="h-4 w-4 text-green-500" />
                    ) : (
                        <TrendingDown className="h-4 w-4 text-red-500" />
                    )}
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{formatMoney(stats.revenue_today)}</div>
                    <p className={`text-xs ${todayVsYesterday >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                        {todayVsYesterday >= 0 ? '+' : ''}{todayVsYesterday.toFixed(1)}% vs вчера
                    </p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Доход за месяц</CardTitle>
                    {thisMonthVsLast >= 0 ? (
                        <TrendingUp className="h-4 w-4 text-green-500" />
                    ) : (
                        <TrendingDown className="h-4 w-4 text-red-500" />
                    )}
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{formatMoney(stats.revenue_this_month)}</div>
                    <p className={`text-xs ${thisMonthVsLast >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                        {thisMonthVsLast >= 0 ? '+' : ''}{thisMonthVsLast.toFixed(1)}% vs прошлый месяц
                    </p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Активные подписки</CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{stats.active_subscriptions}</div>
                    <p className="text-xs text-muted-foreground">
                        Средний чек: {formatMoney(stats.average_payment)}
                    </p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Всего платежей</CardTitle>
                    <CreditCard className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{stats.total_payments}</div>
                    <p className="text-xs text-muted-foreground">
                        Доход за неделю: {formatMoney(stats.revenue_this_week)}
                    </p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Успешных</CardTitle>
                    <CheckCircle className="h-4 w-4 text-green-500" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold text-green-500">{stats.completed_payments}</div>
                    <p className="text-xs text-muted-foreground">
                        {((stats.completed_payments / stats.total_payments) * 100).toFixed(1)}% от всех
                    </p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">В ожидании</CardTitle>
                    <TrendingUp className="h-4 w-4 text-yellow-500" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold text-yellow-500">{stats.pending_payments}</div>
                    <p className="text-xs text-muted-foreground">
                        Требуют подтверждения
                    </p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Отклонено</CardTitle>
                    <XCircle className="h-4 w-4 text-red-500" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold text-red-500">{stats.failed_payments}</div>
                    <p className="text-xs text-muted-foreground">
                        {((stats.failed_payments / stats.total_payments) * 100).toFixed(1)}% от всех
                    </p>
                </CardContent>
            </Card>
        </div>
    )
}
