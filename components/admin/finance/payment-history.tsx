"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { AdminPayment } from "@/lib/api"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface PaymentHistoryProps {
    payments: AdminPayment[]
    onLoadMore?: () => void
    hasMore?: boolean
    loading?: boolean
}

export function PaymentHistory({ payments, onLoadMore, hasMore = false, loading = false }: PaymentHistoryProps) {
    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 20

    const paginatedPayments = payments.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
    const totalPages = Math.ceil(payments.length / itemsPerPage)

    const formatMoney = (amount: string) => {
        const num = parseFloat(amount)
        return new Intl.NumberFormat('ru-RU', {
            style: 'currency',
            currency: 'RUB',
        }).format(num)
    }

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleString('ru-RU', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
        })
    }

    const getStatusBadge = (status: string) => {
        const statusMap: Record<string, { variant: "default" | "destructive" | "secondary" | "outline"; label: string }> = {
            completed: { variant: "default", label: "Завершен" },
            pending: { variant: "outline", label: "Ожидание" },
            cancelled: { variant: "secondary", label: "Отменен" },
        }

        const config = statusMap[status] || { variant: "secondary" as const, label: status }
        return <Badge variant={config.variant}>{config.label}</Badge>
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>История платежей</CardTitle>
                <CardDescription>Все транзакции пользователей</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="rounded-md border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>ID</TableHead>
                                <TableHead>Пользователь</TableHead>
                                <TableHead>Сумма</TableHead>
                                <TableHead>Статус</TableHead>
                                <TableHead>Метод</TableHead>
                                <TableHead>Дата</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {paginatedPayments.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={6} className="text-center text-muted-foreground">
                                        {loading ? 'Загрузка...' : 'Нет платежей'}
                                    </TableCell>
                                </TableRow>
                            ) : (
                                paginatedPayments.map((payment) => (
                                    <TableRow key={payment.id}>
                                        <TableCell className="font-medium">#{payment.id}</TableCell>
                                        <TableCell>
                                            <div className="flex flex-col">
                                                <span className="font-medium">{payment.user?.username || `User #${payment.user_id}`}</span>
                                                {payment.user?.email && (
                                                    <span className="text-xs text-muted-foreground">{payment.user.email}</span>
                                                )}
                                            </div>
                                        </TableCell>
                                        <TableCell className="font-semibold">{formatMoney(payment.amount)}</TableCell>
                                        <TableCell>{getStatusBadge(payment.status)}</TableCell>
                                        <TableCell className="text-muted-foreground">
                                            {payment.payment_method || 'N/A'}
                                        </TableCell>
                                        <TableCell className="text-muted-foreground">{formatDate(payment.created_at)}</TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </div>

                {totalPages > 1 && (
                    <div className="flex items-center justify-between mt-4">
                        <div className="text-sm text-muted-foreground">
                            Страница {currentPage} из {totalPages}
                        </div>
                        <div className="flex gap-2">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                disabled={currentPage === 1}
                            >
                                <ChevronLeft className="h-4 w-4" />
                                Назад
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                disabled={currentPage === totalPages}
                            >
                                Вперед
                                <ChevronRight className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                )}

                {hasMore && currentPage === totalPages && (
                    <div className="flex justify-center mt-4">
                        <Button
                            variant="outline"
                            onClick={onLoadMore}
                            disabled={loading}
                        >
                            {loading ? 'Загрузка...' : 'Загрузить еще'}
                        </Button>
                    </div>
                )}
            </CardContent>
        </Card>
    )
}
