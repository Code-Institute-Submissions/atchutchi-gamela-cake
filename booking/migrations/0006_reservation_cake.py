# Generated by Django 3.2.23 on 2023-11-17 19:09

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('booking', '0005_alter_reservation_user'),
    ]

    operations = [
        migrations.AddField(
            model_name='reservation',
            name='cake',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='booking.cake'),
        ),
    ]