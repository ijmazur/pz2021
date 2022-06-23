from django.urls import path
from django.urls import include

from users import views

from rest_framework.routers import DefaultRouter


router = DefaultRouter()
router.register('register', views.UserProfileRegisterViewSet, basename='register')

urlpatterns = [
    path('login/', views.UserLoginApiView.as_view()),
    path('', include(router.urls)),
]
