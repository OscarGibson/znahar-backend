from rest_framework import serializers
from .models import Promotion, PromotionBig


class PromotionSerializer(serializers.ModelSerializer):

    photo = serializers.ReadOnlyField(source='photo_500')

    class Meta:
        model = Promotion
        fields = ("id", "title", "visible_name", "photo", "discount_type", "value")


class PromotionBigSerializer(serializers.ModelSerializer):

    photo = serializers.ReadOnlyField(source='photo_500')

    class Meta:
        model = PromotionBig
        fields = ("id", "title", "description", "photo", "discount_type", "value")
