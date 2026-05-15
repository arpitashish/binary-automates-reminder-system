function isOverdue(dueDate, status) {
  if (status === 'paid') return false;
  const today = new Date();
  const due = new Date(dueDate);
  today.setHours(0,0,0,0);
  due.setHours(0,0,0,0);
  return due < today;
}

function nowIso() {
  return new Date().toISOString();
}

function dateOnly(value) {
  return new Date(value).toISOString().slice(0, 10);
}

module.exports = { isOverdue, nowIso, dateOnly };
