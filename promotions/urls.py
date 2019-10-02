from django.urls import path
from .views import ListPromotionsAPIView

urlpatterns = [
    path('', ListPromotionsAPIView.as_view()),
]