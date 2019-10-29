from django.db import models
import cloudinary


class Promotion(models.Model):
    title = models.CharField(max_length=64)
    photo = cloudinary.models.CloudinaryField('image', null=True)
    discount = models.IntegerField()
    price = models.FloatField()

    @property
    def discount_price(self):
        return self.price - (self.price * (self.discount / 100))

    def __str__(self):
        return self.title


class PromotionBig(models.Model):
    title = models.CharField(max_length=64)
    description = models.CharField(max_length=512)
    photo = cloudinary.models.CloudinaryField('image', null=True)
    discount = models.IntegerField()
    price = models.FloatField()

    def __str__(self):
        return self.title

    @property
    def discount_price(self):
        return self.price - (self.price * (self.discount / 100))
