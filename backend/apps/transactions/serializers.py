from rest_framework import serializers

from .models import Transaction


class TransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transaction
        fields = (
            "id",
            "account",
            "category",
            "destination_account",
            "transaction_type",
            "amount",
            "currency",
            "date",
            "description",
            "notes",
            "status",
            "is_recurring",
            "recurrence_rule",
            "created_at",
            "updated_at",
        )
        read_only_fields = (
            "id",
            "created_at",
            "updated_at",
        )

    def validate_amount(self, value):
        if value <= 0:
            raise serializers.ValidationError(
                "El monto debe ser mayor a 0."
            )

        return value

    def validate(self, data):
        instance = self.instance

        transaction_type = data.get(
            "transaction_type",
            instance.transaction_type if instance else None,
        )

        account = data.get(
            "account",
            instance.account if instance else None,
        )

        category = data.get(
            "category",
            instance.category if instance else None,
        )

        destination_account = data.get(
            "destination_account",
            instance.destination_account if instance else None,
        )

        request = self.context.get("request")
        user = request.user if request else None

        if account and account.user != user:
            raise serializers.ValidationError(
                {
                    "account": (
                        "La cuenta no pertenece al usuario autenticado."
                    )
                }
            )

        if category and category.user != user:
            raise serializers.ValidationError(
                {
                    "category": (
                        "La categoría no pertenece al usuario autenticado."
                    )
                }
            )

        if destination_account and destination_account.user != user:
            raise serializers.ValidationError(
                {
                    "destination_account": (
                        "La cuenta destino no pertenece "
                        "al usuario autenticado."
                    )
                }
            )

        if transaction_type == Transaction.TransactionType.TRANSFER:
            if not destination_account:
                raise serializers.ValidationError(
                    {
                        "destination_account": (
                            "Las transferencias requieren "
                            "una cuenta destino."
                        )
                    }
                )

            if account == destination_account:
                raise serializers.ValidationError(
                    {
                        "destination_account": (
                            "La cuenta origen y destino "
                            "no pueden ser la misma."
                        )
                    }
                )

        elif destination_account:
            raise serializers.ValidationError(
                {
                    "destination_account": (
                        "Solo las transferencias pueden "
                        "tener cuenta destino."
                    )
                }
            )

        return data