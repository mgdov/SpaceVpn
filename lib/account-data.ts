export const mockUser = {
    name: "Иван Петров",
    email: "ivan.petrov@pixelspace.vpn",
    plan: "Ultimate",
    nextRenewal: "15.01.2026",
}

export const mockVlessKey = {
    id: "SPACE-001",
    type: "VLESS / TLS Reality",
    endpoint: "ru01.pixelspace.net",
    uuid: "b92a1ce4-f77a-4a0b-8a4a-1cd52fb134ef",
    publicKey: "Jx1pJrH8DyW4A6Y1X8dPlypOa0xP7Z8wAa7xTtI2VnU=",
    shortId: "a1b2c3d4",
    sni: "edge.pixelspace.net",
    flow: "xtls-rprx-vision",
    lastUpdated: "15.12.2025",
}

export const vlessShareLink = `vless://${mockVlessKey.uuid}@${mockVlessKey.endpoint}:443?security=reality&encryption=none&alpn=h3&flow=${mockVlessKey.flow}&fp=chrome&sni=${mockVlessKey.sni}&pbk=${encodeURIComponent(mockVlessKey.publicKey)}&sid=${mockVlessKey.shortId}#Pixel%20Space`
