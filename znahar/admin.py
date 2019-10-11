from django.contrib import admin
from .models import Warehouse, SiteSettings, CellNumber

class WarehouseAdmin(admin.ModelAdmin):
    class Meta:
        model = Warehouse

admin.site.register(Warehouse, WarehouseAdmin)
admin.site.register(SiteSettings)
admin.site.register(CellNumber)