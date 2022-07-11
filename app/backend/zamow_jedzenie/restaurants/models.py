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

    def __str__(self):
        return self.name


class OpeningHoursManager(BaseUserManager):
    """Manager for OpeningHours profiles"""

    def create_user(self,
                    from_hour_monday, to_hour_monday,
                    from_hour_tuesday, to_hour_tuesday,
                    from_hour_wednesday, to_hour_wednesday,
                    from_hour_thursday, to_hour_thursday,
                    from_hour_friday, to_hour_friday,
                    from_hour_saturday, to_hour_saturday,
                    from_hour_sunday, to_hour_sunday,
                    restaurant):

        open = self.model(from_hour_monday=from_hour_monday, to_hour_monday=to_hour_monday,
                        from_hour_tuesday=from_hour_tuesday, to_hour_tuesday=to_hour_tuesday,
                        from_hour_wednesday=from_hour_wednesday, to_hour_wednesday=to_hour_wednesday,
                        from_hour_thursday=from_hour_thursday, to_hour_thursday=to_hour_thursday,
                        from_hour_friday=from_hour_friday, to_hour_friday=to_hour_friday,
                        from_hour_saturday=from_hour_saturday, to_hour_saturday=to_hour_saturday,
                        from_hour_sunday=from_hour_sunday, to_hour_sunday=to_hour_sunday,
                        restaurant=restaurant)
        open.save(using=self._db)

        return open


class OpeningHours(models.Model):

    from_hour_monday = models.TimeField()
    to_hour_monday = models.TimeField()

    from_hour_tuesday = models.TimeField()
    to_hour_tuesday = models.TimeField()

    from_hour_wednesday = models.TimeField()
    to_hour_wednesday = models.TimeField()

    from_hour_thursday = models.TimeField()
    to_hour_thursday = models.TimeField()

    from_hour_friday = models.TimeField()
    to_hour_friday = models.TimeField()

    from_hour_saturday = models.TimeField()
    to_hour_saturday = models.TimeField()

    from_hour_sunday = models.TimeField()
    to_hour_sunday = models.TimeField()

    restaurant = models.ForeignKey('Restaurant', on_delete=models.CASCADE, default='1')
    objects = OpeningHoursManager()


class ProductManager(BaseUserManager):
    """Manager for Restaurant Products"""

    def create_user(self, name, description, price, categories, image, restaurantId):
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

        product = self.model(name=name, description=description, price=price, categories=categories, image=image, restaurantId=restaurantId)
        product.save(using=self._db)

        return product


class Product(models.Model):
    """Database model for Restaurant Product in the system"""
    name = models.CharField(max_length=255, unique=False)
    description = models.CharField(max_length=500)
    price = models.DecimalField(max_digits=5, decimal_places=2)
    image = models.CharField(max_length=255)
    categories = models.ForeignKey('Category', on_delete=models.CASCADE, default='1')
    restaurantId = models.ForeignKey('Restaurant', on_delete=models.CASCADE, default='1')


    objects = ProductManager()

    def __str__(self):
        return self.name

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

    objects = RestaurantManager()

    def __str__(self):
        return self.name


class OrderManager(BaseUserManager):
    """Manager for Order"""

    def create_user(self, userId, restaurantId, status):
        order = self.model(userId=userId, restaurantId=restaurantId, status=status)
        order.save(using=self._db)

        return order




class Order(models.Model):
    """Database model for order"""
    userId = models.ForeignKey(UserProfile, on_delete=models.CASCADE)
    restaurantId = models.ForeignKey(Restaurant, on_delete=models.CASCADE)
    status = models.CharField(max_length=255)
    items = models.ManyToManyField(Product)

    objects = OrderManager()
