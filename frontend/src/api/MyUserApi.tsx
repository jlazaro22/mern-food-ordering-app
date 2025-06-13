import { useAuth0 } from '@auth0/auth0-react';
import { useMutation } from '@tanstack/react-query';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

type CreateUserRequest = {
  auth0Id: string;
  email: string;
};

export function useCreateMyUser() {
  const { getAccessTokenSilently } = useAuth0();

  async function createMyUserRequest(user: CreateUserRequest) {
    const accessToken = await getAccessTokenSilently();
    const response = await fetch(`${API_BASE_URL}/api/my/user`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });

    console.log('🪲 create response: ', response);

    if (!response.ok) {
      throw new Error('Failed to create user');
    }
  }

  const {
    mutateAsync: createUser,
    isPending,
    isError,
    isSuccess,
  } = useMutation({
    mutationFn: createMyUserRequest,
  });

  return {
    createUser,
    isPending,
    isError,
    isSuccess,
  };
}

type UpdateUserRequest = {
  name: string;
  addressLine1: string;
  city: string;
  country: string;
};

export function useUpdateMyUser() {
  const { getAccessTokenSilently } = useAuth0();

  async function updateMyUserRequest(formData: UpdateUserRequest) {
    const accessToken = await getAccessTokenSilently();
    const response = await fetch(`${API_BASE_URL}/api/my/user`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    console.log('🪲 update response: ', response);

    if (!response.ok) {
      throw new Error('Failed to update user');
    }
  }

  const {
    mutateAsync: updateUser,
    isPending,
    isSuccess,
    isError,
    error,
    reset,
  } = useMutation({
    mutationFn: updateMyUserRequest,
  });

  return {
    updateUser,
    isPending,
    isSuccess,
    isError,
    error,
    reset,
  };
}
