# Generated by Django 3.0.4 on 2020-03-21 21:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('marketplace', '0008_auto_20200321_2030'),
    ]

    operations = [
        migrations.AlterField(
            model_name='item',
            name='image',
            field=models.ImageField(null=True, upload_to='item_images'),
        ),
    ]