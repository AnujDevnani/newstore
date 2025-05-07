import json

def update_prices(input_file='products.json', output_file='updated_products.json'):
    # Read the existing JSON file
    with open(input_file, 'r', encoding='utf-8') as f:
        products = json.load(f)
    
    # Update price for all products to 450
    for product in products:
        product['price'] = '450'
    
    # Save the updated data back to a new JSON file
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(products, f, indent=2, ensure_ascii=False)
    
    print(f"Prices updated successfully. Check {output_file} for the output.")

# Run the function
update_prices()