// Configuration
const DATA_CONFIG = {
    lastUpdated: '2024-10-21',  // Update this date when source data changes (YYYY-MM-DD)
    sourceUrl: 'https://docs.google.com/spreadsheets/d/1nfde_76i6hi45UG_YrD9F-o3QjxZXYCE2q_kEkCEYig/edit?usp=sharing',
    sourceAuthor: 'u/Mastahamma'
};

// Global variables
let weaponsData = [];
let filteredData = [];
let charts = {};

// Initialize application
document.addEventListener('DOMContentLoaded', async () => {
    await loadData();
    initializeApp();
});

// Load CSV data
async function loadData() {
    try {
        // Check if embedded data is available (from data.js)
        if (typeof WEAPON_DATA_CSV !== 'undefined') {
            console.log('Using embedded weapon data');
            weaponsData = parseCSV(WEAPON_DATA_CSV);
            filteredData = [...weaponsData];
            console.log('Loaded weapons:', weaponsData.length);
            return;
        }
        
        // Otherwise, try to fetch from CSV file
        const response = await fetch('data.csv');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const csvText = await response.text();
        weaponsData = parseCSV(csvText);
        filteredData = [...weaponsData];
        console.log('Loaded weapons:', weaponsData.length);
    } catch (error) {
        console.error('Error loading data:', error);
        alert('Error loading weapon data.\n\n' +
              'The embedded data should load automatically.\n' +
              'If you see this message, please refresh the page or check the browser console (F12) for details.');
    }
}

// Parse CSV
function parseCSV(csv) {
    const lines = csv.split('\n').filter(line => line.trim());
    const headers = lines[0].split(',');
    const weapons = [];

    for (let i = 1; i < lines.length; i++) {
        const values = parseCSVLine(lines[i]);
        if (!values[0] || values[0].includes('Explanations')) break; // Stop at explanation rows
        
        const weapon = {
            weapon: values[0],
            weaponClass: values[1],
            btk0: parseFloat(values[2]) || 0,
            btk20: parseFloat(values[3]) || 0,
            btk35: parseFloat(values[4]) || 0,
            btk75: parseFloat(values[5]) || 0,
            rpm: parseFloat(values[6]) || 0,
            fireInterval: parseFloat(values[7]) || 0,
            velocity: parseFloat(values[8]) || 0,
            ttk0: parseFloat(values[9]) || 0,
            ttk20: parseFloat(values[10]) || 0,
            ttk35: parseFloat(values[11]) || 0,
            ttk75: parseFloat(values[12]) || 0,
            burstHits: parseFloat(values[13]) || 0,
            burstAccuracy: parseFloat(values[14]) || 0,
            cqbAccuracy: parseFloat(values[15]) || 0,
            longRangeAccuracy: parseFloat(values[16]) || 0,
            power20: parseFloat(values[17]) || 0,
            power21: parseFloat(values[18]) || 0,
            power35: parseFloat(values[19]) || 0,
            power75: parseFloat(values[20]) || 0,
            lethality: parseFloat(values[21]) || 0
        };
        
        weapons.push(weapon);
    }

    return weapons;
}

// Parse CSV line handling commas in quotes
function parseCSVLine(line) {
    const result = [];
    let current = '';
    let inQuotes = false;

    for (let i = 0; i < line.length; i++) {
        const char = line[i];
        
        if (char === '"') {
            inQuotes = !inQuotes;
        } else if (char === ',' && !inQuotes) {
            result.push(current.trim());
            current = '';
        } else {
            current += char;
        }
    }
    
    result.push(current.trim());
    return result;
}

// Update footer with data info
function updateFooterInfo() {
    const dataUpdateInfo = document.getElementById('dataUpdateInfo');
    const dataSourceAuthor = document.getElementById('dataSourceAuthor');
    
    if (dataUpdateInfo) {
        // Format the date nicely
        const date = new Date(DATA_CONFIG.lastUpdated);
        const formattedDate = date.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric' 
        });
        dataUpdateInfo.textContent = `Data updated ${formattedDate}`;
    }
    
    if (dataSourceAuthor) {
        dataSourceAuthor.href = 'https://www.reddit.com/user/Mastahamma/';
        dataSourceAuthor.title = `View source: ${DATA_CONFIG.sourceUrl}`;
    }
}

