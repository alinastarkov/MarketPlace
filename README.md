# MarketPlace

## How to run the web app

1. Install venv: python3 -m venv ./env
2. Activate virtual environment: source env/bin/activate
3. Install requirements: pip3 install -r requirements.txt
4. Make migration to the database: cd backend && python3 manage.py makemigrations && python3 manage.py migrate
5. Start backend: python3 manage.py runserver
6. Install yarn/ npm (if needed)
7. Install front-end dependencies: cd front-end && npm install 
8. Start front-end: yarn start
9. Start redis server: redis-server 

##### Note: Venv can be terminated by typing deactivate 
10. Install openssl if necessary: brew install openssl
11. Install redis if neccessary: brew install redis 
