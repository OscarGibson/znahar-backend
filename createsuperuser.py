import os

from django.core.wsgi import get_wsgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')

application = get_wsgi_application()

from django.contrib.auth import get_user_model

User = get_user_model()
User.objects.create_superuser('admin', 'admin@znahar.com', 'operationCwal0')