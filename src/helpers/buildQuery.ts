type QueryValue = string | string[] | number | undefined;

export const buildQuery = (params: Record<string, QueryValue>): string => {
  const query = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (!value) return;
    if (Array.isArray(value) && value.length) {
      query.append(key, value.join(","));
    } else {
      query.append(key, String(value));
    }
  });
  return query.toString();
};
