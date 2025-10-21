import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
import numpy as np
from scipy import stats
import sys
import io

# Set UTF-8 encoding for console output on Windows
if sys.platform == 'win32':
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

# Set style for better-looking plots
sns.set_style("whitegrid")
plt.rcParams['figure.figsize'] = (12, 8)

# Load the data
print("Loading data...")
df = pd.read_csv('data.csv')

# Clean the data - remove explanation columns and rows
df = df.iloc[:, :22]  # Keep only the first 22 columns (before explanations)
df = df.dropna(subset=['Weapon'])  # Remove rows without weapon names

# Convert numeric columns
numeric_cols = df.columns[2:]  # All columns except Weapon and Weapon Class
for col in numeric_cols:
    df[col] = pd.to_numeric(df[col], errors='coerce')

print(f"\nDataset Overview:")
print(f"Total Weapons: {len(df)}")
print(f"\nWeapon Classes Distribution:")
print(df['Weapon Class'].value_counts())

# Create output directory for plots
import os
os.makedirs('analysis_output', exist_ok=True)

# ============================================================================
# ANALYSIS 1: TTK (Time to Kill) Performance
# ============================================================================
print("\n" + "="*80)
print("ANALYSIS 1: TIME TO KILL (TTK) PERFORMANCE")
print("="*80)

fig, axes = plt.subplots(2, 2, figsize=(16, 12))
fig.suptitle('Time to Kill Analysis Across Distances', fontsize=16, fontweight='bold')

distances = ['TTK at 0 m, ms', 'TTK at 20 m, ms', 'TTK at 35 m, ms', 'TTK at 75 m, ms']
distance_labels = ['0m', '20m', '35m', '75m']

