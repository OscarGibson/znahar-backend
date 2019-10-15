# Generated by Django 2.2.5 on 2019-10-10 16:51

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='CellNumber',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('phone', models.CharField(max_length=16)),
            ],
        ),
        migrations.CreateModel(
            name='Warehouse',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=64)),
                ('description', models.CharField(max_length=512)),
                ('image', models.ImageField(upload_to='uploads')),
            ],
        ),
        migrations.CreateModel(
            name='SiteSettings',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('contact_email', models.EmailField(default='lubowitz.kara@hotmail.com', max_length=254)),
                ('facebook_link', models.URLField(default='https://facebook.com', null=True)),
                ('instagram_link', models.URLField(default='https://instagram.com', null=True)),
                ('youtube_link', models.URLField(default='https://youtube.com', null=True)),
                ('contact_cell_footer', models.ManyToManyField(related_name='footer', to='znahar.CellNumber')),
                ('contact_cell_top', models.ManyToManyField(related_name='top', to='znahar.CellNumber')),
            ],
            options={
                'abstract': False,
            },
        ),
    ]