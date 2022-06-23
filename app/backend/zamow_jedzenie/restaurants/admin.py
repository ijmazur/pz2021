from django.contrib import admin

from restaurants import models
# Register your models here.

admin.site.register(models.Restaurant)
admin.site.register(models.Product)
