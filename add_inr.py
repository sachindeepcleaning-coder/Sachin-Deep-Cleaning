import csv
import re

# Exchange rate
USD_TO_INR = 96.04

input_file = 'coding_benchmarks_july2026.csv'
output_file = 'coding_benchmarks_july2026_with_inr.csv'

with open(input_file, 'r', encoding='utf-8') as infile:
    reader = csv.DictReader(infile)
    fieldnames = reader.fieldnames + ['Price Input INR/1M', 'Price Output INR/1M']
    
    with open(output_file, 'w', newline='', encoding='utf-8') as outfile:
        writer = csv.DictWriter(outfile, fieldnames=fieldnames)
        writer.writeheader()
        
        for row in reader:
            # Convert USD to INR
            input_usd = row.get('Price Input/1M', '').strip()
            output_usd = row.get('Price Output/1M', '').strip()
            
            # Convert input price
            if input_usd and input_usd != '-' and input_usd.lower() != 'free':
                try:
                    # Remove $ sign and convert
                    input_val = float(input_usd.replace('$', '').replace(',', ''))
                    row['Price Input INR/1M'] = f'₹{input_val * USD_TO_INR:.2f}'
                except:
                    row['Price Input INR/1M'] = input_usd
            elif input_usd.lower() == 'free':
                row['Price Input INR/1M'] = '₹0.00'
            else:
                row['Price Input INR/1M'] = '-'
            
            # Convert output price
            if output_usd and output_usd != '-' and output_usd.lower() != 'free':
                try:
                    output_val = float(output_usd.replace('$', '').replace(',', ''))
                    row['Price Output INR/1M'] = f'₹{output_val * USD_TO_INR:.2f}'
                except:
                    row['Price Output INR/1M'] = output_usd
            elif output_usd.lower() == 'free':
                row['Price Output INR/1M'] = '₹0.00'
            else:
                row['Price Output INR/1M'] = '-'
            
            writer.writerow(row)

print(f"Done! Output saved to {output_file}")
