from django.urls import path
from .views import ListNewsAPIView, RetrieveNewsAPIView

urlpatterns = [
    path('', ListNewsAPIView.as_view()),
    path('<int:pk>', RetrieveNewsAPIView.as_view())
]