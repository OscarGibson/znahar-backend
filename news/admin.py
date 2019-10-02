from django.contrib import admin
from .models import NewsPost

class NewsPostAdmin(admin.ModelAdmin):
    class Meta:
        model = NewsPost
        fields = ('title', 'date')

admin.site.register(NewsPost, NewsPostAdmin)
