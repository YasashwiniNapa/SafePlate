import csv

#Load the csv data into a dictionary for quick lookup
def load_data(filename):
    foodInfo = {} #Dictionary to map food to its allergy
    with open(filename, 'r') as infile:
            reader = csv.DictReader(infile)
            for row in reader:
                foodInfo[row['Food'].lower()] = {
                    'Allergy': row['Allergy'],
                    'Diet': row['Diet']
                }  # Store both allergy and diet in a nested dictionary
    return foodInfo

#Function to get the allergy associated with a given food
def get_allergy(food, data):
    return data.get(food.lower(), {"Allergy": "No allergy info available", "Diet": "No diet info available"}) #returns no info as default

if __name__ == "__main__":
    allergy_data = load_data('grouped.csv')
    food = input("Enter a food: ")
    info = get_allergy(food, allergy_data)
    allergy = info['Allergy']
    diet = info['Diet']
    print(f"The risk associated with {food} is: {allergy}")
    print(f"The diet info for {food} is: {diet}")