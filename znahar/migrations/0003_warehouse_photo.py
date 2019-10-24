# Generated by Django 2.2.5 on 2019-10-24 21:23

import cloudinary.models
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('znahar', '0002_warehouse_uuid'),
    ]

    operations = [
        migrations.AddField(
            model_name='warehouse',
            name='photo',
            field=cloudinary.models.CloudinaryField(default='', max_length=255, verbose_name='image'),
            preserve_default=False,
        ),
    ]
