"""backend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from django.contrib import admin
from django.urls import path
from marketplace import views
from django.conf.urls import url
from rest_framework_jwt.views import obtain_jwt_token
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('login/', obtain_jwt_token),
    path('items/', views.item_list),
    path('current_user/', views.current_user),
    path('signup/', views.UserList.as_view()),
    path('sell-item/', views.ItemView.as_view()),
    path('user/item/', views.ItemView.as_view()),
    path('checkout/', views.OrderView.as_view()),
    path('user/orders/', views.OrderView.as_view()),
    path('users/', views.get_all_users)
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)


