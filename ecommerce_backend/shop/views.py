# shop/views.py

from django.http import JsonResponse
from rest_framework import viewsets
from .models import Product, CartItem
from .serializers import ProductSerializer, CartItemSerializer
from django.contrib.auth import authenticate, login,logout
from django.contrib.auth.models import User
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.permissions import IsAuthenticated
from .models import Product, CartItem
from .serializers import ProductSerializer, CartItemSerializer
import json
from django.contrib.auth import get_user_model
from django.dispatch import receiver
from django.db.models.signals import post_save
from .models import Cart


def welcome(request):
    return JsonResponse({"message": "Welcome to the E-commerce API!"})

class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

class CartItemViewSet(viewsets.ModelViewSet):
    queryset = CartItem.objects.all()
    serializer_class = CartItemSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return CartItem.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


@receiver(post_save, sender=get_user_model())
def create_user_cart(sender, instance, created, **kwargs):
    if created:
        Cart.objects.create(user=instance)

@csrf_exempt
def login_view(request):
    print("heyy1")
    if request.method == 'POST':
        data = json.loads(request.body)
        print("heyy3")
        username = data.get('username')
        password = data.get('password')
        user = authenticate(username=username, password=password)
        if user is not None:
            login(request, user)
            return JsonResponse({'message': 'Login successful'})
        else:
            return JsonResponse({'message': 'Invalid credentials'}, status=401)
    return JsonResponse({'message': 'Method not allowed'}, status=405)

@csrf_exempt
def signup_view(request):
    print("heyy")
    if request.method == 'POST':
        print("heyy1")
        data = json.loads(request.body)
        print("heyy2",data)
        username = data.get('username')
        password = data.get('password')
        email = data.get('email')
        if not (username and password and email):
            return JsonResponse({'message': 'All fields are required'}, status=400)
        try:
            user = User.objects.create_user(username=username, email=email, password=password)
            user.save()
            return JsonResponse({'message': 'Signup successful'})
        except Exception as e:
            return JsonResponse({'message': str(e)}, status=400)
    return JsonResponse({'message': 'Method not allowed'}, status=405)

@csrf_exempt
def logout_view(request):
    logout(request)
    return JsonResponse({'message': 'Logout successful'})


