/* ====================
   1. SHARED DATABASE 
   ==================== */
const DEFAULT_STUDENTS = [
  {
    id: 101,
    name: "Aisyah Humaira",
    class: "Sunshine",
    age: 4,
    parent: "Mohd Faizal",
    contact: "+60 12-345 6789",
    medical: "None",
    status: "Present",
    checkIn: "08:05 AM",
    guardian: "Mohd Faizal",
  },
  {
    id: 102,
    name: "Daniel Hakim",
    class: "Rainbow",
    age: 5,
    parent: "Nurul Huda",
    contact: "+60 13-456 7890",
    medical: "Mild Asthma",
    status: "Present",
    checkIn: "08:12 AM",
    guardian: "Nurul Huda",
  },
  {
    id: 103,
    name: "Hannah Sofia",
    class: "Starlight",
    age: 6,
    parent: "Azman bin Karim",
    contact: "+60 19-567 8901",
    medical: "None",
    status: "Late",
    checkIn: "08:40 AM",
    guardian: "Azman bin Karim",
  },
  {
    id: 104,
    name: "Anis Aisyah",
    class: "Rainbow",
    age: 5,
    parent: "Roslan",
    contact: "011873449574",
    medical: "None",
    status: "Late",
    checkIn: "08:40 AM",
    guardian: "Roslan",
  },
  {
    id: 105,
    name: "India Eisley",
    class: "Rainbow",
    age: 5,
    parent: "Ahmad",
    contact: "0186375433",
    medical: "None",
    status: "Present",
    checkIn: "08:02 AM",
    guardian: "Ahmad",
  },
  {
    id: 106,
    name: "Hayley William",
    class: "Rainbow",
    age: 5,
    parent: "Abu Bakar",
    contact: "010927655",
    medical: "None",
    status: "Late",
    checkIn: "08:50 AM",
    guardian: "Abu Bakar",
  }, 
  {
    id: 107,
    name: "Avril Lavigne",
    class: "Rainbow",
    age: 5,
    parent: "Ali",
    contact: "01237648568",
    medical: "None",
    status: "Absent",
    checkIn: "-",
    guardian: "Ali",
  },
  {
    id: 108,
    name: "Gumball",
    class: "Sunshine",
    age: 4,
    parent: "Alif",
    contact: "0100325433",
    medical: "None",
    status: "Present",
    checkIn: "08:09 AM",
    guardian: "Alif",
  }, 
  {
    id: 109,
    name: "Jesse Rutherford",
    class: "Starlight",
    age: 6,
    parent: "Yusof",
    contact: "0186375433",
    medical: "None",
    status: "Present",
    checkIn: "08:04 AM",
    guardian: "Yusof",
  },
  {
    id: 110,
    name: "Ariana Grande",
    class: "Starlight",
    age: 6,
    parent: "Awang",
    contact: "0197654873",
    medical: "None",
    status: "Absent",
    checkIn: "-",
    guardian: "Awang",
  }, 
  {
    id: 111,
    name: "Balqis",
    class: "Starlight",
    age: 6,
    parent: "Atan",
    contact: "0187654532",
    medical: "None",
    status: "Present",
    checkIn: "08:00 AM",
    guardian: "Atan",
  }, 
  {
    id: 112,
    name: "Brad Pitt",
    class: "Sunshine",
    age: 4,
    parent: "Haji",
    contact: "0186375433",
    medical: "None",
    status: "Absent",
    checkIn: "-",
    guardian: "Haji",
  }, 
  {
    id: 113,
    name: "Luqman",
    class: "Sunshine",
    age: 4,
    parent: "Abdul",
    contact: "0196775403",
    medical: "None",
    status: "Late",
    checkIn: "08:30 AM",
    guardian: "Abdul",
  }, 
  {
    id: 114,
    name: "Matty",
    class: "Starlight",
    age: 6,
    parent: "Hamzah",
    contact: "0109375433",
    medical: "None",
    status: "Present",
    checkIn: "08:00 AM",
    guardian: "Hamzah",
  }, 
  {
    id: 115,
    name: "Cady Heron",
    class: "Sunshine",
    age: 4,
    parent: "Daud",
    contact: "0186345433",
    medical: "None",
    status: "Present",
    checkIn: "08:05 AM",
    guardian: "Daud",
  } 
];

