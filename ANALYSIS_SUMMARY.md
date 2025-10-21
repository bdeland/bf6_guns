# Weapons Data Analysis Summary Report

## Dataset Overview
- **Total Weapons**: 31
- **Weapon Classes**: 
  - LMG (Light Machine Gun): 8 weapons
  - AR (Assault Rifle): 8 weapons
  - SMG (Submachine Gun): 8 weapons
  - CRB (Carbine): 7 weapons

---

## 🏆 TOP PERFORMERS

### Best Overall Weapons (Composite Score)
Based on balanced performance across multiple metrics (20m Power Score, Burst Accuracy, RPM, Velocity):

1. **M240L (LMG)** - Score: 0.878
2. **M123K (LMG)** - Score: 0.857
3. **M/60 (LMG)** - Score: 0.855
4. **DRS-IAR (LMG)** - Score: 0.841
5. **L110 (LMG)** - Score: 0.827

**Key Insight**: LMGs dominate the overall rankings due to excellent accuracy and solid TTK performance.

### Fastest Time to Kill (0m)
1. **SCW-10 (SMG)** - 150ms
2. **TR-7 (AR)** - 167ms
3. **KV9 (SMG)** - 167ms
4. **SG 53R (CRB)** - 167ms
5. **NVO-228E (AR)** - 183ms

### Best 20m Power Score (Most Important Metric)
1. **M240L (LMG)** - 238
2. **TR-7 (AR)** - 253
3. **M123K (LMG)** - 261
4. **M/60 (LMG)** - 261
5. **DRS-IAR (LMG)** - 273

---

## ⚠️ OUTLIERS & UNIQUE CHARACTERISTICS

### Statistical Outliers (Z-score > 2)

**KV9 (SMG)** - Multiple outlier characteristics:
- Highest RPM: 1,080 (Z-score: 2.60) - *Extremely fast fire rate*
- Slowest Projectile Velocity: 348 m/s (Z-score: 2.31) - *Significant weakness*

**TR-7 (AR)** - Outlier TTK:
- Exceptional TTK at 20m: 198ms (Z-score: 2.03)
- Despite lower burst accuracy (0.60), still performs excellently

**M277 (CRB)** - Accuracy Outlier:
- Lowest Burst Accuracy: 0.52 (Z-score: 2.21)
- Compensated by consistent damage (0.000 BTK variance)

**AK-205 (CRB)**:
- Worst TTK at 20m: 444ms (Z-score: 2.44)
- Highest BTK requirement (5-7 bullets)

---

## 📊 WEAPON CLASS ANALYSIS

### LMG (Light Machine Guns)
- **Strengths**: 
  - Highest average accuracy (0.945 Burst Accuracy)
  - Excellent 20m Power Scores (avg: 294)
  - Most consistent performance
- **Weaknesses**: 
  - Moderate fire rate (avg: 647 RPM)
- **Best Pick**: **M240L**

### AR (Assault Rifles)
- **Strengths**: 
  - Best TTK at 20m (avg: 279ms)
  - Balanced performance across ranges
- **Weaknesses**: 
  - Lower accuracy than LMGs (0.809 avg)
- **Best Pick**: **TR-7**

### SMG (Submachine Guns)
- **Strengths**: 
  - Highest fire rate (avg: 830 RPM)
  - Good close-range TTK
  - Excellent accuracy (0.914 avg)
- **Weaknesses**: 
  - Worst long-range performance
  - Lowest projectile velocity
  - Highest 20m Power Score (361 - worse is higher)
- **Best Pick**: **SCW-10**

### CRB (Carbines)
- **Strengths**: 
  - Highest Practical Lethality Coefficients
  - Versatile mid-range weapons
- **Weaknesses**: 
  - Lowest burst accuracy (0.687 avg)
  - Worst 20m Power Scores (avg: 393)
  - Inconsistent damage falloff
- **Best Pick**: **M277** or **QBZ**

---

## 🎯 ACCURACY INSIGHTS

