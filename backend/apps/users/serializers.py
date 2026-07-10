from rest_framework import serializers

from .models import User
from apps.categories.models import Category


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=8)

    class Meta:
        model = User
        fields = (
            "id",
            "first_name",
            "last_name",
            "email",
            "password",
            "preferred_currency",
            "timezone",
        )
        read_only_fields = ("id",)

    def create(self, validated_data):
        password = validated_data.pop("password")

        user = User.objects.create_user(
            password=password,
            **validated_data,
        )

        default_categories = [
            ("Sueldo", Category.CategoryType.INCOME, "#16A34A", "wallet"),
            ("Freelance", Category.CategoryType.INCOME, "#22C55E", "briefcase"),
            ("Transferencia", Category.CategoryType.INCOME, "#14B8A6", "repeat"),
            ("Otros ingresos", Category.CategoryType.INCOME, "#84CC16", "plus-circle"),

            ("Alimentación", Category.CategoryType.EXPENSE, "#F97316", "utensils"),
            ("Transporte", Category.CategoryType.EXPENSE, "#3B82F6", "bus"),
            ("Vivienda", Category.CategoryType.EXPENSE, "#6366F1", "home"),
            ("Servicios", Category.CategoryType.EXPENSE, "#EAB308", "bolt"),
            ("Salud", Category.CategoryType.EXPENSE, "#EF4444", "heart-pulse"),
            ("Educación", Category.CategoryType.EXPENSE, "#8B5CF6", "graduation-cap"),
            ("Ocio", Category.CategoryType.EXPENSE, "#EC4899", "gamepad-2"),
            ("Otros gastos", Category.CategoryType.EXPENSE, "#64748B", "more-horizontal"),
        ]

        for name, category_type, color, icon in default_categories:
            Category.objects.get_or_create(
                user=user,
                name=name,
                category_type=category_type,
                defaults={
                    "color": color,
                    "icon": icon,
                    "is_active": True,
                },
            )

        return user


class UserMeSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = (
            "id",
            "email",
            "first_name",
            "last_name",
            "preferred_currency",
            "timezone",
        )