
from rest_framework import serializers
from .models import Product,CartItem

class ProductSerializer(serializers.ModelSerializer):
    image = serializers.ImageField(max_length=None, use_url=True)
    class Meta:
        model = Product
        fields = ['id', 'name', 'price', 'category', 'image', 'sizes']

class CartItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = CartItem
        fields = '__all__'

