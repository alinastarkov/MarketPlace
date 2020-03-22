from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework import permissions, status
from rest_framework.views import APIView
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from django.http import HttpResponse
from rest_framework.parsers import MultiPartParser, FormParser
from .serializers import UserSerializer, UserSerializerWithToken, ItemSerializer
from .models import Item
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.models import User

@api_view(['GET', 'POST'])
@permission_classes((permissions.AllowAny, ))
def item_list(request):
    if request.method == 'GET':
        return HttpResponse("Hello there!")
        
@api_view(['GET'])
def current_user(request):
    serializer = UserSerializer(request.user)
    return Response(serializer.data)

#todo: SAME TOKEN!!!???
class UserList(APIView):
    permission_classes = (permissions.AllowAny,)
    def post(self, request, format=None):
        serializer = UserSerializerWithToken(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ItemView(APIView):
    #to do: change to authentication token can access only
    permission_classes = (permissions.AllowAny,)
    def get(self, request, format=None):
        name=request.query_params.get("username")
        item = Item.objects.all().filter(user__username=name)
        serializer = ItemSerializer(item, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        parser_classes = (MultiPartParser, FormParser)
        serializer = ItemSerializer(data=request.data)
        if serializer.is_valid():
            name = request.data.get("username")
            print(name)
            userInstance = User.objects.get(username=name)
            serializer.save(user = userInstance)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            print('error', serializer.errors)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)