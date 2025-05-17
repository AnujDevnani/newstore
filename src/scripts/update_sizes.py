import json
import os

# Get the absolute path to the products.js file
script_dir = os.path.dirname(os.path.abspath(__file__))
products_path = os.path.join(script_dir, '..', 'data', 'products.js')

try:
    # Read the file content
    with open(products_path, 'r', encoding='utf-8') as file:
        content = file.read()
    
    # Find the array portion
    start_index = content.index('[')
    end_index = content.rindex(']') + 1
    array_content = content[start_index:end_index]
    
    # Parse the JSON array
    products = json.loads(array_content)
    
    # Update sizes for all products
    for product in products:
        product['sizes'] = "S, M, L, XL, XXL"
    
    # Create new content
    new_content = (
        content[:start_index] + 
        json.dumps(products, indent=2, ensure_ascii=False) +
        content[end_index:]
    )
    
    # Write back to file
    with open(products_path, 'w', encoding='utf-8') as file:
        file.write(new_content)
    
    print("Successfully updated all product sizes")
    
except Exception as e:
    print(f"Error: {str(e)}")
