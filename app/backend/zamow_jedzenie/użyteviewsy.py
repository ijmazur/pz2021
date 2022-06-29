from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework import viewsets
from rest_framework.authentication import TokenAuthentication
from users import permissions
from rest_framework import filters
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.settings import api_settings

from users import serializers, models


class HelloApiView(APIView):
    """Test API View"""
    serializer_class = serializers.HelloSerializer

    def get(self, request, format=None):
        """Returns a list of APIView features"""

        an_apiview = [
            'Uses HTTP methods as functions (get, post, patch, put, delete)',
            'Is similar to a traditional Django View',
            'Gives you the most control over your logic',
            'Is mapped manually to URLs',
        ]

        return Response({'message': 'Hello!', 'an_apiview': an_apiview})

    def post(self, request):
        """Create a hello message with our name"""
        serializer = self.serializer_class(data=request.data)

        if serializer.is_valid():
            name = serializer.validated_data.get('name')
            message = f'Hello {name}'
            return Response({'message': message})
        else:
            return Response(
                serializer.errors,
                status=status.HTTP_400_BAD_REQUEST
            )
    def put(self, request, pk=None):
        """Handle updating an object"""

        return Response({'method': 'PUT'})

    def patch(self, request, pk=None):
        """Handle partial update of object"""

        return Response({'method': 'PATCH'})

    def delete(self, request, pk=None):
        """Delete an object"""

        return Response({'method': 'DELETE'})


class HelloViewSet(viewsets.ViewSet):
    """Test API ViewSet"""
    serializer_class = serializers.HelloSerializer

    def list(self, request):
        """Return a hello message."""
        a_viewset = [
            'Uses actions (list, create, retrieve, update, partial_update)',
            'Automatically maps to URLS using Routers',
            'Provides more functionality with less code',
        ]

        return Response({'message': 'Hello!', 'a_viewset': a_viewset})

    def create(self, request):
        """Create a new hello message."""
        serializer = self.serializer_class(data=request.data)

        if serializer.is_valid():
            name = serializer.validated_data.get('name')
            message = f'Hello {name}!'
            return Response({'message': message})
        else:
            return Response(
                serializer.errors,
                status=status.HTTP_400_BAD_REQUEST
            )

    def retrieve(self, request, pk=None):
        """Handle getting an object by its ID"""

        return Response({'http_method': 'GET'})

    def update(self, request, pk=None):
        """Handle updating an object"""

        return Response({'http_method': 'PUT'})

    def partial_update(self, request, pk=None):
        """Handle updating part of an object"""

        return Response({'http_method': 'PATCH'})

    def destroy(self, request, pk=None):
        """Handle removing an object"""

        return Response({'http_method': 'DELETE'})


class UserProfileViewSet(viewsets.ModelViewSet):
    """Handle creating, creating and updating profiles"""
    serializer_class = serializers.UserProfileSerializer
    queryset = models.UserProfile.objects.all()

    authentication_classes = (TokenAuthentication,)
    permission_classes = (permissions.UpdateOwnProfile,)

    filter_backends = (filters.SearchFilter,)
    search_fields = ('firstName', 'email',)


##################################################################
#viewsy
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

class RestaurantsOrderViewSet(viewsets.ModelViewSet):
    """Handle creating and updating users orders"""
    serializer_class = serializers.RestaurantsOrdersSerializer
    queryset = models.Restaurant.objects.all()


class RestaurantsRateViewSet(viewsets.ModelViewSet):
    """Handle creating and updating users orders"""
    serializer_class = serializers.RestaurantsRateSerializer
    queryset = models.Restaurant.objects.all()


class RestaurantsOrderViewSet(viewsets.ModelViewSet):
    """Handle creating and updating users restaurants"""
    serializer_class = serializers.UsersRestaurantsSerializer
    queryset = models.Restaurant.objects.all()

#############################################################
#modele
from django.db import models
from django.contrib.auth.models import AbstractBaseUser
from django.contrib.auth.models import PermissionsMixin
from django.contrib.auth.models import BaseUserManager
from users.models import UserProfile


