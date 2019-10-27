from django.urls import path
from .api import CreateUserView, GetUpdateUserView

urlpatterns = [
    path('register', CreateUserView.as_view()),
    path('', GetUpdateUserView.as_view()),
]