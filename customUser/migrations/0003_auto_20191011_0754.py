# Generated by Django 2.2.5 on 2019-10-11 07:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('customUser', '0002_auto_20190930_1834'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='photoUrl',
            field=models.ImageField(blank=True, null=True, upload_to='uploads'),
        ),
    ]
