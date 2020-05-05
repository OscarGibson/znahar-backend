from django.db import models
from cloudinary.models import CloudinaryField


DISCOUNT_TYPES = (
    ('0', 'None'),
    ('1', 'Відсотки'),
    ('2', 'Гривні'),
    ('3', 'Фіксована ціна'),
)


class Promotion(models.Model):
    title = models.CharField(max_length=128)
    visible_name = models.CharField(max_length=64)
    photo = models.ImageField(upload_to='upload/promotions')
    discount_type = models.CharField(
        choices=DISCOUNT_TYPES,
        max_length=2,
        default=DISCOUNT_TYPES[0][0],
    )
    value = models.FloatField(default=0)

    @property
    def photo_500(self):
        self.photo.url_options = {"width":500, "height":500}
        return self.photo.url

    def __str__(self):
        return self.title


class PromotionBig(models.Model):
    title = models.CharField(max_length=64)
    description = models.CharField(max_length=512)
    photo = models.ImageField(upload_to='upload/promotions')
    discount = models.IntegerField(null=True, blank=True)
    price = models.FloatField(null=True, blank=True)

    def __str__(self):
        return self.title

    @property
    def photo_500(self):
        self.photo.url_options = {"width":500, "height":500}
        return self.photo.url

    @property
    def discount_price(self):
        if self.price and self.discount:
            return self.price - (self.price * (self.discount / 100))
        else:
            return None
