from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class Item(models.Model):
    name = models.CharField(max_length=100)
    user = models.ForeignKey(User, default=1, on_delete=models.CASCADE)
    description = models.TextField()
    category = models.CharField(max_length=20)
    size = models.CharField(max_length=10)
    brand = models.CharField(max_length=20)
    price = models.CharField(max_length=10)
    image = models.ImageField(upload_to='item_images/', null=True)