// Initialize app
function initializeApp() {
    updateFooterInfo();
    setupTabs();
    setupFilters();
    setupTable();
    renderOverview();
    renderLeaderboards();
    populateComparisonSelectors();
    setupComparison();
    setupCharts();
    setupCalculator();
}

// Tab switching
function setupTabs() {
    const tabs = document.querySelectorAll('.tab');
    const contents = document.querySelectorAll('.tab-content');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetTab = tab.dataset.tab;
            
            tabs.forEach(t => t.classList.remove('active'));
            contents.forEach(c => c.classList.remove('active'));
            
            tab.classList.add('active');
            document.querySelector(`[data-content="${targetTab}"]`).classList.add('active');
            
            // Refresh charts when viewing charts tab
            if (targetTab === 'charts') {
                renderMainChart();
            }
        });
    });
}

// Setup filters
function setupFilters() {
    const classFilter = document.getElementById('classFilter');
    const searchInput = document.getElementById('searchInput');
    const sortBy = document.getElementById('sortBy');
    const resetBtn = document.getElementById('resetFilters');

    classFilter.addEventListener('change', applyFilters);
    searchInput.addEventListener('input', applyFilters);
    sortBy.addEventListener('change', applyFilters);
    
    resetBtn.addEventListener('click', () => {
        classFilter.value = 'all';
        searchInput.value = '';
        sortBy.value = 'name';
        applyFilters();
    });
}

// Apply filters
function applyFilters() {
    const classFilter = document.getElementById('classFilter').value;
    const searchText = document.getElementById('searchInput').value.toLowerCase();
    const sortBy = document.getElementById('sortBy').value;

    // Filter
    filteredData = weaponsData.filter(weapon => {
        const matchesClass = classFilter === 'all' || weapon.weaponClass === classFilter;
        const matchesSearch = weapon.weapon.toLowerCase().includes(searchText);
        return matchesClass && matchesSearch;
    });

    // Sort
    filteredData.sort((a, b) => {
        switch (sortBy) {
            case 'name': return a.weapon.localeCompare(b.weapon);
            case 'ttk20': return a.ttk20 - b.ttk20;
            case 'power20': return a.power20 - b.power20;
            case 'rpm': return b.rpm - a.rpm;
            case 'accuracy': return b.burstAccuracy - a.burstAccuracy;
            case 'velocity': return b.velocity - a.velocity;
            default: return 0;
        }
    });

    document.getElementById('filteredCount').textContent = filteredData.length;
    renderTable();
}

// Setup table
function setupTable() {
    const headers = document.querySelectorAll('.sortable');
    headers.forEach(header => {
        header.addEventListener('click', () => {
            const sortKey = header.dataset.sort;
            sortTable(sortKey, header);
        });
    });
    
    renderTable();
}

// Sort table
function sortTable(key, headerElement) {
    const isAsc = headerElement.classList.contains('sorted-asc');
    
    // Remove all sort classes
    document.querySelectorAll('.sortable').forEach(h => {
        h.classList.remove('sorted-asc', 'sorted-desc');
    });
    
    // Add sort class to current header
    headerElement.classList.add(isAsc ? 'sorted-desc' : 'sorted-asc');
    
    filteredData.sort((a, b) => {
        let aVal, bVal;
        
        switch(key) {
            case 'weapon': aVal = a.weapon; bVal = b.weapon; break;
            case 'class': aVal = a.weaponClass; bVal = b.weaponClass; break;
            case 'rpm': aVal = a.rpm; bVal = b.rpm; break;
            case 'ttk0': aVal = a.ttk0; bVal = b.ttk0; break;
            case 'ttk20': aVal = a.ttk20; bVal = b.ttk20; break;
            case 'power20': aVal = a.power20; bVal = b.power20; break;
            case 'accuracy': aVal = a.burstAccuracy; bVal = b.burstAccuracy; break;
            case 'velocity': aVal = a.velocity; bVal = b.velocity; break;
            default: return 0;
        }
        
        if (typeof aVal === 'string') {
            return isAsc ? bVal.localeCompare(aVal) : aVal.localeCompare(bVal);
        } else {
            return isAsc ? bVal - aVal : aVal - bVal;
        }
    });
    
    renderTable();
}

