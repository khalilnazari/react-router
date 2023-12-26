// Its just a fake api not a real world

const API_URL = "http://localhost:3001";

export const getVans = async (id: string | undefined) => {
  const URL = id ? `${API_URL}/vans/${id}` : `${API_URL}/vans`;
  const response = await fetch(URL);
  if (!response.ok) {
    throw {
      message: "Failed to fetch vans",
      statuText: response.statusText,
      status: response.status,
    };
  }
  const data = await response.json();
  return data;
};

export const getHostVans = async (id: string | undefined) => {
  const URL = id ? `${API_URL}/host/${id}` : `${API_URL}/host`;
  const response = await fetch(URL);
  if (!response.ok) {
    throw {
      message: "Failed to fetch vans",
      statuText: response.statusText,
      status: response.status,
    };
  }
  const data = await response.json();
  return data;
};

export const getAuth = async (credintials: {
  password: string;
  email: string;
}) => {
  const URL = `${API_URL}/auth`;
  const response = await fetch(URL);
  if (!response.ok) {
    throw {
      message: "Failed to fetch user",
      statuText: response.statusText,
      status: response.status,
    };
  }
  const data = await response.json();

  if (
    data[0].email === credintials.email &&
    data[0].password === credintials.password
  ) {
    return data[0];
  }
  return null;
};
