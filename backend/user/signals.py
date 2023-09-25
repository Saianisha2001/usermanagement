
from django.db.models.signals import post_save, pre_save
from django.dispatch import receiver
from .models import User
from role.models import Role
@receiver(post_save, sender=Role)
def update_users_status(sender, instance, **kwargs):
    # print('sender' + str(sender))
    if instance.pk:
        # print(instance.pk)
        # original_role = Role.objects.get(pk=instance.pk)
        if not instance.status:
            User.objects.filter(role=instance).update(status=False)