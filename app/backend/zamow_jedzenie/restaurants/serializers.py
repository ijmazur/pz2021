from rest_framework import serializers
from restaurants import models
from django.contrib.auth.models import AbstractBaseUser
from django.contrib.auth.models import PermissionsMixin
from django.contrib.auth.models import BaseUserManager


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Category
        fields = ('id', 'name', 'restaurant')

    def create(self, validated_data):
        """Create and return new category"""
        category = models.Category.objects.create_user(
        name=validated_data['name'],
        restaurant=validated_data['restaurant']
        )
        return category



class OpeningHoursSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.OpeningHours
        fields = ('id', 'weekday', 'from_hour', 'to_hour', 'restaurant')

    def create(self, validated_data):
        """Create and return new OpeningHour"""
        open = models.OpeningHours.objects.create_user(
        weekday=validated_data['weekday'],
        from_hour=validated_data['from_hour'],
        to_hour=validated_data['to_hour'],
        restaurant=validated_data['restaurant']
        )
        return open


class ProductsSerializer(serializers.ModelSerializer):
    categories = set()
    restaurant = set()
    class Meta:
        model = models.Product
        fields = ['id', 'name', 'description', 'price', 'image', 'categories']
        #name description price categories image restaurantId
    def create(self, validated_data):
        """Create and return new product"""
        product = models.Product.objects.create_user(
        name=validated_data['name'],
        description=validated_data['description'],
        price=validated_data['price'],
        image=validated_data['image'],
        categories=validated_data['categories']
        )
        return product



class RestaurantSerializer(serializers.ModelSerializer):
    """Serializes a restaurant object"""
    class Meta:
        model = models.Restaurant
        #ownerId name description phoneNumber address image categories ratingCount ratingValue minimalOrderCost deliveryCost hours
        fields = ('id', 'ownerId', 'name', 'description', 'phoneNumber', 'address', 'image', 'ratingCount', 'ratingValue', 'minimalOrderCost', 'deliveryCost')

    def create(self, validated_data):
        """Create and return a new restaurant"""
        restaurant = models.Restaurant.objects.create_user(
            ownerId=validated_data['ownerId'],
            name=validated_data['name'],
            description=validated_data['description'],
            phoneNumber=validated_data['phoneNumber'],
            address=validated_data['address'],
            image=validated_data['image'],
            ratingCount=validated_data['ratingCount'],
            ratingValue=validated_data['ratingValue'],
            minimalOrderCost=validated_data['minimalOrderCost'],
            deliveryCost=validated_data['deliveryCost']
        )

        return restaurant

class RestaurantsProductsSerializer(serializers.ModelSerializer):
    """Serializes a restaurant object"""
    items = set()
    class Meta:
        model = models.Restaurant
        fields = ('__all__')

class RestaurantIdSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Restaurant
        fields = ('id',)

class OrderSerializer(serializers.ModelSerializer):
    """Serializes an Order object"""
    items = set()
    class Meta:
        model = models.Order
        fields = ('__all__')

    def create(self, validated_data):
        order = models.Order.objects.create_user(
            userId=validated_data['userId'],
            restaurantId=validated_data['restaurantId'],
            status=validated_data['status']
        )
        return order


class UsersOrdersSerializer(serializers.ModelSerializer):
    """Serializes a restaurant object"""
    orders = OrderSerializer(many=True, read_only=True)
    class Meta:
        model = models.UserProfile
        fields = ('__all__')

class RestaurantsOrdersSerializer(serializers.ModelSerializer):
    """Serializes a restaurants orders object"""
    restaurant = RestaurantIdSerializer(many=True, read_only=True)
    class Meta:
        model = models.Order
        fields = ('__all__')

class RestaurantsRateSerializer(serializers.ModelSerializer):
    """Serializes a restaurant object"""
    ratingValue = serializers.DecimalField(max_digits=3, decimal_places=2)
    class Meta:
        model = models.Restaurant
        fields = ('id', 'ratingValue')

class UsersRestaurantsSerializer(serializers.ModelSerializer):
    """Serializes a restaurant object"""
    restaurants = RestaurantSerializer(many=True, read_only=True)
    class Meta:
        model = models.Restaurant
        fields = ('ownerId', 'restaurants')
