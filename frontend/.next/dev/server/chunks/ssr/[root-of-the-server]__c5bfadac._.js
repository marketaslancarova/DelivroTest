module.exports = [
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[project]/shared/i18n/messages.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "messages",
    ()=>messages
]);
const messages = {
    en: {
        dashboard: {
            title: "Delivro – Shipments & Invoices",
            subtitle: "Overview of all shipments and carrier invoices in one place.",
            filterPlaceholder: "Filter by company…",
            noShipments: "No shipments match the selected filter. Try adjusting the filter or upload new invoices.",
            export: "EXPORT",
            import: "IMPORT",
            company: "Company",
            uploadInvoices: "Upload Invoices",
            paginationPageLabel: "Page",
            paginationTotalLabelPrefix: "total",
            paginationShipmentsLabel: "shipments",
            // filters
            dateLabel: "Date",
            sortLabel: "Sort",
            sortNewest: "Newest first",
            sortOldest: "Oldest first",
            // state / actions
            loading: "Loading shipments…",
            loadError: "Failed to load shipments.",
            retry: "Try again",
            prevPage: "Previous",
            nextPage: "Next",
            resetButton: "Reset",
            languageSwitcherLabel: "Switch language",
            paginationSummary: "Page {{currentPage}} / {{totalPages}} · total {{totalItems}} shipments",
            showHistory: "Show history"
        },
        shipmentHistory: {
            title: "Invoice history",
            noShipmentSelected: "No shipment selected.",
            loading: "Loading invoice history…",
            error: "Failed to load invoice history.",
            empty: "There is no invoice history for this shipment yet.",
            colId: "ID",
            colPrice: "Price",
            colWeight: "Weight",
            colUploadedAt: "Uploaded at"
        },
        uploadDialog: {
            title: "Preview invoice data",
            helperText: "Upload a JSON file to see the invoice data before confirming.",
            // drop zone
            dropHereText: "Upload a JSON file to see the invoice data before confirming.",
            dropHereSubtext: "Drag & drop or click to select one or more .json files.",
            dropHereSubtextPrefix: "Drag & drop or",
            dropHereSubtextClick: "click to select one or more .json files.",
            // file list
            uploadedFilesLabel: "Uploaded files",
            rowsLabel: "records",
            addMore: "Add more",
            removeFile: "Remove file",
            // table columns
            colTracking: "Tracking #",
            colProvider: "Provider",
            colRoute: "Route",
            colPrice: "Price",
            colWeight: "Weight",
            // toggling
            showDetails: "Show details",
            hideDetails: "Hide details",
            pickFilePlaceholder: "Pick JSON file…",
            changeFile: "Change file",
            cancel: "Cancel",
            confirm: "Confirm",
            uploading: "Uploading…",
            parsing: "Reading and parsing JSON…",
            // errors
            invalidJson: "The file does not contain valid invoice JSON.",
            errorUpload: "Something went wrong during upload."
        }
    },
    cs: {
        dashboard: {
            title: "Delivro – zásilky a faktury",
            subtitle: "Přehled všech zásilek a faktur od dopravců na jednom místě.",
            filterPlaceholder: "Filtrovat podle firmy…",
            noShipments: "Žádné zásilky neodpovídají filtru. Změň filtr nebo nahraj nové faktury.",
            export: "EXPORT",
            import: "IMPORT",
            company: "Firma",
            uploadInvoices: "Nahrát faktury",
            paginationPageLabel: "Stránka",
            paginationTotalLabelPrefix: "celkem",
            paginationShipmentsLabel: "zásilek",
            // filtry
            dateLabel: "Datum",
            sortLabel: "Řazení",
            sortNewest: "Nejnovější první",
            sortOldest: "Nejstarší první",
            // stavové texty
            loading: "Načítám zásilky…",
            loadError: "Nepodařilo se načíst zásilky.",
            retry: "Zkusit znovu",
            prevPage: "Předchozí",
            nextPage: "Další",
            resetButton: "Reset",
            languageSwitcherLabel: "Přepnout jazyk",
            paginationSummary: "Stránka {{currentPage}} / {{totalPages}} · celkem {{totalItems}} zásilek",
            showHistory: "Zobrazit historii"
        },
        shipmentHistory: {
            title: "Historie faktur",
            noShipmentSelected: "Není vybraná žádná zásilka.",
            loading: "Načítám historii faktur…",
            error: "Nepodařilo se načíst historii faktur.",
            empty: "Pro tuto zásilku zatím žádná historie faktur není.",
            colId: "ID",
            colPrice: "Cena",
            colWeight: "Váha",
            colUploadedAt: "Datum nahrání"
        },
        uploadDialog: {
            title: "Náhled fakturačních dat",
            helperText: "Nahraj JSON soubor a zobrazí se náhled dat před potvrzením.",
            // drop zóna
            dropHereText: "Nahraj JSON soubor nebo jej přetáhni do tohoto pole.",
            dropHereSubtext: "Podporováno je nahrání jednoho či více .json souborů.",
            dropHereSubtextPrefix: "Přetáhni sem soubor nebo",
            dropHereSubtextClick: "kliknutím vyber jeden či více .json souborů.",
            // seznam souborů
            uploadedFilesLabel: "Nahrané soubory",
            rowsLabel: "záznamů",
            addMore: "Přidat další",
            removeFile: "Odebrat soubor",
            // sloupce tabulky
            colTracking: "Tracking #",
            colProvider: "Dopravce",
            colRoute: "Trasa",
            colPrice: "Cena",
            colWeight: "Váha",
            // toggling
            showDetails: "Zobrazit detaily",
            hideDetails: "Skrýt detaily",
            pickFilePlaceholder: "Vyber JSON soubor…",
            changeFile: "Změnit soubor",
            cancel: "Zrušit",
            confirm: "Potvrdit",
            uploading: "Nahrávám…",
            parsing: "Načítám a parsuji JSON…",
            invalidJson: "Soubor neobsahuje validní JSON s fakturami.",
            errorUpload: "Něco se pokazilo při nahrávání."
        }
    }
};
}),
"[project]/shared/i18n/i18nProvider.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "I18nProvider",
    ()=>I18nProvider,
    "useI18n",
    ()=>useI18n
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$shared$2f$i18n$2f$messages$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/shared/i18n/messages.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
const I18nContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"])(undefined);
function I18nProvider({ children }) {
    const [locale, setLocale] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("en");
    function t(key) {
        const parts = key.split(".");
        let obj = __TURBOPACK__imported__module__$5b$project$5d2f$shared$2f$i18n$2f$messages$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["messages"][locale];
        for (const part of parts){
            if (typeof obj === "object" && obj !== null && part in obj) {
                obj = obj[part];
            } else {
                return key;
            }
        }
        return typeof obj === "string" ? obj : key;
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(I18nContext.Provider, {
        value: {
            locale,
            setLocale,
            t
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/shared/i18n/i18nProvider.tsx",
        lineNumber: 34,
        columnNumber: 5
    }, this);
}
function useI18n() {
    const ctx = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"])(I18nContext);
    if (!ctx) throw new Error("useI18n must be used within I18nProvider");
    return ctx;
}
}),
"[project]/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
;
else {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    else {
        if ("TURBOPACK compile-time truthy", 1) {
            if ("TURBOPACK compile-time truthy", 1) {
                module.exports = __turbopack_context__.r("[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)");
            } else //TURBOPACK unreachable
            ;
        } else //TURBOPACK unreachable
        ;
    }
} //# sourceMappingURL=module.compiled.js.map
}),
"[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

module.exports = __turbopack_context__.r("[project]/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-ssr] (ecmascript)").vendored['react-ssr'].ReactJsxDevRuntime; //# sourceMappingURL=react-jsx-dev-runtime.js.map
}),
"[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

module.exports = __turbopack_context__.r("[project]/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-ssr] (ecmascript)").vendored['react-ssr'].React; //# sourceMappingURL=react.js.map
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__c5bfadac._.js.map