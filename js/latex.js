/* ============================================================
   latex.js
   Builds the LaTeX cover page source code
   ============================================================ */

var MONTHS = [
  'January','February','March','April','May','June',
  'July','August','September','October','November','December'
];

/**
 * Escape special LaTeX characters in a string
 */
function texEscape(s) {
  if (!s) return '';
  var BS = '\\';
  return s
    .replace(/\\/g,  BS + 'textbackslash{}')
    .replace(/&/g,   BS + '&')
    .replace(/%/g,   BS + '%')
    .replace(/\$/g,  BS + '$')
    .replace(/#/g,   BS + '#')
    .replace(/_/g,   BS + '_')
    .replace(/\^/g,  BS + '^{}')
    .replace(/~/g,   BS + '~{}')
    .replace(/\{/g,  BS + '{')
    .replace(/\}/g,  BS + '}');
}

/**
 * Format a date string as "DD Month, YYYY"
 */
function formatDate(dateRaw) {
  if (!dateRaw) return 'today';
  var d = new Date(dateRaw + 'T00:00:00');
  return d.getDate() + ' ' + MONTHS[d.getMonth()] + ', ' + d.getFullYear();
}

/**
 * Build and return the full LaTeX document string
 */
function buildLatex() {
  var title   = getVal('repTitle')   || 'Report Title';
  var desc    = getVal('degDesc');
  var cCode   = getVal('courseCode');
  var cTitle  = getVal('courseTitle');
  var dept    = getDept();
  var fac     = getFac();
  var uni     = getVal('uniName');
  var city    = getVal('uniCity');
  var dateStr = formatDate(getVal('subDate'));

  // Build members table rows
  var active = members.filter(function(m) { return m.name || m.id; });
  if (!active.length) active = [{ name: 'Name', id: 'ID', session: 'Year' }];

  var n       = active.length;
  var cols    = Array(n).fill('c').join('');
  var nameRow = active.map(function(m) { return '\\textbf{' + texEscape(m.name) + '}'; }).join(' & ');
  var idRow   = active.map(function(m) { return 'Student ID: ' + texEscape(m.id); }).join(' & ');
  var sessRow = active.map(function(m) { return 'Session: ' + texEscape(m.session); }).join(' & ');

  // Use BS variable so no bare backslash ever appears in a JS string literal
  var NL = '\n';
  var BS = '\\';
  var L  = '';

  L += BS + 'documentclass[12pt,a4paper]{article}' + NL;
  L += BS + 'usepackage[top=1in,bottom=0.9in,left=1in,right=1in]{geometry}' + NL;
  L += BS + 'usepackage{graphicx}' + NL;
  L += BS + 'usepackage{times}' + NL;
  L += BS + 'usepackage{anyfontsize}' + NL;
  L += NL;
  L += BS + 'begin{document}' + NL;
  L += BS + 'thispagestyle{empty}' + NL;
  L += NL;
  L += BS + 'begin{center}' + NL;
  L += NL;

  // Title — 21pt bold uppercase
  L += '{' + BS + 'fontsize{21pt}{28pt}' + BS + 'selectfont' + BS + 'textbf{' + BS + 'MakeUppercase{' + texEscape(title) + '}}}' + BS + BS + '[1cm]' + NL;
  L += NL;

  // Degree description — 12pt
  L += '{' + BS + 'fontsize{12pt}{21pt}' + BS + 'selectfont ' + texEscape(desc) + '}' + BS + BS + '[0.35cm]' + NL;
  L += NL;

  // Course info — 12pt
  L += '{' + BS + 'fontsize{12pt}{21pt}' + BS + 'selectfont Course Code: ' + texEscape(cCode) + '}' + BS + BS + NL;
  L += '{' + BS + 'fontsize{12pt}{21pt}' + BS + 'selectfont Course Title: ' + texEscape(cTitle) + '}' + BS + BS + '[0.6cm]' + NL;
  L += NL;

  // By
  L += '{' + BS + 'fontsize{12pt}{18pt}' + BS + 'selectfont By}' + BS + BS + '[0.3cm]' + NL;
  L += NL;

  // Members table — full width, equal columns, names bold
  L += '{' + BS + 'fontsize{12pt}{18pt}' + BS + 'selectfont' + NL;
  L += BS + 'begin{tabular*}{' + BS + 'textwidth}{@{' + BS + 'extracolsep{' + BS + 'fill}}' + cols + '@{}}' + NL;
  L += nameRow  + ' ' + BS + BS + '[2pt]' + NL;
  L += idRow    + ' ' + BS + BS + '[2pt]' + NL;
  L += sessRow  + NL;
  L += BS + 'end{tabular*}}' + NL;
  L += NL;

  L += BS + 'vfill' + NL;
  L += NL;

  // Logo
  L += BS + 'includegraphics[width=2.5cm]{hstu_logo.png}' + BS + BS + '[0.45cm]' + NL;
  L += NL;

  // Dept / Faculty / Uni block — 12pt
  L += '{' + BS + 'fontsize{12pt}{21pt}' + BS + 'selectfont' + NL;
  L += texEscape(dept) + BS + BS + NL;
  L += texEscape(fac)  + BS + BS + NL;
  L += texEscape(uni)  + BS + BS + NL;
  L += texEscape(city) + '}' + BS + BS + '[0.4cm]' + NL;
  L += NL;

  // Date — 12pt
  L += '{' + BS + 'fontsize{12pt}{18pt}' + BS + 'selectfont ' + dateStr + '}' + NL;
  L += NL;

  L += BS + 'end{center}' + NL;
  L += BS + 'end{document}' + NL;

  return L;
}

/**
 * Push the latest LaTeX into the textarea
 */
function updateLatexPane() {
  var el = document.getElementById('latexSrc');
  if (el) el.value = buildLatex();
}

/**
 * Copy LaTeX to clipboard
 */
function copyLatex() {
  navigator.clipboard.writeText(buildLatex()).then(function() {
    showToast('Copied!', 'LaTeX copied to clipboard!');
  });
}

/**
 * Download as .tex file
 */
function downloadTex() {
  var blob = new Blob([buildLatex()], { type: 'text/plain' });
  var a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'cover_page.tex';
  a.click();
  showToast('Done!', 'Downloaded cover_page.tex');
}

/**
 * Open in Overleaf via POST form
 */
function openOverleaf() {
  var form = document.createElement('form');
  form.method = 'POST';
  form.action = 'https://www.overleaf.com/docs';
  form.target = '_blank';

  var i1 = document.createElement('input'); i1.type = 'hidden'; i1.name = 'snip';      i1.value = buildLatex();
  var i2 = document.createElement('input'); i2.type = 'hidden'; i2.name = 'snip_name'; i2.value = 'cover_page.tex';

  form.appendChild(i1);
  form.appendChild(i2);
  document.body.appendChild(form);
  form.submit();
  document.body.removeChild(form);

  showToast('Done!', 'Opening in Overleaf...');
}
