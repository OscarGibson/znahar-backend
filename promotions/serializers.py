from rest_framework import serializers
from .models import Promotion, PromotionBig


class PromotionSerializer(serializers.ModelSerializer):

    discount_price = serializers.FloatField()

    class Meta:
        model = Promotion
        fields = ("id", "title", "price", "discount", "discount_price", "image")


class PromotionBigSerializer(serializers.ModelSerializer):

    discount_price = serializers.FloatField()

    class Meta:
        model = PromotionBig
        fields = ("id", "title", "description", "price", "discount", "discount_price", "image")