// Render table
function renderTable() {
    const tbody = document.getElementById('weaponTableBody');
    tbody.innerHTML = '';

    filteredData.forEach(weapon => {
        const row = tbody.insertRow();
        row.innerHTML = `
            <td><strong>${weapon.weapon}</strong></td>
            <td><span class="class-badge class-${weapon.weaponClass}">${weapon.weaponClass}</span></td>
            <td>${weapon.rpm}</td>
            <td>${weapon.ttk0}ms</td>
            <td>${weapon.ttk20}ms</td>
            <td>${weapon.power20}</td>
            <td>${(weapon.burstAccuracy * 100).toFixed(0)}%</td>
            <td>${weapon.velocity} m/s</td>
            <td><button class="btn-view" onclick="viewWeaponDetails('${weapon.weapon}')">View</button></td>
        `;
    });
}

// View weapon details
function viewWeaponDetails(weaponName) {
    const weapon = weaponsData.find(w => w.weapon === weaponName);
    if (!weapon) return;

    const details = `
        🔫 ${weapon.weapon} (${weapon.weaponClass})
        
        Fire Rate: ${weapon.rpm} RPM
        Velocity: ${weapon.velocity} m/s
        
        Time to Kill:
        • 0m: ${weapon.ttk0}ms
        • 20m: ${weapon.ttk20}ms
        • 35m: ${weapon.ttk35}ms
        • 75m: ${weapon.ttk75}ms
        
        Bullets to Kill:
        • 0m: ${weapon.btk0}
        • 20m: ${weapon.btk20}
        • 35m: ${weapon.btk35}
        • 75m: ${weapon.btk75}
        
        Accuracy:
        • Burst: ${(weapon.burstAccuracy * 100).toFixed(0)}%
        • CQB: ${(weapon.cqbAccuracy * 100).toFixed(0)}%
        • Long Range: ${(weapon.longRangeAccuracy * 100).toFixed(0)}%
        
        Power Scores:
        • 20m: ${weapon.power20}
        • 35m: ${weapon.power35}
        • 75m: ${weapon.power75}
        ${weapon.lethality ? `\nLethality: ${weapon.lethality.toFixed(3)}` : ''}
    `;

    alert(details);
}

// Render overview
function renderOverview() {
    renderTopPerformers();
    renderClassChart();
}

// Render top performers
function renderTopPerformers() {
    const container = document.getElementById('topPerformers');
    const top5 = [...weaponsData]
        .sort((a, b) => a.power20 - b.power20)
        .slice(0, 5);

    container.innerHTML = top5.map((weapon, index) => `
        <div class="performer">
            <strong>#${index + 1} ${weapon.weapon}</strong> (${weapon.weaponClass})
            <div>20m Power Score: ${weapon.power20} | TTK: ${weapon.ttk20}ms | Accuracy: ${(weapon.burstAccuracy * 100).toFixed(0)}%</div>
        </div>
    `).join('');
}

// Render class distribution chart
function renderClassChart() {
    const ctx = document.getElementById('classChart').getContext('2d');
    
    const classCounts = weaponsData.reduce((acc, weapon) => {
        acc[weapon.weaponClass] = (acc[weapon.weaponClass] || 0) + 1;
        return acc;
    }, {});

    if (charts.classChart) charts.classChart.destroy();
    
    charts.classChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: Object.keys(classCounts),
            datasets: [{
                data: Object.values(classCounts),
                backgroundColor: ['#ef4444', '#3b82f6', '#10b981', '#f59e0b'],
                borderWidth: 2,
                borderColor: '#fff'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        font: { size: 14 },
                        padding: 15
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const label = context.label || '';
                            const value = context.parsed;
                            const total = context.dataset.data.reduce((a, b) => a + b, 0);
                            const percentage = ((value / total) * 100).toFixed(1);
                            return `${label}: ${value} (${percentage}%)`;
                        }
                    }
                }
            }
        }
    });
}

