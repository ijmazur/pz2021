from django.db import models
from django.contrib.auth.models import AbstractBaseUser
from django.contrib.auth.models import PermissionsMixin
from django.contrib.auth.models import BaseUserManager


class UserProfileManager(BaseUserManager):
    """Manager for user profiles"""

    def create_user(self, email, firstName, lastName, street, city, postalCode, phoneNumber, newsletter, password=None):
        """Create a new user profile"""
        if not email:
            raise ValueError('User must have an email address')

        email = self.normalize_email(email)
        user = self.model(email=email, firstName=firstName, lastName=lastName, street=street, city=city, postalCode=postalCode, phoneNumber=phoneNumber, newsletter=newsletter)

        user.set_password(password)
        user.save(using=self._db)

        return user

    def create_superuser(self, email, firstName, lastName, street, city, postalCode, phoneNumber, newsletter, password):
        """Create and save a new superuser with given details"""
        user = self.create_user(email, firstName, lastName, street, city, postalCode, phoneNumber, newsletter, password)

        user.is_superuser = True
        user.is_staff = True
        user.save(using=self._db)

        return user


class UserProfile(AbstractBaseUser, PermissionsMixin):
    """Database model for users in the system"""
    email = models.EmailField(max_length=255, unique=True)
    firstName = models.CharField(max_length=255)
    lastName = models.CharField(max_length=255)
    street = models.CharField(max_length=255)
    city = models.CharField(max_length=255)
    postalCode = models.CharField(max_length=255)
    phoneNumber = models.CharField(max_length=255)
    newsletter = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    objects = UserProfileManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['firstName', 'lastName', 'street', 'city', 'postalCode', 'phoneNumber', 'newsletter']

    def get_full_name(self):
        """Retrieve full name of user"""
        return self.firstName + " " + self.lastName

    def __str__(self):
        return self.email
