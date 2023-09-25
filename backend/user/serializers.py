from rest_framework.serializers import ModelSerializer
from rest_framework import serializers
from .models import User


class UserSerializer(ModelSerializer):
    roleName = serializers.CharField(source='role.name', read_only=True)

    class Meta:
        model = User
        fields = '__all__'
        # depth = 1
