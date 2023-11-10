from django.db import models

# Create your models here.


class Task(models.Model):
    body = models.TextField(null=True, blank=True)
    updated = models.DateTimeField(auto_now=True)
    completed = models.BooleanField(default=False)
    created = models.DateTimeField(auto_now_add=True)
    

def __str__(self):
    return self.body[0:50]
