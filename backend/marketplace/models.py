from django.db import models

# Create your models here.
class Project(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    category = models.CharField(max_length=20)
    size = models.CharField(max_length=10)
    brand = models.CharField(max_length=20)
    price = models.CharField(max_length=10)
    image = models.FilePathField(path="/img")