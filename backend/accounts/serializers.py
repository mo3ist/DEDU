from django.contrib.contenttypes import fields
from rest_framework import serializers
from django.contrib.auth import get_user_model

UserModel = get_user_model()

class UserSerializer(serializers.ModelSerializer):
	class Meta:
		model = UserModel
		fields = ("id", "email", "password")

	id = serializers.CharField(required=False) 
