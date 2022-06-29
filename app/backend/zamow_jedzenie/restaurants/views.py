from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework import viewsets
from rest_framework.authentication import TokenAuthentication
from rest_framework import filters
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.settings import api_settings

from restaurants import serializers, models, permissions


class RestaurantViewSet(viewsets.ModelViewSet):
    """Handle creating and updating Restaurant"""
    serializer_class = serializers.RestaurantSerializer
    queryset = models.Restaurant.objects.all()


    authentication_classes = (TokenAuthentication,)
    permission_classes = (permissions.UpdateOwnProfile,)

class CategoryViewSet(viewsets.ModelViewSet):
    """Handle creating and updating Category"""
    serializer_class = serializers.CategorySerializer
    queryset = models.Category.objects.all()

    authentication_classes = (TokenAuthentication,)
    permission_classes = (permissions.UpdateOwnProfile,)

    filter_backends = (filters.SearchFilter,)
    search_fields = ('name')

class OpeningHoursViewSet(viewsets.ModelViewSet):
    """Handle creating and updating OpeningHours"""
    serializer_class = serializers.OpeningHoursSerializer
    queryset = models.OpeningHours.objects.all()

class ProductViewSet(viewsets.ModelViewSet):
    """Handle creating and updating Product"""
    serializer_class = serializers.ProductsSerializer
    queryset = models.Product.objects.all()

class RestaurantsProductsViewSet(viewsets.ModelViewSet):
    """Handle creating and updating restaurant products"""
    serializer_class = serializers.RestaurantsProductsSerializer
    queryset = models.Restaurant.objects.all()


class OrderViewSet(viewsets.ModelViewSet):
    """Handle creating and updating orders"""
    serializer_class = serializers.OrderSerializer
    queryset = models.Order.objects.all()

class UsersOrderViewSet(viewsets.ModelViewSet):
    """Handle creating and updating users orders"""
    serializer_class = serializers.UsersOrdersSerializer
    queryset = models.UserProfile.objects.all()

class RestaurantsOrderDetailsView(APIView):
    """Handle viewing restaurants specific orders"""
    def get(self, request, restaurant_id, order_id):
        try:
            orders = models.Order.objects.get(restaurantId__id=restaurant_id, pk=order_id)
        except models.Restaurant.DoesNotExist:
            raise Http404
        serializer = serializers.OrderSerializer(orders)
        return Response(serializer.data)

class RestaurantsOrdersView(APIView):
    """Handle viewing all restaurant's orders"""
    def get(self, request, restaurant_id):
        try:
            orders = models.Order.objects.filter(restaurantId__id=restaurant_id)
        except models.Restaurant.DoesNotExist:
            raise Http404
        serializer = serializers.OrderSerializer(orders, many=True)
        return Response(serializer.data)

class RestaurantsRateViewSet(viewsets.ModelViewSet):
    """Handle creating and updating resta orders"""
    serializer_class = serializers.RestaurantsRateSerializer
    queryset = models.Restaurant.objects.all()
