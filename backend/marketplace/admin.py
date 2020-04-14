from django.contrib import admin

# Register your models here.
from .models import Item, OrderedProducts, Order, Message

admin.site.register(Item)
admin.site.register(OrderedProducts)
admin.site.register(Order)
admin.site.register(Message)

