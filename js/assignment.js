/* assignment.js — Assignment cover page logic */

var MONTHS_A = ['January','February','March','April','May','June','July','August','September','October','November','December'];

window.addEventListener('DOMContentLoaded', function() {
  var d = document.getElementById('a-date');
  if (d) d.value = new Date().toISOString().split('T')[0];
  renderAssign();
});

/* ── MODE SWITCHER ── */
function switchMode(mode) {
  var isReport = mode === 'report';
  var rw = document.querySelector('.workspace:not(#workspace-assign)');
  if (rw) rw.style.display = isReport ? 'grid' : 'none';
  document.getElementById('workspace-assign').style.display = isReport ? 'none' : 'grid';
  document.getElementById('nav-actions-report').style.display = isReport ? 'flex' : 'none';
  document.getElementById('nav-actions-assign').style.display = isReport ? 'none' : 'flex';
  document.getElementById('mode-report').className = 'mode-btn' + (isReport ? ' on' : '');
  document.getElementById('mode-assign').className = 'mode-btn' + (isReport ? '' : ' on');
  if (!isReport) renderAssign();
}

/* ── HELPERS ── */
function aVal(id) { var el = document.getElementById(id); return el ? el.value.trim() : ''; }

function getAssignDept() {
  var s = document.getElementById('a-deptSel') ? document.getElementById('a-deptSel').value : '';
  return s === 'custom-a' ? aVal('a-deptCust') : s;
}

function formatAssignDate(dr) {
  if (!dr) return '';
  var d = new Date(dr + 'T00:00:00');
  return String(d.getDate()).padStart(2,'0') + '-' + String(d.getMonth()+1).padStart(2,'0') + '-' + d.getFullYear();
}

/* ── RENDER ── */
function renderAssign() {
  var uni    = aVal('a-uniName');
  var city   = aVal('a-uniCity');
  var title  = aVal('a-title');
  var cCode  = aVal('a-courseCode');
  var cTitle = aVal('a-courseTitle');
  var name   = aVal('a-name');
  var roll   = aVal('a-roll');
  var batch  = aVal('a-batch');
  var level  = aVal('a-level');
  var sem    = aVal('a-semester');
  var dept   = getAssignDept();
  var teacher  = aVal('a-teacher');
  var desig    = aVal('a-designation');
  var tDept    = aVal('a-teacherDept');
  var tUni     = aVal('a-teacherUni');
  var dateStr  = formatAssignDate(aVal('a-date'));

  // custom dept toggle
  var dsel = document.getElementById('a-deptSel');
  var custWrap = document.getElementById('a-deptCustWrap');
  if (dsel && custWrap) custWrap.style.display = dsel.value === 'custom-a' ? 'block' : 'none';

  // University block
  var uniEl = document.getElementById('ap-uni');
  if (uniEl) uniEl.innerHTML = (uni ? uni : '') + (city ? '<br/>' + city : '');

  // Title
  var titleEl = document.getElementById('ap-title');
  if (titleEl) titleEl.textContent = title;

  // Submitted By block
  var byEl = document.getElementById('ap-by');
  if (byEl) {
    var byHtml = '';
    if (name)        byHtml += '<div class="ap-row"><span class="ap-lbl">Name:</span> ' + name + '</div>';
    if (roll)        byHtml += '<div class="ap-row"><span class="ap-lbl">Roll:</span> ' + roll + '</div>';
    if (batch)       byHtml += '<div class="ap-row"><span class="ap-lbl">Batch:</span> ' + batch + '</div>';
    if (level || sem) byHtml += '<div class="ap-row"><span class="ap-lbl">Level:</span> ' + level + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="ap-lbl">Semester:</span> ' + sem + '</div>';
    if (dept)        byHtml += '<div class="ap-row"><span class="ap-lbl">Department:</span> ' + dept + '</div>';
    if (cCode)       byHtml += '<div class="ap-row"><span class="ap-lbl">Course Code:</span> ' + cCode + '</div>';
    if (cTitle)      byHtml += '<div class="ap-row"><span class="ap-lbl">Course Title:</span> ' + cTitle + '</div>';
    byEl.innerHTML = byHtml;
  }

  // Submitted To block
  var toEl = document.getElementById('ap-to');
  if (toEl) {
    var toHtml = '';
    if (teacher) toHtml += '<div class="ap-row">' + teacher + '</div>';
    if (desig)   toHtml += '<div class="ap-row">' + desig   + '</div>';
    if (tDept)   toHtml += '<div class="ap-row">' + tDept   + '</div>';
    if (tUni)    toHtml += '<div class="ap-row">' + tUni    + '</div>';
    toEl.innerHTML = toHtml;
  }

  // Date
  var dateEl = document.getElementById('ap-date');
  if (dateEl) dateEl.textContent = dateStr ? 'Date of Submission:' + dateStr : '';
}

/* ── PRINT ── */
function printAssign() {
  var paper = document.getElementById('assignPaper').cloneNode(true);
  var pf = document.getElementById('printFrame');
  pf.innerHTML = '';
  var sty = document.createElement('style');
  sty.textContent = [
    '@page { size: A4; margin: 0; }',
    '* { box-sizing: border-box; margin: 0; padding: 0; }',
    '#printFrame {',
    '  display: block !important; position: fixed; inset: 0; z-index: 9999;',
    '  background: white; width: 210mm; min-height: 297mm;',
    '  padding: 20mm 25mm;',
    '  font-family: "Times New Roman", Times, serif;',
    '  color: #000; display: flex; flex-direction: column; align-items: center;',
    '}',
    '.cp-logo { width: 80px; height: 80px; object-fit: contain; margin-bottom: 8px; }',
    '.ap-uni { font-size: 13pt; font-weight: 700; font-variant: small-caps;',
    '  text-align: center; line-height: 1.6; margin-bottom: 30pt; }',
    '.ap-title { font-size: 13pt; font-weight: 700; font-variant: small-caps;',
    '  text-align: center; margin-bottom: 30pt; }',
    '.ap-section-wrap { width: 100%; margin-bottom: 20pt; }',
    '.ap-section-label { font-size: 12pt; font-weight: 700;',
    '  font-family: "Times New Roman", Times, serif; margin-bottom: 6pt; }',
    '.ap-row { font-size: 12pt; font-weight: 700; padding-left: 30pt;',
    '  font-family: "Times New Roman", Times, serif; line-height: 1.8; }',
    '.ap-lbl { font-weight: 700; }',
    '.ap-date { font-size: 12pt; font-weight: 700; font-variant: small-caps;',
    '  margin-top: auto; padding-top: 40pt; text-align: center; }',
  ].join('\n');
  pf.appendChild(sty);
  pf.appendChild(paper);
  pf.style.display = 'block';
  setTimeout(function() {
    window.print();
    setTimeout(function() { pf.style.display = 'none'; pf.innerHTML = ''; }, 1000);
  }, 200);
  showToast('✓', 'Print dialog opened');
}
