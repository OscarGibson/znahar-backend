from rest_framework import permissions
from rest_framework.response import Response
from rest_framework.generics import CreateAPIView, RetrieveAPIView
from django.contrib.auth import get_user_model # If used custom user model

from .serializers import UserSerializer


class CreateUserView(CreateAPIView):

    model = get_user_model()
    permission_classes = [
        permissions.AllowAny # Or anon users can't register
    ]
    serializer_class = UserSerializer


class GetUserView(RetrieveAPIView):

    model = get_user_model()
    queryset = model.objects.all()
    permission_classes = [
        permissions.IsAuthenticated
    ]
    serializer_class = UserSerializer

    def retrieve(self, request, pk=None):
        """
        If provided 'pk' is "me" then return the current user.
        """
        if request.user:
            return Response(self.serializer_class(request.user).data)
        return super(GetUserView, self).retrieve(request, pk)
