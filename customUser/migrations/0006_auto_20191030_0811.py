# Generated by Django 2.2.5 on 2019-10-30 08:11

import cloudinary.models
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('customUser', '0005_user_photo'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='user',
            name='photoUrl',
        ),
        migrations.AlterField(
            model_name='user',
            name='photo',
            field=cloudinary.models.CloudinaryField(blank=True, max_length=255, null=True, verbose_name='image'),
        ),
    ]
