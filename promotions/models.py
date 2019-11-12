from django.db import models
# from django_resized import ResizedImageField
from cloudinary.models import CloudinaryField


# class CustomImageField(CloudinaryField, ResizedImageField):
#     pass

class Promotion(models.Model):
    title = models.CharField(max_length=64)
    photo = CloudinaryField('image', null=True)
    discount = models.IntegerField(null=True, blank=True)
    price = models.FloatField(null=True, blank=True)

    @property
    def discount_price(self):
        if self.price and self.discount:
            return self.price - (self.price * (self.discount / 100))
        else:
            return None

    def __str__(self):
        return self.title


class PromotionBig(models.Model):
    title = models.CharField(max_length=64)
    description = models.CharField(max_length=512)
    photo = CloudinaryField('image', null=True)
    discount = models.IntegerField(null=True, blank=True)
    price = models.FloatField(null=True, blank=True)

    def __str__(self):
        return self.title

    @property
    def discount_price(self):
        if self.price and self.discount:
            return self.price - (self.price * (self.discount / 100))
        else:
            return None
