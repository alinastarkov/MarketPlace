
def my_jwt_response_handler(token, user=None, request=None):
    return {
        'user': UserSerializer(user, context={'request': request}).data
    }