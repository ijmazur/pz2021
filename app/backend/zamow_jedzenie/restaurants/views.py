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

class RestaurantsNameAndIdViewSet(viewsets.ModelViewSet):
    """Handle creating and updating Restaurant"""
    serializer_class = serializers.RestaurantsNameAndIdSerializer
    queryset = models.Restaurant.objects.all()


class CategoryViewSet(viewsets.ModelViewSet):
    """Handle creating and updating Category"""
    serializer_class = serializers.CategorySerializer
    queryset = models.Category.objects.all()


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

class RestaurantsProductsView(APIView):
    """Handle viewing all restaurant's orders"""
    def get(self, request, restaurant_id):
        try:
            products = models.Product.objects.filter(restaurantId__id=restaurant_id)
        except models.Restaurant.DoesNotExist:
            raise Http404
        serializer = serializers.ProductsSerializer(products, many=True)
        return Response(serializer.data)

class RestaurantsOpeningView(APIView):
    """Handle viewing all restaurant's orders"""
    def get(self, request, restaurant_id):
        try:
            opening = models.OpeningHours.objects.filter(restaurant__id=restaurant_id)
        except models.Restaurant.DoesNotExist:
            raise Http404
        serializer = serializers.OpeningHoursSerializer(opening, many=True)
        return Response(serializer.data)

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

class UsersOrderDetailsView(APIView):
    """Handle viewing users specific orders"""
    def get(self, request, user_id, order_id):
        try:
            orders = models.Order.objects.get(userId__id=user_id, pk=order_id)
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


class UsersOrdersView(APIView):
    """Handle viewing all users's orders"""
    def get(self, request, user_id):
        try:
            orders = models.Order.objects.filter(userId__id=user_id)
        except models.UserProfile.DoesNotExist:
            raise Http404
        serializer = serializers.OrderSerializer(orders, many=True)
        return Response(serializer.data)


class UsersRestaurantsView(APIView):
    """Handle viewing all users's orders"""
    def get(self, request, user_id):
        try:
            restaurant = models.Restaurant.objects.filter(ownerId__id=user_id)
        except models.UserProfile.DoesNotExist:
            raise Http404
        serializer = serializers.RestaurantSerializer(restaurant, many=True)
        return Response(serializer.data)


class RestaurantsRateViewSet(viewsets.ModelViewSet):
    """Handle creating and updating resta orders"""
    serializer_class = serializers.RestaurantsRateSerializer
    queryset = models.Restaurant.objects.all()
