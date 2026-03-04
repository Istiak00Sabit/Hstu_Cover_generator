/* ============================================================
   pdf.js
   Handles browser print → Save as PDF
   ============================================================ */

/**
 * Clone the cover paper into a hidden print frame,
 * then trigger window.print() so the user can save as PDF.
 */
function printPDF() {
  var paper = document.getElementById('coverPaper').cloneNode(true);
  var pf    = document.getElementById('printFrame');

  pf.innerHTML = '';

  // Inject print-specific styles into the frame
  var sty = document.createElement('style');
  sty.textContent = [
    '@page { size: A4; margin: 0; }',
    '* { box-sizing: border-box; margin: 0; padding: 0; }',
    'body { background: white; }',
    '#printFrame {',
    '  display: block !important;',
    '  position: fixed; inset: 0; z-index: 9999;',
    '  background: white;',
    '  width: 210mm; min-height: 297mm;',
    '  padding: 25mm 25mm 20mm;',
    '  font-family: "Times New Roman", Times, serif;',
    '  color: #000;',
    '  display: flex; flex-direction: column;',
    '  align-items: center; text-align: center;',
    '}',
    '.cp-title {',
    '  font-size: 21pt; font-weight: 700;',
    '  text-transform: uppercase;',
    '  line-height: 1.5; margin-bottom: 20pt;',
    '  word-break: normal; overflow-wrap: break-word;',
    '  width: 100%;',
    '  font-family: "Times New Roman", Times, serif;',
    '}',
    '.t12 {',
    '  font-size: 12pt; font-weight: 400;',
    '  line-height: 1.8;',
    '  font-family: "Times New Roman", Times, serif;',
    '}',
    '.cp-desc   { margin-bottom: 4pt; }',
    '.cp-by     { margin: 16pt 0 14pt; }',
    '.cp-members-table { width: 100%; border-collapse: collapse; table-layout: fixed; }',
    '.cp-members-table td { text-align: center; padding: 0 6px; vertical-align: top; word-break: break-word; }',
    '.cp-members-table .row-name td { font-size: 12pt; font-weight: 700; font-family: "Times New Roman", Times, serif; padding-bottom: 2pt; }',
    '.cp-members-table .row-id   td,',
    '.cp-members-table .row-sess td { font-size: 12pt; font-weight: 400; font-family: "Times New Roman", Times, serif; line-height: 1.6; }',
    '.spacer { flex: 1; }',
    '.cp-logo  { width: 80px; height: 80px; object-fit: contain; margin-bottom: 10pt; }',
    '.cp-dept  { font-size: 12pt; font-weight: 400; line-height: 1.85; font-family: "Times New Roman", Times, serif; }',
    '.cp-date  { font-size: 12pt; margin-top: 12pt; font-family: "Times New Roman", Times, serif; }'
  ].join('\n');

  pf.appendChild(sty);
  pf.appendChild(paper);
  pf.style.display = 'block';

  setTimeout(function() {
    window.print();
    setTimeout(function() {
      pf.style.display = 'none';
      pf.innerHTML = '';
    }, 1000);
  }, 200);

  showToast('Done!', 'Print dialog opened — Save as PDF');
}
