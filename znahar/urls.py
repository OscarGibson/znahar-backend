from django.urls import path
from .views import Order, Products, WarehousesListAPI, Settings, WarehousesRetrieveAPI,\
                    CheckDiscount

urlpatterns = [
    path('orders/', Order.as_view()),
    path('products/', Products.as_view()),
    path('settings/', Settings.as_view()),
    path('warehouses/', WarehousesListAPI.as_view()),
    path('warehouses/<str:uuid>', WarehousesRetrieveAPI.as_view()),
    path('check/', CheckDiscount.as_view())
]