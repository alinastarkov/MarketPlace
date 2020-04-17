from django.test import TestCase
import json
from django.contrib.auth.models import User
from django.urls import reverse
from rest_framework.authtoken.models import Token
from rest_framework.test import APITestCase
from .models import Item, Order, OrderedProducts, Message
from rest_framework.test import APIClient
from PIL import Image
from io import BytesIO
from django.core.files.base import File

class SignInTest(APITestCase):
    def setUp(self):
        self.user = User.objects.create(username='alinastarkov', first_name="alina", last_name="starkov")
        self.user.set_password('12345')
        self.user.save()
        self.client = APIClient()
    
    def tearDown(self):
        self.user.delete()
    
    def test_login(self):
        response = self.client.post('/login/', {'username': 'alinastarkov', 'password': '12345'})
        self.assertEqual(200, response.status_code)
    
    def test_login_wrongpassword(self):
        response = self.client.post('/login/', {'username': 'alinastarkov', 'password': 'aaa'})
        self.assertEqual(400, response.status_code)
    
    def test_login_no_user(self):
        response = self.client.post('/login/', {'username': 'heyy', 'password': 'aaa'})
        self.assertEqual(400, response.status_code)

class ItemViewTest(APITestCase): 
    def setUp(self):
        self.user = User.objects.create(username='alinastarkov', first_name="alina", last_name="starkov")
        self.user.set_password('12345')
        self.user.save()
        self.client = APIClient()
        self.item = Item.objects.create(user=self.user, name='aaa', description= 'www', category= 'ccc', size= 's', brand= 'aritzia', price= 500, inventory= 2, image=self.get_image_file())

    def tearDown(self):
        self.user.delete()
    
    @staticmethod
    def get_image_file(name='test.png', ext='png', size=(50, 50), color=(256, 0, 0)):
        file_obj = BytesIO()
        image = Image.new("RGBA", size=size, color=color)
        image.save(file_obj, ext)
        file_obj.seek(0)
        return File(file_obj, name=name)
    
    def test_create_item(self):
        response = self.client.post('/sell-item/', {'username': 'alinastarkov', 'name': 'sweater', 'description': 'warm', 'category': 'clothes', 'size': 's', 'brand': 'aritzia', 'price': 200, 'inventory': 4, 'image':self.get_image_file()})
        self.assertEqual(201, response.status_code)

    def test_delete_item(self):
        total_items = Item.objects.count()
        response = self.client.delete('/user/item/', {'username':'alinastarkov', 'item_name':'aaa'})
        self.assertEqual(200, response.status_code)
        self.assertEqual(Item.objects.count(), total_items-1)

class OrderViewTest(APITestCase): 
    def setUp(self):
        self.user = User.objects.create(username='alinastarkov', first_name="alina", last_name="starkov")
        self.user.set_password('12345')
        self.user.save()
        self.client = APIClient()

    def tearDown(self):
        self.user.delete()
    
    @staticmethod
    def get_image_file(name='test.png', ext='png', size=(50, 50), color=(256, 0, 0)):
        file_obj = BytesIO()
        image = Image.new("RGBA", size=size, color=color)
        image.save(file_obj, ext)
        file_obj.seek(0)
        return File(file_obj, name=name)
    
    def test_create_order(self):
        i = Item.objects.create(user=self.user, name='aaa', description= 'www', category= 'ccc', size= 's', brand= 'aritzia', price= 500, inventory= 4, image=self.get_image_file())
        data={'username':'alinastarkov', 'full_name':'Alina', 'address':'379', 'country':'Canada', 'state':'BC', 'city':'Whistler', 'total_price': 900, 'card_number':'123A', 'ordered_items': [{'item_id':str(i.id), 'quantity':1, 'price':500 }]}
        response = self.client.post('/checkout/', json.dumps(data), content_type='application/json' )
        self.assertEqual(201, response.status_code)



    
    




