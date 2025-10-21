---
layout: default
title: Battlefield 6 Weapon Statistics
---

# Battlefield 6 Weapon Statistics

Interactive dashboard for analyzing weapon performance across 31 firearms in Battlefield 6. Compare time-to-kill, accuracy, damage falloff, and other metrics across 4 weapon classes.

**Live Dashboard:** https://bdeland.github.io/bf6_guns/

## Features

- **Overview**: Sortable table with all weapon stats, filtering by class, search by name
- **Comparison**: Side-by-side comparison of up to 4 weapons with radar charts
- **Charts**: Interactive visualizations (TTK, RPM vs TTK, accuracy, velocity, damage falloff, power scores)
- **Leaderboards**: Top 10 rankings for various metrics
- **Calculator**: Find the best weapon for your engagement distance and playstyle

## Data

31 weapons analyzed across 4 classes (LMG, AR, SMG, CRB) with metrics including:
- Time to Kill at 0m, 20m, 35m, 75m
- Bullets to Kill and damage falloff
- Rate of fire (RPM)
- Projectile velocity
- Accuracy coefficients (burst, CQB, long-range)
- Power scores (accuracy-adjusted performance)

**Source:** Data collected by [u/Mastahamma](https://www.reddit.com/user/Mastahamma/) - [View Original Spreadsheet](https://docs.google.com/spreadsheets/d/1nfde_76i6hi45UG_YrD9F-o3QjxZXYCE2q_kEkCEYig/edit?usp=sharing)

## Usage

### Local
Clone the repository and open `index.html` in your browser:
```bash
git clone https://github.com/bdeland/bf6_guns.git
cd bf6_guns
```
Then double-click `index.html` or open it in your browser.

### GitHub Pages
The dashboard is deployed at https://bdeland.github.io/bf6_guns/

## Repository Structure

```
bf6_guns/
├── index.html          # Dashboard interface
├── app.js              # Dashboard functionality
├── styles.css          # Styling
├── data.js             # Embedded weapon data
├── data.csv            # Raw CSV data
└── README.md           # This file
```

## Technology

- **Frontend**: Vanilla JavaScript (ES6+), HTML5, CSS3
- **Charts**: Chart.js 4.4.0
- **Data**: Embedded in page, no server required
- **Hosting**: GitHub Pages

## Top Weapons

Based on composite scoring:

1. **M240L (LMG)** - Score: 0.878
2. **M123K (LMG)** - Score: 0.857  
3. **M/60 (LMG)** - Score: 0.855

LMGs dominate overall due to high accuracy and consistency. ARs have the best TTK at 20m. SMGs excel at close range but have poor velocity.

## Data Updates

To update weapon statistics when source data changes:
1. Update `data.csv` and `data.js` with new stats
2. Change `DATA_CONFIG.lastUpdated` in `app.js`
3. Commit and push

See `DATA_UPDATE_INSTRUCTIONS.md` for details.

## Contributing

Pull requests welcome. To contribute:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License - see [LICENSE](LICENSE) file.

## Credits

- **Data Collection**: [u/Mastahamma](https://www.reddit.com/user/Mastahamma/)
- **Dashboard**: Built with Chart.js
- **Source**: [BF6 Gun Analysis Spreadsheet](https://docs.google.com/spreadsheets/d/1nfde_76i6hi45UG_YrD9F-o3QjxZXYCE2q_kEkCEYig/edit?usp=sharing)
