/* ============================================================
   members.js
   Handles group member add / remove / render
   ============================================================ */

// Shared state — accessed by other modules
var members = [
  { name: 'Md Shohag Showdagor',        id: '2102041', session: '2021' },
  { name: 'Khandakar Istiak Muntasir',   id: '2102010', session: '2021' },
  { name: 'G.M. Nazmul Hassan',          id: '2102055', session: '2021' }
];

/**
 * Re-renders the member card list in the form panel
 */
function renderMemberFields() {
  var list = document.getElementById('membersList');
  list.innerHTML = '';

  members.forEach(function(m, i) {
    var card = document.createElement('div');
    card.className = 'member-card';

    card.innerHTML =
      '<div class="member-head">' +
        '<span class="member-num">Member ' + (i + 1) + '</span>' +
        '<button class="btn-rm" onclick="removeMember(' + i + ')">&#x2715;</button>' +
      '</div>' +
      '<div class="member-fields">' +
        '<input class="span2" type="text" placeholder="Full Name" ' +
          'value="' + escHtml(m.name) + '" ' +
          'oninput="members[' + i + '].name = this.value; render()"/>' +
        '<input type="text" placeholder="Student ID  e.g. 2102041" ' +
          'value="' + escHtml(m.id) + '" ' +
          'oninput="members[' + i + '].id = this.value; render()"/>' +
        '<input type="text" placeholder="Session  e.g. 2021" ' +
          'value="' + escHtml(m.session) + '" ' +
          'oninput="members[' + i + '].session = this.value; render()"/>' +
      '</div>';

    list.appendChild(card);
  });
}

/**
 * Add a blank member row
 */
function addMember() {
  members.push({ name: '', id: '', session: '' });
  renderMemberFields();
  render();
}

/**
 * Remove member at index i
 */
function removeMember(i) {
  members.splice(i, 1);
  renderMemberFields();
  render();
}

/**
 * Render members into the cover preview table
 */
function renderMembersPreview() {
  var tbody  = document.getElementById('cp-mtbody');
  tbody.innerHTML = '';

  var active = members.filter(function(m) { return m.name || m.id; });
  if (!active.length) return;

  var rowName = document.createElement('tr'); rowName.className = 'row-name';
  var rowId   = document.createElement('tr'); rowId.className   = 'row-id';
  var rowSess = document.createElement('tr'); rowSess.className = 'row-sess';

  active.forEach(function(m) {
    var td1 = document.createElement('td'); td1.textContent = m.name; rowName.appendChild(td1);
    var td2 = document.createElement('td'); td2.textContent = m.id      ? 'Student ID: ' + m.id      : ''; rowId.appendChild(td2);
    var td3 = document.createElement('td'); td3.textContent = m.session ? 'Session: '    + m.session  : ''; rowSess.appendChild(td3);
  });

  tbody.appendChild(rowName);
  tbody.appendChild(rowId);
  tbody.appendChild(rowSess);
}
