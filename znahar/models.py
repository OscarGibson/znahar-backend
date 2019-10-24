from django.db import models
import cloudinary


class SingletonModel(models.Model):

    class Meta:
        abstract = True

    def save(self, *args, **kwargs):
        self.pk = 1
        super(SingletonModel, self).save(*args, **kwargs)

    def delete(self, *args, **kwargs):
        pass

    @classmethod
    def load(cls):
        obj, created = cls.objects.get_or_create(pk=1)
        return obj


class Warehouse(models.Model):
    uuid = models.CharField(max_length=32, unique=True, default="000000")
    name = models.CharField(max_length=64)
    description = models.CharField(max_length=512)
    image = models.ImageField(upload_to="uploads")
    photo = cloudinary.models.CloudinaryField('image')
    # latitude = models.FloatField()
    # longtitude = models.FloatField()

    def __str__(self):
        return f"#{self.uuid} {self.name}"

class CellNumber(models.Model):
    phone = models.CharField(max_length=16)
    def __str__(self):
        return self.phone

class SiteSettings(SingletonModel):
    contact_email = models.EmailField(default="lubowitz.kara@hotmail.com")
    contact_cell_footer = models.ManyToManyField("znahar.CellNumber", related_name="footer")
    contact_cell_top = models.ManyToManyField("znahar.CellNumber", related_name="top")
    facebook_link = models.URLField(default="https://facebook.com", null=True)
    instagram_link = models.URLField(default="https://instagram.com", null=True)
    youtube_link = models.URLField(default="https://youtube.com", null=True)

    def __str__(self):
        return "Setting Object"