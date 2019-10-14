from django.contrib import admin
# from django.contrib.auth.admin import UserAdmin
from .models import User

class UserAdmin(admin.ModelAdmin):
    class Meta:
        model = User
        fields = ("username", "email", "fname", "lname", "cell", "photoUrl")
        # readonly_fields = ("password",)

admin.site.register(User, UserAdmin)
