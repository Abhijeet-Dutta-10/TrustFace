const REGISTER_ENDPOINT =
  'https://pm6fdjjr51.execute-api.us-east-1.amazonaws.com/dev/register';

export interface RegisterPayload {
  name: string;
  email: string;
  phoneNo: string;
  password: string;
  imageBase64: string;
}

export interface RegisterResponse {
  name: string;
  [key: string]: unknown;
}

export const registerUser = async (
  payload: RegisterPayload
): Promise<RegisterResponse> => {
  const response = await fetch(REGISTER_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  let data: RegisterResponse | null = null;
  try {
    data = await response.json();
  } catch {
    data = null;
  }

  if (!response.ok) {
    const message =
      (data &&
        (typeof data.error === 'string'
          ? data.error
          : typeof data.message === 'string'
            ? data.message
            : '')) ||
      `Registration failed (${response.status})`;
    throw new Error(message);
  }

  if (!data) {
    throw new Error('Registration failed: empty response');
  }

  return data;
};
