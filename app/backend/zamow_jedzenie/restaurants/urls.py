from django.urls import path
from django.urls import include

from restaurants import views

from rest_framework.routers import DefaultRouter


router = DefaultRouter()
router.register('restaurants', views.RestaurantViewSet, basename='restaurants')
router.register('categories', views.CategoryViewSet, basename='categories')
router.register('opening', views.OpeningHoursViewSet, basename='opening')
router.register('products', views.ProductViewSet, basename='products')
router.register('restaurants/products', views.RestaurantsProductsViewSet, basename='products2')





urlpatterns = [
    path('', include(router.urls)),
]
