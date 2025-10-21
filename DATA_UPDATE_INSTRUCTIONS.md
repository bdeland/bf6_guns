# How to Update Data

When the source data from u/Mastahamma's spreadsheet changes, follow these steps:

## 1. Update the CSV File

Replace `data.csv` with the new weapon statistics.

## 2. Update the Embedded Data

Regenerate `data.js` with the new CSV data:

```javascript
// data.js should contain:
const WEAPON_DATA_CSV = `
[paste CSV contents here]
`;
```

## 3. Update the Configuration

Open `app.js` and update the `DATA_CONFIG` object at the top of the file:

```javascript
const DATA_CONFIG = {
    lastUpdated: '2024-10-21',  // ← Update this date (YYYY-MM-DD format)
    sourceUrl: 'https://docs.google.com/spreadsheets/d/1nfde_76i6hi45UG_YrD9F-o3QjxZXYCE2q_kEkCEYig/edit?usp=sharing',
    sourceAuthor: 'u/Mastahamma'
};
```

Change the `lastUpdated` date to the current date or the date when the source data was updated.

## 4. Test Locally

Open `index.html` in your browser and verify:
- The footer shows the correct "Data updated [date]"
- All weapon stats are displaying correctly
- Charts and comparisons work as expected

## 5. Commit and Push

```bash
git add data.csv data.js app.js
git commit -m "Update weapon data - [Date]"
git push
```

The changes will be live on GitHub Pages within 1-2 minutes!

## Format Notes

- **Date Format**: Use `YYYY-MM-DD` format (e.g., `2024-10-21`)
- **Display Format**: The footer will automatically format it as "Oct 21, 2024"
- **Source URL**: Only update if the Google Sheets URL changes
- **Author**: Only update if attribution changes

## Quick Reference

| File | What to Update |
|------|----------------|
| `data.csv` | Raw weapon statistics |
| `data.js` | Embedded copy of CSV for web |
| `app.js` | `DATA_CONFIG.lastUpdated` date |

---

**Source Data:** [BF6 Gun Analysis by Avora](https://docs.google.com/spreadsheets/d/1nfde_76i6hi45UG_YrD9F-o3QjxZXYCE2q_kEkCEYig/edit?usp=sharing)

