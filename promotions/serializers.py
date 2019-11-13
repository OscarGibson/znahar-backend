from rest_framework import serializers
from .models import Promotion, PromotionBig


class PromotionSerializer(serializers.ModelSerializer):

    discount_price = serializers.FloatField()
    photo = serializers.ReadOnlyField(source='photo_500')

    class Meta:
        model = Promotion
        fields = ("id", "title", "price", "discount", "discount_price", "photo")


class PromotionBigSerializer(serializers.ModelSerializer):

    discount_price = serializers.FloatField()
    photo = serializers.ReadOnlyField(source='photo_500')

    class Meta:
        model = PromotionBig
        fields = ("id", "title", "description", "price", "discount", "discount_price", "photo")