function loadInitialStudents() {
  try {
    const raw = localStorage.getItem('LittleStars_students');
    const parsed = raw ? JSON.parse(raw) : null;
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed;
    }
  } catch (err) {
    console.warn('Resetting corrupted LittleStars_students storage:', err);
  }
  const seeded = DEFAULT_STUDENTS.map(item => ({ ...item }));
  localStorage.setItem('LittleStars_students', JSON.stringify(seeded));
  return seeded;
}

let studentsData = loadInitialStudents();
let addStudentModalObj = null;
let chartInstances = {};

function saveDatabase() {
  localStorage.setItem('LittleStars_students', JSON.stringify(studentsData));
}

function getTodayDateString() {
  const d = new Date();
  const offset = d.getTimezoneOffset();
  const localDate = new Date(d.getTime() - (offset * 60 * 1000));
  return localDate.toISOString().split('T')[0];
}

/* ==========================================
   2. AUTHENTICATION & PAGE INITIALIZATION
   ========================================== */
function handleLoginRedirect(event) {
  event.preventDefault();
  const email = document.getElementById('loginEmail').value.trim();
  const passInput = document.getElementById('loginPassword') || document.getElementById('loginPass');
  const pass = passInput ? passInput.value.trim() : '';
  const alertBox = document.getElementById('loginAlert') || document.getElementById('authAlert');

  if (email.toLowerCase() === 'teacher@littlestars.edu.my' && pass === 'password123') {
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userEmail', email);
    window.location.href = 'dashboard.html';
  } else if (alertBox) {
    alertBox.innerText = 'Invalid email or password! Please check demo credentials.';
    alertBox.classList.remove('d-none');
  }
}

function handleLogout() {
  localStorage.removeItem('isLoggedIn');
  localStorage.removeItem('userEmail');
  window.location.href = 'index.html';
}

document.addEventListener("DOMContentLoaded", function () {
  const isLoggedIn = localStorage.getItem('isLoggedIn');
  const currentPage = window.location.pathname.split("/").pop();

  if (!isLoggedIn && currentPage !== 'index.html' && currentPage !== '') {
    window.location.href = 'index.html';
    return;
  }

  const dateEl = document.getElementById('currentDateStr');
  if (dateEl) {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    dateEl.innerText = new Date().toLocaleDateString('en-US', options);
  }

  const addModalEl = document.getElementById('addStudentModal');
  if (addModalEl) {
    addStudentModalObj = new bootstrap.Modal(addModalEl);
  }

  if (document.getElementById('kpiTotal') || document.getElementById('stat-enrolled') || document.getElementById('dashboardPieChart')) {
    updateSummaryCounters();
    initDashboardChart();
    renderClassWiseTable();
  }

  if (document.getElementById('attendanceTableBody')) {
    initAttendancePage();
  }

  if (document.getElementById('directoryGrid')) {
    renderDirectoryGrid(studentsData);
  }

  if (document.getElementById('historyLogBody')) {
    renderHistoryLog();
  }

  if (document.getElementById('todayDoughnutChart') || document.getElementById('weeklyBarChart')) {
    initAnalyticsCharts();
  }
});

/* ==========================================
   3. DASHBOARD SUMMARY & PIE CHART
   ========================================== */
function updateSummaryCounters() {
  const total = studentsData.length;
  const present = studentsData.filter(s => s.status === 'Present').length;
  const absent = studentsData.filter(s => s.status === 'Absent' || s.status === 'Sick').length;
  const late = studentsData.filter(s => s.status === 'Late').length;

  const map = {
    'kpiTotal': total, 'stat-enrolled': total,
    'kpiPresent': present, 'stat-present': present,
    'kpiLate': late, 'stat-late': late,
    'kpiAbsent': absent, 'stat-absent': absent
  };

  Object.keys(map).forEach(id => {
    const el = document.getElementById(id);
    if (el) el.innerText = map[id];
  });
}

