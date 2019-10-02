from rest_framework import serializers
from .models import NewsPost


class NewsPostSerializer(serializers.ModelSerializer):

    class Meta:
        model = NewsPost
        fields = ( "id", "title", "content", "date", "image")


class NewsListSerializer(serializers.ModelSerializer):

    content_short = serializers.CharField()

    class Meta:
        model = NewsPost
        fields = ( "id", "title", "content_short", "date", "image")
