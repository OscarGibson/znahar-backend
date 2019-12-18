from rest_framework import permissions
from rest_framework.response import Response
from rest_framework.generics import CreateAPIView, RetrieveAPIView, UpdateAPIView, GenericAPIView, RetrieveUpdateAPIView
from rest_framework.mixins import UpdateModelMixin, CreateModelMixin, RetrieveModelMixin
from django.contrib.auth import get_user_model # If used custom user model

from .serializers import UserSerializer


class CreateUserView(CreateAPIView):

    model = get_user_model()
    permission_classes = [
        permissions.AllowAny # Or anon users can't register
    ]
    serializer_class = UserSerializer


class GetUpdateUserView(RetrieveUpdateAPIView):

    model = get_user_model()
    queryset = model.objects.all()
    permission_classes = [
        permissions.IsAuthenticated
    ]
    serializer_class = UserSerializer
    lookup_field = "pk"

    def get(self, request, pk=None):
        """
        If provided 'pk' is "me" then return the current user.
        """
        if request.user:
            return Response(self.serializer_class(request.user).data)
        return super(GetUpdateUserView, self).get(request, pk=pk)

    def put(self, request, pk=None):
        self.kwargs = {'pk':request.user.pk}
        return super(GetUpdateUserView, self).put(request, pk=request.user.pk)

    def patch(self, request, pk=None):
        self.kwargs = {'pk':request.user.pk}
        return super(GetUpdateUserView, self).patch(request, pk=request.user.pk)
