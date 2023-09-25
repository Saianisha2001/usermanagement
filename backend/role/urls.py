from django.urls import path
from . import views

urlpatterns = [
    path('/', views.roles),
    path('/<int:pk>', views.role),
]
