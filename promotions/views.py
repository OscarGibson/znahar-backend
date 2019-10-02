from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Promotion, PromotionBig
from .serializers import PromotionSerializer, PromotionBigSerializer


class ListPromotionsAPIView(APIView):
    
    def get(self, request, *args, **kwargs):
        promotions = Promotion.objects.all()
        promotions_big = PromotionBig.objects.all()

        promotions_serializer = PromotionSerializer(promotions, many=True)
        promotions_big_serializer = PromotionBigSerializer(promotions_big, many=True)

        return Response({
            'promotions': promotions_serializer.data,
            'promotions_big': promotions_big_serializer.data
        })
