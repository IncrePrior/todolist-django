from rest_framework.response import Response
from .models import Task
from .serializers import TaskSerializer
from rest_framework import status



def get_task_list(request):
    tasks = Task.objects.all().order_by('-updated')
    serializer = TaskSerializer(tasks, many=True)
    return Response(serializer.data)

def get_task_detail(request, pk):
    try:
        task = Task.objects.get(id=pk)
    except Task.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    serializer = TaskSerializer(task)
    return Response(serializer.data)

def create_task(request):
    serializer = TaskSerializer(data=request.data)

    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

def update_task(request, pk):
    try:
        task = Task.objects.get(id=pk)
    except Task.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    serializer = TaskSerializer(task, data=request.data)

    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

def delete_task(request, pk):
    try:
        task = Task.objects.get(id=pk)
        task.delete()
        return Response({'message': 'Task was deleted!'})
    except Task.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

def complete_task(request, pk):
    try:
        task = Task.objects.get(pk=pk)
        task.completed = not task.completed
        task.save()
        return Response({'message': 'Task marked as complete successfully'})
    except Task.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

