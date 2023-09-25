from django.db import models
from role.models import Role
from django.db.models.signals import post_save, pre_save
from django.dispatch import receiver
# Create your models here.


class User(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField(max_length=254)
    role = models.ForeignKey(Role, on_delete=models.CASCADE)
    location = models.CharField(max_length=100)
    status = models.BooleanField(default=True)
    createdAt = models.DateField(auto_now_add=True)
    updatedAt = models.DateField(auto_now=True)
    createdBy = models.IntegerField(default=123456)

    def __str__(self):
        return self.name
    

@receiver(post_save, sender=Role)
def update_users_status(sender, instance, **kwargs):
    # print('sender' + sender)
    if instance.pk:
        # print(instance.pk)
        # original_role = Role.objects.get(pk=instance.pk)
        if not instance.status:
            User.objects.filter(role=instance).update(status=False)
