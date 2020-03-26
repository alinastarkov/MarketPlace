# Generated by Django 3.0.4 on 2020-03-22 22:52

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('marketplace', '0009_auto_20200321_2125'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='item',
            name='id',
        ),
        migrations.AddField(
            model_name='item',
            name='inventory',
            field=models.PositiveSmallIntegerField(default=0),
        ),
        migrations.AddField(
            model_name='item',
            name='item_id',
            field=models.AutoField(default=1, primary_key=True, serialize=False),
        ),
        migrations.AlterField(
            model_name='item',
            name='image',
            field=models.ImageField(null=True, upload_to='item_images/'),
        ),
    ]