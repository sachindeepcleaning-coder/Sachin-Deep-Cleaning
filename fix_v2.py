import csv

input_file = 'coding_benchmarks_july2026_final.csv'
output_file = 'coding_benchmarks_july2026_final.csv'

USD_TO_INR = 96.04

corrections = {
    # Row 7: DeepSeek V4 Pro Max - fix pricing
    ('DeepSeek V4 Pro Max', 'DeepSeek'): {
        'Price Input/1M': '$0.435',
        'Price Output/1M': '$0.87',
    },
    # Rows 50, 51, 55, 70, 74: Gemma 4 variants - fix license
    ('Gemma 4 31B', 'Google'): {
        'License/Type': 'Open weight (Apache 2.0)',
    },
    ('Gemma 4 26B-A4B', 'Google'): {
        'License/Type': 'Open weight (Apache 2.0)',
    },
    ('Gemma 4 12B', 'Google'): {
        'License/Type': 'Open weight (Apache 2.0)',
    },
    ('Gemma 4 E4B', 'Google'): {
        'License/Type': 'Open weight (Apache 2.0)',
    },
    ('Gemma 4 E2B', 'Google'): {
        'License/Type': 'Open weight (Apache 2.0)',
    },
    # Row 177: Gemini 3.5 Flash Preview - fix output price
    ('Gemini 3.5 Flash Preview', 'Google'): {
        'Price Output/1M': '$9.00',
    },
    # Row 180: GPT-5.6 Luna - fix output price
    ('GPT-5.6 Luna', 'OpenAI'): {
        'Price Output/1M': '$6.00',
    },
    # Row 32: DeepSeek V3.2 - fix context window
    ('DeepSeek V3.2', 'DeepSeek'): {
        'Context Window': '128K',
    },
}

with open(input_file, 'r', encoding='utf-8') as infile:
    reader = csv.DictReader(infile)
    fieldnames = reader.fieldnames
    rows = list(reader)

for row in rows:
    key = (row.get('Model', ''), row.get('Provider', ''))
    if key in corrections:
        for col, new_val in corrections[key].items():
            row[col] = new_val

# Recalculate INR for corrected USD prices
for row in rows:
    for price_col, inr_col in [('Price Input/1M', 'Price Input INR/1M'), ('Price Output/1M', 'Price Output INR/1M')]:
        usd = row.get(price_col, '').strip()
        if usd and usd != '-' and usd.lower() != 'free':
            try:
                val = float(usd.replace('$', '').replace(',', ''))
                row[inr_col] = f'₹{val * USD_TO_INR:.2f}'
            except:
                pass
        elif usd.lower() == 'free':
            row[inr_col] = '₹0.00'

with open(output_file, 'w', newline='', encoding='utf-8') as outfile:
    writer = csv.DictWriter(outfile, fieldnames=fieldnames)
    writer.writeheader()
    writer.writerows(rows)

print("Fixes applied:")
for (model, provider), fixes in corrections.items():
    for col, val in fixes.items():
        print(f"  {model}: {col} → {val}")
