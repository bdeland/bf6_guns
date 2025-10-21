# 🎯 Battlefield 6 Weapon Statistics Analysis

An interactive web dashboard and Python data analysis project examining weapon performance metrics across 31 firearms from 4 weapon classes (LMGs, ARs, SMGs, and Carbines). This project provides comprehensive insights into time-to-kill, accuracy, damage falloff, and overall weapon effectiveness across various engagement distances.

## 📊 Project Overview

This project analyzes detailed weapon statistics including:
- Time to Kill (TTK) at multiple distances (0m, 20m, 35m, 75m)
- Bullets to Kill (BTK) and damage falloff
- Rate of fire (RPM) and fire intervals
- Projectile velocity
- Accuracy coefficients (Burst, CQB, Long Range)
- Power scores (accuracy-adjusted performance metrics)
- Practical lethality coefficients

The project includes:
- **Interactive Web Dashboard**: Modern, responsive web interface with 5 tabs featuring real-time filtering, weapon comparisons, interactive charts, leaderboards, and a TTK calculator
- **Python Analysis Script**: Statistical analysis using pandas, matplotlib, seaborn, and scipy to generate 9 comprehensive visualizations
- **Embedded Data**: Works offline and on GitHub Pages without requiring a server

## 🚀 Key Findings

### Top 3 Overall Weapons
1. **M240L (LMG)** - Composite Score: 0.878
   - Best 20m power score (238)
   - Excellent all-range performance
   - High accuracy coefficient (0.94)

2. **M123K (LMG)** - Composite Score: 0.857
   - Strong accuracy (0.89)
   - Consistent damage output
   - High fire rate (830 RPM)

3. **M/60 (LMG)** - Composite Score: 0.855
   - Perfect burst accuracy (1.00)
   - Reliable performance
   - Excellent for beginners

### Notable Outliers
- **KV9 (SMG)**: Extreme 1,080 RPM but slowest projectile velocity (348 m/s)
- **TR-7 (AR)**: Poor accuracy (0.60) compensated by exceptional damage
- **AK-205 (CRB)**: Worst overall TTK at 20m (444ms)

### Weapon Class Performance
- **LMGs**: Dominate with highest accuracy (0.945 avg) and consistency
- **ARs**: Best TTK at 20m (279ms avg), most balanced
- **SMGs**: Highest fire rate (830 RPM avg), excellent close-range
- **Carbines**: Highest practical lethality, poorest accuracy (0.687 avg)

## 🌐 Interactive Web Dashboard

