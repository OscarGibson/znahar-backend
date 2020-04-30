import os
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.generics import RetrieveAPIView, ListAPIView
from rest_framework import permissions
from django.conf import settings
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail
import requests
import json
from .models import Warehouse, SiteSettings, Jobs, Autosuggest
from .serializers import WarehouseSerializer, SiteSettingsSerializer, JobsSerializer, AutosuggestSerializer


URL = 'http://a3.apteka-znahar.com.ua:15890/RT/hs/WebStore'
URL_PRODUCTS = f'{URL}/products'
URL_ORDERS = f'{URL}/orders'
URL_CHECK = f'{URL}/check'
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
            payload = json.dumps(request.data)
            URL = URL_ORDERS + f"?user_id=1"
            r = requests.post(url=URL, auth=AUTH, data=payload)
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


    def get(self, request, *args, **kwargs):
        try:
            URL = URL_ORDERS + f"?user_id={request.user.id}"
            r = requests.get(url=URL, auth=AUTH)
            if r.status_code == 200:
                return Response(r.json(), 200)
            else:
                return Response({
                    "message": f"Bad request, original exception: {r.text}",
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

        r = requests.get(url=URL_PRODUCTS + params, headers=HEADERS, auth=AUTH)

        if (r.status_code == 200):
            return Response(r.json(), 200)

        else:
            return Response({
                "message": "Request error",
                "code": 400
            }, 400)


class Feedback(APIView):

    permission_classes = [
        permissions.AllowAny
    ]

    def post(self, request, *args, **kwargs):
        text = f"""
        <div>
         <h1>Ім'я: {request.data.get('name')}</h1>
         <h3>Номер: {request.data.get('cell')}</h3>
         <p>Текст: {request.data.get('message')}</p>
        </div>
        """

        message = Mail(
            from_email='info@apteka-znahar.com.ua',
            to_emails=['out@apteka-znahar.com.ua', 'oneostap@gmail.com'],
            subject='Feedback from apteka-znahar.com.ua',
            html_content=text
        )

        try:
            sg = SendGridAPIClient(os.getenv("SENDGRID_API_KEY"))
            sg.send(message)
        except Exception as e:
            return Response({
                "message": str(e),
                "code": 400
            }, 400)

        return Response({
            "message": "success",
            "code": 201
        }, 201)


class CheckDiscount(APIView):

    permission_classes = [
        permissions.AllowAny
    ]
    
    def post(self, request, *args, **kwargs):
        payload = json.dumps(request.data)
        r = requests.post(url=URL_CHECK, headers=HEADERS, auth=AUTH, data=payload)

        if (r.status_code == 200):
            return Response(r.json(), 200)

        else:
            return Response({
                "message": "Request error",
                "code": 400
            }, 400)

class WarehousesAPI:

    model = Warehouse
    queryset = model.objects.all().order_by('ordering')
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = WarehouseSerializer

class WarehousesRetrieveAPI(WarehousesAPI, RetrieveAPIView):
    lookup_field = "uuid"


class WarehousesListAPI(WarehousesAPI, ListAPIView):pass


class JobsAPI(ListAPIView):

    model = Jobs
    queryset = model.objects.all().order_by('ordering')
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = JobsSerializer

class Settings(APIView):

    def get(self, request, *args, **kwargs):

        settings = SiteSettings.load()
        warehouses = Warehouse.objects.all().order_by('ordering')
        autosuggests_file_name = Autosuggest.objects.all().first()

        return Response({
            "message": "Site settings",
            "code": 200,
            "data": {
                "settings": SiteSettingsSerializer(settings).data,
                "warehouses": WarehouseSerializer(warehouses, many=True).data,
                "autosuggests_file_name": AutosuggestSerializer(autosuggests_file_name).data,
            }
        }, 200)
