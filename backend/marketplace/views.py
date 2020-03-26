from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework import permissions, status
from rest_framework.views import APIView
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from django.http import HttpResponse
from rest_framework.parsers import MultiPartParser, FormParser
from .serializers import UsernameTokenObtainPairSerializer, UserSerializerWithToken, ItemSerializer, OrderSerializer, OrderedItemsSerializer
from .models import Item, Order
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from django.contrib.auth.models import User
from django.core.exceptions import ObjectDoesNotExist, ValidationError
from rest_framework_jwt.authentication import JSONWebTokenAuthentication
from rest_framework_simplejwt.views import TokenObtainPairView
import uuid 

class ObtainTokenPairWithUsernameView(TokenObtainPairView):
    serializer_class = UsernameTokenObtainPairSerializer
    

#get all the items to display, if there is a current user then we exclude those items the users are selling
#else we display all the items
@api_view(['GET'])
@permission_classes((permissions.AllowAny, ))
def item_list(request):
    if 'username' in request.GET:
        username = request.GET['username']
        item = Item.objects.all().exclude(user__username=username)
    else:
        item = Item.objects.all()
    serializer = ItemSerializer(item, many=True)
    return Response(serializer.data)

class UserList(APIView):
    permission_classes = (permissions.AllowAny,)
    def post(self, request, format=None):
        serializer = UserSerializerWithToken(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ItemView(APIView):
    def delete(self, request, format=None):
        item_name=request.data.get("item_name")
        Item.objects.get(name=item_name).delete()
        return HttpResponse("deleted!")

    def get(self, request, format=None):
        name=request.query_params.get("username")
        item = Item.objects.all().filter(user__username=name)
        serializer = ItemSerializer(item, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        parser_classes = (MultiPartParser, FormParser)
        try:
            item_id = request.data.get('id')
            itemModel = Item.objects.get(id=item_id)
            serializer = ItemSerializer(itemModel, data=request.data)
        except (ObjectDoesNotExist, ValidationError, ValueError) as e:
            new_data = request.data.copy() # to make it mutable
            new_data['id'] = uuid.uuid4()
            serializer = ItemSerializer(data=new_data)

        if serializer.is_valid():
            username = request.data.get("username")
            userInstance = User.objects.get(username=username)
            serializer.save(user = userInstance)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            print('error', serializer.errors)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class OrderView(APIView):
    def post(self, request, format=None):
        items_data = request.data.copy().pop('ordered_items')
        serializerOrder = OrderSerializer(data=request.data)
        if serializerOrder.is_valid():
            #update the inventory in the items
            for item_data in items_data:
                item = Item.objects.get(id=item_data['item_id'])
                new_inventory = item.inventory - item_data['quantity']
                serializerItem = ItemSerializer(item, data={'inventory': new_inventory}, partial=True)
                if serializerItem.is_valid():
                    serializerItem.save()
                else:
                    return Response(serializerItem.errors, status=status.HTTP_400_BAD_REQUEST)
             # save new order into the order db
            username = request.data.get("username")
            userInstance = User.objects.get(username=username)
            serializerOrder.save(user = userInstance)
            return Response(serializerOrder.data, status=status.HTTP_201_CREATED)
        return Response(serializerOrder.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def get(self, request, format=None):
        name=request.query_params.get("username")
        allOrders = Order.objects.filter(user__username=name)
        serializer = OrderSerializer(allOrders, many=True)
        return Response(serializer.data)