**[🚀 View Live Demo →](https://bdeland.github.io/bf6_guns/)**

The dashboard is **fully functional and ready to deploy**! Features include:

### Dashboard Features
- **📊 Overview Tab**: Top performers summary, class distribution chart, sortable data table
- **⚔️ Comparison Tab**: Compare up to 4 weapons side-by-side with radar charts
- **📈 Charts Tab**: 6 interactive visualization types (TTK, RPM vs TTK, accuracy, velocity, damage falloff, power scores)
- **🏆 Leaderboards Tab**: Top 10 rankings across 6 different metrics
- **🧮 Calculator Tab**: Smart weapon finder based on your playstyle and preferences

### Try It Now
- **Local**: Simply open `index.html` in any modern web browser
- **Online**: Already live at https://bdeland.github.io/bf6_guns/
- **No Server Required**: Uses embedded data for instant loading

## 📁 Repository Structure

```
bf6_guns/
│
├── 🌐 Web Dashboard (Ready to Deploy)
│   ├── index.html              # Main dashboard interface
│   ├── app.js                  # Dashboard functionality (867 lines)
│   ├── styles.css              # Modern responsive styling
│   └── data.js                 # Embedded weapon data (no server needed)
│
├── 📊 Data & Analysis
│   ├── data.csv                # Raw weapon statistics (31 weapons)
│   └── analyze_weapons.py      # Python analysis script (generates 9 PNG charts)
│
├── 📚 Documentation
│   ├── README.md               # This file
│   └── ANALYSIS_SUMMARY.md     # Detailed statistical findings
│
└── 📜 Project Files
    ├── requirements.txt        # Python dependencies
    └── LICENSE                 # MIT License

analysis_output/                # Created when running analyze_weapons.py
├── 1_ttk_analysis.png          # Generated visualization charts
├── 2_power_scores.png          # (9 total PNG files at 300 DPI)
└── ... (7 more charts)
```

## 🛠️ Requirements

### Web Dashboard (No Installation Required!)
The interactive dashboard works in any modern web browser:
- **Chrome** 90+ ✅
- **Firefox** 88+ ✅
- **Edge** 90+ ✅
- **Safari** 14+ ✅

No dependencies, no server, no installation needed!

### Python Analysis (Optional)
Only needed if you want to run the statistical analysis script:
```
pandas
matplotlib
seaborn
numpy
scipy
```

Install via: `pip install -r requirements.txt`

## 📥 Installation

### Option 1: Use the Web Dashboard (Recommended)
1. Clone or download this repository:
```bash
git clone https://github.com/bdeland/bf6_guns.git
cd bf6_guns
```

2. Open `index.html` in your browser:
   - **Windows**: Double-click `index.html`
   - **Mac/Linux**: `open index.html` or `xdg-open index.html`
   - **Or**: Deploy to GitHub Pages (see `GITHUB_PAGES_SETUP.md`)

That's it! No installation required.

### Option 2: Run Python Analysis (Optional)
For generating static PNG charts:

```bash
# Install Python dependencies
pip install -r requirements.txt

# Or manually
pip install pandas matplotlib seaborn numpy scipy

# Run the analysis
python analyze_weapons.py
```

This creates `analysis_output/` folder with 9 PNG visualizations.

## 📈 Usage

### 🌐 Web Dashboard (Recommended)

**[🌐 View Live Demo →](https://bdeland.github.io/bf6_guns/)**

#### Quick Start
1. **Local**: Double-click `index.html` - works immediately!
2. **Online**: Already live at https://bdeland.github.io/bf6_guns/

#### Dashboard Tabs Guide
- **📊 Overview**: Browse all weapons with real-time filtering by class, search by name, and sort by any metric
- **⚔️ Comparison**: Select up to 4 weapons and compare their stats side-by-side with an interactive radar chart
- **📈 Charts**: Explore 6 different visualization types:
  - Time to Kill Comparison
  - RPM vs TTK Scatter Plot
  - Accuracy Analysis
  - Projectile Velocity
  - Damage Falloff
  - Power Scores
- **🏆 Leaderboards**: View top 10 weapons for:
  - Fastest TTK at 0m
  - Best 20m Power Score
  - Highest RPM
  - Best Accuracy
  - Fastest Velocity
  - Highest Lethality
- **🧮 Calculator**: Answer 3 questions to find the best weapon for your playstyle:
  - Engagement distance (0m/20m/35m/75m)
  - Priority stat (TTK/Accuracy/RPM/Velocity/Balanced)
  - Preferred class (Any/LMG/AR/SMG/CRB)

### 🐍 Python Analysis (Optional)

For researchers and data analysts who want static PNG visualizations:

```bash
python analyze_weapons.py
```

**What it does:**
1. Loads and cleans weapon statistics from `data.csv`
2. Performs 10 different statistical analyses
3. Generates 9 high-resolution charts (300 DPI) in `analysis_output/` folder
4. Prints detailed findings to console

**Output:** 9 PNG files covering TTK analysis, power scores, RPM vs TTK correlation, accuracy breakdown, class comparisons, damage falloff, lethality analysis, velocity comparison, and correlation heatmap.

## 📊 Analysis Breakdown

### 1. Time to Kill (TTK) Analysis
Compares weapon TTK across 4 distances (0m, 20m, 35m, 75m), highlighting the fastest and slowest weapons at each range.

### 2. Power Score Comparison
Analyzes accuracy-adjusted performance metrics that account for real-world shooting conditions.

### 3. RPM vs TTK Relationship
Explores how rate of fire correlates with time to kill, revealing that accuracy and damage matter more than pure fire rate.

### 4. Accuracy Coefficient Analysis
Breaks down burst accuracy, CQB accuracy, and long-range accuracy coefficients across all weapons.

### 5. Weapon Class Comparison
Box plot comparisons of key metrics across the 4 weapon classes (LMG, AR, SMG, CRB).

### 6. Damage Falloff Characteristics
Examines how damage consistency varies across distances, identifying weapons with stable vs. volatile performance.

### 7. Practical Lethality Coefficient
Analyzes real-world effectiveness, where Carbines surprisingly dominate despite lower raw accuracy.

### 8. Projectile Velocity Analysis
Studies bullet velocity and its impact on long-range effectiveness.

### 9. Correlation Heatmap
Full correlation matrix showing relationships between all measured metrics.

### 10. Statistical Outlier Detection
Uses Z-score analysis to identify weapons with exceptional or unusual characteristics.

## 🎯 Key Insights

### The Accuracy Paradox
Weapons with poor burst accuracy (TR-7: 0.60, M277: 0.52) can still be top performers due to high damage per shot. This suggests that raw accuracy isn't everything.

### LMG Dominance
Light Machine Guns dominate the overall rankings despite not having the fastest TTK. Their combination of accuracy, consistency, and all-range effectiveness makes them superior choices.

### The SMG Problem
SMGs have excellent fire rates and good accuracy but suffer from the worst projectile velocity (348-488 m/s), making them only viable for close-range combat.

### Velocity Matters
The KV9 has an extreme 1,080 RPM but its 348 m/s velocity significantly hampers effectiveness, proving that velocity is crucial for hitting moving targets.

## 📖 Detailed Report

For a comprehensive written analysis with all findings, recommendations by use case, and detailed statistics, see [ANALYSIS_SUMMARY.md](ANALYSIS_SUMMARY.md).

## 📷 Sample Visualizations

The Python script generates 9 publication-quality charts at 300 DPI:

1. **TTK Analysis** - Time to kill comparison at 4 distances
2. **Power Scores** - Accuracy-adjusted performance metrics
3. **RPM vs TTK** - Scatter plot showing fire rate vs kill time relationship
4. **Accuracy Analysis** - Burst, CQB, and long-range accuracy coefficients
5. **Class Comparison** - Box plots comparing weapon classes
6. **Damage Falloff** - How damage consistency varies with distance
7. **Lethality Analysis** - Practical effectiveness ratings
8. **Velocity Comparison** - Projectile speed analysis
9. **Correlation Heatmap** - Full statistical correlation matrix

**Note:** These PNG charts are generated when running `analyze_weapons.py`. The web dashboard includes interactive versions of these visualizations that work in your browser.

## 📊 Dataset Information

The dataset includes **31 weapons** across **4 classes** with **22 metrics per weapon**:

| Metric Category | Details |
|----------------|---------|
| **Weapon ID** | Name and class (LMG/AR/SMG/CRB) |
| **Damage** | Bullets to kill (BTK) at 0m, 20m, 35m, 75m |
| **Fire Rate** | RPM (rounds per minute) and fire interval (ms) |
| **Velocity** | Projectile speed (m/s) |
| **Time to Kill** | TTK at 0m, 20m, 35m, 75m (milliseconds) |
| **Accuracy** | Burst hits, burst/CQB/long-range accuracy coefficients |
| **Power Scores** | Accuracy-adjusted performance at 4 distances |
| **Lethality** | Practical lethality coefficient |

**Data Format:** CSV file with complete weapon statistics, embedded in `data.js` for web dashboard

## 🎨 Technology Stack

### Web Dashboard
- **HTML5/CSS3/JavaScript** (ES6+) - No frameworks, pure vanilla JS
- **Chart.js 4.4.0** - Interactive visualizations
- **Chart.js Datalabels Plugin** - Enhanced chart annotations
- **Responsive Design** - Mobile-friendly, works on all devices
- **Embedded Data** - No server or API required

### Python Analysis
- **pandas** - Data manipulation and analysis
- **matplotlib** - Static chart generation
- **seaborn** - Statistical visualizations
- **numpy** - Numerical computing
- **scipy** - Statistical functions (Z-score, correlation analysis)

## 🤝 Contributing

Contributions are welcome! If you'd like to:
- Add more weapons to the dataset
- Implement additional analyses
- Improve visualizations
- Fix bugs or improve code

Please feel free to:
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 🚀 Deployment Status

| Status | Component | Ready? |
|--------|-----------|--------|
| ✅ | Web Dashboard | **Production Ready** |
| ✅ | Python Analysis | **Functional** |
| ✅ | Documentation | **Complete** |
| ✅ | GitHub Pages Compatible | **Yes** |
| ✅ | Mobile Responsive | **Yes** |
| ✅ | No Server Required | **Yes** |

**Live Now:** https://bdeland.github.io/bf6_guns/

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Weapon data collected through extensive in-game testing and analysis
- Inspired by the gaming community's need for objective weapon performance comparisons
- Built with Chart.js for beautiful interactive visualizations
- Statistical analysis powered by Python's data science ecosystem

## 📧 Contact & Support

For questions, suggestions, or discussions:
- **Issues**: [Open an issue](https://github.com/bdeland/bf6_guns/issues) on GitHub
- **Contributions**: Submit a pull request
- **Discussions**: Use GitHub Discussions for general questions

## 🔗 Quick Links

- 📖 [Detailed Analysis Report](ANALYSIS_SUMMARY.md)
- 🌐 [Live Dashboard](https://bdeland.github.io/bf6_guns/)
- 💻 [View Source on GitHub](https://github.com/bdeland/bf6_guns)

---

**⚠️ Disclaimer**: This analysis is based on statistical data and controlled testing. Real-world performance may vary based on player skill, situational factors, attachments, and game balance updates.

## 🔄 Version History

- **v1.0.0** (October 2025) - Initial Release
  - ✅ Interactive web dashboard with 5 tabs
  - ✅ Complete analysis of 31 weapons
  - ✅ 10 analytical approaches
  - ✅ 9 statistical visualization charts
  - ✅ Comprehensive documentation
  - ✅ GitHub Pages ready
  - ✅ Mobile responsive design

---

### 🌟 Star this repository if you find it useful!

---

**Last Updated:** October 21, 2025

