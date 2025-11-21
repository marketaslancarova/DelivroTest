export const messages = {
  en: {
    dashboard: {
      title: "Delivro – Shipments & Invoices",
      subtitle: "Overview of all shipments and carrier invoices in one place.",

      filterPlaceholder: "Filter by company…",
      noShipments:
        "No shipments match the selected filter. Try adjusting the filter or upload new invoices.",

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
      paginationSummary:
        "Page {{currentPage}} / {{totalPages}} · total {{totalItems}} shipments",
      showHistory: "Show history",
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
      colUploadedAt: "Uploaded at",
    },

    uploadDialog: {
      title: "Preview invoice data",
      helperText:
        "Upload a JSON file to see the invoice data before confirming.",

      // drop zone
      dropHereText:
        "Upload a JSON file to see the invoice data before confirming.",
      dropHereSubtext:
        "Drag & drop or click to select one or more .json files.",
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
      errorUpload: "Something went wrong during upload.",
    },
  },

  cs: {
    dashboard: {
      title: "Delivro – zásilky a faktury",
      subtitle: "Přehled všech zásilek a faktur od dopravců na jednom místě.",

      filterPlaceholder: "Filtrovat podle firmy…",
      noShipments:
        "Žádné zásilky neodpovídají filtru. Změň filtr nebo nahraj nové faktury.",

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
      paginationSummary:
        "Stránka {{currentPage}} / {{totalPages}} · celkem {{totalItems}} zásilek",
      showHistory: "Zobrazit historii",
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
      colUploadedAt: "Datum nahrání",
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
      errorUpload: "Něco se pokazilo při nahrávání.",
    },
  },
} as const;
