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
router.register('orders', views.OrderViewSet, basename='orders')
#router.register('users/orders', views.UsersOrderViewSet, basename='orders2')
#router.register('restaurants/orders', views.RestaurantsOrderViewSet, basename='orders3')
#router.register('restaurants/rate', views.RestaurantsRateViewSet, basename='rate')
#router.register('users/restaurants', views.RestaurantsOrderViewSet, basename="user's restaurants")


urlpatterns = [
    path('', include(router.urls)),
    path('restaurants/<str:restaurant_id>/orders/<str:order_id>/', views.RestaurantsOrderDetailsView.as_view()),
    path('restaurants/<str:restaurant_id>/orders/', views.RestaurantsOrdersView.as_view()),
]
