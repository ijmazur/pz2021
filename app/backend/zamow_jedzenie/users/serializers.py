from rest_framework import serializers
from users import models
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    """Customizes JWT default Serializer to add more information about user"""
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['id'] = user.id
        token['email'] = user.email
        token['is_superuser'] = user.is_superuser
        token['is_staff'] = user.is_staff

        return token
    def validate(self, attrs):
        data = super().validate(attrs)
        data['id'] = self.user.id
        data['email'] = self.user.email
        data['firstName'] = self.user.firstName
        data['lastName'] = self.user.lastName
        data['street'] = self.user.street
        data['city'] = self.user.city
        data['postalCode'] = self.user.postalCode
        data['phoneNumber'] = self.user.phoneNumber
        data['newsletter'] = self.user.newsletter
        return data

class HelloSerializer(serializers.Serializer):
    """Serializes a name field for testing our APIView"""
    name = serializers.CharField(max_length=10)

class UserProfileSerializer(serializers.ModelSerializer):
    """Serializes a user profile object"""

    class Meta:
        model = models.UserProfile
        # email, firstName, lastName, street, city, postalCode, phoneNumber, newsletter, password
        fields = ('id', 'email', 'firstName', 'lastName', 'street', 'city', 'postalCode', 'phoneNumber', 'newsletter', 'password')
        extra_kwargs = {
            'password': {
                'write_only': True,
                'style': {'input_type': 'password'}
            }
        }

    def create(self, validated_data):
        """Create and return a new user"""
        user = models.UserProfile.objects.create_user(
            email=validated_data['email'],
            firstName=validated_data['firstName'],
            lastName=validated_data['lastName'],
            street=validated_data['street'],
            city=validated_data['city'],
            postalCode=validated_data['postalCode'],
            phoneNumber=validated_data['phoneNumber'],
            newsletter=validated_data['newsletter'],
            password=validated_data['password']
        )

        return user

    def update(self, instance, validated_data):
        """Handle updating user account"""
        if 'password' in validated_data:
            password = validated_data.pop('password')
            instance.set_password(password)

        return super().update(instance, validated_data)
