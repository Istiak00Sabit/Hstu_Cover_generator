/* ============================================================
   app.js
   Main application — init, render loop, helpers, state
   ============================================================ */

// ── LOGO STATE ──────────────────────────────────────────────
var DEFAULT_LOGO = 'assets/hstu_logo.png';
var logoSrc      = DEFAULT_LOGO;

// ── INIT ────────────────────────────────────────────────────
window.addEventListener('DOMContentLoaded', function() {
  // Auto-fill today's date
  document.getElementById('subDate').value = new Date().toISOString().split('T')[0];

  // Render initial member fields
  renderMemberFields();

  // First render of the cover preview
  render();
});

// ── LOGO HANDLERS ────────────────────────────────────────────
function setLogo(src, name) {
  logoSrc = src;
  document.getElementById('logoThumb').src       = src;
  document.getElementById('logoName').textContent = name;
  document.getElementById('cp-logo').src          = src;
}

function handleLogo(e) {
  var file = e.target.files[0];
  if (!file) return;
  var reader = new FileReader();
  reader.onload = function(ev) {
    setLogo(ev.target.result, file.name);
    render();
  };
  reader.readAsDataURL(file);
}

function resetLogo() {
  document.getElementById('logoFileInput').value = '';
  setLogo(DEFAULT_LOGO, 'HSTU Official Logo');
  render();
}

// ── DEPARTMENT / FACULTY ─────────────────────────────────────
function onDeptChange() {
  var isCustom = document.getElementById('deptSel').value === 'custom';
  document.getElementById('deptCustWrap').style.display = isCustom ? 'block' : 'none';
  render();
}

function onFacChange() {
  var isCustom = document.getElementById('facSel').value === 'custom';
  document.getElementById('facCustWrap').style.display = isCustom ? 'block' : 'none';
  render();
}

function getDept() {
  var s = document.getElementById('deptSel').value;
  return s === 'custom' ? getVal('deptCust') : 'Department of ' + s;
}

function getFac() {
  var s = document.getElementById('facSel').value;
  return s === 'custom' ? getVal('facCust') : 'Faculty of ' + s;
}

// ── TAB SWITCHING ────────────────────────────────────────────
function switchTab(t) {
  document.getElementById('tab-prev').className  = 'ptab' + (t === 'prev'  ? ' on' : '');
  document.getElementById('tab-latex').className = 'ptab' + (t === 'latex' ? ' on' : '');

  document.getElementById('pane-prev').style.display = t === 'prev' ? 'flex' : 'none';

  var lp = document.getElementById('pane-latex');
  if (t === 'latex') {
    lp.style.display = 'flex';
    lp.className     = 'latex-pane show';
    updateLatexPane();
  } else {
    lp.style.display = 'none';
    lp.className     = 'latex-pane';
  }
}

// ── MAIN RENDER ──────────────────────────────────────────────
/**
 * Read all form values and update the live cover preview
 */
function render() {
  var title   = getVal('repTitle');
  var desc    = getVal('degDesc');
  var cCode   = getVal('courseCode');
  var cTitle  = getVal('courseTitle');
  var dept    = getDept();
  var fac     = getFac();
  var uni     = getVal('uniName');
  var city    = getVal('uniCity');
  var dateRaw = getVal('subDate');

  // Title — uppercase
  document.getElementById('cp-title').textContent =
    title ? title.toUpperCase() : 'REPORT TITLE WILL APPEAR HERE';

  // Degree description
  document.getElementById('cp-desc').textContent = desc;

  // Course
  document.getElementById('cp-code').textContent   = cCode  ? 'Course Code: '  + cCode  : '';
  document.getElementById('cp-ctitle').textContent  = cTitle ? 'Course Title: ' + cTitle : '';

  // Members table
  renderMembersPreview();

  // Logo
  document.getElementById('cp-logo').src = logoSrc;

  // Dept / Faculty / Uni block
  document.getElementById('cp-dept').innerHTML =
    [dept, fac, uni, city].filter(Boolean).join('<br/>');

  // Date
  if (dateRaw) {
    var d = new Date(dateRaw + 'T00:00:00');
    document.getElementById('cp-date').textContent =
      d.getDate() + ' ' + MONTHS[d.getMonth()] + ', ' + d.getFullYear();
  }

  // Keep LaTeX pane in sync if it's open
  updateLatexPane();
}

// ── HELPERS ──────────────────────────────────────────────────

/**
 * Get trimmed value from a form element by id
 */
function getVal(id) {
  var el = document.getElementById(id);
  return el ? el.value.trim() : '';
}

/**
 * Escape HTML special characters (for injecting into innerHTML)
 */
function escHtml(s) {
  return (s || '')
    .replace(/&/g,  '&amp;')
    .replace(/</g,  '&lt;')
    .replace(/>/g,  '&gt;')
    .replace(/"/g,  '&quot;');
}

/**
 * Show a toast notification
 */
function showToast(icon, msg) {
  document.getElementById('toast-icon').textContent = icon;
  document.getElementById('toast-msg').textContent  = msg;
  var t = document.getElementById('toast');
  t.className = 'toast show';
  setTimeout(function() { t.className = 'toast'; }, 3200);
}
