
import requests
try:
    response = requests.get('http://localhost:3000/api/businesses')
    businesses = response.json()
    for b in businesses:
        print(f"Name: {b.get('name')}, Image: {b.get('image')}")
except Exception as e:
    print(e)