for idx, (dist, label) in enumerate(zip(distances, distance_labels)):
    ax = axes[idx // 2, idx % 2]
    
    # Sort by TTK
    sorted_df = df.sort_values(dist)
    top_5 = sorted_df.head(5)
    bottom_5 = sorted_df.tail(5)
    
    # Plot
    colors = ['green' if x in top_5['Weapon'].values else 'red' if x in bottom_5['Weapon'].values else 'gray' 
              for x in df['Weapon']]
    
    ax.barh(range(len(df)), df.sort_values(dist)[dist], color=colors, alpha=0.7)
    ax.set_yticks(range(len(df)))
    ax.set_yticklabels(df.sort_values(dist)['Weapon'], fontsize=8)
    ax.set_xlabel('TTK (milliseconds)', fontsize=10)
    ax.set_title(f'TTK at {label} (Green=Best 5, Red=Worst 5)', fontsize=12, fontweight='bold')
    ax.invert_yaxis()

plt.tight_layout()
plt.savefig('analysis_output/1_ttk_analysis.png', dpi=300, bbox_inches='tight')
print("✓ Saved: 1_ttk_analysis.png")

# Best and Worst performers
print(f"\n🎯 BEST TTK at 0m:")
for idx, row in df.nsmallest(5, 'TTK at 0 m, ms').iterrows():
    print(f"  {row['Weapon']:20s} ({row['Weapon Class']:3s}): {row['TTK at 0 m, ms']:.0f}ms")

print(f"\n❌ WORST TTK at 0m:")
for idx, row in df.nlargest(5, 'TTK at 0 m, ms').iterrows():
    print(f"  {row['Weapon']:20s} ({row['Weapon Class']:3s}): {row['TTK at 0 m, ms']:.0f}ms")

# ============================================================================
# ANALYSIS 2: Power Scores Comparison
# ============================================================================
print("\n" + "="*80)
print("ANALYSIS 2: POWER SCORES (Accuracy-Adjusted Performance)")
print("="*80)

fig, axes = plt.subplots(2, 2, figsize=(16, 12))
fig.suptitle('Power Score Analysis (Lower is Better)', fontsize=16, fontweight='bold')

power_scores = ['20 m Power Score', '21 m Power Score', '35 m Power Score', '75 m Power Score']
power_labels = ['20m', '21m', '35m', '75m']

for idx, (score, label) in enumerate(zip(power_scores, power_labels)):
    ax = axes[idx // 2, idx % 2]
    
    # Create scatter plot by weapon class
    for weapon_class in df['Weapon Class'].unique():
        class_data = df[df['Weapon Class'] == weapon_class]
        ax.scatter(class_data.index, class_data[score], label=weapon_class, s=100, alpha=0.7)
    
    ax.set_xlabel('Weapon Index', fontsize=10)
    ax.set_ylabel('Power Score', fontsize=10)
    ax.set_title(f'{label} Power Score by Class', fontsize=12, fontweight='bold')
    ax.legend()
    ax.grid(True, alpha=0.3)

plt.tight_layout()
plt.savefig('analysis_output/2_power_scores.png', dpi=300, bbox_inches='tight')
print("✓ Saved: 2_power_scores.png")

# Best Power Scores
print(f"\n🏆 TOP 5 Overall Power Score (20m - Most Important):")
for idx, row in df.nsmallest(5, '20 m Power Score').iterrows():
    print(f"  {row['Weapon']:20s} ({row['Weapon Class']:3s}): {row['20 m Power Score']:.0f}")

# ============================================================================
# ANALYSIS 3: RPM vs TTK Relationship
# ============================================================================
print("\n" + "="*80)
print("ANALYSIS 3: RPM (Rate of Fire) vs TTK RELATIONSHIP")
print("="*80)

fig, axes = plt.subplots(2, 2, figsize=(16, 12))
fig.suptitle('RPM vs TTK at Different Ranges', fontsize=16, fontweight='bold')

for idx, (dist, label) in enumerate(zip(distances, distance_labels)):
    ax = axes[idx // 2, idx % 2]
    
    for weapon_class in df['Weapon Class'].unique():
        class_data = df[df['Weapon Class'] == weapon_class]
        ax.scatter(class_data['RPM'], class_data[dist], label=weapon_class, s=100, alpha=0.7)
        
        # Add weapon names for outliers
        q1 = class_data[dist].quantile(0.25)
        q3 = class_data[dist].quantile(0.75)
        iqr = q3 - q1
        outliers = class_data[(class_data[dist] < q1 - 1.5*iqr) | (class_data[dist] > q3 + 1.5*iqr)]
        for _, outlier in outliers.iterrows():
            ax.annotate(outlier['Weapon'], (outlier['RPM'], outlier[dist]), 
                       fontsize=7, alpha=0.7)
    
    ax.set_xlabel('RPM (Rounds Per Minute)', fontsize=10)
    ax.set_ylabel(f'TTK at {label} (ms)', fontsize=10)
    ax.set_title(f'RPM vs TTK at {label}', fontsize=12, fontweight='bold')
    ax.legend()
    ax.grid(True, alpha=0.3)
    
    # Add correlation coefficient
    corr = df['RPM'].corr(df[dist])
    ax.text(0.05, 0.95, f'Correlation: {corr:.3f}', transform=ax.transAxes, 
            verticalalignment='top', bbox=dict(boxstyle='round', facecolor='wheat', alpha=0.5))

plt.tight_layout()
plt.savefig('analysis_output/3_rpm_vs_ttk.png', dpi=300, bbox_inches='tight')
print("✓ Saved: 3_rpm_vs_ttk.png")

print(f"\n🔥 Highest RPM Weapons:")
for idx, row in df.nlargest(5, 'RPM').iterrows():
    print(f"  {row['Weapon']:20s} ({row['Weapon Class']:3s}): {row['RPM']:.0f} RPM")

print(f"\n🐌 Lowest RPM Weapons:")
for idx, row in df.nsmallest(5, 'RPM').iterrows():
    print(f"  {row['Weapon']:20s} ({row['Weapon Class']:3s}): {row['RPM']:.0f} RPM")

# ============================================================================
# ANALYSIS 4: Accuracy Coefficients
# ============================================================================
print("\n" + "="*80)
print("ANALYSIS 4: ACCURACY ANALYSIS")
print("="*80)

fig, axes = plt.subplots(2, 2, figsize=(16, 12))
fig.suptitle('Accuracy Coefficient Analysis', fontsize=16, fontweight='bold')

# Burst Accuracy
ax = axes[0, 0]
df_sorted = df.sort_values('Burst Accuracy Coefficient', ascending=False)
colors = ['green' if i < 5 else 'red' if i >= len(df)-5 else 'steelblue' 
          for i in range(len(df))]
ax.barh(range(len(df)), df_sorted['Burst Accuracy Coefficient'], color=colors, alpha=0.7)
ax.set_yticks(range(len(df)))
ax.set_yticklabels(df_sorted['Weapon'], fontsize=8)
ax.set_xlabel('Burst Accuracy Coefficient', fontsize=10)
ax.set_title('Burst Accuracy (Higher = Better)', fontsize=12, fontweight='bold')
ax.invert_yaxis()

# CQB Accuracy
ax = axes[0, 1]
df_sorted = df.sort_values('CQB Accuracy Coefficient', ascending=False)
colors = ['green' if i < 5 else 'red' if i >= len(df)-5 else 'orange' 
          for i in range(len(df))]
ax.barh(range(len(df)), df_sorted['CQB Accuracy Coefficient'], color=colors, alpha=0.7)
ax.set_yticks(range(len(df)))
ax.set_yticklabels(df_sorted['Weapon'], fontsize=8)
ax.set_xlabel('CQB Accuracy Coefficient', fontsize=10)
ax.set_title('CQB Accuracy (Higher = Better)', fontsize=12, fontweight='bold')
ax.invert_yaxis()

# Long Range Accuracy
ax = axes[1, 0]
df_sorted = df.sort_values('Long Range Accuracy Coefficient', ascending=False)
colors = ['green' if i < 5 else 'red' if i >= len(df)-5 else 'purple' 
          for i in range(len(df))]
ax.barh(range(len(df)), df_sorted['Long Range Accuracy Coefficient'], color=colors, alpha=0.7)
ax.set_yticks(range(len(df)))
ax.set_yticklabels(df_sorted['Weapon'], fontsize=8)
ax.set_xlabel('Long Range Accuracy Coefficient', fontsize=10)
ax.set_title('Long Range Accuracy (Higher = Better)', fontsize=12, fontweight='bold')
ax.invert_yaxis()

# Burst Hits vs BTK
ax = axes[1, 1]
for weapon_class in df['Weapon Class'].unique():
    class_data = df[df['Weapon Class'] == weapon_class]
    ax.scatter(class_data['BTK at 20'], class_data['Burst Hits'], 
              label=weapon_class, s=100, alpha=0.7)
ax.set_xlabel('BTK at 20m', fontsize=10)
ax.set_ylabel('Average Burst Hits', fontsize=10)
ax.set_title('Burst Hits vs BTK (Efficiency)', fontsize=12, fontweight='bold')
ax.legend()
ax.grid(True, alpha=0.3)

plt.tight_layout()
plt.savefig('analysis_output/4_accuracy_analysis.png', dpi=300, bbox_inches='tight')
print("✓ Saved: 4_accuracy_analysis.png")

print(f"\n🎯 MOST ACCURATE (Burst):")
for idx, row in df.nlargest(5, 'Burst Accuracy Coefficient').iterrows():
    print(f"  {row['Weapon']:20s} ({row['Weapon Class']:3s}): {row['Burst Accuracy Coefficient']:.2f}")

print(f"\n🔫 LEAST ACCURATE (Burst):")
for idx, row in df.nsmallest(5, 'Burst Accuracy Coefficient').iterrows():
    print(f"  {row['Weapon']:20s} ({row['Weapon Class']:3s}): {row['Burst Accuracy Coefficient']:.2f}")

# ============================================================================
# ANALYSIS 5: Weapon Class Comparison
# ============================================================================
print("\n" + "="*80)
print("ANALYSIS 5: WEAPON CLASS COMPARISON")
print("="*80)

fig, axes = plt.subplots(2, 3, figsize=(18, 12))
fig.suptitle('Weapon Class Performance Comparison', fontsize=16, fontweight='bold')

metrics = ['RPM', 'TTK at 20 m, ms', '20 m Power Score', 
           'Burst Accuracy Coefficient', 'Velocity, ms', 'fire interval ms']
titles = ['Rate of Fire', 'TTK at 20m', '20m Power Score', 
          'Burst Accuracy', 'Projectile Velocity', 'Fire Interval']

for idx, (metric, title) in enumerate(zip(metrics, titles)):
    ax = axes[idx // 3, idx % 3]
    
    # Box plot by weapon class
    weapon_classes = df['Weapon Class'].unique()
    data_by_class = [df[df['Weapon Class'] == wc][metric].dropna() for wc in weapon_classes]
    
    bp = ax.boxplot(data_by_class, labels=weapon_classes, patch_artist=True)
    
    # Color the boxes
    colors = plt.cm.Set3(range(len(weapon_classes)))
    for patch, color in zip(bp['boxes'], colors):
        patch.set_facecolor(color)
    
    ax.set_ylabel(title, fontsize=10)
    ax.set_xlabel('Weapon Class', fontsize=10)
    ax.set_title(f'{title} by Class', fontsize=12, fontweight='bold')
    ax.grid(True, alpha=0.3, axis='y')

plt.tight_layout()
plt.savefig('analysis_output/5_class_comparison.png', dpi=300, bbox_inches='tight')
print("✓ Saved: 5_class_comparison.png")

# Class statistics
print(f"\nWeapon Class Statistics:")
for weapon_class in df['Weapon Class'].unique():
    class_data = df[df['Weapon Class'] == weapon_class]
    print(f"\n{weapon_class}:")
    print(f"  Count: {len(class_data)}")
    print(f"  Avg RPM: {class_data['RPM'].mean():.0f}")
    print(f"  Avg TTK@20m: {class_data['TTK at 20 m, ms'].mean():.0f}ms")
    print(f"  Avg 20m Power Score: {class_data['20 m Power Score'].mean():.0f}")
    print(f"  Avg Burst Accuracy: {class_data['Burst Accuracy Coefficient'].mean():.3f}")

# ============================================================================
# ANALYSIS 6: Damage Falloff Analysis
# ============================================================================
print("\n" + "="*80)
print("ANALYSIS 6: DAMAGE FALLOFF ANALYSIS")
print("="*80)

fig, axes = plt.subplots(2, 2, figsize=(16, 12))
fig.suptitle('Damage Falloff Characteristics', fontsize=16, fontweight='bold')

# BTK progression across ranges
ax = axes[0, 0]
ranges = ['BTK at 0', 'BTK at 20', 'BTK at 35', 'BTK at 75']
for idx, row in df.iterrows():
    btk_values = [row['BTK at 0'], row['BTK at 20'], row['BTK at 35'], row['BTK at 75']]
    ax.plot([0, 20, 35, 75], btk_values, marker='o', alpha=0.5, linewidth=1)
ax.set_xlabel('Distance (m)', fontsize=10)
ax.set_ylabel('Bullets To Kill', fontsize=10)
ax.set_title('BTK Falloff by Distance', fontsize=12, fontweight='bold')
ax.grid(True, alpha=0.3)

# TTK progression
ax = axes[0, 1]
for idx, row in df.iterrows():
    ttk_values = [row['TTK at 0 m, ms'], row['TTK at 20 m, ms'], 
                  row['TTK at 35 m, ms'], row['TTK at 75 m, ms']]
    ax.plot([0, 20, 35, 75], ttk_values, marker='o', alpha=0.5, linewidth=1)
ax.set_xlabel('Distance (m)', fontsize=10)
ax.set_ylabel('Time To Kill (ms)', fontsize=10)
ax.set_title('TTK Progression by Distance', fontsize=12, fontweight='bold')
ax.grid(True, alpha=0.3)

# Calculate "consistency" - variance in BTK across ranges
ax = axes[1, 0]
df['BTK_Variance'] = df[['BTK at 0', 'BTK at 20', 'BTK at 35', 'BTK at 75']].var(axis=1)
df_sorted = df.sort_values('BTK_Variance')
colors = ['green' if x < 0.5 else 'yellow' if x < 1.0 else 'red' 
          for x in df_sorted['BTK_Variance']]
ax.barh(range(len(df)), df_sorted['BTK_Variance'], color=colors, alpha=0.7)
ax.set_yticks(range(len(df)))
ax.set_yticklabels(df_sorted['Weapon'], fontsize=8)
ax.set_xlabel('BTK Variance', fontsize=10)
ax.set_title('Damage Consistency (Lower = More Consistent)', fontsize=12, fontweight='bold')
ax.invert_yaxis()

# Power Score progression
ax = axes[1, 1]
power_ranges = [20, 21, 35, 75]
for idx, row in df.iterrows():
    power_values = [row['20 m Power Score'], row['21 m Power Score'], 
                    row['35 m Power Score'], row['75 m Power Score']]
    ax.plot(power_ranges, power_values, marker='o', alpha=0.5, linewidth=1)
ax.set_xlabel('Distance (m)', fontsize=10)
ax.set_ylabel('Power Score', fontsize=10)
ax.set_title('Power Score Degradation', fontsize=12, fontweight='bold')
ax.grid(True, alpha=0.3)

plt.tight_layout()
plt.savefig('analysis_output/6_damage_falloff.png', dpi=300, bbox_inches='tight')
print("✓ Saved: 6_damage_falloff.png")

print(f"\n🎖️  MOST CONSISTENT Damage (Low BTK Variance):")
for idx, row in df.nsmallest(5, 'BTK_Variance').iterrows():
    print(f"  {row['Weapon']:20s} ({row['Weapon Class']:3s}): Variance={row['BTK_Variance']:.3f}")

print(f"\n📉 LEAST CONSISTENT Damage (High BTK Variance):")
for idx, row in df.nlargest(5, 'BTK_Variance').iterrows():
    print(f"  {row['Weapon']:20s} ({row['Weapon Class']:3s}): Variance={row['BTK_Variance']:.3f}")

# ============================================================================
# ANALYSIS 7: Practical Lethality Coefficient
# ============================================================================
print("\n" + "="*80)
print("ANALYSIS 7: PRACTICAL LETHALITY COEFFICIENT")
print("="*80)

fig, axes = plt.subplots(1, 2, figsize=(16, 6))
fig.suptitle('Practical Lethality Analysis', fontsize=16, fontweight='bold')

# Lethality coefficient ranking
ax = axes[0]
df_lethality = df.dropna(subset=['practical lethality coefficient'])
df_sorted = df_lethality.sort_values('practical lethality coefficient')
colors = ['green' if i < 5 else 'red' if i >= len(df_sorted)-5 else 'steelblue' 
          for i in range(len(df_sorted))]
ax.barh(range(len(df_sorted)), df_sorted['practical lethality coefficient'], 
        color=colors, alpha=0.7)
ax.set_yticks(range(len(df_sorted)))
ax.set_yticklabels(df_sorted['Weapon'], fontsize=8)
ax.set_xlabel('Practical Lethality Coefficient', fontsize=10)
ax.set_title('Practical Lethality Ranking', fontsize=12, fontweight='bold')
ax.invert_yaxis()

# Lethality by class
ax = axes[1]
weapon_classes = df_lethality['Weapon Class'].unique()
lethality_by_class = [df_lethality[df_lethality['Weapon Class'] == wc]['practical lethality coefficient'].dropna() 
                      for wc in weapon_classes]
bp = ax.boxplot(lethality_by_class, labels=weapon_classes, patch_artist=True)
colors = plt.cm.Set3(range(len(weapon_classes)))
for patch, color in zip(bp['boxes'], colors):
    patch.set_facecolor(color)
ax.set_ylabel('Practical Lethality Coefficient', fontsize=10)
ax.set_xlabel('Weapon Class', fontsize=10)
ax.set_title('Lethality by Weapon Class', fontsize=12, fontweight='bold')
ax.grid(True, alpha=0.3, axis='y')

plt.tight_layout()
plt.savefig('analysis_output/7_lethality.png', dpi=300, bbox_inches='tight')
print("✓ Saved: 7_lethality.png")

print(f"\n💀 HIGHEST Practical Lethality:")
for idx, row in df_lethality.nlargest(5, 'practical lethality coefficient').iterrows():
    print(f"  {row['Weapon']:20s} ({row['Weapon Class']:3s}): {row['practical lethality coefficient']:.3f}")

print(f"\n🛡️  LOWEST Practical Lethality:")
for idx, row in df_lethality.nsmallest(5, 'practical lethality coefficient').iterrows():
    print(f"  {row['Weapon']:20s} ({row['Weapon Class']:3s}): {row['practical lethality coefficient']:.3f}")

# ============================================================================
# ANALYSIS 8: Velocity Analysis
# ============================================================================
print("\n" + "="*80)
print("ANALYSIS 8: PROJECTILE VELOCITY ANALYSIS")
print("="*80)

fig, axes = plt.subplots(1, 2, figsize=(16, 6))
fig.suptitle('Projectile Velocity Analysis', fontsize=16, fontweight='bold')

# Velocity by weapon
ax = axes[0]
df_sorted = df.sort_values('Velocity, ms', ascending=False)
colors_map = {'LMG': 'red', 'AR': 'blue', 'SMG': 'green', 'CRB': 'orange'}
colors = [colors_map[wc] for wc in df_sorted['Weapon Class']]
ax.barh(range(len(df)), df_sorted['Velocity, ms'], color=colors, alpha=0.7)
ax.set_yticks(range(len(df)))
ax.set_yticklabels(df_sorted['Weapon'], fontsize=8)
ax.set_xlabel('Velocity (m/s)', fontsize=10)
ax.set_title('Projectile Velocity by Weapon', fontsize=12, fontweight='bold')
ax.invert_yaxis()

# Create legend
from matplotlib.patches import Patch
legend_elements = [Patch(facecolor=colors_map[wc], alpha=0.7, label=wc) 
                   for wc in colors_map.keys()]
ax.legend(handles=legend_elements, loc='lower right')

# Velocity vs TTK at long range
ax = axes[1]
for weapon_class in df['Weapon Class'].unique():
    class_data = df[df['Weapon Class'] == weapon_class]
    ax.scatter(class_data['Velocity, ms'], class_data['TTK at 75 m, ms'], 
              label=weapon_class, s=100, alpha=0.7)
ax.set_xlabel('Velocity (m/s)', fontsize=10)
ax.set_ylabel('TTK at 75m (ms)', fontsize=10)
ax.set_title('Velocity vs Long Range TTK', fontsize=12, fontweight='bold')
ax.legend()
ax.grid(True, alpha=0.3)

# Correlation
corr = df['Velocity, ms'].corr(df['TTK at 75 m, ms'])
ax.text(0.05, 0.95, f'Correlation: {corr:.3f}', transform=ax.transAxes, 
        verticalalignment='top', bbox=dict(boxstyle='round', facecolor='wheat', alpha=0.5))

plt.tight_layout()
plt.savefig('analysis_output/8_velocity.png', dpi=300, bbox_inches='tight')
print("✓ Saved: 8_velocity.png")

print(f"\n🚀 FASTEST Projectile Velocity:")
for idx, row in df.nlargest(5, 'Velocity, ms').iterrows():
    print(f"  {row['Weapon']:20s} ({row['Weapon Class']:3s}): {row['Velocity, ms']:.0f} m/s")

print(f"\n🐢 SLOWEST Projectile Velocity:")
for idx, row in df.nsmallest(5, 'Velocity, ms').iterrows():
    print(f"  {row['Weapon']:20s} ({row['Weapon Class']:3s}): {row['Velocity, ms']:.0f} m/s")

# ============================================================================
# ANALYSIS 9: Outlier Detection
# ============================================================================
print("\n" + "="*80)
print("ANALYSIS 9: OUTLIER DETECTION")
print("="*80)

# Detect outliers using Z-score method
print("\n🔍 Statistical Outliers (Z-score > 2):\n")

outlier_metrics = ['RPM', 'TTK at 20 m, ms', '20 m Power Score', 
                   'Burst Accuracy Coefficient', 'Velocity, ms']

for metric in outlier_metrics:
    z_scores = np.abs(stats.zscore(df[metric].dropna()))
    outliers = df[z_scores > 2]
    
    if len(outliers) > 0:
        print(f"\n{metric}:")
        for idx, row in outliers.iterrows():
            z = z_scores[df.index.get_loc(idx)]
            print(f"  {row['Weapon']:20s} ({row['Weapon Class']:3s}): "
                  f"{row[metric]:.2f} (Z-score: {z:.2f})")

# ============================================================================
# ANALYSIS 10: Correlation Heatmap
# ============================================================================
print("\n" + "="*80)
print("ANALYSIS 10: CORRELATION ANALYSIS")
print("="*80)

# Select key numeric columns for correlation
corr_cols = ['RPM', 'fire interval ms', 'Velocity, ms', 'TTK at 0 m, ms', 
             'TTK at 20 m, ms', 'TTK at 35 m, ms', 'TTK at 75 m, ms',
             'Burst Accuracy Coefficient', 'CQB Accuracy Coefficient', 
             'Long Range Accuracy Coefficient', '20 m Power Score']

corr_matrix = df[corr_cols].corr()

fig, ax = plt.subplots(figsize=(14, 12))
sns.heatmap(corr_matrix, annot=True, fmt='.2f', cmap='coolwarm', center=0,
            square=True, linewidths=1, cbar_kws={"shrink": 0.8})
plt.title('Correlation Heatmap of Weapon Metrics', fontsize=16, fontweight='bold', pad=20)
plt.tight_layout()
plt.savefig('analysis_output/9_correlation_heatmap.png', dpi=300, bbox_inches='tight')
print("✓ Saved: 9_correlation_heatmap.png")

# Find strongest correlations
print("\n📊 Strongest Positive Correlations:")
corr_pairs = []
for i in range(len(corr_matrix.columns)):
    for j in range(i+1, len(corr_matrix.columns)):
        corr_pairs.append((corr_matrix.columns[i], corr_matrix.columns[j], 
                          corr_matrix.iloc[i, j]))

corr_pairs_sorted = sorted(corr_pairs, key=lambda x: abs(x[2]), reverse=True)
for i in range(min(5, len(corr_pairs_sorted))):
    metric1, metric2, corr_val = corr_pairs_sorted[i]
    print(f"  {metric1} <-> {metric2}: {corr_val:.3f}")

# ============================================================================
# SUMMARY STATISTICS
# ============================================================================
print("\n" + "="*80)
print("FINAL SUMMARY STATISTICS")
print("="*80)

summary_stats = df[['RPM', 'TTK at 20 m, ms', '20 m Power Score', 
                     'Burst Accuracy Coefficient', 'Velocity, ms']].describe()
print("\n", summary_stats.to_string())

# Overall weapon recommendations
print("\n" + "="*80)
print("🏆 OVERALL BEST WEAPONS (Multi-Metric Analysis)")
print("="*80)

# Calculate a composite score (normalized)
df['composite_score'] = (
    (1 - (df['20 m Power Score'] - df['20 m Power Score'].min()) / 
     (df['20 m Power Score'].max() - df['20 m Power Score'].min())) * 0.4 +  # 40% weight
    (df['Burst Accuracy Coefficient'] / df['Burst Accuracy Coefficient'].max()) * 0.3 +  # 30% weight
    (df['RPM'] / df['RPM'].max()) * 0.15 +  # 15% weight
    (df['Velocity, ms'] / df['Velocity, ms'].max()) * 0.15  # 15% weight
)

print("\nTop 10 Overall Weapons (Balanced Performance):")
for idx, row in df.nlargest(10, 'composite_score').iterrows():
    print(f"{int(idx)+1:2d}. {row['Weapon']:20s} ({row['Weapon Class']:3s}) - "
          f"Score: {row['composite_score']:.3f}")

print("\n✅ Analysis complete! All charts saved to 'analysis_output/' directory")
print("\nGenerated 9 detailed visualizations:")
print("  1. TTK Analysis across distances")
print("  2. Power Scores comparison")
print("  3. RPM vs TTK relationships")
print("  4. Accuracy coefficients analysis")
print("  5. Weapon class comparison")
print("  6. Damage falloff characteristics")
print("  7. Practical lethality")
print("  8. Projectile velocity analysis")
print("  9. Correlation heatmap")

