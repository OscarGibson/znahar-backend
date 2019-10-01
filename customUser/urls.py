from django.urls import path
from .api import CreateUserView, GetUserView

urlpatterns = [
    path('register', CreateUserView.as_view()),
    path('retrieve', GetUserView.as_view()),
]