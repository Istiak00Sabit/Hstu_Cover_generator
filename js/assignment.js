/* assignment.js — Assignment cover page logic */

var MONTHS_A = ['January','February','March','April','May','June','July','August','September','October','November','December'];

// Init assignment date on load
window.addEventListener('DOMContentLoaded', function() {
  var d = document.getElementById('a-date');
  if (d) d.value = new Date().toISOString().split('T')[0];
  renderAssign();
});

/* ── MODE SWITCHER ── */
function switchMode(mode) {
  var isReport = mode === 'report';

  document.getElementById('workspace-assign').style.display = isReport ? 'none' : 'grid';
  // find report workspace — it's the first .workspace
  var rw = document.querySelector('.workspace');
  if (rw) rw.style.display = isReport ? 'grid' : 'none';

  document.getElementById('nav-actions-report').style.display = isReport ? 'flex' : 'none';
  document.getElementById('nav-actions-assign').style.display = isReport ? 'none'  : 'flex';

  document.getElementById('mode-report').className = 'mode-btn' + (isReport ? ' on' : '');
  document.getElementById('mode-assign').className = 'mode-btn' + (isReport ? '' : ' on');

  if (!isReport) renderAssign();
}

/* ── HELPERS ── */
function aVal(id) { var el = document.getElementById(id); return el ? el.value.trim() : ''; }

function getAssignDept() {
  var s = aVal('a-deptSel');
  return s === 'custom-a' ? aVal('a-deptCust') : s;
}

function formatAssignDate(dr) {
  if (!dr) return '';
  var d = new Date(dr + 'T00:00:00');
  return d.getDate() + '-' + String(d.getMonth()+1).padStart(2,'0') + '-' + d.getFullYear();
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
  var teacher   = aVal('a-teacher');
  var desig     = aVal('a-designation');
  var tDept     = aVal('a-teacherDept');
  var tUni      = aVal('a-teacherUni');
  var dateStr   = formatAssignDate(aVal('a-date'));

  // Custom dept toggle
  var dsel = document.getElementById('a-deptSel');
  var custWrap = document.getElementById('a-deptCustWrap');
  if (dsel && custWrap) custWrap.style.display = dsel.value === 'custom-a' ? 'block' : 'none';

  // University block
  document.getElementById('ap-uni').innerHTML =
    (uni  ? uni  + '<br/>' : '') +
    (city ? city          : '');

  // Assignment title
  document.getElementById('ap-title').textContent = title;

  // Info box
  var box = '';
  box += '<div class="ap-section">Submitted By</div>';
  if (name)  box += 'Name: ' + name + '<br/>';
  if (roll)  box += 'Roll: ' + roll + '<br/>';
  if (batch) box += 'Batch: ' + batch + '<br/>';
  if (level || sem) box += 'Level: ' + level + '&nbsp;&nbsp;&nbsp;Semester: ' + sem + '<br/>';
  if (dept)  box += 'Department: ' + dept + '<br/>';
  if (cCode) box += 'Course Code: ' + cCode + '<br/>';
  if (cTitle)box += 'Course Title: ' + cTitle + '<br/>';

  box += '<div class="ap-section">Submitted To:</div>';
  if (teacher) box += teacher + '<br/>';
  if (desig)   box += desig   + '<br/>';
  if (tDept)   box += tDept   + '<br/>';
  if (tUni)    box += tUni    + '<br/>';

  document.getElementById('ap-box').innerHTML = box;

  // Date
  document.getElementById('ap-date').textContent = dateStr ? 'Date of Submission: ' + dateStr : '';
}

/* ── PRINT ── */
function printAssign() {
  var paper = document.getElementById('assignPaper').cloneNode(true);
  var pf    = document.getElementById('printFrame');
  pf.innerHTML = '';

  var sty = document.createElement('style');
  sty.textContent = [
    '@page { size: A4; margin: 0; }',
    '* { box-sizing: border-box; margin: 0; padding: 0; }',
    'body { background: white; }',
    '#printFrame {',
    '  display: block !important; position: fixed; inset: 0; z-index: 9999;',
    '  background: white; width: 210mm; min-height: 297mm;',
    '  padding: 25mm 25mm 20mm;',
    '  font-family: "Times New Roman", Times, serif;',
    '  color: #000; display: flex; flex-direction: column;',
    '  align-items: center; text-align: center;',
    '}',
    '.cp-logo { width: 96px; height: 96px; object-fit: contain; margin-bottom: 10px; }',
    '.ap-uni { font-size: 14pt; font-weight: 700; text-transform: uppercase;',
    '  font-variant: small-caps; line-height: 1.5; margin-bottom: 20px; }',
    '.ap-title { font-size: 16pt; font-weight: 700; text-transform: uppercase;',
    '  font-variant: small-caps; margin-bottom: 32px; letter-spacing: .04em; }',
    '.ap-box { width: 80%; border: 1.5px solid #000; padding: 20px 28px;',
    '  margin-bottom: 28px; font-size: 11.5pt; line-height: 2; text-align: left; }',
    '.ap-box .ap-section { font-weight: 700; margin-top: 10px; margin-bottom: 4px; font-size: 12pt; }',
    '.ap-date { font-size: 12pt; font-weight: 700; text-transform: uppercase; font-variant: small-caps; }'
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
