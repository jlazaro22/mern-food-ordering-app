import type { User } from '@/types';
import { useAuth0 } from '@auth0/auth0-react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export function useGetMyUser() {
  const { getAccessTokenSilently } = useAuth0();

  async function getMyUserRequest(): Promise<User> {
    const accessToken = await getAccessTokenSilently();
    const response = await fetch(`${API_BASE_URL}/api/my/user`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to get user');
    }

    return response.json();
  }

  const {
    data: currentUser,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['fetchCurrentUser'],
    queryFn: getMyUserRequest,
  });

  if (error) {
    toast.error(error.message);
  }

  return {
    currentUser,
    isLoading,
  };
}

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

    if (!response.ok) {
      throw new Error('Failed to create user');
    }
  }

  const {
    mutateAsync: createUser,
    isPending,
    isSuccess,
    error,
    reset,
  } = useMutation({
    mutationFn: createMyUserRequest,
  });

  if (isSuccess) {
    toast.success('User created successfully');
  }

  if (error) {
    toast.error(error.message);
    reset();
  }

  return {
    createUser,
    isPending,
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

    if (!response.ok) {
      throw new Error('Failed to update user');
    }
  }

  const {
    mutateAsync: updateUser,
    isPending,
    isSuccess,
    error,
    reset,
  } = useMutation({
    mutationFn: updateMyUserRequest,
  });

  if (isSuccess) {
    toast.success('User profile updated!');
  }

  if (error) {
    toast.error(error.message);
    reset();
  }

  return {
    updateUser,
    isPending,
  };
}
