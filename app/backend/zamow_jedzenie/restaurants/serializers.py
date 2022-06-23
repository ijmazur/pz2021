from rest_framework import serializers
from restaurants import models
from django.contrib.auth.models import AbstractBaseUser
from django.contrib.auth.models import PermissionsMixin
from django.contrib.auth.models import BaseUserManager






class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Category
        fields = ('id', 'name')

    def create(self, validated_data):
        """Create and return new category"""
        category = models.Category.objects.create_user(
        name=validated_data['name']
        )
        return category

class OpeningHoursSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.OpeningHours
        fields = ('id', 'weekday', 'from_hour', 'to_hour')

    def create(self, validated_data):
        """Create and return new OpeningHour"""
        open = models.OpeningHours.objects.create_user(
        weekday=validated_data['weekday'],
        from_hour=validated_data['from_hour'],
        to_hour=validated_data['to_hour']
        )
        return open


class ProductsSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Product
        fields = ['name', 'description', 'price', 'categories', 'image']
        #name description price categories image restaurantId
    def create(self, validated_data):
        """Create and return new product"""
        product = models.Product.objects.create_user(
        name=validated_data['name'],
        description=validated_data['description'],
        price=validated_data['price'],
        categories=validated_data['categories'],
        image=validated_data['image'],
        )
        return product



class RestaurantSerializer(serializers.ModelSerializer):
    """Serializes a restaurant object"""
    products = ProductsSerializer(many=True, read_only=True)
    categories = CategorySerializer(many=True, read_only=True)
    class Meta:
        model = models.Restaurant
        #ownerId name description phoneNumber address image categories ratingCount ratingValue minimalOrderCost deliveryCost hours
        fields = ('id', 'ownerId', 'name', 'description', 'phoneNumber', 'address', 'image', 'categories', 'ratingCount', 'ratingValue', 'minimalOrderCost', 'deliveryCost', 'hours', 'products')

    def create(self, validated_data):
        """Create and return a new restaurant"""
        restaurant = models.Restaurant.objects.create_user(
            ownerId=validated_data['ownerId'],
            name=validated_data['name'],
            description=validated_data['description'],
            phoneNumber=validated_data['phoneNumber'],
            address=validated_data['address'],
            image=validated_data['image'],
            categories=validated_data['categories'],
            ratingCount=validated_data['ratingCount'],
            ratingValue=validated_data['ratingValue'],
            minimalOrderCost=validated_data['minimalOrderCost'],
            deliveryCost=validated_data['deliveryCost'],
            hours=validated_data['hours'],
            products=validated_data['products']
        )

        return restaurant

class RestaurantsProductsSerializer(serializers.ModelSerializer):
    """Serializes a restaurant object"""
    products = ProductsSerializer(many=True, read_only=True)
    class Meta:
        model = models.Restaurant
        fields = ('name', 'products')
