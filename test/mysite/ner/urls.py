from django.urls import path, re_path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    re_path(r'^get_ner/$', views.get_ner, name='get_ner'),
]