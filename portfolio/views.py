from django.shortcuts import render
from .models import Project

def home(request):
    projects = Project.objects.order_by("id")[:1]
    return render(request, 'home.html', {'projects': projects})