// Populate comparison selectors
function populateComparisonSelectors() {
    const selectors = [
        document.getElementById('compare1'),
        document.getElementById('compare2'),
        document.getElementById('compare3'),
        document.getElementById('compare4')
    ];

    const options = weaponsData.map(w => 
        `<option value="${w.weapon}">${w.weapon} (${w.weaponClass})</option>`
    ).join('');

    selectors.forEach(selector => {
        selector.innerHTML = '<option value="">Select weapon...</option>' + options;
    });
}

// Setup comparison
function setupComparison() {
    const selectors = document.querySelectorAll('.weapon-select');
    selectors.forEach(selector => {
        selector.addEventListener('change', updateComparison);
    });
}

// Update comparison
function updateComparison() {
    const selected = [];
    for (let i = 1; i <= 4; i++) {
        const value = document.getElementById(`compare${i}`).value;
        if (value) {
            const weapon = weaponsData.find(w => w.weapon === value);
            if (weapon) selected.push(weapon);
        }
    }

    if (selected.length === 0) {
        document.getElementById('comparisonResults').innerHTML = 
            '<p class="help-text">Select at least one weapon to compare</p>';
        if (charts.comparison) charts.comparison.destroy();
        return;
    }

    renderComparisonCards(selected);
    renderComparisonChart(selected);
}

// Render comparison cards
function renderComparisonCards(weapons) {
    const container = document.getElementById('comparisonResults');
    
    container.innerHTML = `
        <div class="comparison-grid">
            ${weapons.map(weapon => `
                <div class="comparison-card">
                    <h4>${weapon.weapon} <span class="class-badge class-${weapon.weaponClass}">${weapon.weaponClass}</span></h4>
                    <div class="stat-row">
                        <span class="stat-label-comp">RPM:</span>
                        <span class="stat-value">${weapon.rpm}</span>
                    </div>
                    <div class="stat-row">
                        <span class="stat-label-comp">TTK 20m:</span>
                        <span class="stat-value">${weapon.ttk20}ms</span>
                    </div>
                    <div class="stat-row">
                        <span class="stat-label-comp">Power 20m:</span>
                        <span class="stat-value">${weapon.power20}</span>
                    </div>
                    <div class="stat-row">
                        <span class="stat-label-comp">Accuracy:</span>
                        <span class="stat-value">${(weapon.burstAccuracy * 100).toFixed(0)}%</span>
                    </div>
                    <div class="stat-row">
                        <span class="stat-label-comp">Velocity:</span>
                        <span class="stat-value">${weapon.velocity} m/s</span>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
}

// Render comparison chart
function renderComparisonChart(weapons) {
    const ctx = document.getElementById('comparisonChart').getContext('2d');
    
    if (charts.comparison) charts.comparison.destroy();
    
    charts.comparison = new Chart(ctx, {
        type: 'radar',
        data: {
            labels: ['RPM', 'TTK (inverted)', 'Power (inverted)', 'Accuracy', 'Velocity'],
            datasets: weapons.map((weapon, index) => {
                const colors = ['#3b82f6', '#ef4444', '#10b981', '#f59e0b'];
                return {
                    label: weapon.weapon,
                    data: [
                        normalize(weapon.rpm, 514, 1080),
                        normalize(600 - weapon.ttk20, 0, 400), // Inverted
                        normalize(600 - weapon.power20, 0, 400), // Inverted
                        weapon.burstAccuracy * 100,
                        normalize(weapon.velocity, 348, 840)
                    ],
                    backgroundColor: colors[index] + '20',
                    borderColor: colors[index],
                    borderWidth: 2,
                    pointBackgroundColor: colors[index],
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: colors[index]
                };
            })
        },
        options: {
            responsive: true,
            scales: {
                r: {
                    beginAtZero: true,
                    max: 100,
                    ticks: { stepSize: 20 }
                }
            },
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: { padding: 15, font: { size: 12 } }
                }
            }
        }
    });
}

