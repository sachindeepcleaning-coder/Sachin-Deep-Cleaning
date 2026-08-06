import csv

input_file = 'coding_benchmarks_july2026_fixed.csv'
output_file = 'coding_benchmarks_july2026_final.csv'

with open(input_file, 'r', encoding='utf-8') as infile:
    reader = csv.DictReader(infile)
    fieldnames = reader.fieldnames
    
    rows = []
    skipped_duplicates = 0
    fixed_license = 0
    
    for row in reader:
        model = row.get('Model', '')
        
        # Skip base/v2/v3 duplicates (rows 91-500 artifact)
        if model.endswith('-Base') or model.endswith('-v2') or model.endswith('-v3'):
            skipped_duplicates += 1
            continue
        
        # Fix license labels - closed models incorrectly labeled "Open weight"
        license_type = row.get('License/Type', '')
        if license_type == 'Open weight':
            # Check if this is actually a closed model
            closed_providers = ['Anthropic', 'OpenAI', 'Google', 'Meta']
            closed_models = ['Claude', 'GPT', 'Gemini', 'Muse']
            
            is_closed = (row.get('Provider', '') in closed_providers or 
                        any(model.startswith(m) for m in closed_models))
            
            if is_closed:
                row['License/Type'] = 'Closed'
                fixed_license += 1
        
        rows.append(row)

with open(output_file, 'w', newline='', encoding='utf-8') as outfile:
    writer = csv.DictWriter(outfile, fieldnames=fieldnames)
    writer.writeheader()
    writer.writerows(rows)

print(f"Structural fixes applied:")
print(f"  Removed {skipped_duplicates} duplicate base/v2/v3 rows")
print(f"  Fixed {fixed_license} incorrect 'Open weight' license labels")
print(f"  Final row count: {len(rows)}")
print(f"Output saved to {output_file}")
