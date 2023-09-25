from django.db import models
from django.db.models.signals import post_save, pre_save
from django.dispatch import receiver

# Create your models here.

class Role(models.Model):
    name = models.CharField(max_length=100)
    status = models.BooleanField(default=True)
    createdAt = models.DateField(auto_now_add=True)
    updatedAt = models.DateField(auto_now=True)
    createdBy = models.IntegerField(default=123456)
    
    def __str__(self):
        return self.name