// Normalize value to 0-100 scale
function normalize(value, min, max) {
    return ((value - min) / (max - min)) * 100;
}

// Setup charts
function setupCharts() {
    document.getElementById('chartType').addEventListener('change', renderMainChart);
    renderMainChart();
}

// Render main chart
function renderMainChart() {
    const chartType = document.getElementById('chartType').value;
    const ctx = document.getElementById('mainChart').getContext('2d');
    
    if (charts.main) charts.main.destroy();
    
    const data = filteredData.length > 0 ? filteredData : weaponsData;
    
    switch(chartType) {
        case 'ttk':
            renderTTKChart(ctx, data);
            break;
        case 'rpm-ttk':
            renderScatterChart(ctx, data);
            break;
        case 'accuracy':
            renderAccuracyChart(ctx, data);
            break;
        case 'velocity':
            renderVelocityChart(ctx, data);
            break;
        case 'damage-falloff':
            renderDamageFalloffChart(ctx, data);
            break;
        case 'power-scores':
            renderPowerScoresChart(ctx, data);
            break;
    }
}

// TTK Chart
function renderTTKChart(ctx, data) {
    const sorted = [...data].sort((a, b) => a.ttk20 - b.ttk20).slice(0, 15);
    
    charts.main = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: sorted.map(w => w.weapon),
            datasets: [{
                label: 'TTK at 20m (ms)',
                data: sorted.map(w => w.ttk20),
                backgroundColor: sorted.map(w => getClassColor(w.weaponClass)),
                borderWidth: 1,
                borderColor: '#1e293b'
            }]
        },
        options: {
            indexAxis: 'y',
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: { display: false },
                title: {
                    display: true,
                    text: 'Top 15 Weapons by Time to Kill at 20m (Lower is Better)',
                    font: { size: 16, weight: 'bold' }
                }
            },
            scales: {
                x: { title: { display: true, text: 'Time to Kill (milliseconds)' } }
            }
        }
    });
}

// Scatter Chart
function renderScatterChart(ctx, data) {
    const classGroups = groupByClass(data);
    
    charts.main = new Chart(ctx, {
        type: 'scatter',
        data: {
            datasets: Object.keys(classGroups).map(weaponClass => ({
                label: weaponClass,
                data: classGroups[weaponClass].map(w => ({ 
                    x: w.rpm, 
                    y: w.ttk20,
                    weapon: w.weapon  // Add weapon name to data point
                })),
                backgroundColor: getClassColor(weaponClass),
                pointRadius: 6,
                pointHoverRadius: 8
            }))
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'RPM vs TTK at 20m',
                    font: { size: 16, weight: 'bold' }
                },
                legend: { position: 'bottom' },
                tooltip: {
                    callbacks: {
                        title: function(context) {
                            return context[0].raw.weapon || '';
                        },
                        label: function(context) {
                            return [
                                `RPM: ${context.parsed.x}`,
                                `TTK: ${context.parsed.y}ms`
                            ];
                        }
                    }
                }
            },
            scales: {
                x: { title: { display: true, text: 'RPM (Rounds Per Minute)' } },
                y: { title: { display: true, text: 'TTK at 20m (ms)' }, reverse: true }
            }
        }
    });
}

