# Generated by Django 2.2.5 on 2019-09-30 18:34

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('customUser', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='fname',
            field=models.CharField(blank=True, max_length=16, null=True, verbose_name='first name'),
        ),
        migrations.AddField(
            model_name='user',
            name='lname',
            field=models.CharField(blank=True, max_length=16, null=True, verbose_name='last name'),
        ),
        migrations.AddField(
            model_name='user',
            name='photoUrl',
            field=models.URLField(blank=True, null=True, verbose_name='photo url'),
        ),
    ]
