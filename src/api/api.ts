export const getVans = async (id: string | undefined) => {
  const URL = id ? `/api/vans/${id}` : `/api/vans`;
  const response = await fetch(URL);
  if (!response.ok) {
    throw {
      message: "Failed to fetch vans",
      statuText: response.statusText,
      status: response.status,
    };
  }
  const data = await response.json();
  return data.vans;
};

export const getHostVans = async (id: string | undefined) => {
  const URL = id ? `/api/host/vans/${id}` : `/api/host/vans`;
  const response = await fetch(URL);
  if (!response.ok) {
    throw {
      message: "Failed to fetch vans",
      statuText: response.statusText,
      status: response.status,
    };
  }
  const data = await response.json();
  return data.vans;
};
