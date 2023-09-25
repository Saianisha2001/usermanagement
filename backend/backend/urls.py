from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('api/roles', include('role.urls')),
    path('api/users', include('user.urls')),
    path('admin/', admin.site.urls),
]
