# shop/urls.py

from django.urls import path, include
from . import views
from rest_framework.routers import DefaultRouter
from .views import ProductViewSet, CartItemViewSet, welcome

router = DefaultRouter()
router.register(r'products', ProductViewSet)
router.register(r'cart-items', CartItemViewSet)

urlpatterns = [
    path('welcome/', welcome), 
    path('api/', include(router.urls)),
    path('', include(router.urls)),
    path('login/', views.login_view, name='login'),
    path('signup/', views.signup_view, name='signup'),
    path('logout/', views.logout_view, name='logout'),
    
]