### Most Accurate Weapons (Burst Accuracy = 1.00)
These weapons have perfect burst control where every bullet hits within BTK range:
- M/60 (LMG)
- SOR-556 MK2 (AR)
- RPKM (LMG)
- KTS100 MK8 (LMG)
- SL9 (SMG)
- AK-205 (CRB)

### Least Accurate Weapons
These require significant recoil control:
1. **M277 (CRB)** - 0.52
2. **M433 (AR)** - 0.57
3. **TR-7 (AR)** - 0.60 (still performs well due to other strengths)
4. **M4A1 (CRB)** - 0.60
5. **M417 A2 (CRB)** - 0.64

**Note**: Lower accuracy can be compensated by higher damage per shot and faster fire rate.

---

## 🚀 RATE OF FIRE & VELOCITY

### Fastest Fire Rate
1. **KV9 (SMG)** - 1,080 RPM (extreme outlier)
2. **PW7A2 (SMG)** - 947 RPM
3. **KORD 6P67 (AR)** - 900 RPM
4. **M4A1 (CRB)** - 900 RPM
5. **USG-90 (SMG)** - 900 RPM

### Slowest Fire Rate
- **M/60, AK4D, KTS100 MK8** - 514 RPM (tied)
- These weapons compensate with high damage per shot

### Fastest Projectile Velocity
1. **KTS100 MK8 (LMG)** - 840 m/s
2. **L85A3 (AR)** - 814 m/s
3. **SOR-556 MK2 (AR)** - 800 m/s

### Slowest Projectile Velocity
- **All SMGs** have significantly lower velocity (348-488 m/s)
- Makes them less effective at long range

---

## 📉 DAMAGE CONSISTENCY

### Most Consistent Damage (BTK Variance = 0.000)
These weapons maintain the same BTK across all ranges:
- **M250 (LMG)**
- **M277 (CRB)**

### Least Consistent Damage (BTK Variance = 1.667)
These weapons have significant damage dropoff:
- **SCW-10 (SMG)** - 3-6 BTK range
- **KV9 (SMG)** - 4-7 BTK range
- **SG 53R (CRB)** - 3-6 BTK range
- **SGX (SMG)** - 4-7 BTK range

---

## 💀 PRACTICAL LETHALITY

### Highest Practical Lethality Coefficient
(Higher = more effective in real combat conditions)
1. **M277 (CRB)** - 0.542
2. **QBZ (CRB)** - 0.525
3. **M4A1 (CRB)** - 0.497
4. **GRT-BC (CRB)** - 0.491
5. **M417 A2 (CRB)** - 0.486

**Insight**: Carbines dominate this metric despite lower burst accuracy, suggesting they perform better under realistic conditions.

### Lowest Practical Lethality
- **M/60 (LMG)** - 0.261
- **M123K (LMG)** - 0.279
- **DRS-IAR (LMG)** - 0.288

---

## 🔗 KEY CORRELATIONS

### Strongest Correlations Found:

1. **Burst Accuracy ↔ Long Range Accuracy**: 0.999
   - Nearly perfect correlation - weapons accurate at close range stay accurate at long range

2. **Burst Accuracy ↔ CQB Accuracy**: 0.997
   - Confirms consistency across engagement ranges

3. **RPM ↔ Fire Interval**: -0.973
   - Perfect inverse relationship (as expected mathematically)

4. **TTK at 20m ↔ TTK at 35m**: 0.918
   - Strong correlation - close-range performance predicts mid-range performance

### Weak/Negative Correlations:
- **RPM vs TTK at different ranges**: -0.28 to -0.40
  - Higher fire rate DOES reduce TTK, but not as strongly as one might expect
  - Accuracy and damage per shot matter significantly

---

## 🎖️ RECOMMENDATIONS BY USE CASE

### **Best for Close Quarters (0-20m)**
1. **M240L (LMG)** - Unmatched 20m power score
2. **TR-7 (AR)** - Fastest AR with excellent TTK
3. **SCW-10 (SMG)** - Fastest TTK at 0m

