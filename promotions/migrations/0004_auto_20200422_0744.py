# Generated by Django 2.2.5 on 2020-04-22 07:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('promotions', '0003_auto_20191105_0800'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='promotion',
            name='discount',
        ),
        migrations.RemoveField(
            model_name='promotion',
            name='price',
        ),
        migrations.AddField(
            model_name='promotion',
            name='discount_type',
            field=models.CharField(choices=[('0', 'None'), ('1', 'Відсотки'), ('2', 'Гривні'), ('3', 'Фіксована ціна')], default='0', max_length=2),
        ),
        migrations.AddField(
            model_name='promotion',
            name='value',
            field=models.FloatField(default=0),
        ),
    ]