// Accuracy Chart
function renderAccuracyChart(ctx, data) {
    const sorted = [...data].sort((a, b) => b.burstAccuracy - a.burstAccuracy).slice(0, 15);
    
    charts.main = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: sorted.map(w => w.weapon),
            datasets: [{
                label: 'Burst Accuracy (%)',
                data: sorted.map(w => w.burstAccuracy * 100),
                backgroundColor: '#10b981',
                borderWidth: 1
            }]
        },
        options: {
            indexAxis: 'y',
            responsive: true,
            plugins: {
                legend: { display: false },
                title: {
                    display: true,
                    text: 'Top 15 Most Accurate Weapons',
                    font: { size: 16, weight: 'bold' }
                }
            },
            scales: {
                x: { 
                    max: 100,
                    title: { display: true, text: 'Accuracy (%)' }
                }
            }
        }
    });
}

// Velocity Chart
function renderVelocityChart(ctx, data) {
    const sorted = [...data].sort((a, b) => b.velocity - a.velocity);
    
    charts.main = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: sorted.map(w => w.weapon),
            datasets: [{
                label: 'Velocity (m/s)',
                data: sorted.map(w => w.velocity),
                backgroundColor: sorted.map(w => getClassColor(w.weaponClass)),
                borderWidth: 1
            }]
        },
        options: {
            indexAxis: 'y',
            responsive: true,
            plugins: {
                legend: { display: false },
                title: {
                    display: true,
                    text: 'Projectile Velocity by Weapon',
                    font: { size: 16, weight: 'bold' }
                }
            },
            scales: {
                x: { title: { display: true, text: 'Velocity (m/s)' } }
            }
        }
    });
}

// Damage Falloff Chart
function renderDamageFalloffChart(ctx, data) {
    const samples = data.filter((_, i) => i % 3 === 0).slice(0, 10);
    
    charts.main = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['0m', '20m', '35m', '75m'],
            datasets: samples.map(weapon => ({
                label: weapon.weapon,
                data: [weapon.btk0, weapon.btk20, weapon.btk35, weapon.btk75],
                borderColor: getClassColor(weapon.weaponClass),
                backgroundColor: getClassColor(weapon.weaponClass) + '20',
                tension: 0.3,
                borderWidth: 2
            }))
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'Bullets to Kill vs Distance (Sample)',
                    font: { size: 16, weight: 'bold' }
                },
                legend: { position: 'right' }
            },
            scales: {
                y: {
                    title: { display: true, text: 'Bullets to Kill' },
                    reverse: true
                }
            }
        }
    });
}

// Power Scores Chart
function renderPowerScoresChart(ctx, data) {
    const sorted = [...data].sort((a, b) => a.power20 - b.power20).slice(0, 15);
    
    charts.main = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: sorted.map(w => w.weapon),
            datasets: [
                {
                    label: '20m',
                    data: sorted.map(w => w.power20),
                    backgroundColor: '#3b82f6'
                },
                {
                    label: '35m',
                    data: sorted.map(w => w.power35),
                    backgroundColor: '#8b5cf6'
                },
                {
                    label: '75m',
                    data: sorted.map(w => w.power75),
                    backgroundColor: '#ec4899'
                }
            ]
        },
        options: {
            indexAxis: 'y',
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'Power Scores at Different Ranges (Lower is Better)',
                    font: { size: 16, weight: 'bold' }
                },
                legend: { position: 'bottom' }
            }
        }
    });
}

// Render leaderboards
function renderLeaderboards() {
    renderLeaderboard('leaderboard-ttk0', 'ttk0', false, w => `${w.weapon} (${w.weaponClass}) - ${w.ttk0}ms`);
    renderLeaderboard('leaderboard-power20', 'power20', false, w => `${w.weapon} (${w.weaponClass}) - ${w.power20}`);
    renderLeaderboard('leaderboard-rpm', 'rpm', true, w => `${w.weapon} (${w.weaponClass}) - ${w.rpm} RPM`);
    renderLeaderboard('leaderboard-accuracy', 'burstAccuracy', true, w => `${w.weapon} (${w.weaponClass}) - ${(w.burstAccuracy * 100).toFixed(0)}%`);
    renderLeaderboard('leaderboard-velocity', 'velocity', true, w => `${w.weapon} (${w.weaponClass}) - ${w.velocity} m/s`);
    renderLeaderboard('leaderboard-lethality', 'lethality', true, w => w.lethality ? `${w.weapon} (${w.weaponClass}) - ${w.lethality.toFixed(3)}` : null);
}

