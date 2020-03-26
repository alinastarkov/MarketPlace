
from rest_framework import serializers
from rest_framework_jwt.settings import api_settings
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.contrib.auth.models import User
from .models import Item, OrderedProducts, Order
import uuid 

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'last_name', 'email')

class UsernameTokenObtainPairSerializer(TokenObtainPairSerializer):

    def validate(self, attrs):
        data = super().validate(attrs)
        refresh = self.get_token(self.user)
        data['refresh'] = str(refresh)
        data['access'] = str(refresh.access_token)

        # Add extra responses here
        data['username'] = self.user.username
        return data
class UserSerializerWithToken(serializers.ModelSerializer):

    token = serializers.SerializerMethodField()
    password = serializers.CharField(write_only=True)

    def get_token(self, obj):
        jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
        jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER

        payload = jwt_payload_handler(obj)
        token = jwt_encode_handler(payload)
        return token

    def create(self, validated_data):
        user = User.objects.create(
            username = validated_data['username'],
            first_name = validated_data['first_name'],
            last_name = validated_data['last_name']
        )
        user.set_password(validated_data['password'])
        user.save()
        return user
    
    class Meta:
        model = User
        fields = ('token', 'username', 'password', 'first_name',
        'last_name')

class ItemSerializer(serializers.ModelSerializer):
    image = serializers.ImageField()
    class Meta:
        model = Item
        fields = ['name', 'description', 'category', 'size', 'brand','price', 'image', 'inventory', 'id']

class OrderedItemsSerializer(serializers.ModelSerializer):
    id = uuid.uuid4()
    class Meta:
        model = OrderedProducts
        fields = ['id', 'quantity', 'price', 'item_id']
class OrderSerializer(serializers.ModelSerializer):
    ordered_items = OrderedItemsSerializer(many=True)
    id = uuid.uuid4()
    class Meta:
        model = Order
        fields = ['id', 'full_name','address', 'country', 'state', 'city', 'total_price', 'card_number', 'ordered_items']

    def create(self, validated_data):
        items_data = validated_data.pop('ordered_items')
        order = Order.objects.create(**validated_data)
        for item_data in items_data:
            op = OrderedProducts.objects.create(order=order, **item_data)
            order.ordered_items.add(op)
        return order

