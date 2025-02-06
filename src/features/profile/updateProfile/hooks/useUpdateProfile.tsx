import { ApolloError, useMutation } from '@apollo/client';
import { UPDATE_PROFILE } from 'src/entities/profile/profile.mutations';
import { GET_PROFILE } from 'src/entities/profile/profile.queries';
import { UpdateProfileInput } from 'src/entities/profile/profile.types';
import { transformToProfileMutationsUpdateArgsDto } from 'src/entities/profile/profile.lib';
import { ErrorFieldsMap, handleApolloError, handleUnknownError } from 'src/shared/api/errors/errors';

export type ProfileErrorableField = 'name';
const errorFieldsMap: ErrorFieldsMap<ProfileErrorableField> = {
  VALIDATION: ['name'],
};

export const useUpdateProfile = () => {
  const [updateProfile, { loading, error }] = useMutation(UPDATE_PROFILE, {
    refetchQueries: [{ query: GET_PROFILE }],
  });

  const handleUpdateProfile = async (updateProfileInputArgs: UpdateProfileInput) => {
    try {
      await updateProfile({ variables: transformToProfileMutationsUpdateArgsDto(updateProfileInputArgs) });
    } catch (err) {
      if (err instanceof ApolloError) {
        return Promise.reject(handleApolloError(err, errorFieldsMap));
      }
      return Promise.reject(handleUnknownError('An unknown error occurred'));
    }
  };

  return { handleUpdateProfile, loading, error };
};