### **Best for Mid-Range (20-35m)**
1. **M240L (LMG)** - Maintains dominance
2. **TR-7 (AR)** - Exceptional performance
3. **M123K (LMG)** - Strong accuracy and TTK

### **Best for Long Range (75m)**
1. **M240L (LMG)** - Consistently excellent
2. **M/60 (LMG)** - Perfect accuracy maintains effectiveness
3. **KTS100 MK8 (LMG)** - Highest projectile velocity helps at range

### **Best for Beginners (High Accuracy)**
1. **M/60 (LMG)** - Perfect accuracy (1.00)
2. **SOR-556 MK2 (AR)** - Perfect accuracy with good mobility
3. **RPKM (LMG)** - Perfect accuracy, forgiving

### **Best for Aggressive Playstyle**
1. **TR-7 (AR)** - High damage despite recoil
2. **KV9 (SMG)** - Extreme fire rate
3. **M433 (AR)** - High RPM with good mobility

---

## 🔍 INTERESTING FINDINGS

### The "Accuracy Paradox"
- **TR-7** has only 0.60 burst accuracy (poor) but achieves #2 overall ranking
- **M277** has the worst accuracy (0.52) but highest practical lethality (0.542)
- **Conclusion**: High damage per shot can compensate for poor accuracy

### The "SMG Problem"
- SMGs have excellent fire rates and good accuracy
- However, they suffer from:
  - Worst projectile velocity (makes hitting moving targets harder)
  - Highest damage dropoff
  - Only viable for close range combat

### The "LMG Dominance"
- LMGs win overall despite not having the fastest TTK
- Their combination of accuracy, consistency, and all-range effectiveness makes them superior
- Trade-off: Likely lower mobility (not measured in this dataset)

### The "Velocity Matters"
- Correlation between velocity and long-range TTK: moderate
- But weapons with high velocity feel better in real combat
- **KV9** suffers despite 1080 RPM due to 348 m/s velocity

---

## 📈 SUMMARY STATISTICS

| Metric | Mean | Min | Max | Std Dev |
|--------|------|-----|-----|---------|
| RPM | 731 | 514 | 1,080 | 136 |
| TTK at 20m (ms) | 310 | 198 | 444 | 56 |
| 20m Power Score | 338 | 238 | 444 | 56 |
| Burst Accuracy | 0.844 | 0.520 | 1.000 | 0.149 |
| Velocity (m/s) | 638 | 348 | 840 | 128 |

---

## 🎮 FINAL VERDICT

### Top 3 "Meta" Weapons:
1. **M240L (LMG)** - Best overall, dominates at all ranges
2. **TR-7 (AR)** - Exceptional DPS despite recoil, versatile
3. **M123K (LMG)** - Strong alternative to M240L

### Hidden Gems (Underrated):
- **SCW-10 (SMG)** - Best close-range TTK in game
- **M277 (CRB)** - Highest practical lethality, learn the recoil
- **NVO-228E (AR)** - Solid all-around performer

### Weapons to Avoid (Worst Performers):
- **AK-205 (CRB)** - Worst TTK at 20m by far
- **KTS100 MK8 (LMG)** - Slowest TTK despite good stats
- **UMG-40 (SMG)** - Poor performance across all metrics

---

## 📁 Generated Visualizations

All 9 charts have been saved to `analysis_output/`:

1. **1_ttk_analysis.png** - TTK performance across all distances
2. **2_power_scores.png** - Power score comparisons
3. **3_rpm_vs_ttk.png** - Relationship between fire rate and TTK
4. **4_accuracy_analysis.png** - Detailed accuracy breakdowns
5. **5_class_comparison.png** - Weapon class performance metrics
6. **6_damage_falloff.png** - Damage consistency and dropoff patterns
7. **7_lethality.png** - Practical lethality coefficients
8. **8_velocity.png** - Projectile velocity analysis
9. **9_correlation_heatmap.png** - Correlation matrix of all metrics

---

*Analysis completed using Python with pandas, matplotlib, seaborn, and scipy*

