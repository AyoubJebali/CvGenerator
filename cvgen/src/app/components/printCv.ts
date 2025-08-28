"use client";

import ReactDOMServer from "react-dom/server";
import React from "react";

type PrintOptions = {
  title?: string;
  theme?: string; // daisyUI theme name
  pageWidthMm?: number; // default 210
  pageHeightMm?: number; // default 297
  marginMm?: number; // default 10
};

export function printReactToIframe(element: React.ReactElement, opts: PrintOptions = {}) {
  if (typeof window === "undefined") return;

  const {
    title = "CV",
    theme = "light",
    pageWidthMm = 210,
    pageHeightMm = 297,
    marginMm = 10,
  } = opts;

  const htmlString = ReactDOMServer.renderToStaticMarkup(element);

  const iframe = document.createElement("iframe");
  iframe.style.position = "fixed";
  iframe.style.right = "0";
  iframe.style.bottom = "0";
  iframe.style.width = "0";
  iframe.style.height = "0";
  iframe.style.border = "0";
  document.body.appendChild(iframe);

  const doc = iframe.contentWindow?.document;
  if (!doc) return;

  doc.open();
  doc.write(`
    <!DOCTYPE html>
    <html lang="en" data-theme="${theme}">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>${title}</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="https://cdn.jsdelivr.net/npm/daisyui@4/dist/full.min.css" rel="stylesheet" type="text/css" />
        <style>
          @page { size: ${pageWidthMm}mm ${pageHeightMm}mm; margin: ${marginMm}mm; }
          html, body { height: 100%; }
          body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          .page { width: ${pageWidthMm}mm; min-height: ${pageHeightMm}mm; }
        </style>
      </head>
      <body>
        <div id="root" class="mx-auto">${htmlString}</div>
        <script>
          // Ensure fonts/styles are applied before printing
          window.addEventListener('load', () => {
            setTimeout(() => { window.focus(); window.print(); }, 50);
          });
          window.onafterprint = () => { setTimeout(() => parent.document.body.removeChild(parent.document.querySelector('iframe:last-of-type')), 0); };
        </script>
      </body>
    </html>
  `);
  doc.close();
}

// Convenience helper to print a specific component factory
export function printComponent(Component: React.ComponentType<any>, props: any = {}, opts?: PrintOptions) {
  return printReactToIframe(React.createElement(Component, props), opts);
}

export default printReactToIframe;