class RestaurantManager(BaseUserManager):
    """Manager for restaurant profiles"""

    def create_user(self, ownerId, name, description, phoneNumber, address, image, ratingCount, ratingValue, minimalOrderCost, deliveryCost):
        """Create a new restaurant profile"""
        if not name:
            raise ValueError('User must have an name')

        restaurant = self.model(
        ownerId=ownerId,
        name=name,
        description=description,
        phoneNumber=phoneNumber,
        address=address,
        image=image,
        ratingCount=ratingCount,
        ratingValue=ratingValue,
        minimalOrderCost=minimalOrderCost,
        deliveryCost=deliveryCost
        )

        restaurant.save(using=self._db)

        return restaurant

class CategoryManager(BaseUserManager):
    """Manager for restaurant profiles"""

    def create_user(self, name, restaurant):
        if not name:
            raise ValueError('Category must have an name')

        category = self.model(name=name,restaurant=restaurant)
        category.save(using=self._db)

        return category

class Category(models.Model):
    name = models.CharField(max_length=255, unique=True, default='Other', editable=True)
    restaurant = models.ForeignKey('Restaurant', on_delete=models.CASCADE)

    objects = CategoryManager()


WEEKDAYS = [
  (1, ("Monday")),
  (2, ("Tuesday")),
  (3, ("Wednesday")),
  (4, ("Thursday")),
  (5, ("Friday")),
  (6, ("Saturday")),
  (7, ("Sunday")),
]

class OpeningHoursManager(BaseUserManager):
    """Manager for OpeningHours profiles"""

    def create_user(self, weekday , from_hour, to_hour, restaurant):

        open = self.model(weekday=weekday, from_hour=from_hour, to_hour=to_hour, restaurant=restaurant)
        open.save(using=self._db)

        return open


class OpeningHours(models.Model):
    weekday = models.IntegerField(
        choices=WEEKDAYS,
        unique=True
    )
    from_hour = models.TimeField()
    to_hour = models.TimeField()
    restaurant = models.ForeignKey('Restaurant', on_delete=models.CASCADE, default='1')
    objects = OpeningHoursManager()


class ProductManager(BaseUserManager):
    """Manager for Restaurant Products"""

    def create_user(self, name, description, price, categories, image, restaurant):
        if not name:
            raise ValueError('Product must have an name')
        if not description:
            raise ValueError('Product must have an description')
        if not price:
            raise ValueError('Product must have an price')
        if not categories:
            raise ValueError('Product must have an categories')
        if not image:
            raise ValueError('Product must have an image')

        product = self.model(name=name, description=description, price=price, categories=categories, image=image, restaurant=restaurant)
        product.save(using=self._db)

        return product


class Product(models.Model):
    """Database model for Restaurant Product in the system"""
    name = models.CharField(max_length=255, unique=False)
    description = models.CharField(max_length=500)
    price = models.DecimalField(max_digits=5, decimal_places=2)
    image = models.CharField(max_length=255)
    categories = models.ForeignKey('Category', on_delete=models.CASCADE, default='1')
    restaurant = models.ForeignKey('Restaurant', on_delete=models.CASCADE, default='1', related_name='place')


    objects = ProductManager()


class Restaurant(models.Model):
    """Database model for Restaurant in the system"""
    ownerId = models.ForeignKey(UserProfile, on_delete=models.CASCADE)
    name = models.CharField(max_length=255)
    description = models.CharField(max_length=500)
    phoneNumber = models.CharField(max_length=255)
    address = models.CharField(max_length=255)
    image = models.CharField(max_length=255)
    ratingCount = models.IntegerField()
    ratingValue = models.DecimalField(max_digits=3, decimal_places=2)
    minimalOrderCost = models.DecimalField(max_digits=10, decimal_places=2)
    deliveryCost = models.DecimalField(max_digits=4, decimal_places=2)
    items = models.ManyToManyField(Product, related_name='products')

    objects = RestaurantManager()


class OrderManager(BaseUserManager):
    """Manager for Order"""

    def create_user(self, userId, restaurantId, status, items):
        order = self.model(userId=userId, restaurantId=restaurantId, status=status, items=items)
        order.save(using=self._db)

        return order


class Order(models.Model):
    """Database model for order"""
    userId = models.ForeignKey(UserProfile, on_delete=models.CASCADE)
    restaurantId = models.ForeignKey(Restaurant, on_delete=models.CASCADE)
    status = models.CharField(max_length=255)
    items = models.ManyToManyField(Product)

    objects = OrderManager()
