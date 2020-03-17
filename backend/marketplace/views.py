from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status

from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from django.http import HttpResponse

@api_view(['GET', 'POST'])
def item_list(request):
    """
 List  customers, or create a new customer.
 """
    if request.method == 'GET':
        return HttpResponse("Hello there!")
        

    