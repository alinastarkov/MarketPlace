## Introduction
Peluche is an e-commerce platform built with **React.js and Redux** for the frontend and **Django** for the backend.
#### Functionality
- Users can list products to sell and buy from other sellers.
- Sellers can track inventories, add, update, and delete product listings.
- Buyers can browse products, add products to cart, check out, and view order history.
- Buyers can chat with sellers in real time.

## Installation 

The directory will look like this from root view:
```bash
├── StockPhotos
├── backend
│   ├── backend
│   ├── marketplace
│   └── templates
├── env
│   ├── bin
│   ├── include
│   └── lib
└── front-end
    ├── Images
    ├── node_modules
    ├── public
    └── src
 ```

1. Install venv **in the root directory where requirements.txt is** : python3 -m venv ./env
2. Activate virtual environment: source env/bin/activate
3. Install requirements: pip3 install -r requirements.txt
4. Make migration to the database: cd backend && python3 manage.py makemigrations && python3 manage.py migrate
5. Start backend: python3 manage.py runserver
6. Install yarn/ npm (if needed): brew install node (to install node), brew install yarn (to install yarn) 
7. In a new terminal, install front-end dependencies in **the front-end folder**: cd front-end && npm install 
8. Start front-end in **the front-end folder**: yarn start
9. Start redis server in a different terminal: redis-server 

##### Note: Venv can be terminated by the command deactivate 
10. Install openssl if necessary: brew install openssl
11. Install redis if neccessary: brew install redis 

##### Note: There is a StockPhotos folder which contains all the stock photo to test the sell item feature.


