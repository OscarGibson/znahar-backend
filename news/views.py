from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.generics import ListAPIView, RetrieveAPIView

from .serializers import NewsListSerializer, NewsPostSerializer
from .models import NewsPost


class BaseAPIView:
    model = NewsPost
    queryset = model.objects.all()
    permission_classes = [
        AllowAny
    ]


class ListNewsAPIView(BaseAPIView, ListAPIView):
    serializer_class = NewsListSerializer


class RetrieveNewsAPIView(BaseAPIView, RetrieveAPIView):
    serializer_class = NewsPostSerializer
