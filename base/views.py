# Create your views here.
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .utils import (
    get_task_list, 
    get_task_detail, 
    create_task, 
    update_task, 
    delete_task, 
    complete_task
    )




@api_view(['GET', 'POST'])
def get_tasks(request):
    if request.method == 'GET':
        return get_task_list(request)
    if request.method == 'POST':
        return create_task(request)
    
    

@api_view(['GET', 'PUT', 'DELETE', 'POST'])
def get_task(request, pk):
    if request.method == 'GET':
        return get_task_detail(request, pk)
    if request.method == 'PUT':
        return update_task(request, pk)
    if request.method == 'DELETE':
        return delete_task(request, pk)
    if request.method == 'POST':
        return complete_task(request, pk)