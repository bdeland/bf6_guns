# 🚀 Quick Setup Guide

Get the weapon statistics analysis running in 5 minutes!

## Prerequisites

- Python 3.8 or higher
- pip (Python package installer)
- Git (for cloning the repository)

## Installation Steps

### Option 1: Quick Start (Recommended)

```bash
# Clone the repository
git clone https://github.com/yourusername/weapon-statistics-analysis.git
cd weapon-statistics-analysis

# Install dependencies
pip install -r requirements.txt

# Run the analysis
python analyze_weapons.py
```

### Option 2: Using Virtual Environment (Best Practice)

#### Windows
```bash
# Clone the repository
git clone https://github.com/yourusername/weapon-statistics-analysis.git
cd weapon-statistics-analysis

# Create virtual environment
python -m venv venv

# Activate virtual environment
venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Run the analysis
python analyze_weapons.py
```

#### macOS/Linux
```bash
# Clone the repository
git clone https://github.com/yourusername/weapon-statistics-analysis.git
cd weapon-statistics-analysis

# Create virtual environment
python3 -m venv venv

# Activate virtual environment
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Run the analysis
python analyze_weapons.py
```

## What to Expect

When you run the analysis, you'll see:

1. **Console Output** with:
   - Best and worst performers at each metric
   - Statistical outliers
   - Weapon class comparisons
   - Top 10 overall weapons

2. **Generated Files** in `analysis_output/`:
   - 9 high-resolution PNG charts (300 DPI)
   - Each chart focuses on a different aspect of weapon performance

3. **Processing Time**: 
   - Typically 10-30 seconds depending on your system
   - Warnings about matplotlib are normal and can be ignored

## Troubleshooting

### "No module named 'pandas'" or similar errors

**Solution**: Install the required packages:
```bash
pip install pandas matplotlib seaborn numpy scipy
```

### "Permission denied" errors

**Solution**: Use `--user` flag:
```bash
pip install --user pandas matplotlib seaborn numpy scipy
```

### "Python not found" on Windows

**Solution**: Install Python from [python.org](https://www.python.org/downloads/) and check "Add Python to PATH" during installation.

### Charts not displaying properly

**Solution**: Make sure you have a GUI backend for matplotlib. On Linux, you might need:
```bash
sudo apt-get install python3-tk  # Ubuntu/Debian
```

### UTF-8 encoding errors (Windows)

The script automatically handles this, but if you see encoding errors, try:
```bash
chcp 65001  # Change Windows console to UTF-8
python analyze_weapons.py
```

## Viewing Results

### Console Output
All statistics and findings are printed directly to your console during execution.

### Visualizations
Open any PNG file in `analysis_output/` with your preferred image viewer:
- Windows: Double-click the file
- macOS: Open with Preview
- Linux: Use `eog`, `feh`, or your default image viewer

### Written Report
Open `ANALYSIS_SUMMARY.md` in any markdown viewer or text editor for the complete written analysis.

## Customizing the Analysis

### Modifying the Dataset

1. Edit `data.csv` with your own weapon data
2. Keep the same column structure
3. Run `python analyze_weapons.py` again

### Changing Visualization Settings

Edit `analyze_weapons.py`:

```python
# Line 14-15: Change figure sizes
plt.rcParams['figure.figsize'] = (12, 8)  # Modify these numbers

# Line 67+: Change DPI (resolution)
plt.savefig('analysis_output/1_ttk_analysis.png', dpi=300)  # Change 300 to your preferred DPI
```

### Adding New Metrics

1. Add columns to `data.csv`
2. Add analysis sections to `analyze_weapons.py`
3. Follow the existing pattern for consistency

## Next Steps

✅ Run the analysis successfully  
✅ Explore the generated visualizations  
✅ Read the detailed findings in `ANALYSIS_SUMMARY.md`  
✅ Customize the analysis for your needs  
✅ Share your findings!  

## Need Help?

- 📖 Check [README.md](README.md) for detailed information
- 📊 See [ANALYSIS_SUMMARY.md](ANALYSIS_SUMMARY.md) for complete findings
- 🐛 Open an issue on GitHub if you encounter problems
- 💡 Suggest improvements via pull requests

## System Requirements

- **RAM**: 512 MB minimum (1 GB recommended)
- **Storage**: 50 MB for repository + dependencies
- **OS**: Windows 7+, macOS 10.12+, or any modern Linux distribution
- **Python**: Version 3.8 or higher

## Performance Tips

- **Faster Processing**: Close other applications while running
- **Better Quality**: Increase DPI to 600 for publication-quality charts
- **Less Output**: Comment out analyses you don't need in the script

---

🎉 **You're all set!** Run the analysis and explore weapon statistics like never before!