function initDashboardChart() {
  const ctx = document.getElementById('dashboardPieChart');
  if (!ctx) return;

  const present = studentsData.filter(s => s.status === 'Present').length;
  const late = studentsData.filter(s => s.status === 'Late').length;
  const absent = studentsData.filter(s => s.status === 'Absent' || s.status === 'Sick').length;

  new Chart(ctx.getContext('2d'), {
    type: 'doughnut',
    data: {
      labels: ['Present', 'Late', 'Absent / Sick'],
      datasets: [{
        data: [present, late, absent],
        backgroundColor: ['#1cc88a', '#f6c23e', '#e74a3b']
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { position: 'bottom' } }
    }
  });
}

/* ==========================================
   4. ATTENDANCE REGISTER & DATE HISTORY
   ========================================== */
function initAttendancePage() {
  const datePicker = document.getElementById('attendanceDatePicker');
  let targetDate = getTodayDateString();

  if (datePicker) {
    const jumpDate = localStorage.getItem('LittleStars_jump_date');
    if (jumpDate) {
      datePicker.value = jumpDate;
      localStorage.removeItem('LittleStars_jump_date');
    } else if (!datePicker.value) {
      datePicker.value = targetDate;
    }
    targetDate = datePicker.value;
  }
  loadAttendanceForDate(targetDate);
}

function loadAttendanceForDate(dateStr) {
  const validDate = dateStr || getTodayDateString();
  let allHistory = JSON.parse(localStorage.getItem('LittleStars_attendance_history')) || {};

  if (!allHistory[validDate] || allHistory[validDate].length === 0) {
    allHistory[validDate] = studentsData.map(student => ({
      id: student.id,
      name: student.name,
      class: student.class,
      age: student.age || 5,
      parent: student.parent,
      status: student.status || "Present",
      checkIn: student.checkIn || "08:00 AM",
      guardian: student.guardian || student.parent
    }));
  } else if (validDate === getTodayDateString()) {
    const currentIds = new Set(studentsData.map(s => s.id));
    allHistory[validDate] = allHistory[validDate].filter(r => currentIds.has(r.id));
    const existingIds = new Set(allHistory[validDate].map(r => r.id));

    studentsData.forEach(student => {
      if (!existingIds.has(student.id)) {
        allHistory[validDate].unshift({
          id: student.id,
          name: student.name,
          class: student.class,
          age: student.age || 5,
          parent: student.parent,
          status: student.status || "Present",
          checkIn: student.checkIn || "08:00 AM",
          guardian: student.guardian || student.parent
        });
      }
    });
  }

  localStorage.setItem('LittleStars_attendance_history', JSON.stringify(allHistory));
  renderAttendanceTable(allHistory[validDate]);
}

function changeAttendanceDate() {
  const datePicker = document.getElementById('attendanceDatePicker');
  if (datePicker && datePicker.value) {
    loadAttendanceForDate(datePicker.value);
  } else {
    loadAttendanceForDate(getTodayDateString());
  }
}

function renderAttendanceTable(data) {
  const tbody = document.getElementById('attendanceTableBody');
  if (!tbody) return;
  tbody.innerHTML = '';

  if (!data || data.length === 0) {
    tbody.innerHTML = `<tr><td colspan="7" class="text-center text-muted py-3">No matching student records found.</td></tr>`;
    return;
  }

  data.forEach((student, index) => {
    let badgeClass = "bg-secondary";
    if (student.status === 'Present') badgeClass = "bg-success";
    if (student.status === 'Late') badgeClass = "bg-warning text-dark";
    if (student.status === 'Sick') badgeClass = "bg-info text-dark";
    if (student.status === 'Absent') badgeClass = "bg-danger";

    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td class="fw-bold text-muted">${index + 1}</td>
      <td>
        <div class="fw-bold text-dark">${student.name}</div>
        <span class="small text-muted">Age ${student.age || 5}</span>
      </td>
      <td><span class="badge bg-light text-dark border">${student.class}</span></td>
      <td><span class="badge ${badgeClass} fs-6 px-2 py-1">${student.status}</span></td>
      <td>${student.checkIn || '-'}</td>
      <td>${student.guardian || '-'}</td>
      <td>
        <div class="btn-group btn-group-sm">
          <button class="btn btn-outline-success" onclick="updateStudentStatus(${student.id}, 'Present')">Present</button>
          <button class="btn btn-outline-warning" onclick="updateStudentStatus(${student.id}, 'Late')">Late</button>
          <button class="btn btn-outline-info" onclick="updateStudentStatus(${student.id}, 'Sick')">Sick</button>
          <button class="btn btn-outline-danger" onclick="updateStudentStatus(${student.id}, 'Absent')">Absent</button>
        </div>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

function updateStudentStatus(id, newStatus) {
  const datePicker = document.getElementById('attendanceDatePicker');
  const currentDate = (datePicker && datePicker.value) ? datePicker.value : getTodayDateString();
  let allHistory = JSON.parse(localStorage.getItem('LittleStars_attendance_history')) || {};
  let dailyRecords = allHistory[currentDate] || studentsData;

  const studentRecord = dailyRecords.find(s => s.id === id);
  if (studentRecord) {
    studentRecord.status = newStatus;
    if (newStatus === 'Present' || newStatus === 'Late') {
      studentRecord.checkIn = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      studentRecord.guardian = studentRecord.parent || "Parent";
    } else {
      studentRecord.checkIn = "-";
      studentRecord.guardian = "-";
    }

    allHistory[currentDate] = dailyRecords;
    localStorage.setItem('LittleStars_attendance_history', JSON.stringify(allHistory));

    if (currentDate === getTodayDateString()) {
      const mainStudent = studentsData.find(s => s.id === id);
      if (mainStudent) {
        mainStudent.status = newStatus;
        mainStudent.checkIn = studentRecord.checkIn;
        mainStudent.guardian = studentRecord.guardian;
        saveDatabase();
      }
    }
  }
  filterAttendanceTable();
}

function filterAttendanceTable() {
  const classEl = document.getElementById('classFilter');
  const statusEl = document.getElementById('statusFilter');
  const searchEl = document.getElementById('attendanceSearch');

  const classVal = classEl ? classEl.value : 'ALL';
  const statusVal = statusEl ? statusEl.value : 'ALL';
  const searchVal = searchEl ? searchEl.value.toLowerCase() : '';

  const datePicker = document.getElementById('attendanceDatePicker');
  const currentDate = (datePicker && datePicker.value) ? datePicker.value : getTodayDateString();
  let allHistory = JSON.parse(localStorage.getItem('LittleStars_attendance_history')) || {};
  let dailyRecords = (allHistory[currentDate] && allHistory[currentDate].length > 0) ? allHistory[currentDate] : studentsData;

  const filtered = dailyRecords.filter(item => {
    const matchesClass = (classVal === 'ALL' || classVal === 'All') || (item.class === classVal);
    const matchesStatus = (statusVal === 'ALL' || statusVal === 'All') || (item.status === statusVal);
    const matchesSearch = item.name.toLowerCase().includes(searchVal);
    return matchesClass && matchesStatus && matchesSearch;
  });

  renderAttendanceTable(filtered);
}

function saveAttendanceForSelectedDate() {
  const datePicker = document.getElementById('attendanceDatePicker');
  const currentDate = (datePicker && datePicker.value) ? datePicker.value : getTodayDateString();
  alert(`Attendance records for ${currentDate} saved successfully!`);
}

/* ==========================================
   5. HISTORY LOGS & CSV EXPORT
   ========================================== */
function renderHistoryLog() {
  const logBody = document.getElementById('historyLogBody');
  if (!logBody) return;

  const allHistory = JSON.parse(localStorage.getItem('LittleStars_attendance_history')) || {};
  const dates = Object.keys(allHistory).sort().reverse();
  logBody.innerHTML = '';

  if (dates.length === 0) {
    logBody.innerHTML = `<tr><td colspan="7" class="text-center text-muted py-3">No saved attendance records yet.</td></tr>`;
    return;
  }

  dates.forEach(dateStr => {
    const records = allHistory[dateStr];
    const total = records.length;
    const present = records.filter(r => r.status === 'Present').length;
    const late = records.filter(r => r.status === 'Late').length;
    const sick = records.filter(r => r.status === 'Sick').length;
    const absent = records.filter(r => r.status === 'Absent').length;

    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td class="fw-bold text-dark"><i class="bi bi-calendar-event me-2 text-primary"></i>${dateStr}</td>
      <td>${total}</td>
      <td><span class="badge bg-success">${present}</span></td>
      <td><span class="badge bg-warning text-dark">${late}</span></td>
      <td><span class="badge bg-info text-dark">${sick}</span></td>
      <td><span class="badge bg-danger">${absent}</span></td>
      <td class="text-end">
        <button class="btn btn-sm btn-outline-primary" onclick="jumpToHistoryDate('${dateStr}')">
          <i class="bi bi-eye me-1"></i> View / Edit
        </button>
      </td>
    `;
    logBody.appendChild(tr);
  });
}

function jumpToHistoryDate(dateStr) {
  localStorage.setItem('LittleStars_jump_date', dateStr);
  window.location.href = 'attendance.html';
}

function exportAttendanceCSV() {
  const allHistory = JSON.parse(localStorage.getItem('LittleStars_attendance_history')) || {};
  const dates = Object.keys(allHistory).sort();

  if (dates.length === 0) {
    alert("No attendance records available to export.");
    return;
  }

  let csvContent = "Date,Student Name,Class,Status,Check-In Time,Guardian\n";
  dates.forEach(dateStr => {
    allHistory[dateStr].forEach(r => {
      csvContent += `"${dateStr}","${r.name}","${r.class}","${r.status}","${r.checkIn || '-'}","${r.guardian || '-'}"\n`;
    });
  });

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = `LittleStars_Attendance_Records_${getTodayDateString()}.csv`;
  link.click();
}

/* ==========================================
   6. STUDENT DIRECTORY & DELETE / ENROLL
   ========================================== */
function renderDirectoryGrid(data) {
  const grid = document.getElementById('directoryGrid');
  if (!grid) return;
  grid.innerHTML = '';

  if (!data || data.length === 0) {
    grid.innerHTML = `<div class="col-12 text-center text-muted py-4">No student records found.</div>`;
    return;
  }

  data.forEach(student => {
    const initials = student.name.split(' ').map(n => n[0]).join('');
    const card = document.createElement('div');
    card.className = 'col-md-6 col-lg-4';
    card.innerHTML = `
      <div class="card student-card p-3 h-100 shadow-sm border-0 position-relative">
        <div class="d-flex align-items-center gap-3 mb-3">
          <div class="avatar-circle bg-primary text-white rounded-circle d-flex align-items-center justify-content-center fw-bold" style="width: 45px; height: 45px;">
            ${initials}
          </div>
          <div>
            <h6 class="fw-bold mb-0 text-dark">${student.name}</h6>
            <span class="badge bg-light text-dark border">${student.class} Class</span>
          </div>
          <button class="btn btn-sm btn-outline-danger ms-auto" onclick="deleteStudent(${student.id})" title="Delete Student">
            <i class="bi bi-trash"></i>
          </button>
        </div>
        <div class="small border-top pt-2">
          <div class="mb-1"><strong>Guardian:</strong> ${student.parent}</div>
          <div class="mb-1"><strong>Contact:</strong> ${student.contact}</div>
          <div class="text-danger"><strong>Medical/Notes:</strong> ${student.medical}</div>
        </div>
      </div>
    `;
    grid.appendChild(card);
  });
}

function deleteStudent(id) {
  if (confirm("Are you sure you want to remove this student from the directory?")) {
    studentsData = studentsData.filter(s => s.id !== id);
    saveDatabase();

    const today = getTodayDateString();
    let allHistory = JSON.parse(localStorage.getItem('LittleStars_attendance_history')) || {};
    if (allHistory[today]) {
      allHistory[today] = allHistory[today].filter(s => s.id !== id);
      localStorage.setItem('LittleStars_attendance_history', JSON.stringify(allHistory));
    }
  }
  renderDirectoryGrid(studentsData);
  updateSummaryCounters();
}

function filterDirectory() {
  const query = document.getElementById('directorySearch').value.toLowerCase();
  const filtered = studentsData.filter(s =>
    s.name.toLowerCase().includes(query) || s.parent.toLowerCase().includes(query)
  );
  renderDirectoryGrid(filtered);
}

function openAddStudentModal() {
  if (addStudentModalObj) addStudentModalObj.show();
}

function addNewStudent(e) {
  e.preventDefault();
  const name = document.getElementById('newStudentName').value;
  const className = document.getElementById('newStudentClass').value;
  const age = document.getElementById('newStudentAge') ? document.getElementById('newStudentAge').value : 5;
  const parent = document.getElementById('newParentName').value;
  const contact = document.getElementById('newContact') ? document.getElementById('newContact').value : (document.getElementById('newParentContact')?.value || "-");
  const medical = document.getElementById('newMedical') ? document.getElementById('newMedical').value : (document.getElementById('newAllergies')?.value || "None");

  const newObj = {
    id: Date.now(),
    name: name,
    class: className,
    age: parseInt(age),
    parent: parent,
    contact: contact,
    medical: medical || "None",
    status: "Present",
    checkIn: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    guardian: parent,
    attendanceRate: "100%"
  };

  studentsData.unshift(newObj);
  saveDatabase();

  const today = getTodayDateString();
  let allHistory = JSON.parse(localStorage.getItem('LittleStars_attendance_history')) || {};
  if (!allHistory[today]) allHistory[today] = [];
  allHistory[today].unshift({
    id: newObj.id,
    name: newObj.name,
    class: newObj.class,
    age: newObj.age,
    parent: newObj.parent,
    status: newObj.status,
    checkIn: newObj.checkIn,
    guardian: newObj.guardian
  });
  localStorage.setItem('LittleStars_attendance_history', JSON.stringify(allHistory));

  renderDirectoryGrid(studentsData);
  updateSummaryCounters();

  if (addStudentModalObj) addStudentModalObj.hide();
  document.getElementById('addStudentForm').reset();
}

/* ==========================================
   7. ANALYTICS PAGE CHARTS & CLASS TABLES
   ========================================== */
function initAnalyticsCharts() {
  const present = studentsData.filter(s => s.status === 'Present').length;
  const late = studentsData.filter(s => s.status === 'Late').length;
  const sick = studentsData.filter(s => s.status === 'Sick').length;
  const absent = studentsData.filter(s => s.status === 'Absent').length;

  const ctx1 = document.getElementById('todayDoughnutChart');
  if (ctx1) {
    chartInstances.doughnut = new Chart(ctx1.getContext('2d'), {
      type: 'doughnut',
      data: {
        labels: ['Present', 'Late', 'Sick Leave', 'Absent'],
        datasets: [{
          data: [present, late, sick, absent],
          backgroundColor: ['#198754', '#ffc107', '#0dcaf0', '#dc3545']
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { position: 'bottom' } }
      }
    });
  }

  const ctx2 = document.getElementById('weeklyBarChart');
  if (ctx2) {
    chartInstances.bar = new Chart(ctx2.getContext('2d'), {
      type: 'bar',
      data: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
        datasets: [{
          label: 'Present Students',
          data: [13, 12, 14, 11, present],
          backgroundColor: '#4ecdc4',
          borderRadius: 6
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: { y: { beginAtZero: true, ticks: { stepSize: 1 } } }
      }
    });
  }
}

// Listen for changes from other pages in real time
window.addEventListener('storage', function(e) {
  if (e.key === 'LittleStars_students' || e.key === 'LittleStars_attendance_history') {
    studentsData = JSON.parse(localStorage.getItem('LittleStars_students')) || studentsData;
    if (document.getElementById('kpiTotal') || document.getElementById('dashboardPieChart')) {
      updateSummaryCounters();
      if (chartInstances.dashboard) {
        const present = studentsData.filter(s => s.status === 'Present').length;
        const late = studentsData.filter(s => s.status === 'Late').length;
        const absent = studentsData.filter(s => s.status === 'Absent' || s.status === 'Sick').length;
        chartInstances.dashboard.data.datasets[0].data = [present, late, absent];
        chartInstances.dashboard.update();
      }
    }
  }
});

function renderClassWiseTable() {
  const tbody = document.getElementById('classTableBody');
  if (!tbody) return;

  const classes = [
    { name: "Class Sunshine", className: "Sunshine", age: "4 Years Old" },
    { name: "Class Rainbow", className: "Rainbow", age: "5 Years Old" },
    { name: "Class Starlight", className: "Starlight", age: "6 Years Old" }
  ];

  tbody.innerHTML = '';
  classes.forEach(cls => {
    const classStudents = studentsData.filter(s => s.class === cls.className);
    const totalEnrolled = classStudents.length;
    const presentCount = classStudents.filter(s => s.status === 'Present').length;
    const percentage = totalEnrolled > 0 ? Math.round((presentCount / totalEnrolled) * 100) : 0;

    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><strong>${cls.name}</strong></td>
      <td>${cls.age}</td>
      <td>${totalEnrolled}</td>
      <td><span class="badge bg-success">${presentCount} Present</span></td>
      <td>
        <div class="progress" style="height: 10px;">
          <div class="progress-bar bg-success" style="width: ${percentage}%;">${percentage}%</div>
        </div>
      </td>
    `;
    tbody.appendChild(tr);
  });
}