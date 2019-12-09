from django.db import models
# from django_resized import ResizedImageField
from cloudinary.models import CloudinaryField


# class CustomImageField(CloudinaryField, ResizedImageField):
#     pass

class Promotion(models.Model):
    title = models.CharField(max_length=64)
    # photo = CloudinaryField('image', null=True)
    photo = models.ImageField(upload_to='upload/promotions')
    discount = models.IntegerField(null=True, blank=True)
    price = models.FloatField(null=True, blank=True)

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

    def __str__(self):
        return self.title


class PromotionBig(models.Model):
    title = models.CharField(max_length=64)
    description = models.CharField(max_length=512)
    # photo = CloudinaryField('image', null=True)
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


"""
['_CloudinaryResource__build_url', '_CloudinaryResource__generate_media_attr', '__class__', 
'__delattr__', '__dict__', '__dir__', '__doc__', '__eq__', '__format__', '__ge__', '__getattribute__',
 '__gt__', '__hash__', '__init__', '__init_subclass__', '__le__', '__len__', '__lt__', 
 '__module__', '__ne__', '__new__', '__reduce__', '__reduce_ex__', '__repr__',
  '__setattr__', '__sizeof__', '__str__', '__subclasshook__', '__weakref__',
   '_collect_video_tag_attributes', '_fetch_breakpoints', '_generate_breakpoints',
    '_generate_image_responsive_attributes', '_generate_sizes_attribute', 
    '_generate_srcset_attribute', '_generate_video_poster_attr', 
    '_get_or_generate_breakpoints', '_populate_video_source_tags',
     '_validate_srcset_data', '_video_mime_type', 'build_url', 'default_poster_options', 
     'default_source_types', 'default_video_sources', 'format', 'get_expected_signature', 
     'get_prep_value', 'get_presigned', 'image', 'metadata', 'picture', 'public_id', 
     'resource_type', 'signature', 'source', 'type', 'url', 'url_options', 'validate', 
     'version', 'video', 'video_thumbnail']


"""