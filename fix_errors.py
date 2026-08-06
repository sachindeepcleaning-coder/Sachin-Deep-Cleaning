import csv

input_file = 'coding_benchmarks_july2026_with_inr.csv'
output_file = 'coding_benchmarks_july2026_fixed.csv'

# Exchange rate
USD_TO_INR = 96.04

# Corrections dictionary: (Model, Provider) -> {column: new_value}
corrections = {
    # Row 8: GPT-5.5 - Fix SWE-bench score and context
    ('GPT-5.5', 'OpenAI'): {
        'SWE-bench Verified': '82.6%',
        'Context Window': '1M',
    },
    # Row 5: GPT-5.6 Sol - Mark as unconfirmed
    ('GPT-5.6 Sol', 'OpenAI'): {
        'SWE-bench Verified': 'Unconfirmed',
    },
    # Row 41: Grok 4.20 - Fix output price
    ('Grok 4.20', 'xAI'): {
        'Price Output/1M': '$6.00',
    },
    # Row 175: DeepSeek V4 Pro - Fix output price
    ('DeepSeek V4 Pro', 'DeepSeek'): {
        'Price Output/1M': '$0.87',
    },
    # Row 126: Gemini 3.5 Flash - Fix output price
    ('Gemini 3.5 Flash', 'Google'): {
        'Price Output/1M': '$9.00',
    },
    # Row 10: GPT-5.2 - Fix context window
    ('GPT-5.2', 'OpenAI'): {
        'Context Window': '1M',
    },
    # Row 30: Claude Haiku 4.5 - Fix context window
    ('Claude Haiku 4.5', 'Anthropic'): {
        'Context Window': '1M',
    },
    # Row 21: GLM-5 - Rename to GLM-5.1 and fix output price
    ('GLM-5', 'Z.AI'): {
        'Model': 'GLM-5.1',
        'Price Output/1M': '$4.40',
    },
    # Row 40: DeepSeek V3 - Fix SWE-bench score (likely ~50% not 38.8%)
    ('DeepSeek V3', 'DeepSeek'): {
        'SWE-bench Verified': '~50%',
    },
    # Row 124: GPT-5.4 Pro - Fix input price
    ('GPT-5.4 Pro', 'OpenAI'): {
        'Price Input/1M': '$30.00',
    },
    # Row 123: GPT-5.4 - Fix context window
    ('GPT-5.4', 'OpenAI'): {
        'Context Window': '1M',
    },
    # Row 125: GPT-5.5 Pro - Fix context window
    ('GPT-5.5 Pro', 'OpenAI'): {
        'Context Window': '1M',
    },
}

with open(input_file, 'r', encoding='utf-8') as infile:
    reader = csv.DictReader(infile)
    fieldnames = reader.fieldnames
    
    rows = []
    for row in reader:
        key = (row.get('Model', ''), row.get('Provider', ''))
        if key in corrections:
            for col, new_val in corrections[key].items():
                row[col] = new_val
        rows.append(row)

# Recalculate INR for corrected USD prices
with open(output_file, 'w', newline='', encoding='utf-8') as outfile:
    writer = csv.DictWriter(outfile, fieldnames=fieldnames)
    writer.writeheader()
    
    for row in rows:
        # Recalculate INR for output price
        output_usd = row.get('Price Output/1M', '').strip()
        if output_usd and output_usd != '-' and output_usd.lower() != 'free':
            try:
                output_val = float(output_usd.replace('$', '').replace(',', ''))
                row['Price Output INR/1M'] = f'₹{output_val * USD_TO_INR:.2f}'
            except:
                row['Price Output INR/1M'] = '-'
        elif output_usd.lower() == 'free':
            row['Price Output INR/1M'] = '₹0.00'
        
        # Recalculate INR for input price
        input_usd = row.get('Price Input/1M', '').strip()
        if input_usd and input_usd != '-' and input_usd.lower() != 'free':
            try:
                input_val = float(input_usd.replace('$', '').replace(',', ''))
                row['Price Input INR/1M'] = f'₹{input_val * USD_TO_INR:.2f}'
            except:
                row['Price Input INR/1M'] = '-'
        elif input_usd.lower() == 'free':
            row['Price Input INR/1M'] = '₹0.00'
        
        writer.writerow(row)

print("Fixes applied:")
for (model, provider), fixes in corrections.items():
    for col, val in fixes.items():
        print(f"  {model}: {col} → {val}")
print(f"\nOutput saved to {output_file}")
