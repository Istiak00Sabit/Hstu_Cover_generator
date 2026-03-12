/* members.js */
var members = [
  { name: 'Khandakar Istiak Muntasir', id: '2102010', session: '2021' }
];

function renderMemberFields() {
  var list = document.getElementById('membersList');
  list.innerHTML = '';
  members.forEach(function(m, i) {
    var card = document.createElement('div');
    card.className = 'member-card';
    card.innerHTML =
      '<div class="member-head"><span class="member-num">Member '+(i+1)+'</span>'
      +(members.length>1?'<button class="btn-rm" onclick="removeMember('+i+')">&#x2715;</button>':'<span></span>')
      +'</div>'
      +'<div class="member-fields">'
      +'<input class="span2" type="text" placeholder="Full Name" value="'+escHtml(m.name)+'" oninput="members['+i+'].name=this.value;render()"/>'
      +'<input type="text" placeholder="Student ID" value="'+escHtml(m.id)+'" oninput="members['+i+'].id=this.value;render()"/>'
      +'<input type="text" placeholder="Session e.g. 2021" value="'+escHtml(m.session)+'" oninput="members['+i+'].session=this.value;render()"/>'
      +'</div>';
    list.appendChild(card);
  });
  var btn = document.getElementById('addMemberBtn');
  if (btn) btn.style.display = members.length >= 3 ? 'none' : 'flex';
}

function addMember() {
  if (members.length >= 3) return;
  members.push({ name: '', id: '', session: '' });
  renderMemberFields();
  render();
}

function removeMember(i) {
  if (members.length === 1) { showToast('!', 'At least one member required'); return; }
  members.splice(i, 1);
  renderMemberFields();
  render();
}

function renderMembersPreview() {
  var tbody = document.getElementById('cp-mtbody');
  tbody.innerHTML = '';
  var active = members.filter(function(m) { return m.name || m.id; });
  if (!active.length) return;

  var rowName = document.createElement('tr'); rowName.className = 'row-name';
  var rowId   = document.createElement('tr'); rowId.className   = 'row-id';
  var rowSess = document.createElement('tr'); rowSess.className = 'row-sess';

  active.forEach(function(m) {
    var td1 = document.createElement('td'); td1.textContent = m.name || '';                             rowName.appendChild(td1);
    var td2 = document.createElement('td'); td2.textContent = m.id      ? 'Student ID: '+m.id      : ''; rowId.appendChild(td2);
    var td3 = document.createElement('td'); td3.textContent = m.session ? 'Session: '+m.session    : ''; rowSess.appendChild(td3);
  });

  tbody.appendChild(rowName);
  tbody.appendChild(rowId);
  tbody.appendChild(rowSess);

  // Auto-fit: shrink font until table fits within cover paper
  setTimeout(fitMemberFontSize, 0);
}

/**
 * Shrink font size until table fits within the cover paper width.
 * Starts at 12pt, steps down 0.5pt at a time, minimum 7pt.
 */
function fitMemberFontSize() {
  var table  = document.querySelector('.cp-members-table');
  var paper  = document.getElementById('coverPaper');
  if (!table || !paper) return;

  var allCells = table.querySelectorAll('td');
  if (!allCells.length) return;

  var MAX = 12, MIN = 7, step = 0.5;
  var size = MAX;

  // Reset to max first
  allCells.forEach(function(td) { td.style.fontSize = size + 'pt'; });

  // Keep shrinking while table is wider than paper content area
  while (size > MIN) {
    // paper width minus left+right padding (60px each = 120px)
    var maxW = paper.clientWidth - 120;
    if (table.scrollWidth <= maxW) break;
    size = Math.round((size - step) * 10) / 10;
    allCells.forEach(function(td) { td.style.fontSize = size + 'pt'; });
  }
}
