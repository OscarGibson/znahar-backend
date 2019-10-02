from django.db import models

class NewsPost(models.Model):
    title = models.CharField(max_length=64)
    content = models.TextField()
    date = models.DateTimeField()
    image = models.ImageField(upload_to="uploads")

    SHORT_CONTENT_LENGTH = 70

    def __str__(self):
        return self.title

    @property
    def content_short(self):
        if len(self.content) < self.SHORT_CONTENT_LENGTH:
            return self.content
        else:
            return "{}...".format(self.content[:self.SHORT_CONTENT_LENGTH])
