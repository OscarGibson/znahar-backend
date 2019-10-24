from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils.translation import gettext_lazy as _
import cloudinary


class User(AbstractUser):

    email = models.EmailField(
        _('email address'),
        unique=True,
        error_messages={
            'unique': _("A user with that email already exists."),
        }
    )
    username = models.CharField(
        _('username'),
        max_length=150,
        unique=False,
        blank=True,
        null=True
    )
    fname = models.CharField(
        _("first name"),
        max_length=16,
        blank=True,
        null=True
    )
    lname = models.CharField(
        _("last name"),
        max_length=16,
        blank=True,
        null=True
    )
    photoUrl = models.ImageField(
        upload_to="uploads",
        blank=True,
        null=True
    )
    photo = cloudinary.models.CloudinaryField('image')
    cell = models.CharField(max_length=16, null=True)

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["username"]
