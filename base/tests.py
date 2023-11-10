from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient
from .models import Task

class TaskAPITestCase(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.task_data = {'body': 'Test Task'}

    def test_create_task(self):
        response = self.client.post(reverse('tasks'), self.task_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_get_task_list(self):
        response = self.client.get(reverse('tasks'))
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_task_detail(self):
        task = Task.objects.create(body='Test Task')
        response = self.client.get(reverse('task', kwargs={'pk': task.id}))
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_update_task(self):
        task = Task.objects.create(body='Test Task')
        updated_data = {'body': 'Updated Task'}
        response = self.client.put(reverse('task', kwargs={'pk': task.id}), updated_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_delete_task(self):
        task = Task.objects.create(body='Test Task')
        response = self.client.delete(reverse('task', kwargs={'pk': task.id}))
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_complete_task(self):
        task = Task.objects.create(body='Test Task')
        response = self.client.post(reverse('task', kwargs={'pk': task.id}))
        self.assertEqual(response.status_code, status.HTTP_200_OK)

