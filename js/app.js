/* app.js */
var DEFAULT_LOGO = 'assets/hstu_logo.png';
var logoSrc = DEFAULT_LOGO;
var MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];

window.addEventListener('DOMContentLoaded', function() {
  document.getElementById('subDate').value = new Date().toISOString().split('T')[0];
  renderMemberFields();
  render();
});

function getVal(id) { var el = document.getElementById(id); return el ? el.value.trim() : ''; }
function escHtml(s) { return (s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }
function showToast(icon, msg) {
  document.getElementById('toast-icon').textContent = icon;
  document.getElementById('toast-msg').textContent = msg;
  var t = document.getElementById('toast');
  t.className = 'toast show';
  setTimeout(function(){ t.className = 'toast'; }, 3200);
}

function setLogo(src, name) {
  logoSrc = src;
  document.getElementById('logoThumb').src = src;
  document.getElementById('logoName').textContent = name;
  document.getElementById('cp-logo').src = src;
}
function handleLogo(e) {
  var file = e.target.files[0]; if (!file) return;
  var r = new FileReader();
  r.onload = function(ev) { setLogo(ev.target.result, file.name); render(); };
  r.readAsDataURL(file);
}
function resetLogo() { document.getElementById('logoFileInput').value=''; setLogo(DEFAULT_LOGO,'HSTU Official Logo'); render(); }

function getDept() { var s = getVal('deptSel'); return s==='custom' ? getVal('deptCust') : 'Department of '+s; }
function getFac()  { var s = getVal('facSel');  return s==='custom' ? getVal('facCust')  : 'Faculty of '+s; }

function onDeptChange() { document.getElementById('deptCustWrap').style.display = getVal('deptSel')==='custom'?'block':'none'; render(); }
function onFacChange()  { document.getElementById('facCustWrap').style.display  = getVal('facSel')==='custom'?'block':'none';  render(); }

function switchTab(t) {
  document.getElementById('tab-prev').className  = 'ptab'+(t==='prev'?' on':'');
  document.getElementById('tab-latex').className = 'ptab'+(t==='latex'?' on':'');
  document.getElementById('pane-prev').style.display = t==='prev'?'flex':'none';
  var lp = document.getElementById('pane-latex');
  if (t==='latex') { lp.style.display='flex'; lp.className='latex-pane show'; updateLatexPane(); }
  else             { lp.style.display='none'; lp.className='latex-pane'; }
}

function render() {
  var title = getVal('repTitle');
  document.getElementById('cp-title').textContent    = title ? title.toUpperCase() : 'REPORT TITLE WILL APPEAR HERE';
  document.getElementById('cp-desc').textContent     = getVal('degDesc');
  var cc = getVal('courseCode'), ct = getVal('courseTitle');
  document.getElementById('cp-code').textContent    = cc ? 'Course Code: '+cc   : '';
  document.getElementById('cp-ctitle').textContent  = ct ? 'Course Title: '+ct  : '';
  renderMembersPreview();
  document.getElementById('cp-logo').src = logoSrc;
  document.getElementById('cp-dept').innerHTML = [getDept(),getFac(),getVal('uniName'),getVal('uniCity')].filter(Boolean).join('<br/>');
  var dr = getVal('subDate');
  if (dr) { var d=new Date(dr+'T00:00:00'); document.getElementById('cp-date').textContent=d.getDate()+' '+MONTHS[d.getMonth()]+', '+d.getFullYear(); }
  updateLatexPane();
}
