"""src URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.2/topics/http/urls/
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
from django.urls import path, include
from django.conf.urls.static import static
from django.conf import settings
from rest_framework_simplejwt import views as jwt_views


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/token/', jwt_views.TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', jwt_views.TokenRefreshView.as_view(), name='token_refresh'),
    path('api/user/', include('customUser.urls'), name='user'),
    path('api/news/', include('news.urls'), name='news'),
    path('api/promotions/', include('promotions.urls'), name='promotions'),
    path('znahar/', include('znahar.urls'), name='znahar'),
    path('', include('base.urls'), name='index'),
    path('search', include('base.urls'), name='index'),
    path('promotions', include('base.urls'), name='index'),
    path('news', include('base.urls'), name='index'),
    path('contacts', include('base.urls'), name='index'),
    path('for-clients', include('base.urls'), name='index'),
    path('profile', include('base.urls'), name='index'),
    path('register', include('base.urls'), name='index'),
    path('login', include('base.urls'), name='index'),
    path('404', include('base.urls'), name='index'),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
