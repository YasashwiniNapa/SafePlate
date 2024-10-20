import csv
from collections import defaultdict

# Step 1: Group data by Allergy
grouped_data = defaultdict(list)

# Open the original CSV and group the data by Allergy
with open('FoodData.csv', 'r') as infile:
    reader = csv.DictReader(infile)
    for row in reader:
        grouped_data[row['Allergy']].append(row)

# Step 2: Write the new CSV with Food as the first column
with open('grouped.csv', 'w', newline='') as outfile:
    # Define the new field order with 'Food' first
    fieldnames = ['Food', 'Class', 'Type', 'Group', 'Allergy', 'Diet']
    writer = csv.DictWriter(outfile, fieldnames=fieldnames)

    # Write the header
    writer.writeheader()

    # Write the rows grouped by Allergy
    for allergy, foods in grouped_data.items():
        for food in foods:
            # Rearrange the row to match the new field order
            writer.writerow({
                'Food': food['Food'],
                'Class': food['Class'],
                'Type': food['Type'],
                'Group': food['Group'],
                'Allergy': food['Allergy'],
                'Diet': food['Diet']
            })
