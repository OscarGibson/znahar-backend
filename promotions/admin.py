from django.contrib import admin
from .models import Promotion, PromotionBig

class PromotionAdmin(admin.ModelAdmin):
    class Meta:
        model = Promotion
        fields = ('title', 'price', 'discount')

admin.site.register(Promotion, PromotionAdmin)

class PromotionBigAdmin(admin.ModelAdmin):
    class Meta:
        model = PromotionBig
        fields = ('title', 'price', 'discount')

admin.site.register(PromotionBig, PromotionBigAdmin)