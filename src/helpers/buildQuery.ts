type QueryValue = string | string[] | undefined;

export const buildQuery = (params: Record<string, QueryValue>): string => {
  const query = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (!value || value.length === 0) return;
    if (Array.isArray(value)) {
      query.append(key, value.join(","));
    } else {
      query.append(key, value);
    }
  });
  return query.toString();
};
