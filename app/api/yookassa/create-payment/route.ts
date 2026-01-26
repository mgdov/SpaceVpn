import { NextResponse } from "next/server"

const YOOKASSA_PAYMENT_URL = "https://api.yookassa.ru/v3/payments"

interface CreatePaymentRequestBody {
    tariffId: number | string
    plan: string
    price: number | string
    description?: string
}

function normalizeOrigin(origin: string): string {
    return origin.replace(/\/+$/, "")
}

function buildReturnUrl(origin: string, tariffId: number, plan: string) {
    const safePlan = encodeURIComponent(plan)
    return `${normalizeOrigin(origin)}/account/keys?tariff_id=${tariffId}&plan=${safePlan}`
}

export async function POST(request: Request) {
    const secretKey = process.env.YOOKASSA_SECRET_KEY
    if (!secretKey) {
        return NextResponse.json({ error: "YOOKASSA_SECRET_KEY is not configured." }, { status: 500 })
    }

    const authHeader = request.headers.get("authorization")
    if (!authHeader?.startsWith("Bearer ")) {
        return NextResponse.json({ error: "Необходима авторизация" }, { status: 401 })
    }

    let body: CreatePaymentRequestBody
    try {
        body = await request.json()
    } catch (error) {
        return NextResponse.json({ error: "Некорректный запрос" }, { status: 400 })
    }

    const tariffId = Number(body?.tariffId)
    const plan = String(body?.plan || "").trim()
    const price = Number(body?.price)

    if (!tariffId || !plan || Number.isNaN(price)) {
        return NextResponse.json({ error: "Не указан тариф или стоимость" }, { status: 400 })
    }

    const origin =
        request.headers.get("origin") ||
        process.env.NEXT_PUBLIC_APP_URL ||
        process.env.APP_URL ||
        "http://localhost:3000"

    const returnUrl = buildReturnUrl(origin, tariffId, plan)

    const payload = {
        amount: {
            value: price.toFixed(2),
            currency: "RUB",
        },
        confirmation: {
            type: "redirect",
            return_url: returnUrl,
        },
        capture: true,
        description: body.description || `Оплата тарифа ${plan}`,
        metadata: {
            plan,
            tariff_id: String(tariffId),
        },
    }

    const basicToken = Buffer.from(`${secretKey}:`).toString("base64")
    const response = await fetch(YOOKASSA_PAYMENT_URL, {
        method: "POST",
        headers: {
            Authorization: `Basic ${basicToken}`,
            "Content-Type": "application/json",
            Accept: "application/json",
        },
        body: JSON.stringify(payload),
    })

    const data = await response.json().catch(() => ({}))
    if (!response.ok) {
        return NextResponse.json({ error: data?.description || data?.message || "Не удалось инициировать оплату" }, { status: response.status })
    }

    const confirmationUrl = data?.confirmation?.url
    if (!confirmationUrl) {
        return NextResponse.json({ error: "Не удалось получить ссылку на платёж" }, { status: 502 })
    }

    return NextResponse.json({ payment_id: data.id, confirmation_url: confirmationUrl, status: data.status })
}
