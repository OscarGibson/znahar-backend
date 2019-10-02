from django.urls import path
from .views import Order, Products

urlpatterns = [
    path('orders/', Order.as_view()),
    path('products/', Products.as_view()),
]