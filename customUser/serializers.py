from rest_framework import serializers
from django.contrib.auth import get_user_model # If used custom user model

UserModel = get_user_model()


class UserSerializer(serializers.ModelSerializer):

    password = serializers.CharField(write_only=True)

    def create(self, validated_data):

        user = UserModel.objects.create(
            email=validated_data['email']
        )
        user.set_password(validated_data['password'])
        user.fname = validated_data['fname']
        user.lname = validated_data['lname']
        user.username = "{} {}".format(validated_data['fname'], validated_data['lname'])
        user.cell = validated_data['cell']
        user.photo = validated_data['photo']
        user.save()

        return user

    class Meta:
        model = UserModel
        # Tuple of serialized model fields (see link [2])
        fields = ( "id", "email", "password", "fname", "lname", "photoUrl", "cell", "photo")
