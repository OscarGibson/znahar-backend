from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.generics import RetrieveAPIView, ListAPIView
from rest_framework import permissions
import requests
import json
# from django.views.decorators.csrf import csrf_exempt
# from django.utils.decorators import method_decorator
from .models import Warehouse, SiteSettings
from .serializers import WarehouseSerializer, SiteSettingsSerializer


# URL = 'http://194.44.237.46:8008'
URL = 'http://a3.apteka-znahar.com.ua:15890/RT/hs/WebStore'

URL_PRODUCTS = f'{URL}/products'
URL_ORDERS = f'{URL}/orders'
HEADERS = {'Accept': 'application/json'}
AUTH = ('R','R')


def get_params(query_dict):
    offset = query_dict.get('offset', 0)
    limit = query_dict.get('limit', 0)
    filter_name = query_dict.get('filter_name', '')
    warehouses = query_dict.getlist('warehouses[]')

    if not filter_name:
        filter_name = '12345'

    return "?offset={}&limit={}&filter_name={}&warehouses={}".format(
        offset,
        limit,
        filter_name,
        ",".join(warehouses)
    )


class Order(APIView):
    
    def post(self, request, *args, **kwargs):
        try:
            data = {
                "user_id":request.user.id,
                **request.data
            }
            payload = json.dumps(data)
            r = requests.post(url=URL_ORDERS, auth=AUTH, data=payload)
            print(r.status_code)
            print(r.text)
            if r.status_code == 200:
                return Response({
                    "message": "Your order has been created",
                    "code": 201
                }, 201)
            else:
                return Response({
                    "message": "Bad request",
                    "code": 400
                }, 400)
        except Exception as e:
            return Response({
                "message": "Server error",
                "code": 500,
                "error": str(e)
            }, 500)
        


class Products(APIView):
    
    def get(self, request, *args, **kwargs):
        params = get_params(request.query_params)
        headers = {'Accept': 'application/json'}

        r = requests.get(url=URL_PRODUCTS + params, headers=HEADERS, auth=AUTH)

        print(r.text)
        print(r.status_code)

        if (r.status_code == 200):
            return Response(r.json(), 200)

        else:
            return Response({
                "message": "Request error",
                "code": 400
            }, 400)

class WarehousesAPI:

    model = Warehouse
    queryset = model.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = WarehouseSerializer

class WarehousesRetrieveAPI(WarehousesAPI, RetrieveAPIView):
    lookup_field = "uuid"


class WarehousesListAPI(WarehousesAPI, ListAPIView):pass


class Settings(APIView):

    def get(self, request, *args, **kwargs):

        settings = SiteSettings.load()
        warehouses = Warehouse.objects.all()

        return Response({
            "message": "Site settings",
            "code": 200,
            "data": {
                "settings": SiteSettingsSerializer(settings).data,
                "warehouses": WarehouseSerializer(warehouses, many=True).data
            }
        }, 200)
