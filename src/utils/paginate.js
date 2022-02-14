exports.getPagination = (page, size) => {
  const limit = size ? +size : 3;
  const offset = page ? page * limit : 0;
  return { limit, offset };
};

exports.getPagingData = (data, page, limit) => {
  const { count: total, rows: result } = data;
  const currentPage = page ? +page : 0;
  const totalPage = Math.ceil(total / limit);
  return { total, result, totalPage, currentPage };
};
