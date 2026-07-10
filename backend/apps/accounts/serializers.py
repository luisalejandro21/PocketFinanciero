from rest_framework import serializers

from .models import Account


class AccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = (
            "id",
            "name",
            "account_type",
            "institution",
            "initial_balance",
            "current_balance",
            "currency",
            "is_active",
            "notes",
            "created_at",
            "updated_at",
        )
        read_only_fields = (
            "id",
            "current_balance",
            "created_at",
            "updated_at",
        )

    def create(self, validated_data):
        initial_balance = validated_data.get("initial_balance", 0)

        validated_data["current_balance"] = initial_balance

        return super().create(validated_data)