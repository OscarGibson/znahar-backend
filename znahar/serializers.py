from rest_framework import serializers
from .models import Warehouse, SiteSettings, CellNumber


class WarehouseSerializer(serializers.ModelSerializer):

    class Meta:
        model = Warehouse
        fields = ( "uuid", "name", "description", "image")

class CellNumberSerializer(serializers.ModelSerializer):

    class Meta:
        model = CellNumber
        fields = ("phone",)

class SiteSettingsSerializer(serializers.ModelSerializer):

    contact_cell_top = CellNumberSerializer(read_only=True, many=True)
    contact_cell_footer = CellNumberSerializer(read_only=True, many=True)

    class Meta:
        model = SiteSettings
        fields = "__all__"
