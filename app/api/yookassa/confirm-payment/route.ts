import { NextResponse } from "next/server"
import { API_BASE_URL } from "@/lib/api"

const YOOKASSA_PAYMENT_URL = "https://api.yookassa.ru/v3/payments"

export async function POST(request: Request) {
    const secretKey = process.env.YOOKASSA_SECRET_KEY
    if (!secretKey) {
        return NextResponse.json({ error: "YOOKASSA_SECRET_KEY is not configured." }, { status: 500 })
    }

    const authHeader = request.headers.get("authorization")
    if (!authHeader?.startsWith("Bearer ")) {
        return NextResponse.json({ error: "Необходима авторизация" }, { status: 401 })
    }

    let body: { paymentId?: string }
    try {
        body = await request.json()
    } catch (error) {
        return NextResponse.json({ error: "Некорректный запрос" }, { status: 400 })
    }

    const paymentId = String(body?.paymentId || "").trim()
    if (!paymentId) {
        return NextResponse.json({ error: "Не передан идентификатор платёжа" }, { status: 400 })
    }

    const basicToken = Buffer.from(`${secretKey}:`).toString("base64")
    const paymentResponse = await fetch(`${YOOKASSA_PAYMENT_URL}/${paymentId}`, {
        headers: {
            Authorization: `Basic ${basicToken}`,
            Accept: "application/json",
        },
    })

    const payment = await paymentResponse.json().catch(() => ({}))
    if (!paymentResponse.ok) {
        return NextResponse.json({ error: payment?.description || payment?.message || "Не удалось получить статус платежа" }, { status: paymentResponse.status })
    }

    if (payment.status !== "succeeded") {
        return NextResponse.json({ error: "Платёж ещё не завершён", message: payment.status }, { status: 400 })
    }

    const plan = payment?.metadata?.plan
    if (!plan) {
        return NextResponse.json({ error: "Не удалось определить план из метаданных" }, { status: 422 })
    }

    const subscriptionResponse = await fetch(`${API_BASE_URL}/subscriptions`, {
        method: "POST",
        headers: {
            Authorization: authHeader,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ plan }),
    })

    const subscriptionData = await subscriptionResponse.json().catch(() => ({}))
    if (!subscriptionResponse.ok) {
        return NextResponse.json({ error: subscriptionData?.detail || subscriptionData?.message || "Не удалось создать подписку" }, { status: subscriptionResponse.status })
    }

    return NextResponse.json({ success: true, plan, subscription: subscriptionData })
}
