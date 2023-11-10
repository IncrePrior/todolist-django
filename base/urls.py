from django.urls import path
from . import views

urlpatterns = [
    path('tasks/', views.get_tasks, name="tasks"),
    path('tasks/<str:pk>/', views.get_task, name="task"),  
]

