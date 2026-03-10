const API_URL = 'https://fedskillstest.coalitiontechnologies.workers.dev';
const API_USERNAME = 'coalition';
const API_PASSWORD = 'skills-test';

let patientsData = [];
let selectedPatient = null;
let bloodPressureChart = null;

document.addEventListener('DOMContentLoaded', async () => {
  await fetchPatients();
  renderPatientsList();
  
  const jessica = patientsData.find(p => p.name === 'Jessica Taylor');
  if (jessica) {
    loadPatientData(jessica);
  }
});

async function fetchPatients() {
  try {
    const credentials = btoa(`${API_USERNAME}:${API_PASSWORD}`);
    const response = await fetch(API_URL, {
      method: 'GET',
      headers: {
        'Authorization': `Basic ${credentials}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    patientsData = await response.json();
  } catch (error) {
    console.error('Error fetching patients:', error);
    alert('Failed to load patient data. Please check your internet connection and try again.');
  }
}

function renderPatientsList() {
  const patientsList = document.getElementById('patientsList');
  
  if (!patientsData || patientsData.length === 0) {
    patientsList.innerHTML = '<div style="padding: 20px; text-align: center; color: #707070;">No patients found</div>';
    return;
  }

  patientsList.innerHTML = patientsData.map(patient => `
    <div class="patient-item ${patient.name === 'Jessica Taylor' ? 'active' : ''}" 
         onclick="selectPatient('${patient.name.replace(/'/g, "\\'")}')">
      <img src="${patient.profile_picture}" 
           alt="${patient.name}" 
           class="patient-avatar" 
           onerror="this.src='data:image/svg+xml,%3Csvg width=\'48\' height=\'48\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Ccircle cx=\'24\' cy=\'24\' r=\'24\' fill=\'%23D9D9D9\'/%3E%3C/svg%3E'">
      <div class="patient-info">
        <div class="patient-name">${patient.name}</div>
        <div class="patient-meta">${patient.gender}, ${patient.age}</div>
      </div>
      <div class="patient-more">
        <svg width="18" height="4" viewBox="0 0 18 4" fill="none">
          <circle cx="2" cy="2" r="2" fill="#072635"/>
          <circle cx="9" cy="2" r="2" fill="#072635"/>
          <circle cx="16" cy="2" r="2" fill="#072635"/>
        </svg>
      </div>
    </div>
  `).join('');
}

function selectPatient(patientName) {
  const patient = patientsData.find(p => p.name === patientName);
  if (patient) {
    document.querySelectorAll('.patient-item').forEach(item => {
      item.classList.remove('active');
    });
    event.currentTarget.classList.add('active');
    
    loadPatientData(patient);
  }
}

function loadPatientData(patient) {
  selectedPatient = patient;
  
  updateProfile(patient);
  updateBloodPressureChart(patient);
  updateVitalStats(patient);
  updateDiagnosticHistory(patient);
  updateLabResults(patient);
}

function updateProfile(patient) {
  const profileImage = document.getElementById('profileImage');
  if (profileImage && patient.profile_picture) {
    profileImage.src = patient.profile_picture;
    profileImage.onerror = function() {
      this.src = 'data:image/svg+xml,%3Csvg width=\'200\' height=\'200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Ccircle cx=\'100\' cy=\'100\' r=\'100\' fill=\'%23D9D9D9\'/%3E%3C/svg%3E';
    };
  }
  
  const setValue = (id, value) => {
    const element = document.getElementById(id);
    if (element) element.textContent = value || 'N/A';
  };
  
  setValue('profileName', patient.name);
  setValue('dateOfBirth', patient.date_of_birth);
  setValue('gender', patient.gender);
  setValue('contactInfo', patient.phone_number);
  setValue('emergencyContact', patient.emergency_contact);
  setValue('insuranceProvider', patient.insurance_type);
}

function updateBloodPressureChart(patient) {
  const canvas = document.getElementById('bloodPressureChart');
  
  if (!canvas) {
    return;
  }
  
  if (!patient.diagnosis_history || patient.diagnosis_history.length === 0) {
    return;
  }

  const ctx = canvas.getContext('2d');
  
  if (bloodPressureChart) {
    bloodPressureChart.destroy();
  }

  const monthOrder = ['January', 'February', 'March', 'April', 'May', 'June', 
                     'July', 'August', 'September', 'October', 'November', 'December'];
  
  const sortedHistory = [...patient.diagnosis_history].sort((a, b) => {
    const aIndex = (a.year * 12) + monthOrder.indexOf(a.month);
    const bIndex = (b.year * 12) + monthOrder.indexOf(b.month);
    return aIndex - bIndex;
  });

  const last6Months = sortedHistory.slice(-6);

  const labels = last6Months.map(item => `${item.month.substring(0, 3)}, ${item.year}`);
  const systolicData = last6Months.map(item => item.blood_pressure?.systolic?.value || 0);
  const diastolicData = last6Months.map(item => item.blood_pressure?.diastolic?.value || 0);

  bloodPressureChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [
        {
          label: 'Systolic',
          data: systolicData,
          borderColor: '#E66253',
          backgroundColor: 'rgba(230, 98, 83, 0.1)',
          borderWidth: 2,
          tension: 0.4,
          pointRadius: 6,
          pointBackgroundColor: '#E66253',
          pointBorderColor: '#FFFFFF',
          pointBorderWidth: 3,
          pointHoverRadius: 8,
          fill: true
        },
        {
          label: 'Diastolic',
          data: diastolicData,
          borderColor: '#8C6FE6',
          backgroundColor: 'rgba(140, 111, 230, 0.1)',
          borderWidth: 2,
          tension: 0.4,
          pointRadius: 6,
          pointBackgroundColor: '#8C6FE6',
          pointBorderColor: '#FFFFFF',
          pointBorderWidth: 3,
          pointHoverRadius: 8,
          fill: true
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          enabled: true,
          backgroundColor: '#072635',
          titleColor: '#FFFFFF',
          bodyColor: '#FFFFFF',
          borderColor: '#E8E8E8',
          borderWidth: 1,
          padding: 12,
          displayColors: true,
          callbacks: {
            label: function(context) {
              return `${context.dataset.label}: ${context.parsed.y}`;
            }
          }
        }
      },
      scales: {
        y: {
          beginAtZero: false,
          min: 60,
          max: 180,
          ticks: {
            stepSize: 20,
            color: '#072635',
            font: {
              size: 12,
              weight: '500'
            }
          },
          grid: {
            color: '#E8E8E8',
            drawBorder: false
          }
        },
        x: {
          ticks: {
            color: '#072635',
            font: {
              size: 12,
              weight: '500'
            }
          },
          grid: {
            display: false
          }
        }
      }
    }
  });
}

function updateVitalStats(patient) {
  if (!patient.diagnosis_history || patient.diagnosis_history.length === 0) {
    return;
  }

  const latestData = patient.diagnosis_history[patient.diagnosis_history.length - 1];
  
  if (!latestData.blood_pressure) {
    return;
  }

  const systolicValue = latestData.blood_pressure.systolic?.value || 'N/A';
  const systolicLevel = latestData.blood_pressure.systolic?.levels || 'N/A';
  
  const systolicValueEl = document.getElementById('systolicValue');
  const systolicLevelEl = document.getElementById('systolicLevel');
  
  if (systolicValueEl) systolicValueEl.textContent = systolicValue;
  if (systolicLevelEl) systolicLevelEl.textContent = systolicLevel;

  const diastolicValue = latestData.blood_pressure.diastolic?.value || 'N/A';
  const diastolicLevel = latestData.blood_pressure.diastolic?.levels || 'N/A';
  
  const diastolicValueEl = document.getElementById('diastolicValue');
  const diastolicLevelEl = document.getElementById('diastolicLevel');
  
  if (diastolicValueEl) diastolicValueEl.textContent = diastolicValue;
  if (diastolicLevelEl) diastolicLevelEl.textContent = diastolicLevel;
}

function updateDiagnosticHistory(patient) {
  const tableBody = document.getElementById('diagnosticHistoryTable');
  
  if (!tableBody) {
    return;
  }
  
  if (!patient.diagnosis_history || patient.diagnosis_history.length === 0) {
    tableBody.innerHTML = '<tr><td colspan="3" style="text-align: center; padding: 20px; color: #707070;">No diagnostic history available</td></tr>';
    return;
  }

  const recentHistory = patient.diagnosis_history.slice(-5).reverse();
  
  tableBody.innerHTML = recentHistory.map(item => {
    const problem = item.condition || 'Hypertension';
    const description = `Blood Pressure: ${item.blood_pressure?.systolic?.value || 'N/A'}/${item.blood_pressure?.diastolic?.value || 'N/A'}, Temperature: ${item.temperature?.value || 'N/A'}°F`;
    const status = item.blood_pressure?.systolic?.levels || 'Normal';
    
    return `
      <tr>
        <td><strong>${problem}</strong></td>
        <td>${description}</td>
        <td>
          <span class="diagnostic-status" style="background: ${getStatusColor(status)}; color: ${getStatusTextColor(status)}; padding: 6px 16px; border-radius: 20px; font-size: 13px; font-weight: 600; white-space: nowrap;">
            ${status}
          </span>
        </td>
      </tr>
    `;
  }).join('');
}

function updateLabResults(patient) {
  const labResultsList = document.getElementById('labResultsList');
  
  if (!labResultsList) {
    return;
  }
  
  if (!patient.lab_results || patient.lab_results.length === 0) {
    labResultsList.innerHTML = '<div style="padding: 20px; text-align: center; color: #707070;">No lab results available</div>';
    return;
  }

  labResultsList.innerHTML = patient.lab_results.map(result => `
    <div class="lab-result-item">
      <div class="lab-result-name">${result}</div>
      <svg class="download-icon" width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z" fill="#072635"/>
      </svg>
    </div>
  `).join('');
}

function getStatusColor(status) {
  const statusLower = (status || '').toLowerCase();
  
  if (statusLower.includes('observation') || statusLower.includes('higher') || statusLower.includes('high')) {
    return '#FFE6E9';
  }
  if (statusLower.includes('cured') || statusLower.includes('normal') || statusLower.includes('lower')) {
    return '#E0F3FA';
  }
  if (statusLower.includes('inactive')) {
    return '#F6F7F8';
  }
  
  return '#F6F7F8';
}

function getStatusTextColor(status) {
  const statusLower = (status || '').toLowerCase();
  
  if (statusLower.includes('observation') || statusLower.includes('higher') || statusLower.includes('high')) {
    return '#E66253';
  }
  if (statusLower.includes('cured') || statusLower.includes('normal') || statusLower.includes('lower')) {
    return '#1E88E5';
  }
  if (statusLower.includes('inactive')) {
    return '#707070';
  }
  
  return '#072635';
}
