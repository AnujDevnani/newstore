import csv
import json
import re

def extract_year(name):
    # Try to find year patterns like "24-25" or "2024-25" or "2024" or "05-06"
    year_patterns = [
        r'(\d{2})-(\d{2})',  # Matches "24-25" or "05-06"
        r'20(\d{2})',        # Matches "2024"
        r'19(\d{2})'         # Matches "1994"
    ]
    
    for pattern in year_patterns:
        match = re.search(pattern, name)
        if match:
            if len(match.group(1)) == 2:
                # Handle "24-25" or "05-06" format
                year1 = match.group(1)
                if int(year1) > 50:  # Assume years > 50 are 19xx
                    return f"19{year1}"
                else:
                    return f"20{year1}"
            else:
                # Handle "2024" format
                return match.group(0)
    return ""

def extract_club(name):
    clubs = {
        "MAN UNITED": "Manchester United",
        "BARCA": "Barcelona",
        "REAL MADRID": "Real Madrid",
        "MILAN": "AC Milan",
        "ARSENAL": "Arsenal",
        "LIVERPOOL": "Liverpool",
        "CHELSEA": "Chelsea",
        "JUVENTUS": "Juventus",
        "BAYERN": "Bayern Munich",
        "PSG": "Paris Saint-Germain",
        "INTER": "Inter Milan",
        "ATHLETICO MADRID": "Atletico Madrid",
        "SANTOS": "Santos FC",
        "SPORTING": "Sporting CP",
        "AJAX": "Ajax",
        "LAZIO": "Lazio",
        "AL NASSAR": "Al Nassr",
        "AL HILAL": "Al Hilal"
    }
    
    for key, value in clubs.items():
        if key in name:
            return value
            
    # Handle national teams
    nations = ["ARGENTINA", "FRANCE", "GERMANY", "SPAIN", "PORTUGAL", "ITALY", "ENGLAND", "JAPAN", "NETHERLANDS"]
    for nation in nations:
        if nation in name:
            return nation
            
    return ""

def extract_player(name):
    # Extract the player name (usually the first word before any team/year)
    words = name.split()
    if words:
        player = words[0]
        # Handle special cases where player name is two words
        if words[0] in ["DE", "VAN"]:
            player = f"{words[0]} {words[1]}"
        return player
    return ""

def extract_sizes(description):
    sizes = []
    size_patterns = r'[XS|S|M|L|XL|XXL]+'
    
    # Find all size mentions in description
    matches = re.findall(size_patterns, description)
    if matches:
        sizes = list(set(matches))  # Remove duplicates
        sizes.sort(key=lambda x: ['XS','S','M','L','XL','XXL'].index(x))
        return ", ".join(sizes)
    return "XS, S, M, L, XL, XXL"  # Default sizes if none specified

def process_csv(filename):
    products = []
    
    with open(filename, 'r', encoding='utf-8') as file:
        reader = csv.DictReader(file)
        for row in reader:
            images = [
                row['image_url'],
                row['image_url2'],
                row['image_url3'],
                row['image_url4']
            ]
            # Filter out empty image URLs
            images = [img for img in images if img]
            
            product = {
                "id": row['id'],
                "name": row['name'],
                "description": row['description'],
                "price": row['price'].replace('.00', ''),
                "currency": row['currency'],
                "availability": row['availability'],
                "images": images,
                "sizes": extract_sizes(row['description']),
                "club": extract_club(row['name']),
                "player": extract_player(row['name']),
                "year": extract_year(row['name'])
            }
            products.append(product)
    
    return products
    
# Process the CSV file
products = process_csv('/Users/anuj/Downloads/imgg/products-+919645921914.csv')

# Save to JSON file
with open('products.json', 'w', encoding='utf-8') as f:
    json.dump(products, f, indent=2, ensure_ascii=False)

print("Conversion completed. Check products.json for the output.")