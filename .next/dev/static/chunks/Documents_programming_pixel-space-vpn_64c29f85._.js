(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/Documents/programming/pixel-space-vpn/lib/utils.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "cn",
    ()=>cn
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/programming/pixel-space-vpn/node_modules/clsx/dist/clsx.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/programming/pixel-space-vpn/node_modules/tailwind-merge/dist/bundle-mjs.mjs [app-client] (ecmascript)");
;
;
function cn(...inputs) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["twMerge"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clsx"])(inputs));
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Documents/programming/pixel-space-vpn/components/ui/button.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Button",
    ()=>Button,
    "buttonVariants",
    ()=>buttonVariants
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/programming/pixel-space-vpn/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$slot$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/programming/pixel-space-vpn/node_modules/@radix-ui/react-slot/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/programming/pixel-space-vpn/node_modules/class-variance-authority/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/programming/pixel-space-vpn/lib/utils.ts [app-client] (ecmascript)");
;
;
;
;
const buttonVariants = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cva"])("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive", {
    variants: {
        variant: {
            default: 'bg-primary text-primary-foreground hover:bg-primary/90',
            destructive: 'bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60',
            outline: 'border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50',
            secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
            ghost: 'hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50',
            link: 'text-primary underline-offset-4 hover:underline'
        },
        size: {
            default: 'h-9 px-4 py-2 has-[>svg]:px-3',
            sm: 'h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5',
            lg: 'h-10 rounded-md px-6 has-[>svg]:px-4',
            icon: 'size-9',
            'icon-sm': 'size-8',
            'icon-lg': 'size-10'
        }
    },
    defaultVariants: {
        variant: 'default',
        size: 'default'
    }
});
function Button({ className, variant, size, asChild = false, ...props }) {
    const Comp = asChild ? __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$slot$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Slot"] : 'button';
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Comp, {
        "data-slot": "button",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])(buttonVariants({
            variant,
            size,
            className
        })),
        ...props
    }, void 0, false, {
        fileName: "[project]/Documents/programming/pixel-space-vpn/components/ui/button.tsx",
        lineNumber: 52,
        columnNumber: 5
    }, this);
}
_c = Button;
;
var _c;
__turbopack_context__.k.register(_c, "Button");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Documents/programming/pixel-space-vpn/components/ui/alert.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Alert",
    ()=>Alert,
    "AlertDescription",
    ()=>AlertDescription,
    "AlertTitle",
    ()=>AlertTitle
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/programming/pixel-space-vpn/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/programming/pixel-space-vpn/node_modules/class-variance-authority/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/programming/pixel-space-vpn/lib/utils.ts [app-client] (ecmascript)");
;
;
;
const alertVariants = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cva"])('relative w-full rounded-lg border px-4 py-3 text-sm grid has-[>svg]:grid-cols-[calc(var(--spacing)*4)_1fr] grid-cols-[0_1fr] has-[>svg]:gap-x-3 gap-y-0.5 items-start [&>svg]:size-4 [&>svg]:translate-y-0.5 [&>svg]:text-current', {
    variants: {
        variant: {
            default: 'bg-card text-card-foreground',
            destructive: 'text-destructive bg-card [&>svg]:text-current *:data-[slot=alert-description]:text-destructive/90'
        }
    },
    defaultVariants: {
        variant: 'default'
    }
});
function Alert({ className, variant, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "alert",
        role: "alert",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])(alertVariants({
            variant
        }), className),
        ...props
    }, void 0, false, {
        fileName: "[project]/Documents/programming/pixel-space-vpn/components/ui/alert.tsx",
        lineNumber: 28,
        columnNumber: 5
    }, this);
}
_c = Alert;
function AlertTitle({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "alert-title",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('col-start-2 line-clamp-1 min-h-4 font-medium tracking-tight', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/Documents/programming/pixel-space-vpn/components/ui/alert.tsx",
        lineNumber: 39,
        columnNumber: 5
    }, this);
}
_c1 = AlertTitle;
function AlertDescription({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "alert-description",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('text-muted-foreground col-start-2 grid justify-items-start gap-1 text-sm [&_p]:leading-relaxed', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/Documents/programming/pixel-space-vpn/components/ui/alert.tsx",
        lineNumber: 55,
        columnNumber: 5
    }, this);
}
_c2 = AlertDescription;
;
var _c, _c1, _c2;
__turbopack_context__.k.register(_c, "Alert");
__turbopack_context__.k.register(_c1, "AlertTitle");
__turbopack_context__.k.register(_c2, "AlertDescription");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Documents/programming/pixel-space-vpn/components/ui/dialog.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Dialog",
    ()=>Dialog,
    "DialogClose",
    ()=>DialogClose,
    "DialogContent",
    ()=>DialogContent,
    "DialogDescription",
    ()=>DialogDescription,
    "DialogFooter",
    ()=>DialogFooter,
    "DialogHeader",
    ()=>DialogHeader,
    "DialogOverlay",
    ()=>DialogOverlay,
    "DialogPortal",
    ()=>DialogPortal,
    "DialogTitle",
    ()=>DialogTitle,
    "DialogTrigger",
    ()=>DialogTrigger
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/programming/pixel-space-vpn/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/programming/pixel-space-vpn/node_modules/@radix-ui/react-dialog/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__XIcon$3e$__ = __turbopack_context__.i("[project]/Documents/programming/pixel-space-vpn/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as XIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/programming/pixel-space-vpn/lib/utils.ts [app-client] (ecmascript)");
'use client';
;
;
;
;
function Dialog({ ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Root"], {
        "data-slot": "dialog",
        ...props
    }, void 0, false, {
        fileName: "[project]/Documents/programming/pixel-space-vpn/components/ui/dialog.tsx",
        lineNumber: 12,
        columnNumber: 10
    }, this);
}
_c = Dialog;
function DialogTrigger({ ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Trigger"], {
        "data-slot": "dialog-trigger",
        ...props
    }, void 0, false, {
        fileName: "[project]/Documents/programming/pixel-space-vpn/components/ui/dialog.tsx",
        lineNumber: 18,
        columnNumber: 10
    }, this);
}
_c1 = DialogTrigger;
function DialogPortal({ ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Portal"], {
        "data-slot": "dialog-portal",
        ...props
    }, void 0, false, {
        fileName: "[project]/Documents/programming/pixel-space-vpn/components/ui/dialog.tsx",
        lineNumber: 24,
        columnNumber: 10
    }, this);
}
_c2 = DialogPortal;
function DialogClose({ ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Close"], {
        "data-slot": "dialog-close",
        ...props
    }, void 0, false, {
        fileName: "[project]/Documents/programming/pixel-space-vpn/components/ui/dialog.tsx",
        lineNumber: 30,
        columnNumber: 10
    }, this);
}
_c3 = DialogClose;
function DialogOverlay({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Overlay"], {
        "data-slot": "dialog-overlay",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/Documents/programming/pixel-space-vpn/components/ui/dialog.tsx",
        lineNumber: 38,
        columnNumber: 5
    }, this);
}
_c4 = DialogOverlay;
function DialogContent({ className, children, showCloseButton = true, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(DialogPortal, {
        "data-slot": "dialog-portal",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(DialogOverlay, {}, void 0, false, {
                fileName: "[project]/Documents/programming/pixel-space-vpn/components/ui/dialog.tsx",
                lineNumber: 59,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Content"], {
                "data-slot": "dialog-content",
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border p-6 shadow-lg duration-200 sm:max-w-lg', className),
                ...props,
                children: [
                    children,
                    showCloseButton && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Close"], {
                        "data-slot": "dialog-close",
                        className: "ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__XIcon$3e$__["XIcon"], {}, void 0, false, {
                                fileName: "[project]/Documents/programming/pixel-space-vpn/components/ui/dialog.tsx",
                                lineNumber: 74,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "sr-only",
                                children: "Close"
                            }, void 0, false, {
                                fileName: "[project]/Documents/programming/pixel-space-vpn/components/ui/dialog.tsx",
                                lineNumber: 75,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Documents/programming/pixel-space-vpn/components/ui/dialog.tsx",
                        lineNumber: 70,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Documents/programming/pixel-space-vpn/components/ui/dialog.tsx",
                lineNumber: 60,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Documents/programming/pixel-space-vpn/components/ui/dialog.tsx",
        lineNumber: 58,
        columnNumber: 5
    }, this);
}
_c5 = DialogContent;
function DialogHeader({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "dialog-header",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('flex flex-col gap-2 text-center sm:text-left', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/Documents/programming/pixel-space-vpn/components/ui/dialog.tsx",
        lineNumber: 85,
        columnNumber: 5
    }, this);
}
_c6 = DialogHeader;
function DialogFooter({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "dialog-footer",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('flex flex-col-reverse gap-2 sm:flex-row sm:justify-end', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/Documents/programming/pixel-space-vpn/components/ui/dialog.tsx",
        lineNumber: 95,
        columnNumber: 5
    }, this);
}
_c7 = DialogFooter;
function DialogTitle({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Title"], {
        "data-slot": "dialog-title",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('text-lg leading-none font-semibold', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/Documents/programming/pixel-space-vpn/components/ui/dialog.tsx",
        lineNumber: 111,
        columnNumber: 5
    }, this);
}
_c8 = DialogTitle;
function DialogDescription({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Description"], {
        "data-slot": "dialog-description",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('text-muted-foreground text-sm', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/Documents/programming/pixel-space-vpn/components/ui/dialog.tsx",
        lineNumber: 124,
        columnNumber: 5
    }, this);
}
_c9 = DialogDescription;
;
var _c, _c1, _c2, _c3, _c4, _c5, _c6, _c7, _c8, _c9;
__turbopack_context__.k.register(_c, "Dialog");
__turbopack_context__.k.register(_c1, "DialogTrigger");
__turbopack_context__.k.register(_c2, "DialogPortal");
__turbopack_context__.k.register(_c3, "DialogClose");
__turbopack_context__.k.register(_c4, "DialogOverlay");
__turbopack_context__.k.register(_c5, "DialogContent");
__turbopack_context__.k.register(_c6, "DialogHeader");
__turbopack_context__.k.register(_c7, "DialogFooter");
__turbopack_context__.k.register(_c8, "DialogTitle");
__turbopack_context__.k.register(_c9, "DialogDescription");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Documents/programming/pixel-space-vpn/components/ui/card.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Card",
    ()=>Card,
    "CardAction",
    ()=>CardAction,
    "CardContent",
    ()=>CardContent,
    "CardDescription",
    ()=>CardDescription,
    "CardFooter",
    ()=>CardFooter,
    "CardHeader",
    ()=>CardHeader,
    "CardTitle",
    ()=>CardTitle
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/programming/pixel-space-vpn/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/programming/pixel-space-vpn/lib/utils.ts [app-client] (ecmascript)");
;
;
function Card({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "card",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/Documents/programming/pixel-space-vpn/components/ui/card.tsx",
        lineNumber: 7,
        columnNumber: 5
    }, this);
}
_c = Card;
function CardHeader({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "card-header",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-2 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/Documents/programming/pixel-space-vpn/components/ui/card.tsx",
        lineNumber: 20,
        columnNumber: 5
    }, this);
}
_c1 = CardHeader;
function CardTitle({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "card-title",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('leading-none font-semibold', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/Documents/programming/pixel-space-vpn/components/ui/card.tsx",
        lineNumber: 33,
        columnNumber: 5
    }, this);
}
_c2 = CardTitle;
function CardDescription({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "card-description",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('text-muted-foreground text-sm', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/Documents/programming/pixel-space-vpn/components/ui/card.tsx",
        lineNumber: 43,
        columnNumber: 5
    }, this);
}
_c3 = CardDescription;
function CardAction({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "card-action",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('col-start-2 row-span-2 row-start-1 self-start justify-self-end', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/Documents/programming/pixel-space-vpn/components/ui/card.tsx",
        lineNumber: 53,
        columnNumber: 5
    }, this);
}
_c4 = CardAction;
function CardContent({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "card-content",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('px-6', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/Documents/programming/pixel-space-vpn/components/ui/card.tsx",
        lineNumber: 66,
        columnNumber: 5
    }, this);
}
_c5 = CardContent;
function CardFooter({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "card-footer",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('flex items-center px-6 [.border-t]:pt-6', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/Documents/programming/pixel-space-vpn/components/ui/card.tsx",
        lineNumber: 76,
        columnNumber: 5
    }, this);
}
_c6 = CardFooter;
;
var _c, _c1, _c2, _c3, _c4, _c5, _c6;
__turbopack_context__.k.register(_c, "Card");
__turbopack_context__.k.register(_c1, "CardHeader");
__turbopack_context__.k.register(_c2, "CardTitle");
__turbopack_context__.k.register(_c3, "CardDescription");
__turbopack_context__.k.register(_c4, "CardAction");
__turbopack_context__.k.register(_c5, "CardContent");
__turbopack_context__.k.register(_c6, "CardFooter");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Documents/programming/pixel-space-vpn/components/ui/radio-group.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "RadioGroup",
    ()=>RadioGroup,
    "RadioGroupItem",
    ()=>RadioGroupItem
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/programming/pixel-space-vpn/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$radio$2d$group$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/programming/pixel-space-vpn/node_modules/@radix-ui/react-radio-group/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CircleIcon$3e$__ = __turbopack_context__.i("[project]/Documents/programming/pixel-space-vpn/node_modules/lucide-react/dist/esm/icons/circle.js [app-client] (ecmascript) <export default as CircleIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/programming/pixel-space-vpn/lib/utils.ts [app-client] (ecmascript)");
'use client';
;
;
;
;
function RadioGroup({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$radio$2d$group$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Root"], {
        "data-slot": "radio-group",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('grid gap-3', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/Documents/programming/pixel-space-vpn/components/ui/radio-group.tsx",
        lineNumber: 14,
        columnNumber: 5
    }, this);
}
_c = RadioGroup;
function RadioGroupItem({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$radio$2d$group$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Item"], {
        "data-slot": "radio-group-item",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('border-input text-primary focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 aspect-square size-4 shrink-0 rounded-full border shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50', className),
        ...props,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$radio$2d$group$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Indicator"], {
            "data-slot": "radio-group-indicator",
            className: "relative flex items-center justify-center",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CircleIcon$3e$__["CircleIcon"], {
                className: "fill-primary absolute top-1/2 left-1/2 size-2 -translate-x-1/2 -translate-y-1/2"
            }, void 0, false, {
                fileName: "[project]/Documents/programming/pixel-space-vpn/components/ui/radio-group.tsx",
                lineNumber: 39,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/Documents/programming/pixel-space-vpn/components/ui/radio-group.tsx",
            lineNumber: 35,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/Documents/programming/pixel-space-vpn/components/ui/radio-group.tsx",
        lineNumber: 27,
        columnNumber: 5
    }, this);
}
_c1 = RadioGroupItem;
;
var _c, _c1;
__turbopack_context__.k.register(_c, "RadioGroup");
__turbopack_context__.k.register(_c1, "RadioGroupItem");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Documents/programming/pixel-space-vpn/components/ui/label.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Label",
    ()=>Label
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/programming/pixel-space-vpn/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$label$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/programming/pixel-space-vpn/node_modules/@radix-ui/react-label/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/programming/pixel-space-vpn/lib/utils.ts [app-client] (ecmascript)");
'use client';
;
;
;
function Label({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$label$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Root"], {
        "data-slot": "label",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/Documents/programming/pixel-space-vpn/components/ui/label.tsx",
        lineNumber: 13,
        columnNumber: 5
    }, this);
}
_c = Label;
;
var _c;
__turbopack_context__.k.register(_c, "Label");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Documents/programming/pixel-space-vpn/components/ui/badge.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Badge",
    ()=>Badge,
    "badgeVariants",
    ()=>badgeVariants
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/programming/pixel-space-vpn/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$slot$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/programming/pixel-space-vpn/node_modules/@radix-ui/react-slot/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/programming/pixel-space-vpn/node_modules/class-variance-authority/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/programming/pixel-space-vpn/lib/utils.ts [app-client] (ecmascript)");
;
;
;
;
const badgeVariants = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cva"])('inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden', {
    variants: {
        variant: {
            default: 'border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90',
            secondary: 'border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90',
            destructive: 'border-transparent bg-destructive text-white [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60',
            outline: 'text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground'
        }
    },
    defaultVariants: {
        variant: 'default'
    }
});
function Badge({ className, variant, asChild = false, ...props }) {
    const Comp = asChild ? __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$slot$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Slot"] : 'span';
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Comp, {
        "data-slot": "badge",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])(badgeVariants({
            variant
        }), className),
        ...props
    }, void 0, false, {
        fileName: "[project]/Documents/programming/pixel-space-vpn/components/ui/badge.tsx",
        lineNumber: 38,
        columnNumber: 5
    }, this);
}
_c = Badge;
;
var _c;
__turbopack_context__.k.register(_c, "Badge");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Documents/programming/pixel-space-vpn/components/bypass-preset-selector.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "BypassPresetSelector",
    ()=>BypassPresetSelector
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/programming/pixel-space-vpn/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/programming/pixel-space-vpn/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/programming/pixel-space-vpn/components/ui/card.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$components$2f$ui$2f$radio$2d$group$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/programming/pixel-space-vpn/components/ui/radio-group.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/programming/pixel-space-vpn/components/ui/label.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/programming/pixel-space-vpn/components/ui/badge.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$components$2f$ui$2f$alert$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/programming/pixel-space-vpn/components/ui/alert.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/programming/pixel-space-vpn/lib/api.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__ = __turbopack_context__.i("[project]/Documents/programming/pixel-space-vpn/node_modules/lucide-react/dist/esm/icons/loader-circle.js [app-client] (ecmascript) <export default as Loader2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Shield$3e$__ = __turbopack_context__.i("[project]/Documents/programming/pixel-space-vpn/node_modules/lucide-react/dist/esm/icons/shield.js [app-client] (ecmascript) <export default as Shield>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$globe$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Globe$3e$__ = __turbopack_context__.i("[project]/Documents/programming/pixel-space-vpn/node_modules/lucide-react/dist/esm/icons/globe.js [app-client] (ecmascript) <export default as Globe>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertCircle$3e$__ = __turbopack_context__.i("[project]/Documents/programming/pixel-space-vpn/node_modules/lucide-react/dist/esm/icons/circle-alert.js [app-client] (ecmascript) <export default as AlertCircle>");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
;
function BypassPresetSelector({ value, onChange, disabled = false }) {
    _s();
    const [presets, setPresets] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "BypassPresetSelector.useEffect": ()=>{
            loadPresets();
        }
    }["BypassPresetSelector.useEffect"], []);
    const loadPresets = async ()=>{
        try {
            const response = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getBypassPresets"])();
            if (response.data?.presets) {
                setPresets(response.data.presets);
                // Если не выбран preset, выбираем первый (yandex)
                if (!value && response.data.presets.length > 0) {
                    onChange(response.data.presets[0].id);
                }
            } else if (response.error) {
                setError(response.error);
            }
        } catch (err) {
            setError('Не удалось загрузить настройки обхода');
        } finally{
            setLoading(false);
        }
    };
    const getRiskBadge = (risk)=>{
        const riskConfig = {
            low: {
                variant: "default",
                label: "Низкий риск"
            },
            medium: {
                variant: "outline",
                label: "Средний риск"
            }
        };
        const config = riskConfig[risk] || {
            variant: "default",
            label: risk
        };
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
            variant: config.variant,
            children: config.label
        }, void 0, false, {
            fileName: "[project]/Documents/programming/pixel-space-vpn/components/bypass-preset-selector.tsx",
            lineNumber: 52,
            columnNumber: 16
        }, this);
    };
    if (loading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardHeader"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardTitle"], {
                            className: "flex items-center gap-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Shield$3e$__["Shield"], {
                                    className: "h-5 w-5"
                                }, void 0, false, {
                                    fileName: "[project]/Documents/programming/pixel-space-vpn/components/bypass-preset-selector.tsx",
                                    lineNumber: 60,
                                    columnNumber: 25
                                }, this),
                                "Настройки обхода блокировок"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Documents/programming/pixel-space-vpn/components/bypass-preset-selector.tsx",
                            lineNumber: 59,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardDescription"], {
                            children: "Выберите оптимальный профиль для вашей локации"
                        }, void 0, false, {
                            fileName: "[project]/Documents/programming/pixel-space-vpn/components/bypass-preset-selector.tsx",
                            lineNumber: 63,
                            columnNumber: 21
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Documents/programming/pixel-space-vpn/components/bypass-preset-selector.tsx",
                    lineNumber: 58,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardContent"], {
                    className: "flex items-center justify-center py-8",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                        className: "h-8 w-8 animate-spin text-muted-foreground"
                    }, void 0, false, {
                        fileName: "[project]/Documents/programming/pixel-space-vpn/components/bypass-preset-selector.tsx",
                        lineNumber: 68,
                        columnNumber: 21
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/Documents/programming/pixel-space-vpn/components/bypass-preset-selector.tsx",
                    lineNumber: 67,
                    columnNumber: 17
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/Documents/programming/pixel-space-vpn/components/bypass-preset-selector.tsx",
            lineNumber: 57,
            columnNumber: 13
        }, this);
    }
    if (error) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardHeader"], {
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardTitle"], {
                        className: "flex items-center gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Shield$3e$__["Shield"], {
                                className: "h-5 w-5"
                            }, void 0, false, {
                                fileName: "[project]/Documents/programming/pixel-space-vpn/components/bypass-preset-selector.tsx",
                                lineNumber: 79,
                                columnNumber: 25
                            }, this),
                            "Настройки обхода блокировок"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Documents/programming/pixel-space-vpn/components/bypass-preset-selector.tsx",
                        lineNumber: 78,
                        columnNumber: 21
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/Documents/programming/pixel-space-vpn/components/bypass-preset-selector.tsx",
                    lineNumber: 77,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardContent"], {
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$components$2f$ui$2f$alert$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Alert"], {
                        variant: "destructive",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertCircle$3e$__["AlertCircle"], {
                                className: "h-4 w-4"
                            }, void 0, false, {
                                fileName: "[project]/Documents/programming/pixel-space-vpn/components/bypass-preset-selector.tsx",
                                lineNumber: 85,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$components$2f$ui$2f$alert$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AlertDescription"], {
                                children: error
                            }, void 0, false, {
                                fileName: "[project]/Documents/programming/pixel-space-vpn/components/bypass-preset-selector.tsx",
                                lineNumber: 86,
                                columnNumber: 25
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Documents/programming/pixel-space-vpn/components/bypass-preset-selector.tsx",
                        lineNumber: 84,
                        columnNumber: 21
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/Documents/programming/pixel-space-vpn/components/bypass-preset-selector.tsx",
                    lineNumber: 83,
                    columnNumber: 17
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/Documents/programming/pixel-space-vpn/components/bypass-preset-selector.tsx",
            lineNumber: 76,
            columnNumber: 13
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardHeader"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardTitle"], {
                        className: "flex items-center gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Shield$3e$__["Shield"], {
                                className: "h-5 w-5"
                            }, void 0, false, {
                                fileName: "[project]/Documents/programming/pixel-space-vpn/components/bypass-preset-selector.tsx",
                                lineNumber: 97,
                                columnNumber: 21
                            }, this),
                            "Настройки обхода блокировок"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Documents/programming/pixel-space-vpn/components/bypass-preset-selector.tsx",
                        lineNumber: 96,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardDescription"], {
                        children: "Выберите оптимальный профиль для вашей локации. Рекомендуем Яндекс для России."
                    }, void 0, false, {
                        fileName: "[project]/Documents/programming/pixel-space-vpn/components/bypass-preset-selector.tsx",
                        lineNumber: 100,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Documents/programming/pixel-space-vpn/components/bypass-preset-selector.tsx",
                lineNumber: 95,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardContent"], {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$components$2f$ui$2f$radio$2d$group$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RadioGroup"], {
                    value: value,
                    onValueChange: onChange,
                    disabled: disabled,
                    className: "gap-4",
                    children: presets.map((preset)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: `flex items-start space-x-3 rounded-lg border p-4 transition-colors ${value === preset.id ? 'border-primary bg-primary/5' : 'border-border'} ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:border-primary/50'}`,
                            onClick: ()=>!disabled && onChange(preset.id),
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$components$2f$ui$2f$radio$2d$group$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RadioGroupItem"], {
                                    value: preset.id,
                                    id: preset.id,
                                    disabled: disabled
                                }, void 0, false, {
                                    fileName: "[project]/Documents/programming/pixel-space-vpn/components/bypass-preset-selector.tsx",
                                    lineNumber: 113,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex-1 space-y-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                            htmlFor: preset.id,
                                            className: "flex items-center justify-between cursor-pointer",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center gap-2",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$globe$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Globe$3e$__["Globe"], {
                                                            className: "h-4 w-4 text-muted-foreground"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Documents/programming/pixel-space-vpn/components/bypass-preset-selector.tsx",
                                                            lineNumber: 120,
                                                            columnNumber: 41
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "font-semibold",
                                                            children: preset.name
                                                        }, void 0, false, {
                                                            fileName: "[project]/Documents/programming/pixel-space-vpn/components/bypass-preset-selector.tsx",
                                                            lineNumber: 121,
                                                            columnNumber: 41
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Documents/programming/pixel-space-vpn/components/bypass-preset-selector.tsx",
                                                    lineNumber: 119,
                                                    columnNumber: 37
                                                }, this),
                                                getRiskBadge(preset.risk)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Documents/programming/pixel-space-vpn/components/bypass-preset-selector.tsx",
                                            lineNumber: 115,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-sm text-muted-foreground",
                                            children: preset.description
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/programming/pixel-space-vpn/components/bypass-preset-selector.tsx",
                                            lineNumber: 125,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex gap-3 text-xs text-muted-foreground",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "font-medium",
                                                            children: "Отпечаток:"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Documents/programming/pixel-space-vpn/components/bypass-preset-selector.tsx",
                                                            lineNumber: 128,
                                                            columnNumber: 41
                                                        }, this),
                                                        " ",
                                                        preset.fingerprint
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Documents/programming/pixel-space-vpn/components/bypass-preset-selector.tsx",
                                                    lineNumber: 127,
                                                    columnNumber: 37
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "font-medium",
                                                            children: "Регион:"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Documents/programming/pixel-space-vpn/components/bypass-preset-selector.tsx",
                                                            lineNumber: 131,
                                                            columnNumber: 41
                                                        }, this),
                                                        " ",
                                                        preset.region
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Documents/programming/pixel-space-vpn/components/bypass-preset-selector.tsx",
                                                    lineNumber: 130,
                                                    columnNumber: 37
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Documents/programming/pixel-space-vpn/components/bypass-preset-selector.tsx",
                                            lineNumber: 126,
                                            columnNumber: 33
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Documents/programming/pixel-space-vpn/components/bypass-preset-selector.tsx",
                                    lineNumber: 114,
                                    columnNumber: 29
                                }, this)
                            ]
                        }, preset.id, true, {
                            fileName: "[project]/Documents/programming/pixel-space-vpn/components/bypass-preset-selector.tsx",
                            lineNumber: 107,
                            columnNumber: 25
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/Documents/programming/pixel-space-vpn/components/bypass-preset-selector.tsx",
                    lineNumber: 105,
                    columnNumber: 17
                }, this)
            }, void 0, false, {
                fileName: "[project]/Documents/programming/pixel-space-vpn/components/bypass-preset-selector.tsx",
                lineNumber: 104,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Documents/programming/pixel-space-vpn/components/bypass-preset-selector.tsx",
        lineNumber: 94,
        columnNumber: 9
    }, this);
}
_s(BypassPresetSelector, "F2U+lP4lZFb908SWgRQqHKtxntk=");
_c = BypassPresetSelector;
var _c;
__turbopack_context__.k.register(_c, "BypassPresetSelector");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Documents/programming/pixel-space-vpn/components/pixel-logo.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PixelLogo",
    ()=>PixelLogo
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/programming/pixel-space-vpn/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
;
function PixelLogo(props) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        viewBox: "0 0 1920 1920",
        xmlns: "http://www.w3.org/2000/svg",
        className: props.className,
        style: {
            imageRendering: 'pixelated'
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                fill: "currentColor",
                d: "M1664.4 438.2c6.6 50.5.3 108-17.8 168.8-17.4 58.4-45.8 119.9-84.1 181-34.8 55.5-77.8 110.6-128.3 163-4.5 4.6-9 9.3-13.6 13.9-41.8 41.8-85.7 78.8-130.1 110.6-44.8 32.1-90.3 58.8-135.2 79.8-38.3 18-76.1 31.8-112.6 41.2-30.2 7.8-59.5 12.6-87.4 14.2-15.1.9-29.8.8-43.9-.2 40.9-16.9 83.4-42.7 123.9-76.2 22.2-9.4 44.5-20.2 66.7-32.3 31.9-17.3 63.6-37.2 94.5-59.3 37.4-26.7 73.8-56.6 108.3-89.2 40.4-38.1 78.2-79.7 112.1-123.9 33.6-43.8 63.4-90.2 88-138 2.7-5.2 5.3-10.5 7.9-15.7 28.6-58.8 46.8-114.8 55.1-166 9.1-56.5 6.3-107.3-7.6-150-14.4-44.4-40.9-80-78.4-104.2-36.8-23.7-84.3-36.3-141.5-35.2-57.2 1.1-118.7 15.8-180.9 41.3 58.3-8.7 110.5-4.5 153.6 11.6 41.5 15.5 74.7 42.1 97.2 78.8 20.4 33.3 32 75.1 32.9 124.6.1 4.4.1 8.8 0 13.3-.8 41-8.6 84.3-22.3 128.5-13.9 44.5-33.9 89.9-59 134.8-21.5 38.4-46.7 76.5-74.9 113.3-23.4 30.5-49 60.2-76.3 88.6-22.6 23.5-46.4 46.1-71.2 67.4l-.5.5c29.7-41.8 51.2-84.6 63.4-124.8 2-3 3.9-6.1 5.8-9.1 16.6-26.5 31.4-53 44.2-79.4 15.5-31.8 28.1-63.4 37.7-94.1 11.6-37.1 18.8-73 21.5-107 3.1-39.7-.1-76.7-9.9-109.5-9.8-32.6-26.1-61.2-49.3-84.5-2.6-2.6-5.2-5-7.9-7.4-30.2-26.9-68.5-43.3-112.1-49.8-48.1-7.1-102.8-2.3-160.8 13.5-60.3 16.5-124.1 44.8-187.7 84-62.4 38.5-124.5 87.4-182.8 145.7s-107.6 120.4-146 182.8c51.7-59.2 110.1-112.5 171.4-157.1 58.9-42.9 120.5-77.8 181.3-102.2 55.2-22.1 109.9-35.6 161.3-38.4 4.6-.3 9.1-.4 13.6-.5 41.1-.8 77.1 5.5 107.8 17.8 30.9 12.4 56.5 31.1 76.2 55 16.9 20.4 29.5 44.6 37.7 72 6.8 22.7 10.5 47.6 11.1 74.4.5 22.2-1.3 45.6-5.2 70.1-.5 2.9-1 5.9-1.5 8.9-5.3-19.5-14.7-36.5-28.4-50.2-9.9-9.9-21.6-17.6-34.7-23.1-.1-.1-.2-.3-.3-.4-9.8-15.9-21.5-29.9-35.1-42-16.4-14.5-35.5-26.2-56.9-34.8-25.8-10.4-54.9-16.4-86.8-17.8-37.2-1.6-78.2 3-122 14.4-43.4 11.2-89.5 29-137.4 53.6-5.3 2.7-10.5 5.5-15.7 8.3-58.9 31.9-115.2 71.5-167.2 116.3-57.2 49.3-109.1 105-153.2 163.5-45.8 60.9-83.2 124.8-109.2 188.1-25.6 62.2-40.3 123.7-41.4 180.9-1.1 57.2 11.5 104.7 35.2 141.5-6.6-50.5-.3-108 17.8-168.7 17.4-58.4 45.8-119.9 84.1-181 34.8-55.5 77.8-110.6 128.3-163 4.5-4.6 9-9.3 13.6-13.9 41.8-41.8 85.6-78.8 130.1-110.6 44.8-32.1 90.4-58.8 135.2-79.8 38.3-18 76.1-31.8 112.6-41.2 30.2-7.8 59.5-12.6 87.4-14.2 18.5-1.1 36.4-.7 53.6 1-50 14.5-103.9 43.5-155.1 84.8-15.1 7-30.2 14.6-45.2 22.7-31.9 17.3-63.6 37.2-94.5 59.3-37.4 26.7-73.8 56.6-108.3 89.2-40.4 38.1-78.2 79.7-112.1 123.9-33.6 43.8-63.4 90.2-88 138-2.7 5.2-5.3 10.5-7.9 15.7-28.6 58.8-46.8 114.8-55.1 166-9.1 56.5-6.3 107.3 7.6 150 14.4 44.4 40.9 80.1 78.4 104.2 36.8 23.7 84.3 36.3 141.5 35.2 57.2-1.1 118.7-15.8 180.9-41.4-58.4 8.7-110.5 4.5-153.7-11.6-41.5-15.5-74.7-42.1-97.2-78.8-20.4-33.3-32-75.1-33-124.6-.1-4.4-.1-8.8 0-13.4.8-41.1 8.6-84.3 22.4-128.4 13.9-44.5 33.9-89.9 59-134.8 21.5-38.4 46.6-76.4 74.9-113.3 23.4-30.5 49-60.2 76.3-88.6 8.9-9.3 18-18.4 27.4-27.4-31.6 50.8-50.8 101.9-55.9 147.2-4.6 8.6-8.9 17.1-13 25.6-15.4 31.8-28.1 63.4-37.7 94.1-11.6 37.1-18.8 73-21.5 107-3.1 39.7.1 76.6 9.9 109.5 9.8 32.6 26.1 61.2 49.3 84.5 2.6 2.6 5.2 5 7.9 7.4 30.2 26.9 68.4 43.3 112.1 49.7 48.1 7.2 102.8 2.3 160.8-13.5 60.3-16.5 124.1-44.8 187.7-84 62.4-38.5 124.6-87.4 182.9-145.7 58.3-58.3 107.2-120.4 145.7-182.9-51.7 59.2-110.1 112.5-171.4 157.1-58.9 42.9-120.5 77.8-181.3 102.2-55.2 22.1-109.8 35.5-161.3 38.4-4.6.3-9.1.4-13.6.5-41.1.8-77.1-5.5-107.8-17.8-30.9-12.5-56.4-31.1-76.2-55-16.9-20.4-29.5-44.6-37.7-72-6.8-22.7-10.5-47.6-11.1-74.4-.2-8-.1-16.1.4-24.4 2.6 3.3 5.3 6.4 8.3 9.3 19.9 20 46.9 30.8 78.3 33.2 5.6 6.7 11.7 12.9 18.2 18.6 16.4 14.5 35.5 26.2 56.9 34.8 25.8 10.4 54.9 16.4 86.8 17.8 37.2 1.6 78.2-3 122-14.3 43.4-11.2 89.5-29 137.4-53.6 5.3-2.7 10.5-5.5 15.7-8.3 58.9-31.9 115.2-71.5 167.2-116.3 57.2-49.3 109.1-105 153.2-163.5 45.8-60.9 83.2-124.9 109.3-188.2 25.6-62.2 40.3-123.7 41.4-180.9 1-56.8-11.5-104.3-35.2-141.1z"
            }, void 0, false, {
                fileName: "[project]/Documents/programming/pixel-space-vpn/components/pixel-logo.tsx",
                lineNumber: 6,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                fill: "none",
                stroke: "currentColor",
                strokeWidth: 50,
                strokeLinecap: "round",
                strokeLinejoin: "round",
                strokeMiterlimit: 10,
                d: "M1304.7 953.4c-34.5 32.6-70.9 62.5-108.3 89.2-31 22.1-62.7 42-94.5 59.3-22.2 12.1-44.5 22.9-66.7 32.3 14-11.6 27.8-24.2 41.3-37.6 23.6-23.6 44.5-48.4 62.3-73.5.2-.2.3-.3.5-.4 24.8-21.4 48.6-44 71.3-67.4 27.3-28.4 52.9-58.1 76.3-88.6 28.3-36.8 53.5-74.9 74.9-113.3 25.1-44.9 45.1-90.3 59-134.7 13.8-44.1 21.6-87.4 22.4-128.5.1-4.5.1-9 0-13.4-.9-49.5-12.5-91.3-33-124.6-22.5-36.7-55.7-63.3-97.2-78.8-43.2-16.1-95.3-20.3-153.6-11.6 62.2-25.6 123.7-40.3 180.9-41.4 57.2-1.1 104.7 11.5 141.5 35.2 37.5 24.1 64 59.7 78.4 104.2 13.9 42.7 16.7 93.5 7.6 150-8.3 51.3-26.5 107.2-55.1 166-2.5 5.2-5.2 10.5-7.9 15.7-24.6 47.9-54.4 94.2-88 138-33.9 44.2-71.7 85.8-112.1 123.9z"
            }, void 0, false, {
                fileName: "[project]/Documents/programming/pixel-space-vpn/components/pixel-logo.tsx",
                lineNumber: 10,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                fill: "none",
                stroke: "currentColor",
                strokeWidth: 50,
                strokeLinecap: "round",
                strokeLinejoin: "round",
                strokeMiterlimit: 10,
                d: "M1202.2 898.3c12.8-42.4 15.4-82 6.5-114.7.5-3 1.1-5.9 1.5-8.9 3.9-24.5 5.7-47.9 5.2-70.1-.6-26.8-4.3-51.7-11.1-74.4-8.2-27.4-20.8-51.6-37.7-72-19.7-23.9-45.2-42.5-76.2-55-30.7-12.4-66.7-18.6-107.8-17.8-4.5.1-9.1.3-13.6.5-51.4 2.9-106.1 16.3-161.3 38.4-60.8 24.4-122.4 59.3-181.3 102.2-61.3 44.6-119.7 97.9-171.4 157.1 38.5-62.4 87.4-124.5 145.7-182.8 58.3-58.3 120.4-107.2 182.8-145.7 63.6-39.2 127.4-67.5 187.7-84 58-15.8 112.7-20.6 160.8-13.5 43.7 6.5 81.9 22.8 112.1 49.7 2.7 2.4 5.3 4.9 7.9 7.4 23.3 23.3 39.6 51.8 49.3 84.5 9.9 32.9 13 69.8 9.9 109.5-2.6 33.9-9.9 69.9-21.5 107-9.6 30.7-22.2 62.3-37.7 94.1-12.8 26.4-27.5 52.9-44.2 79.4-1.7 3-3.6 6-5.6 9.1z"
            }, void 0, false, {
                fileName: "[project]/Documents/programming/pixel-space-vpn/components/pixel-logo.tsx",
                lineNumber: 19,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                fill: "none",
                stroke: "currentColor",
                strokeWidth: 50,
                strokeLinecap: "round",
                strokeLinejoin: "round",
                strokeMiterlimit: 10,
                d: "M1319.3 1319.3c-58.3 58.3-120.5 107.2-182.9 145.7-63.5 39.2-127.4 67.5-187.7 84-58 15.8-112.7 20.7-160.8 13.5-43.7-6.5-81.9-22.8-112.1-49.7-2.7-2.4-5.3-4.9-7.9-7.4-23.3-23.3-39.6-51.8-49.3-84.4-9.8-32.9-13-69.8-9.9-109.5 2.6-33.9 9.9-69.9 21.5-107 9.6-30.7 22.2-62.3 37.7-94.1 4.2-8.5 8.5-17.1 13-25.6-4.7 42.2 2.8 79.4 24.1 106.4-.4 8.3-.5 16.4-.4 24.4.6 26.8 4.3 51.7 11.1 74.4 8.2 27.4 20.8 51.6 37.7 72 19.7 23.9 45.2 42.5 76.2 55 30.7 12.4 66.7 18.6 107.8 17.8 4.5-.1 9.1-.3 13.6-.5 51.5-2.9 106-16.3 161.3-38.4 60.8-24.4 122.4-59.3 181.3-102.2 61.3-44.6 119.7-97.9 171.4-157.1-38.5 62.2-87.4 124.4-145.7 182.7z"
            }, void 0, false, {
                fileName: "[project]/Documents/programming/pixel-space-vpn/components/pixel-logo.tsx",
                lineNumber: 28,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                fill: "none",
                stroke: "currentColor",
                strokeWidth: 50,
                strokeLinecap: "round",
                strokeLinejoin: "round",
                strokeMiterlimit: 10,
                d: "M255.6 1481.8c-23.7-36.8-36.3-84.3-35.2-141.5 1.1-57.2 15.8-118.7 41.4-180.9 26.1-63.3 63.4-127.3 109.2-188.1 44.1-58.5 96-114.1 153.2-163.5 52-44.8 108.3-84.4 167.2-116.3 5.2-2.8 10.5-5.6 15.7-8.3 47.9-24.6 94-42.4 137.4-53.6 43.8-11.3 84.8-16 122-14.3 31.9 1.4 61 7.4 86.8 17.8 21.4 8.6 40.5 20.2 56.9 34.8 13.6 12 25.3 26 35.1 42 .1.1.2.3.3.4-34.6-14.5-79-13.9-127.2.2-17.1-1.8-35-2.1-53.6-1.1-27.9 1.6-57.2 6.4-87.4 14.2-36.5 9.4-74.3 23.2-112.6 41.2-44.8 21-90.3 47.7-135.2 79.8-44.5 31.8-88.3 68.8-130.1 110.6-4.6 4.6-9.1 9.2-13.6 13.9-50.5 52.4-93.5 107.5-128.3 163-38.3 61.1-66.7 122.6-84.1 181-18.2 60.7-24.5 118.2-17.9 168.7z"
            }, void 0, false, {
                fileName: "[project]/Documents/programming/pixel-space-vpn/components/pixel-logo.tsx",
                lineNumber: 37,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                fill: "none",
                stroke: "currentColor",
                strokeWidth: 50,
                strokeLinecap: "round",
                strokeLinejoin: "round",
                strokeMiterlimit: 10,
                d: "M760.6 1658.2c-62.2 25.6-123.7 40.3-180.9 41.4-57.2 1.1-104.7-11.5-141.5-35.2-37.5-24.1-64-59.7-78.4-104.2-13.9-42.7-16.7-93.5-7.6-150 8.3-51.3 26.4-107.2 55.1-166 2.5-5.2 5.2-10.5 7.9-15.7 24.6-47.9 54.4-94.2 88-138 33.9-44.2 71.7-85.8 112.1-123.9 34.5-32.6 70.9-62.5 108.3-89.2 31-22.1 62.7-42 94.5-59.3 15-8.2 30.1-15.8 45.2-22.7-15.8 12.7-31.3 26.6-46.3 41.7-32 32-58.9 66.1-80.2 100.3-9.3 9-18.4 18.1-27.4 27.4-27.3 28.4-52.9 58-76.3 88.6-28.3 36.8-53.5 74.9-74.9 113.3-25.1 44.9-45.1 90.3-59 134.8-13.8 44.1-21.6 87.4-22.3 128.4-.1 4.5-.1 9 0 13.4.9 49.5 12.5 91.3 33 124.6 22.5 36.7 55.7 63.3 97.2 78.8 43 16 95.2 20.2 153.5 11.5z"
            }, void 0, false, {
                fileName: "[project]/Documents/programming/pixel-space-vpn/components/pixel-logo.tsx",
                lineNumber: 46,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                fill: "none",
                stroke: "currentColor",
                strokeWidth: 50,
                strokeLinecap: "round",
                strokeLinejoin: "round",
                strokeMiterlimit: 10,
                d: "M1395.7 1112.2c-52 44.8-108.3 84.4-167.2 116.3-5.2 2.8-10.5 5.6-15.7 8.3-47.9 24.6-94 42.4-137.4 53.6-43.8 11.3-84.7 16-122 14.3-31.9-1.4-61-7.4-86.8-17.8-21.4-8.6-40.4-20.2-56.9-34.8-6.5-5.8-12.6-12-18.2-18.6 35.6 2.7 76.8-5.3 119.7-23.1 14.2 1 28.8 1.1 43.9.2 27.9-1.6 57.2-6.4 87.4-14.2 36.5-9.4 74.3-23.2 112.6-41.2 44.8-21 90.3-47.8 135.2-79.8 44.5-31.8 88.3-68.8 130.1-110.6 4.6-4.6 9.1-9.2 13.6-13.9 50.5-52.4 93.5-107.5 128.3-163 38.3-61.1 66.7-122.5 84.1-181 18.1-60.8 24.4-118.3 17.8-168.8 23.7 36.8 36.3 84.3 35.2 141.5-1.1 57.2-15.8 118.7-41.4 180.9-26.1 63.3-63.4 127.3-109.3 188.2-43.8 58.6-95.8 114.2-153 163.5z"
            }, void 0, false, {
                fileName: "[project]/Documents/programming/pixel-space-vpn/components/pixel-logo.tsx",
                lineNumber: 55,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                fill: "none",
                stroke: "currentColor",
                strokeWidth: 50,
                strokeLinecap: "round",
                strokeLinejoin: "round",
                strokeMiterlimit: 10,
                d: "M1076.5 1096.6a599.6 599.6 0 0 1-41.3 37.6c-40.6 33.6-83 59.3-123.9 76.2-42.9 17.8-84.1 25.8-119.7 23.1-31.4-2.4-58.4-13.2-78.3-33.1-3-3-5.7-6.1-8.3-9.3-21.3-27.1-28.8-64.2-24.1-106.4 5.1-45.3 24.3-96.4 55.9-147.2C758 903.1 785 869.1 817 837.1c15-15 30.5-29 46.3-41.7 51.2-41.4 105.2-70.3 155.1-84.9 48.2-14.1 92.7-14.7 127.2-.2 13.1 5.5 24.7 13.1 34.7 23.1 13.7 13.7 23.1 30.7 28.4 50.2 8.9 32.7 6.4 72.3-6.5 114.7-12.2 40.3-33.6 83.1-63.4 124.8-17.8 25.1-38.7 49.9-62.3 73.5z"
            }, void 0, false, {
                fileName: "[project]/Documents/programming/pixel-space-vpn/components/pixel-logo.tsx",
                lineNumber: 64,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Documents/programming/pixel-space-vpn/components/pixel-logo.tsx",
        lineNumber: 5,
        columnNumber: 9
    }, this);
}
_c = PixelLogo;
var _c;
__turbopack_context__.k.register(_c, "PixelLogo");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Documents/programming/pixel-space-vpn/components/header.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Header",
    ()=>Header
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/programming/pixel-space-vpn/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/programming/pixel-space-vpn/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/programming/pixel-space-vpn/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$menu$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Menu$3e$__ = __turbopack_context__.i("[project]/Documents/programming/pixel-space-vpn/node_modules/lucide-react/dist/esm/icons/menu.js [app-client] (ecmascript) <export default as Menu>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/Documents/programming/pixel-space-vpn/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__ = __turbopack_context__.i("[project]/Documents/programming/pixel-space-vpn/node_modules/lucide-react/dist/esm/icons/user.js [app-client] (ecmascript) <export default as User>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$log$2d$out$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__LogOut$3e$__ = __turbopack_context__.i("[project]/Documents/programming/pixel-space-vpn/node_modules/lucide-react/dist/esm/icons/log-out.js [app-client] (ecmascript) <export default as LogOut>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$components$2f$pixel$2d$logo$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/programming/pixel-space-vpn/components/pixel-logo.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$lib$2f$auth$2d$context$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/programming/pixel-space-vpn/lib/auth-context.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
function Header() {
    _s();
    const [isMenuOpen, setIsMenuOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const { user, logout } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$lib$2f$auth$2d$context$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"])();
    const closeMenu = ()=>setIsMenuOpen(false);
    const handleLogout = ()=>{
        logout();
        closeMenu();
    };
    const navLinks = [
        {
            href: "/",
            label: "Главная"
        },
        {
            href: "/blog",
            label: "Блог"
        },
        {
            href: "/pricing",
            label: "Тарифы"
        },
        {
            href: "/faq",
            label: "FAQ"
        },
        {
            href: "/about",
            label: "О нас"
        }
    ];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                className: "fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-sm border-b border-border",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "max-w-7xl mx-auto px-4 py-4",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-between",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                href: "/",
                                className: "flex items-center gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$components$2f$pixel$2d$logo$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PixelLogo"], {
                                        className: "w-8 h-8 text-primary",
                                        "aria-hidden": "true"
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/programming/pixel-space-vpn/components/header.tsx",
                                        lineNumber: 35,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-primary text-xs md:text-sm",
                                        children: "SPACE VPN"
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/programming/pixel-space-vpn/components/header.tsx",
                                        lineNumber: 36,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Documents/programming/pixel-space-vpn/components/header.tsx",
                                lineNumber: 34,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                                className: "hidden md:flex items-center gap-6",
                                children: navLinks.map((link)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        href: link.href,
                                        className: "text-foreground hover:text-primary transition-colors text-[10px]",
                                        children: link.label
                                    }, link.href, false, {
                                        fileName: "[project]/Documents/programming/pixel-space-vpn/components/header.tsx",
                                        lineNumber: 42,
                                        columnNumber: 17
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/Documents/programming/pixel-space-vpn/components/header.tsx",
                                lineNumber: 40,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "hidden md:flex items-center gap-4",
                                children: user ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            href: "/account",
                                            className: "text-foreground hover:text-primary transition-colors text-[10px] flex items-center gap-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__["User"], {
                                                    size: 14
                                                }, void 0, false, {
                                                    fileName: "[project]/Documents/programming/pixel-space-vpn/components/header.tsx",
                                                    lineNumber: 60,
                                                    columnNumber: 21
                                                }, this),
                                                user.username
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Documents/programming/pixel-space-vpn/components/header.tsx",
                                            lineNumber: 56,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: logout,
                                            className: "text-foreground hover:text-primary transition-colors text-[10px] flex items-center gap-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$log$2d$out$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__LogOut$3e$__["LogOut"], {
                                                    size: 14
                                                }, void 0, false, {
                                                    fileName: "[project]/Documents/programming/pixel-space-vpn/components/header.tsx",
                                                    lineNumber: 67,
                                                    columnNumber: 21
                                                }, this),
                                                "Выход"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Documents/programming/pixel-space-vpn/components/header.tsx",
                                            lineNumber: 63,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            href: "/login",
                                            className: "text-foreground hover:text-primary transition-colors text-[10px]",
                                            children: "Вход"
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/programming/pixel-space-vpn/components/header.tsx",
                                            lineNumber: 73,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            href: "/register",
                                            className: "bg-primary text-primary-foreground px-4 py-2 hover:bg-primary/80 transition-colors text-[10px]",
                                            children: "Регистрация"
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/programming/pixel-space-vpn/components/header.tsx",
                                            lineNumber: 76,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true)
                            }, void 0, false, {
                                fileName: "[project]/Documents/programming/pixel-space-vpn/components/header.tsx",
                                lineNumber: 53,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: "md:hidden text-foreground",
                                onClick: ()=>setIsMenuOpen(!isMenuOpen),
                                "aria-label": "Меню",
                                children: isMenuOpen ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                    size: 24
                                }, void 0, false, {
                                    fileName: "[project]/Documents/programming/pixel-space-vpn/components/header.tsx",
                                    lineNumber: 88,
                                    columnNumber: 29
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$menu$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Menu$3e$__["Menu"], {
                                    size: 24
                                }, void 0, false, {
                                    fileName: "[project]/Documents/programming/pixel-space-vpn/components/header.tsx",
                                    lineNumber: 88,
                                    columnNumber: 47
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/Documents/programming/pixel-space-vpn/components/header.tsx",
                                lineNumber: 87,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Documents/programming/pixel-space-vpn/components/header.tsx",
                        lineNumber: 32,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/Documents/programming/pixel-space-vpn/components/header.tsx",
                    lineNumber: 31,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/Documents/programming/pixel-space-vpn/components/header.tsx",
                lineNumber: 30,
                columnNumber: 7
            }, this),
            isMenuOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "md:hidden fixed inset-0 z-40",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute inset-0 bg-background/70 backdrop-blur-sm",
                        onClick: closeMenu,
                        "aria-hidden": "true"
                    }, void 0, false, {
                        fileName: "[project]/Documents/programming/pixel-space-vpn/components/header.tsx",
                        lineNumber: 96,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        role: "dialog",
                        "aria-modal": "true",
                        className: "absolute top-0 right-0 h-full w-[80%] max-w-xs bg-card border-l border-border shadow-[0_0_40px_rgba(0,0,0,0.35)] p-6 flex flex-col gap-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center justify-between",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-muted-foreground text-[10px] tracking-[0.3em] uppercase",
                                        children: "Меню"
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/programming/pixel-space-vpn/components/header.tsx",
                                        lineNumber: 103,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: closeMenu,
                                        className: "text-foreground",
                                        "aria-label": "Закрыть меню",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                            size: 20
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/programming/pixel-space-vpn/components/header.tsx",
                                            lineNumber: 105,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/programming/pixel-space-vpn/components/header.tsx",
                                        lineNumber: 104,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Documents/programming/pixel-space-vpn/components/header.tsx",
                                lineNumber: 102,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                                className: "mt-5 flex flex-col gap-4",
                                children: navLinks.map((link)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        href: link.href,
                                        className: "text-foreground text-[12px] tracking-wide hover:text-primary transition-colors",
                                        onClick: closeMenu,
                                        children: link.label
                                    }, link.href, false, {
                                        fileName: "[project]/Documents/programming/pixel-space-vpn/components/header.tsx",
                                        lineNumber: 111,
                                        columnNumber: 17
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/Documents/programming/pixel-space-vpn/components/header.tsx",
                                lineNumber: 109,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-auto flex flex-col gap-3",
                                children: user ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            href: "/account",
                                            className: "text-foreground text-[11px] tracking-wide border border-border py-2 text-center hover:border-primary hover:text-primary transition-colors flex items-center justify-center gap-2",
                                            onClick: closeMenu,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__["User"], {
                                                    size: 14
                                                }, void 0, false, {
                                                    fileName: "[project]/Documents/programming/pixel-space-vpn/components/header.tsx",
                                                    lineNumber: 130,
                                                    columnNumber: 21
                                                }, this),
                                                user.username
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Documents/programming/pixel-space-vpn/components/header.tsx",
                                            lineNumber: 125,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: handleLogout,
                                            className: "text-foreground text-[11px] tracking-wide border border-border py-2 text-center hover:border-primary hover:text-primary transition-colors flex items-center justify-center gap-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$log$2d$out$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__LogOut$3e$__["LogOut"], {
                                                    size: 14
                                                }, void 0, false, {
                                                    fileName: "[project]/Documents/programming/pixel-space-vpn/components/header.tsx",
                                                    lineNumber: 137,
                                                    columnNumber: 21
                                                }, this),
                                                "Выход"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Documents/programming/pixel-space-vpn/components/header.tsx",
                                            lineNumber: 133,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            href: "/login",
                                            className: "text-foreground text-[11px] tracking-wide border border-border py-2 text-center hover:border-primary hover:text-primary transition-colors",
                                            onClick: closeMenu,
                                            children: "Вход"
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/programming/pixel-space-vpn/components/header.tsx",
                                            lineNumber: 143,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            href: "/register",
                                            className: "bg-primary text-primary-foreground text-[11px] tracking-[0.2em] py-2 text-center hover:bg-primary/80 transition-colors",
                                            onClick: closeMenu,
                                            children: "Регистрация"
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/programming/pixel-space-vpn/components/header.tsx",
                                            lineNumber: 150,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true)
                            }, void 0, false, {
                                fileName: "[project]/Documents/programming/pixel-space-vpn/components/header.tsx",
                                lineNumber: 122,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Documents/programming/pixel-space-vpn/components/header.tsx",
                        lineNumber: 97,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Documents/programming/pixel-space-vpn/components/header.tsx",
                lineNumber: 95,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true);
}
_s(Header, "DY51VAA8F8Cj3iKeKDN/fGaX2dI=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$lib$2f$auth$2d$context$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"]
    ];
});
_c = Header;
var _c;
__turbopack_context__.k.register(_c, "Header");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Documents/programming/pixel-space-vpn/components/footer.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Footer",
    ()=>Footer
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/programming/pixel-space-vpn/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/programming/pixel-space-vpn/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
;
;
function Footer() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("footer", {
        className: "bg-card border-t border-border mt-20",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "max-w-7xl mx-auto px-4 py-12",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "grid grid-cols-1 md:grid-cols-4 gap-8",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "md:col-span-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-2 mb-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "w-8 h-8 bg-primary flex items-center justify-center",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-background text-xs",
                                                children: "S"
                                            }, void 0, false, {
                                                fileName: "[project]/Documents/programming/pixel-space-vpn/components/footer.tsx",
                                                lineNumber: 12,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/programming/pixel-space-vpn/components/footer.tsx",
                                            lineNumber: 11,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-primary text-xs",
                                            children: "SPACE VPN"
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/programming/pixel-space-vpn/components/footer.tsx",
                                            lineNumber: 14,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Documents/programming/pixel-space-vpn/components/footer.tsx",
                                    lineNumber: 10,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-muted-foreground text-[8px] leading-relaxed max-w-md",
                                    children: "Защитите свою приватность в интернете с помощью нашего VPN сервиса. Быстрое и надежное соединение по всему миру."
                                }, void 0, false, {
                                    fileName: "[project]/Documents/programming/pixel-space-vpn/components/footer.tsx",
                                    lineNumber: 16,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Documents/programming/pixel-space-vpn/components/footer.tsx",
                            lineNumber: 9,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                    className: "text-foreground text-[10px] mb-4",
                                    children: "Навигация"
                                }, void 0, false, {
                                    fileName: "[project]/Documents/programming/pixel-space-vpn/components/footer.tsx",
                                    lineNumber: 24,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                                    className: "flex flex-col gap-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            href: "/",
                                            className: "text-muted-foreground hover:text-primary text-[8px]",
                                            children: "Главная"
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/programming/pixel-space-vpn/components/footer.tsx",
                                            lineNumber: 26,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            href: "/pricing",
                                            className: "text-muted-foreground hover:text-primary text-[8px]",
                                            children: "Тарифы"
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/programming/pixel-space-vpn/components/footer.tsx",
                                            lineNumber: 29,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            href: "/blog",
                                            className: "text-muted-foreground hover:text-primary text-[8px]",
                                            children: "Блог"
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/programming/pixel-space-vpn/components/footer.tsx",
                                            lineNumber: 32,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            href: "/faq",
                                            className: "text-muted-foreground hover:text-primary text-[8px]",
                                            children: "FAQ"
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/programming/pixel-space-vpn/components/footer.tsx",
                                            lineNumber: 35,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Documents/programming/pixel-space-vpn/components/footer.tsx",
                                    lineNumber: 25,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Documents/programming/pixel-space-vpn/components/footer.tsx",
                            lineNumber: 23,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                    className: "text-foreground text-[10px] mb-4",
                                    children: "Контакты"
                                }, void 0, false, {
                                    fileName: "[project]/Documents/programming/pixel-space-vpn/components/footer.tsx",
                                    lineNumber: 43,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex flex-col gap-2 text-[8px] text-muted-foreground",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: "support@spacevpn.com"
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/programming/pixel-space-vpn/components/footer.tsx",
                                            lineNumber: 45,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: "Telegram: @spacevpn"
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/programming/pixel-space-vpn/components/footer.tsx",
                                            lineNumber: 46,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Documents/programming/pixel-space-vpn/components/footer.tsx",
                                    lineNumber: 44,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Documents/programming/pixel-space-vpn/components/footer.tsx",
                            lineNumber: 42,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Documents/programming/pixel-space-vpn/components/footer.tsx",
                    lineNumber: 7,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "border-t border-border mt-8 pt-8 text-center",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-muted-foreground text-[8px]",
                        children: "© 2025 Space VPN. Все права защищены."
                    }, void 0, false, {
                        fileName: "[project]/Documents/programming/pixel-space-vpn/components/footer.tsx",
                        lineNumber: 52,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/Documents/programming/pixel-space-vpn/components/footer.tsx",
                    lineNumber: 51,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/Documents/programming/pixel-space-vpn/components/footer.tsx",
            lineNumber: 6,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/Documents/programming/pixel-space-vpn/components/footer.tsx",
        lineNumber: 5,
        columnNumber: 5
    }, this);
}
_c = Footer;
var _c;
__turbopack_context__.k.register(_c, "Footer");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Documents/programming/pixel-space-vpn/components/pixel-stars.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PixelStars",
    ()=>PixelStars
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/programming/pixel-space-vpn/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/programming/pixel-space-vpn/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
function PixelStars() {
    _s();
    const [stars, setStars] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "PixelStars.useEffect": ()=>{
            const generateStars = {
                "PixelStars.useEffect.generateStars": ()=>{
                    const newStars = [];
                    for(let i = 0; i < 100; i++){
                        newStars.push({
                            id: i,
                            x: Math.random() * 100,
                            y: Math.random() * 100,
                            size: Math.random() > 0.8 ? 2 : 1,
                            delay: Math.random() * 3,
                            type: Math.random() > 0.7 ? "cross" : "dot"
                        });
                    }
                    setStars(newStars);
                }
            }["PixelStars.useEffect.generateStars"];
            generateStars();
        }
    }["PixelStars.useEffect"], []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed inset-0 overflow-hidden pointer-events-none z-0",
        children: stars.map((star)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute star",
                style: {
                    left: `${star.x}%`,
                    top: `${star.y}%`,
                    animationDelay: `${star.delay}s`
                },
                children: star.type === "cross" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-blue-300 text-opacity-60",
                    style: {
                        fontSize: `${star.size * 6}px`
                    },
                    children: "+"
                }, void 0, false, {
                    fileName: "[project]/Documents/programming/pixel-space-vpn/components/pixel-stars.tsx",
                    lineNumber: 48,
                    columnNumber: 13
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "bg-cyan-300 rounded-none",
                    style: {
                        width: `${star.size * 2}px`,
                        height: `${star.size * 2}px`
                    }
                }, void 0, false, {
                    fileName: "[project]/Documents/programming/pixel-space-vpn/components/pixel-stars.tsx",
                    lineNumber: 52,
                    columnNumber: 13
                }, this)
            }, star.id, false, {
                fileName: "[project]/Documents/programming/pixel-space-vpn/components/pixel-stars.tsx",
                lineNumber: 38,
                columnNumber: 9
            }, this))
    }, void 0, false, {
        fileName: "[project]/Documents/programming/pixel-space-vpn/components/pixel-stars.tsx",
        lineNumber: 36,
        columnNumber: 5
    }, this);
}
_s(PixelStars, "MpMl4xT356TDKICdFBbojt4n5zM=");
_c = PixelStars;
var _c;
__turbopack_context__.k.register(_c, "PixelStars");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Documents/programming/pixel-space-vpn/app/account/tariffs/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>TariffsPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/programming/pixel-space-vpn/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/programming/pixel-space-vpn/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/programming/pixel-space-vpn/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/programming/pixel-space-vpn/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/programming/pixel-space-vpn/lib/api.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/programming/pixel-space-vpn/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$components$2f$ui$2f$alert$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/programming/pixel-space-vpn/components/ui/alert.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/programming/pixel-space-vpn/components/ui/dialog.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$components$2f$bypass$2d$preset$2d$selector$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/programming/pixel-space-vpn/components/bypass-preset-selector.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__ = __turbopack_context__.i("[project]/Documents/programming/pixel-space-vpn/node_modules/lucide-react/dist/esm/icons/circle-check.js [app-client] (ecmascript) <export default as CheckCircle2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__XCircle$3e$__ = __turbopack_context__.i("[project]/Documents/programming/pixel-space-vpn/node_modules/lucide-react/dist/esm/icons/circle-x.js [app-client] (ecmascript) <export default as XCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__ = __turbopack_context__.i("[project]/Documents/programming/pixel-space-vpn/node_modules/lucide-react/dist/esm/icons/loader-circle.js [app-client] (ecmascript) <export default as Loader2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeft$3e$__ = __turbopack_context__.i("[project]/Documents/programming/pixel-space-vpn/node_modules/lucide-react/dist/esm/icons/arrow-left.js [app-client] (ecmascript) <export default as ArrowLeft>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$components$2f$header$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/programming/pixel-space-vpn/components/header.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$components$2f$footer$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/programming/pixel-space-vpn/components/footer.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$components$2f$pixel$2d$stars$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/programming/pixel-space-vpn/components/pixel-stars.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
;
;
;
;
;
function TariffsPage() {
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const [tariffs, setTariffs] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [purchasing, setPurchasing] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [message, setMessage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [selectedTariff, setSelectedTariff] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [bypassPreset, setBypassPreset] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("yandex");
    const [showPresetDialog, setShowPresetDialog] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "TariffsPage.useEffect": ()=>{
            loadTariffs();
        }
    }["TariffsPage.useEffect"], []);
    const loadTariffs = async ()=>{
        setLoading(true);
        // Проверяем, используется ли тестовый пользователь
        const token = localStorage.getItem('auth_token');
        if (token === 'test_token_12345') {
            const mockTariffs = [
                {
                    id: 1,
                    name: 'Бесплатный',
                    description: 'Базовый доступ для тестирования',
                    tagline: 'Для начала',
                    duration_months: 0,
                    price: 0,
                    data_limit_gb: 10,
                    devices_count: 1,
                    is_active: true,
                    is_featured: false
                },
                {
                    id: 2,
                    name: 'Стандарт',
                    description: 'Полный доступ с безлимитным трафиком',
                    tagline: 'Лучший выбор',
                    duration_months: 1,
                    price: 299,
                    data_limit_gb: 0,
                    devices_count: 3,
                    is_active: true,
                    is_featured: true
                }
            ];
            setTariffs(mockTariffs);
            setLoading(false);
            return;
        }
        const response = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getPublicTariffs"])();
        if (response.data?.length) {
            setTariffs(response.data.filter((tariff)=>tariff.is_active));
        }
        setLoading(false);
    };
    const handlePurchase = async (tariffId, tariffName, tariffPrice)=>{
        // Если тариф бесплатный, сначала показываем диалог выбора bypass preset
        if (tariffPrice === 0) {
            setSelectedTariff(tariffs.find((t)=>t.id === tariffId) || null);
            setShowPresetDialog(true);
            return;
        }
        // Платные тарифы временно недоступны (до интеграции YooKassa)
        setMessage({
            type: "error",
            text: "Платные тарифы временно недоступны. Используйте бесплатный тариф."
        });
    };
    const confirmPurchase = async ()=>{
        if (!selectedTariff) return;
        // Clear previous messages
        setMessage(null);
        setPurchasing(selectedTariff.id);
        setShowPresetDialog(false);
        try {
            const response = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["purchaseFreeTariff"])({
                tariff_id: selectedTariff.id,
                bypass_preset: bypassPreset
            });
            if (response.data) {
                setMessage({
                    type: "success",
                    text: response.data.message
                });
                // Redirect to keys page after 2 seconds
                setTimeout(()=>{
                    router.push("/account/keys");
                }, 2000);
            } else {
                setMessage({
                    type: "error",
                    text: response.error || "Ошибка активации тарифа"
                });
            }
        } catch (error) {
            setMessage({
                type: "error",
                text: "Произошла ошибка. Попробуйте позже."
            });
        } finally{
            setPurchasing(null);
            setSelectedTariff(null);
        }
    };
    const formatDuration = (months)=>{
        if (months === 0) return "1 день";
        return `${months} мес.`;
    };
    const formatDataLimit = (gb)=>{
        if (gb === 0) return "Безлимитный";
        if (gb < 1000) return `${gb} ГБ`;
        return `${gb / 1000} ТБ`;
    };
    const baseMonthlyPrice = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "TariffsPage.useMemo[baseMonthlyPrice]": ()=>{
            if (!tariffs.length) return 0;
            const perMonthPrices = tariffs.map({
                "TariffsPage.useMemo[baseMonthlyPrice].perMonthPrices": (tariff)=>{
                    const months = tariff.duration_months === 0 ? 1 : Math.max(1, tariff.duration_months);
                    return tariff.price / months;
                }
            }["TariffsPage.useMemo[baseMonthlyPrice].perMonthPrices"]);
            return Math.min(...perMonthPrices);
        }
    }["TariffsPage.useMemo[baseMonthlyPrice]"], [
        tariffs
    ]);
    const highlightTariffId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "TariffsPage.useMemo[highlightTariffId]": ()=>{
            if (!tariffs.length) return null;
            return tariffs.reduce({
                "TariffsPage.useMemo[highlightTariffId]": (best, current)=>{
                    const currentMonths = current.duration_months === 0 ? 1 : Math.max(1, current.duration_months);
                    const bestMonths = best.duration_months === 0 ? 1 : Math.max(1, best.duration_months);
                    const currentRatio = current.price / currentMonths;
                    const bestRatio = best.price / bestMonths;
                    return currentRatio < bestRatio ? current : best;
                }
            }["TariffsPage.useMemo[highlightTariffId]"]).id;
        }
    }["TariffsPage.useMemo[highlightTariffId]"], [
        tariffs
    ]);
    if (loading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "min-h-screen bg-background relative",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$components$2f$pixel$2d$stars$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PixelStars"], {}, void 0, false, {
                    fileName: "[project]/Documents/programming/pixel-space-vpn/app/account/tariffs/page.tsx",
                    lineNumber: 164,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$components$2f$header$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Header"], {}, void 0, false, {
                    fileName: "[project]/Documents/programming/pixel-space-vpn/app/account/tariffs/page.tsx",
                    lineNumber: 165,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "container mx-auto px-4 py-32",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-center min-h-[400px]",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                            className: "h-8 w-8 animate-spin text-primary"
                        }, void 0, false, {
                            fileName: "[project]/Documents/programming/pixel-space-vpn/app/account/tariffs/page.tsx",
                            lineNumber: 168,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/Documents/programming/pixel-space-vpn/app/account/tariffs/page.tsx",
                        lineNumber: 167,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/Documents/programming/pixel-space-vpn/app/account/tariffs/page.tsx",
                    lineNumber: 166,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$components$2f$footer$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Footer"], {}, void 0, false, {
                    fileName: "[project]/Documents/programming/pixel-space-vpn/app/account/tariffs/page.tsx",
                    lineNumber: 171,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/Documents/programming/pixel-space-vpn/app/account/tariffs/page.tsx",
            lineNumber: 163,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen bg-background relative",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$components$2f$pixel$2d$stars$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PixelStars"], {}, void 0, false, {
                fileName: "[project]/Documents/programming/pixel-space-vpn/app/account/tariffs/page.tsx",
                lineNumber: 178,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$components$2f$header$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Header"], {}, void 0, false, {
                fileName: "[project]/Documents/programming/pixel-space-vpn/app/account/tariffs/page.tsx",
                lineNumber: 179,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                className: "pt-24 pb-20 px-4",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "max-w-6xl mx-auto",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            href: "/account",
                            className: "inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors text-sm mb-6",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeft$3e$__["ArrowLeft"], {
                                    className: "h-4 w-4"
                                }, void 0, false, {
                                    fileName: "[project]/Documents/programming/pixel-space-vpn/app/account/tariffs/page.tsx",
                                    lineNumber: 188,
                                    columnNumber: 13
                                }, this),
                                "Назад в личный кабинет"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Documents/programming/pixel-space-vpn/app/account/tariffs/page.tsx",
                            lineNumber: 184,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "bg-card border border-border p-8 mb-10",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-accent text-[9px] tracking-[0.35em] mb-2",
                                    children: "[ ТАРИФЫ ]"
                                }, void 0, false, {
                                    fileName: "[project]/Documents/programming/pixel-space-vpn/app/account/tariffs/page.tsx",
                                    lineNumber: 194,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                    className: "text-3xl md:text-4xl text-foreground font-bold mb-3",
                                    children: "Выберите свой план"
                                }, void 0, false, {
                                    fileName: "[project]/Documents/programming/pixel-space-vpn/app/account/tariffs/page.tsx",
                                    lineNumber: 195,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-muted-foreground text-base max-w-2xl",
                                    children: "Гибкие тарифы для любых потребностей. Начните с бесплатного пробного периода."
                                }, void 0, false, {
                                    fileName: "[project]/Documents/programming/pixel-space-vpn/app/account/tariffs/page.tsx",
                                    lineNumber: 198,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Documents/programming/pixel-space-vpn/app/account/tariffs/page.tsx",
                            lineNumber: 193,
                            columnNumber: 11
                        }, this),
                        message && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$components$2f$ui$2f$alert$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Alert"], {
                            className: `mb-6 ${message.type === "success" ? "border-2 border-green-500 bg-green-500/10" : "border-2 border-red-500 bg-red-500/10"}`,
                            children: [
                                message.type === "success" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__["CheckCircle2"], {
                                    className: "h-5 w-5 text-green-500"
                                }, void 0, false, {
                                    fileName: "[project]/Documents/programming/pixel-space-vpn/app/account/tariffs/page.tsx",
                                    lineNumber: 206,
                                    columnNumber: 17
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__XCircle$3e$__["XCircle"], {
                                    className: "h-5 w-5 text-red-500"
                                }, void 0, false, {
                                    fileName: "[project]/Documents/programming/pixel-space-vpn/app/account/tariffs/page.tsx",
                                    lineNumber: 208,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$components$2f$ui$2f$alert$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AlertDescription"], {
                                    className: `text-base ${message.type === "success" ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`,
                                    children: message.text
                                }, void 0, false, {
                                    fileName: "[project]/Documents/programming/pixel-space-vpn/app/account/tariffs/page.tsx",
                                    lineNumber: 210,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Documents/programming/pixel-space-vpn/app/account/tariffs/page.tsx",
                            lineNumber: 204,
                            columnNumber: 13
                        }, this),
                        tariffs.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "bg-card border border-border p-6 text-center text-muted-foreground text-[11px]",
                            children: "Нет доступных тарифов"
                        }, void 0, false, {
                            fileName: "[project]/Documents/programming/pixel-space-vpn/app/account/tariffs/page.tsx",
                            lineNumber: 217,
                            columnNumber: 13
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10",
                            children: tariffs.map((tariff)=>{
                                const months = Math.max(1, tariff.duration_months);
                                const nominalPrice = baseMonthlyPrice * months;
                                const discountPercent = nominalPrice > tariff.price && months > 1 ? Math.round((nominalPrice - tariff.price) / nominalPrice * 100) : 0;
                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: `relative bg-card border-2 ${tariff.id === highlightTariffId ? "border-primary shadow-lg shadow-primary/20" : "border-border"} p-8 flex flex-col transition-all hover:shadow-xl`,
                                    children: [
                                        tariff.id === highlightTariffId && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-6 py-2 text-xs font-semibold",
                                            children: "ПОПУЛЯРНЫЙ"
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/programming/pixel-space-vpn/app/account/tariffs/page.tsx",
                                            lineNumber: 235,
                                            columnNumber: 23
                                        }, this),
                                        discountPercent > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "absolute top-4 right-4 bg-green-500/20 border-2 border-green-500 text-green-500 px-4 py-1 text-sm font-bold",
                                            children: [
                                                "-",
                                                discountPercent,
                                                "%"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Documents/programming/pixel-space-vpn/app/account/tariffs/page.tsx",
                                            lineNumber: 241,
                                            columnNumber: 23
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-center space-y-4 mb-6",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-accent text-[9px] tracking-[0.35em]",
                                                    children: [
                                                        "[ ",
                                                        tariff.name.toUpperCase(),
                                                        " ]"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Documents/programming/pixel-space-vpn/app/account/tariffs/page.tsx",
                                                    lineNumber: 247,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                    className: "text-foreground text-xl font-bold",
                                                    children: formatDuration(tariff.duration_months)
                                                }, void 0, false, {
                                                    fileName: "[project]/Documents/programming/pixel-space-vpn/app/account/tariffs/page.tsx",
                                                    lineNumber: 248,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex flex-col items-center gap-2",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex items-baseline justify-center gap-2",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "text-primary text-5xl font-bold",
                                                                    children: tariff.price
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Documents/programming/pixel-space-vpn/app/account/tariffs/page.tsx",
                                                                    lineNumber: 251,
                                                                    columnNumber: 27
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "text-muted-foreground text-lg",
                                                                    children: "₽"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Documents/programming/pixel-space-vpn/app/account/tariffs/page.tsx",
                                                                    lineNumber: 252,
                                                                    columnNumber: 27
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/Documents/programming/pixel-space-vpn/app/account/tariffs/page.tsx",
                                                            lineNumber: 250,
                                                            columnNumber: 25
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-muted-foreground text-xs uppercase tracking-wider",
                                                            children: "за весь период"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Documents/programming/pixel-space-vpn/app/account/tariffs/page.tsx",
                                                            lineNumber: 254,
                                                            columnNumber: 25
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Documents/programming/pixel-space-vpn/app/account/tariffs/page.tsx",
                                                    lineNumber: 249,
                                                    columnNumber: 23
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Documents/programming/pixel-space-vpn/app/account/tariffs/page.tsx",
                                            lineNumber: 246,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "space-y-3 mb-6 flex-1",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-start gap-3 text-muted-foreground text-sm",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                            className: "w-5 h-5 text-primary flex-shrink-0 mt-0.5",
                                                            fill: "none",
                                                            viewBox: "0 0 24 24",
                                                            stroke: "currentColor",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                strokeLinecap: "round",
                                                                strokeLinejoin: "round",
                                                                strokeWidth: 2,
                                                                d: "M5 13l4 4L19 7"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Documents/programming/pixel-space-vpn/app/account/tariffs/page.tsx",
                                                                lineNumber: 261,
                                                                columnNumber: 27
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/Documents/programming/pixel-space-vpn/app/account/tariffs/page.tsx",
                                                            lineNumber: 260,
                                                            columnNumber: 25
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            children: [
                                                                formatDataLimit(tariff.data_limit_gb),
                                                                " трафика"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/Documents/programming/pixel-space-vpn/app/account/tariffs/page.tsx",
                                                            lineNumber: 263,
                                                            columnNumber: 25
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Documents/programming/pixel-space-vpn/app/account/tariffs/page.tsx",
                                                    lineNumber: 259,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-start gap-3 text-muted-foreground text-sm",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                            className: "w-5 h-5 text-primary flex-shrink-0 mt-0.5",
                                                            fill: "none",
                                                            viewBox: "0 0 24 24",
                                                            stroke: "currentColor",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                strokeLinecap: "round",
                                                                strokeLinejoin: "round",
                                                                strokeWidth: 2,
                                                                d: "M5 13l4 4L19 7"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Documents/programming/pixel-space-vpn/app/account/tariffs/page.tsx",
                                                                lineNumber: 267,
                                                                columnNumber: 27
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/Documents/programming/pixel-space-vpn/app/account/tariffs/page.tsx",
                                                            lineNumber: 266,
                                                            columnNumber: 25
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            children: [
                                                                tariff.devices_count,
                                                                " устройств",
                                                                tariff.devices_count > 1 ? 'а' : 'о'
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/Documents/programming/pixel-space-vpn/app/account/tariffs/page.tsx",
                                                            lineNumber: 269,
                                                            columnNumber: 25
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Documents/programming/pixel-space-vpn/app/account/tariffs/page.tsx",
                                                    lineNumber: 265,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-start gap-3 text-muted-foreground text-sm",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                            className: "w-5 h-5 text-primary flex-shrink-0 mt-0.5",
                                                            fill: "none",
                                                            viewBox: "0 0 24 24",
                                                            stroke: "currentColor",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                strokeLinecap: "round",
                                                                strokeLinejoin: "round",
                                                                strokeWidth: 2,
                                                                d: "M5 13l4 4L19 7"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Documents/programming/pixel-space-vpn/app/account/tariffs/page.tsx",
                                                                lineNumber: 273,
                                                                columnNumber: 27
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/Documents/programming/pixel-space-vpn/app/account/tariffs/page.tsx",
                                                            lineNumber: 272,
                                                            columnNumber: 25
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            children: "Поддержка 24/7"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Documents/programming/pixel-space-vpn/app/account/tariffs/page.tsx",
                                                            lineNumber: 275,
                                                            columnNumber: 25
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Documents/programming/pixel-space-vpn/app/account/tariffs/page.tsx",
                                                    lineNumber: 271,
                                                    columnNumber: 23
                                                }, this),
                                                tariff.description && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-muted-foreground text-sm pt-3 border-t border-border",
                                                    children: tariff.description
                                                }, void 0, false, {
                                                    fileName: "[project]/Documents/programming/pixel-space-vpn/app/account/tariffs/page.tsx",
                                                    lineNumber: 278,
                                                    columnNumber: 25
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Documents/programming/pixel-space-vpn/app/account/tariffs/page.tsx",
                                            lineNumber: 258,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>handlePurchase(tariff.id, tariff.name, tariff.price),
                                            disabled: purchasing !== null,
                                            className: `w-full py-4 px-4 text-sm font-bold tracking-wider transition-colors ${tariff.id === highlightTariffId ? "bg-primary text-primary-foreground hover:bg-primary/90" : "border-2 border-border text-foreground hover:border-primary hover:text-primary"} ${purchasing !== null ? "opacity-50 cursor-not-allowed" : ""}`,
                                            children: purchasing === tariff.id ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "flex items-center justify-center gap-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                                                        className: "h-5 w-5 animate-spin"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Documents/programming/pixel-space-vpn/app/account/tariffs/page.tsx",
                                                        lineNumber: 294,
                                                        columnNumber: 27
                                                    }, this),
                                                    tariff.price === 0 ? "АКТИВАЦИЯ..." : "ПОДГОТОВКА..."
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Documents/programming/pixel-space-vpn/app/account/tariffs/page.tsx",
                                                lineNumber: 293,
                                                columnNumber: 25
                                            }, this) : tariff.price === 0 ? "ПОПРОБОВАТЬ БЕСПЛАТНО" : "ВЫБРАТЬ ПЛАН"
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/programming/pixel-space-vpn/app/account/tariffs/page.tsx",
                                            lineNumber: 284,
                                            columnNumber: 21
                                        }, this)
                                    ]
                                }, tariff.id, true, {
                                    fileName: "[project]/Documents/programming/pixel-space-vpn/app/account/tariffs/page.tsx",
                                    lineNumber: 230,
                                    columnNumber: 19
                                }, this);
                            })
                        }, void 0, false, {
                            fileName: "[project]/Documents/programming/pixel-space-vpn/app/account/tariffs/page.tsx",
                            lineNumber: 221,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Documents/programming/pixel-space-vpn/app/account/tariffs/page.tsx",
                    lineNumber: 182,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/Documents/programming/pixel-space-vpn/app/account/tariffs/page.tsx",
                lineNumber: 181,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$components$2f$footer$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Footer"], {}, void 0, false, {
                fileName: "[project]/Documents/programming/pixel-space-vpn/app/account/tariffs/page.tsx",
                lineNumber: 311,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Dialog"], {
                open: showPresetDialog,
                onOpenChange: setShowPresetDialog,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogContent"], {
                    className: "max-w-2xl",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogHeader"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogTitle"], {
                                    children: "Настройка VPN подключения"
                                }, void 0, false, {
                                    fileName: "[project]/Documents/programming/pixel-space-vpn/app/account/tariffs/page.tsx",
                                    lineNumber: 317,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogDescription"], {
                                    children: "Выберите оптимальные настройки обхода блокировок для вашего региона"
                                }, void 0, false, {
                                    fileName: "[project]/Documents/programming/pixel-space-vpn/app/account/tariffs/page.tsx",
                                    lineNumber: 318,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Documents/programming/pixel-space-vpn/app/account/tariffs/page.tsx",
                            lineNumber: 316,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$components$2f$bypass$2d$preset$2d$selector$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BypassPresetSelector"], {
                            value: bypassPreset,
                            onChange: setBypassPreset,
                            disabled: purchasing !== null
                        }, void 0, false, {
                            fileName: "[project]/Documents/programming/pixel-space-vpn/app/account/tariffs/page.tsx",
                            lineNumber: 323,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogFooter"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                    variant: "outline",
                                    onClick: ()=>setShowPresetDialog(false),
                                    disabled: purchasing !== null,
                                    children: "Отмена"
                                }, void 0, false, {
                                    fileName: "[project]/Documents/programming/pixel-space-vpn/app/account/tariffs/page.tsx",
                                    lineNumber: 330,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                    onClick: confirmPurchase,
                                    disabled: purchasing !== null,
                                    children: purchasing !== null ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                                                className: "mr-2 h-4 w-4 animate-spin"
                                            }, void 0, false, {
                                                fileName: "[project]/Documents/programming/pixel-space-vpn/app/account/tariffs/page.tsx",
                                                lineNumber: 343,
                                                columnNumber: 19
                                            }, this),
                                            "Активация..."
                                        ]
                                    }, void 0, true) : "Активировать тариф"
                                }, void 0, false, {
                                    fileName: "[project]/Documents/programming/pixel-space-vpn/app/account/tariffs/page.tsx",
                                    lineNumber: 337,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Documents/programming/pixel-space-vpn/app/account/tariffs/page.tsx",
                            lineNumber: 329,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Documents/programming/pixel-space-vpn/app/account/tariffs/page.tsx",
                    lineNumber: 315,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/Documents/programming/pixel-space-vpn/app/account/tariffs/page.tsx",
                lineNumber: 314,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Documents/programming/pixel-space-vpn/app/account/tariffs/page.tsx",
        lineNumber: 177,
        columnNumber: 5
    }, this);
}
_s(TariffsPage, "07HrMESioSy3HllwW82yKIiWZmU=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$programming$2f$pixel$2d$space$2d$vpn$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = TariffsPage;
var _c;
__turbopack_context__.k.register(_c, "TariffsPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=Documents_programming_pixel-space-vpn_64c29f85._.js.map