// Render individual leaderboard
function renderLeaderboard(elementId, sortKey, descending, formatter) {
    const container = document.getElementById(elementId);
    const sorted = [...weaponsData]
        .filter(w => w[sortKey] > 0)
        .sort((a, b) => descending ? b[sortKey] - a[sortKey] : a[sortKey] - b[sortKey])
        .slice(0, 10);

    container.innerHTML = sorted.map(weapon => {
        const formatted = formatter(weapon);
        return formatted ? `<li>${formatted}</li>` : '';
    }).filter(Boolean).join('');
}

// Setup calculator
function setupCalculator() {
    document.getElementById('calcFind').addEventListener('click', calculateBestWeapon);
}

// Calculate best weapon
function calculateBestWeapon() {
    const distance = document.getElementById('calcDistance').value;
    const priority = document.getElementById('calcPriority').value;
    const weaponClass = document.getElementById('calcClass').value;

    let filtered = weaponClass === 'all' ? [...weaponsData] : 
        weaponsData.filter(w => w.weaponClass === weaponClass);

    let sorted;
    switch(priority) {
        case 'ttk':
            sorted = filtered.sort((a, b) => a[`ttk${distance}`] - b[`ttk${distance}`]);
            break;
        case 'accuracy':
            sorted = filtered.sort((a, b) => b.burstAccuracy - a.burstAccuracy);
            break;
        case 'rpm':
            sorted = filtered.sort((a, b) => b.rpm - a.rpm);
            break;
        case 'velocity':
            sorted = filtered.sort((a, b) => b.velocity - a.velocity);
            break;
        case 'balanced':
            sorted = filtered.sort((a, b) => {
                const scoreA = (1 / a.ttk20) * a.burstAccuracy * (a.rpm / 1000);
                const scoreB = (1 / b.ttk20) * b.burstAccuracy * (b.rpm / 1000);
                return scoreB - scoreA;
            });
            break;
        default:
            sorted = filtered;
    }

    const top3 = sorted.slice(0, 3);
    displayCalculatorResults(top3, distance);
}

// Display calculator results
function displayCalculatorResults(weapons, distance) {
    const container = document.getElementById('calcResults');
    
    container.innerHTML = weapons.map((weapon, index) => `
        <div class="result-weapon">
            <h5>#${index + 1} ${weapon.weapon} <span class="class-badge class-${weapon.weaponClass}">${weapon.weaponClass}</span></h5>
            <div class="result-stats">
                <div><span>TTK at ${distance}m:</span> <strong>${weapon[`ttk${distance}`]}ms</strong></div>
                <div><span>RPM:</span> <strong>${weapon.rpm}</strong></div>
                <div><span>Accuracy:</span> <strong>${(weapon.burstAccuracy * 100).toFixed(0)}%</strong></div>
                <div><span>Velocity:</span> <strong>${weapon.velocity} m/s</strong></div>
                <div><span>Power ${distance === '0' ? '20' : distance}m:</span> <strong>${distance === '0' ? weapon.power20 : weapon[`power${distance}`]}</strong></div>
                ${weapon.lethality ? `<div><span>Lethality:</span> <strong>${weapon.lethality.toFixed(3)}</strong></div>` : ''}
            </div>
        </div>
    `).join('');
}

// Helper functions
function groupByClass(data) {
    return data.reduce((acc, weapon) => {
        if (!acc[weapon.weaponClass]) acc[weapon.weaponClass] = [];
        acc[weapon.weaponClass].push(weapon);
        return acc;
    }, {});
}

function getClassColor(weaponClass) {
    const colors = {
        'LMG': '#ef4444',
        'AR': '#3b82f6',
        'SMG': '#10b981',
        'CRB': '#f59e0b'
    };
    return colors[weaponClass] || '#6b7280';
}

// Export function for window
window.viewWeaponDetails = viewWeaponDetails;

